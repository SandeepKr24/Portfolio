import { readFile } from "fs/promises";
import path from "path";

type Chunk = {
  id: string;
  section: string;
  title: string;
  text: string;
  url?: string;
  embedding: number[];
};

type RagArtifact = {
  embedding_model: string;
  embedding_dim: number;
  chunks: Chunk[];
};

let artifactPromise: Promise<RagArtifact> | null = null;

function loadArtifact() {
  if (!artifactPromise) {
    const artifactPath = path.join(process.cwd(), "..", "content", "rag_artifact.json");
    artifactPromise = readFile(artifactPath, "utf-8").then((raw) => JSON.parse(raw));
  }
  return artifactPromise;
}

function dot(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

export async function retrieveChunks(queryEmbedding: number[], topK = 4) {
  const artifact = await loadArtifact();
  return artifact.chunks
    .map((chunk) => ({ chunk, score: dot(queryEmbedding, chunk.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
