# Portfolio Website — Project Brief

Personal AI/ML portfolio site for Sandeep Kumar, with a RAG-powered chatbot widget.
This file captures all decisions already made. Read it before proposing changes.

---

## 1. Concept

A traditional minimalist portfolio page **plus** a floating chatbot widget. Not a
chatbot-only site. Visitors can scan the static sections quickly, or ask the
chatbot questions about Sandeep's work, background, and projects.

The chatbot is backed by a RAG pipeline: site content is chunked, embedded, stored
in a vector DB, retrieved at query time, and passed to an LLM to generate answers.
The chatbot doubles as a live demo of the RAG/LLM skills the site describes.

---

## 2. Toolchain (decided)

Sandeep's laptop is low-spec with limited storage, so **nothing runs locally**.

| Phase | Tool | Purpose |
|---|---|---|
| Phase 1 | **Databricks** | Build the RAG pipeline: structure content, chunk, embed, export artifact |
| Phase 2 | **GitHub Codespaces** | Build the Next.js web app + chat widget + backend API |
| Phase 3 | **AWS** | Host everything (Amplify frontend, Lambda API, OpenSearch Serverless or RDS/pgvector) |

Phase 1 must produce a **portable artifact** (JSON: text + metadata + embeddings)
so it does not block on AWS infra existing yet. Phase 3 loads that artifact into
whichever vector store gets provisioned.

Build order is strictly Phase 1 → Phase 2 → Phase 3.

---

## 3. Design system (decided)

- **Aesthetic**: minimalist, no clutter, generous whitespace
- **Theme**: dark-only (no light mode toggle, no theme switching)
- **Background**: near-black
- **Accent**: warm coral/orange — used *sparingly* (buttons, links, chat trigger, active nav states) so it stays an accent
- **Typography**: one clean sans-serif throughout (e.g. Inter or system stack)
- **Borders**: hairline borders instead of shadows/raised cards
- **No**: gradients, drop shadows, decorative icons, background patterns

**Chatbot widget**: floating circular button, bottom-right, coral. Expands into a
panel styled like ChatGPT/Claude (message bubbles, clean input bar at bottom),
using the site's dark/coral palette so it feels native rather than bolted on.

---

## 4. Page structure (decided)

1. Hero — name + positioning line
2. About
3. Education
4. Publications
5. Projects — 3 flagship cards + 4 mini-projects in a compact grid
6. Skills — 8 grouped categories
7. Hobbies
8. Contact — Email · LinkedIn · GitHub · Instagram

**No Experience section** — Sandeep has no work experience yet. Do not add one.

---

## 5. Content

### About

> I'm an AI/ML engineer focused on building AI agents. What keeps me in this field
> is how fast it moves — I like learning something new, using it to build something,
> and then doing it all over again the next day. Most of my projects start that way:
> I pick up a technique, then find an excuse to put it to work.
>
> I approach my work in an organized way, but I stay flexible and adapt as things
> change — which tends to be often in this space.
>
> I'm currently looking for full-time opportunities where I can build
> production-grade AI systems.

### Education

- **M.Sc. Data Science** — Monash University, Melbourne (2024–2026), graduated with Distinction
- **B.Tech Information Technology** — Manipal University, Jaipur (2020–2024), 8.56 CGPA

### Publications

**Displayed on card:**

> **A Comprehensive Survey on Role of Artificial Intelligence in Solar Energy Processes**
> A review paper examining how AI techniques are applied across solar energy processes,
> published at the 2022 IEEE 7th International Conference for Convergence in Technology
> (I2CT). Co-authored with classmates and faculty during my bachelor's.
> DOI: 10.1109/I2CT54291.2022.9824314

Link: https://doi.org/10.1109/I2CT54291.2022.9824314

### Projects — flagship (3)

**1. FieldMedic — AI Clinical Decision Support System**

Card summary:
> An end-to-end RAG-based triage assistant that retrieves relevant medical knowledge
> and generates structured, safety-checked recommendations. Built with FastAPI,
> Streamlit, PostgreSQL (pgvector), and Gemini.

Long version:
> FieldMedic is a clinical decision support system that combines semantic retrieval
> with LLM reasoning to help with medical triage. It uses Sentence Transformers to
> embed and chunk over 300 medical knowledge documents, stores them in PostgreSQL
> with pgvector for semantic search, and retrieves the most relevant context for a
> given query. On top of retrieval, an agent pipeline combines the retrieved
> knowledge with LLM reasoning (Gemini) and a layer of safety rules to produce
> structured triage recommendations — rather than free-form, unconstrained output.
> The system is containerized with Docker Compose across three services and exposes
> four REST API endpoints.

- Repo: https://github.com/SandeepKr24/FieldMedic — display as a **"View on GitHub" button**, not a raw URL
- Not hosted/deployed live
- Keep safety rules described generally (not connected to any real hospital system)
- Do NOT add "Docker image available" or similar

**2. LLM Fine-Tuning Pipeline for Smart Grid Incident Analysis**

Card summary:
> Fine-tuned LLaMA-2 with LoRA for outage classification on smart-grid incident
> records, with a full training, evaluation, and inference pipeline built on
> HuggingFace and vLLM.

Long version:
> This project fine-tunes LLaMA-2 using LoRA (via HuggingFace PEFT) on a large set
> of smart-grid incident records to classify outage types. It covers the full
> pipeline end-to-end: preprocessing and annotation of the incident data, training
> and evaluation with HuggingFace, and a FastAPI inference service deployed with
> vLLM for efficient serving. The project was built to apply and practice LLM
> fine-tuning techniques — parameter-efficient tuning, dataset preparation, and
> production-style deployment — on a real-world structured-data classification task
> outside the usual chatbot/text-generation use case. Currently unavailable while I
> work on fixing unexpected problems.

- **Keep entirely unquantified** — no accuracy percentages, no metrics. This was explicit.

**3. Agentic AI Workflow for Energy Consumption Analytics**

Card summary:
> A LangChain-based AI agent for querying and analyzing energy consumption data,
> using tool-calling for dynamic SQL execution and anomaly detection.

Long version:
> This project built a LangChain-based agent to query and analyze energy consumption
> datasets, using tool-calling pipelines to dynamically generate and execute SQL
> queries and detect anomalies in the data. It also automated sustainability
> reporting workflows that would otherwise require manual analysis. Currently
> unavailable while I work on fixing unexpected problems.

- **Keep unquantified and simple.**

### Projects — mini grid (4)

Compact cards: name + one-liner + GitHub link. All repos are public; Sandeep will
add the links manually.

1. **Train Ticket Details Extractor** — Extracts key details from train ticket photos or PDFs and saves them as structured JSON.
2. **English-to-Hinglish Translator** — A Python tool that translates between English and Hinglish in both directions.
3. **Photo Scraper** — Downloads a specified number of images from Google Image Search based on a keyword.
4. **Binary Image Classification Model** — A binary image classifier built from scratch as a hands-on exercise in core ML fundamentals.

Deliberate hierarchy: the mini projects get **less visual weight** than the flagship
three, so they don't dilute the stronger work.

### Skills (8 grouped categories)

- **Programming**: Python, SQL
- **Machine Learning & LLMs**: Scikit-learn, TensorFlow, NLP, Transformers, LLM Fine-Tuning (LoRA, QLoRA, PEFT), HuggingFace Transformers, Model Evaluation (ROUGE, BLEU)
- **Generative AI**: LangChain, Langflow, LLMs, Prompt-Engineering, GPT, RAG Pipelines, Agentic AI Systems, LLM Tool-Calling
- **Data Engineering**: Apache Spark, Databricks
- **Infrastructure / CI-CD**: AWS, Docker, Git, GitHub Actions, Jenkins
- **Backend & Deployment**: FastAPI, REST APIs, vLLM, Model Inference Optimization
- **Databases & Storage**: PostgreSQL, pgvector, Delta Lake, Iceberg, Qdrant, Pinecone
- **Analytics & BI**: Power BI, Tableau, Microsoft Excel

Display as grouped tag clusters, not a flat wall of tags.

### Hobbies

> Outside of work, I'm usually gaming — mostly FIFA and racing titles. Sim racing is
> the one I'm most into; I don't have a proper sim setup yet, so I get my fix at
> gaming cafés when I can. I also run an Instagram account where I post virtual car
> photography from games like Forza Horizon, Gran Turismo, and Assetto Corsa —
> @clicks.waz24.

### Contact

Email · LinkedIn · GitHub · Instagram (@clicks.waz24) — Instagram is public on the site.

---

## 6. Display vs. embedded text

**Key pattern**: what the page displays and what gets embedded into the vector DB
can differ. Embedded chunks may carry extra context the page doesn't show, so the
chatbot can answer follow-ups the card doesn't cover.

**Publication chunk** (embedded only — origin story NOT on the card):
> A Comprehensive Survey on Role of Artificial Intelligence in Solar Energy Processes
> — a review paper examining how AI techniques are applied across solar energy
> processes, published at the 2022 IEEE 7th International Conference for Convergence
> in Technology (I2CT), co-authored with classmates and faculty during Sandeep's
> bachelor's. The paper began as a graded course report; the supervising professor
> encouraged the group to expand it, and it grew into a full review paper.
> DOI: 10.1109/I2CT54291.2022.9824314

**Smart grid fine-tuning chunk** (embedded only):
> The repository is private at the moment. It's one of those things where it worked
> yesterday, and then it's a new day and something stopped working. Sandeep is
> working on fixing it, but life keeps getting in the way — it's on the to-do list
> rather than at the top of it.

**Agentic energy chunk** (embedded only):
> The repository is private at the moment. The agent started misbehaving, so Sandeep
> took it down rather than leave something broken up. He's working on fixing it, but
> life keeps getting in the way — it's on the to-do list rather than at the top of it.

Display cards for both projects keep the neutral wording: *"currently unavailable
while I work on fixing unexpected problems."*

---

## 7. RAG pipeline decisions

- **Chunking**: manual/semantic, NOT algorithmic token-splitting. The corpus is small
  and well-bounded — each logical section IS one chunk. Automatic chunking risks
  cutting write-ups mid-sentence.
- **Skills**: one chunk per category (8 chunks), not one combined chunk, so the bot
  can answer "what generative AI tools does he know?" precisely.
- **Chunk voice**: write chunks in **third person** ("Sandeep is…"). The bot's voice
  is controlled by the system prompt, not the corpus. Third-person facts are easier
  for the model to reason over and re-voice.
- **Embedding model**: `sentence-transformers/multi-qa-MiniLM-L6-cos-v1` — free, no API
  key, 384 dimensions. Chosen over `all-MiniLM-L6-v2` (the original pick) after that
  model's retrieval on this corpus turned out weak: it's tuned for symmetric
  sentence-similarity, not asymmetric query→passage retrieval, so short questions
  scored poorly against longer descriptive chunks and topically-unrelated chunks with
  overlapping vocabulary (e.g. "energy") outranked the right one. `multi-qa-MiniLM-L6-cos-v1`
  is trained specifically for question→passage retrieval and is the same size/dimension.
- **Chunk schema**: `id`, `section`, `title`, `text`, plus optional `url`.
- **Artifact output**: JSON containing text + metadata + embeddings, portable to any
  vector store.

### Chatbot behaviour

- System prompt frames it as Sandeep's portfolio assistant
- Answer **only** from retrieved context — no hallucinating credentials or projects
- On low retrieval confidence, say so and point to Sandeep's email rather than guessing
- Nice-to-have: page-awareness (e.g. prefill a suggested question based on the section in view)

---

## 8. Content source-of-truth rule

Write content **once**, use it twice: the same source files should feed both the
rendered static sections and the chunking/embedding pipeline. Never maintain two
copies — the chatbot must never contradict what's on the page.

---

## 9. Working preferences

- Go **step by step**. Don't dump the entire implementation at once.
- Don't invent metrics, motivations, or achievements that weren't stated.
- Several projects were built "just to practice" with no deeper motivation — that's
  fine and shouldn't be dressed up.
