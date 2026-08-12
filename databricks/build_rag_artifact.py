# Databricks notebook source
# /// script
# [tool.databricks.environment]
# environment_version = "5"
# dependencies = [
#   "sentence-transformers",
# ]
# ///
# MAGIC %md
# MAGIC # Build RAG Artifact — Portfolio Chatbot
# MAGIC
# MAGIC Loads `content/chunks.json`, embeds each chunk with `sentence-transformers/multi-qa-MiniLM-L6-cos-v1`,
# MAGIC and writes a portable artifact (text + metadata + embeddings) to `content/rag_artifact.json`.
# MAGIC
# MAGIC Phase 1 of the build (see `CLAUDE.md`). The artifact is plain JSON so it can be loaded into
# MAGIC whichever vector store gets provisioned in Phase 3, without depending on AWS infra existing yet.

# COMMAND ----------

# MAGIC %pip install sentence-transformers

# COMMAND ----------

import json
from pathlib import Path
from sentence_transformers import SentenceTransformer

# COMMAND ----------

# This notebook lives in databricks/, so the repo root is one level up.
REPO_ROOT = Path.cwd().parent
CHUNKS_PATH = REPO_ROOT / "content" / "chunks.json"
ARTIFACT_PATH = REPO_ROOT / "content" / "rag_artifact.json"

with open(CHUNKS_PATH) as f:
    chunks = json.load(f)

print(f"Loaded {len(chunks)} chunks from {CHUNKS_PATH}")

# COMMAND ----------

EMBEDDING_MODEL = "sentence-transformers/multi-qa-MiniLM-L6-cos-v1"
model = SentenceTransformer(EMBEDDING_MODEL)

texts = [c["text"] for c in chunks]
embeddings = model.encode(texts, show_progress_bar=True, normalize_embeddings=True)

# COMMAND ----------

artifact = [
    {
        **chunk,
        "embedding": embedding.tolist(),
    }
    for chunk, embedding in zip(chunks, embeddings)
]

with open(ARTIFACT_PATH, "w") as f:
    json.dump(
        {
            "embedding_model": EMBEDDING_MODEL,
            "embedding_dim": int(embeddings.shape[1]),
            "chunks": artifact,
        },
        f,
        indent=2,
    )

print(f"Wrote {len(artifact)} embedded chunks to {ARTIFACT_PATH}")

# COMMAND ----------

# MAGIC %md
# MAGIC ## Sanity check
# MAGIC Cosine similarity search (embeddings are normalized, so dot product suffices) against a couple
# MAGIC of test queries to confirm retrieval looks reasonable before this artifact is consumed downstream.

# COMMAND ----------

import numpy as np

embedding_matrix = np.array([c["embedding"] for c in artifact])

def search(query, top_k=3):
    query_embedding = model.encode([query], normalize_embeddings=True)[0]
    scores = embedding_matrix @ query_embedding
    top_idx = np.argsort(-scores)[:top_k]
    for i in top_idx:
        print(f"{scores[i]:.3f}  [{artifact[i]['section']}] {artifact[i]['title']}")

search("what generative AI tools does Sandeep know?")
print()
search("has he published any papers?")
print()
search("why isn't the smart grid project available?")