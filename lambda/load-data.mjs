// One-time / idempotent loader: reads content/rag_artifact.json and upserts
// every chunk into the `chunks` table in RDS. Run this after schema.sql and
// whenever rag_artifact.json is regenerated.
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const artifactPath = path.join(__dirname, "..", "content", "rag_artifact.json");
const artifact = JSON.parse(readFileSync(artifactPath, "utf-8"));

const client = new pg.Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false },
});

await client.connect();

const schemaSql = readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
await client.query(schemaSql);

const upsert = `
  INSERT INTO chunks (id, section, title, text, url, embedding)
  VALUES ($1, $2, $3, $4, $5, $6)
  ON CONFLICT (id) DO UPDATE SET
    section = EXCLUDED.section,
    title = EXCLUDED.title,
    text = EXCLUDED.text,
    url = EXCLUDED.url,
    embedding = EXCLUDED.embedding
`;

for (const chunk of artifact.chunks) {
  const vectorLiteral = `[${chunk.embedding.join(",")}]`;
  await client.query(upsert, [
    chunk.id,
    chunk.section,
    chunk.title,
    chunk.text,
    chunk.url ?? null,
    vectorLiteral,
  ]);
}

const { rows } = await client.query("SELECT count(*)::int AS count FROM chunks");
console.log(`Loaded ${artifact.chunks.length} chunks. Table now has ${rows[0].count} rows.`);

await client.end();
