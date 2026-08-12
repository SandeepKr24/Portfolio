import Anthropic from "@anthropic-ai/sdk";
import pg from "pg";
import { pipeline, env as transformersEnv } from "@huggingface/transformers";

// Lambda's filesystem is read-only except /tmp — point the model cache there.
transformersEnv.cacheDir = "/tmp/transformers-cache";

const MODEL_ID = "Xenova/multi-qa-MiniLM-L6-cos-v1";
const CONTACT_EMAIL = "sandeep.workmail24@gmail.com";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const SYSTEM_INSTRUCTIONS = `You are the portfolio assistant on Sandeep Kumar's personal website. Visitors ask you about his background, education, publications, projects, and skills.

Answer only using the retrieved context provided in this conversation — never invent credentials, projects, metrics, or details that aren't in it. If the retrieved context doesn't give you enough to answer confidently, say so plainly and suggest the visitor email Sandeep directly at ${CONTACT_EMAIL} rather than guessing.

Speak about Sandeep in the third person (e.g. "Sandeep built...", "He studied..."). Keep answers concise and conversational — this is a chat widget, not a report.`;

// Module-scope so warm Lambda invocations reuse the loaded model and pool.
let extractorPromise;
function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = pipeline("feature-extraction", MODEL_ID);
  }
  return extractorPromise;
}

async function embedText(text) {
  const extractor = await getExtractor();
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

async function retrieveChunks(queryEmbedding, topK = 4) {
  const vectorLiteral = `[${queryEmbedding.join(",")}]`;
  const { rows } = await pool.query(
    `SELECT id, section, title, text, url, 1 - (embedding <=> $1) AS score
     FROM chunks
     ORDER BY embedding <=> $1
     LIMIT $2`,
    [vectorLiteral, topK],
  );
  return rows;
}

const client = new Anthropic();

async function buildContextBlock(userText) {
  const queryEmbedding = await embedText(userText);
  const rows = await retrieveChunks(queryEmbedding, 4);
  return rows.map((r) => `[${r.section}] ${r.title}\n${r.text}`).join("\n\n---\n\n");
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export const handler = awslambda.streamifyResponse(async (event, responseStream) => {
  const method = event.requestContext?.http?.method;

  if (method === "OPTIONS") {
    const httpResponseMetadata = { statusCode: 204, headers: corsHeaders() };
    responseStream = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);
    responseStream.end();
    return;
  }

  let messages;
  try {
    messages = JSON.parse(event.body ?? "{}").messages;
  } catch {
    messages = null;
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    const httpResponseMetadata = {
      statusCode: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders() },
    };
    responseStream = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);
    responseStream.write("Missing messages");
    responseStream.end();
    return;
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  const httpResponseMetadata = {
    statusCode: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders() },
  };
  responseStream = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);

  if (!lastUser) {
    responseStream.write("Missing user message");
    responseStream.end();
    return;
  }

  let contextBlock;
  try {
    contextBlock = await buildContextBlock(lastUser.content);
  } catch (err) {
    console.error("Retrieval error:", err);
    responseStream.write(
      "Sorry, something went wrong preparing a response. Please try again.",
    );
    responseStream.end();
    return;
  }

  try {
    const stream = client.messages.stream({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: [
        { type: "text", text: SYSTEM_INSTRUCTIONS, cache_control: { type: "ephemeral" } },
        { type: "text", text: `Retrieved context:\n\n${contextBlock}` },
      ],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    stream.on("text", (delta) => {
      responseStream.write(delta);
    });

    await stream.finalMessage();
  } catch (err) {
    console.error("Anthropic API error:", err);
    responseStream.write(
      "Sorry, I'm having trouble reaching the assistant right now. Please try again in a moment, or email Sandeep directly.",
    );
  }

  responseStream.end();
});
