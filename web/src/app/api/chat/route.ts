import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { embedText } from "@/lib/embeddings";
import { retrieveChunks } from "@/lib/retrieval";
import { contact } from "@/content/site";

export const runtime = "nodejs";

const client = new Anthropic();

const SYSTEM_INSTRUCTIONS = `You are the portfolio assistant on Sandeep Kumar's personal website. Visitors ask you about his background, education, publications, projects, and skills.

Answer only using the retrieved context provided in this conversation — never invent credentials, projects, metrics, or details that aren't in it. If the retrieved context doesn't give you enough to answer confidently, say so plainly and suggest the visitor email Sandeep directly at ${contact.email} rather than guessing.

Speak about Sandeep in the third person (e.g. "Sandeep built...", "He studied..."). Keep answers concise and conversational — this is a chat widget, not a report.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return new Response("Missing user message", { status: 400 });
  }

  let contextBlock: string;
  try {
    const queryEmbedding = await embedText(lastUser.content);
    const retrieved = await retrieveChunks(queryEmbedding, 4);
    contextBlock = retrieved
      .map(({ chunk }) => `[${chunk.section}] ${chunk.title}\n${chunk.text}`)
      .join("\n\n---\n\n");
  } catch (err) {
    console.error("Retrieval error:", err);
    return new Response("Something went wrong preparing a response. Please try again.", {
      status: 500,
    });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
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
        controller.enqueue(encoder.encode(delta));
      });

      try {
        await stream.finalMessage();
      } catch (err) {
        console.error("Anthropic API error:", err);
        controller.enqueue(
          encoder.encode(
            "Sorry, I'm having trouble reaching the assistant right now. Please try again in a moment, or email Sandeep directly.",
          ),
        );
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
