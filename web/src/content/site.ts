// Site display copy. Source of truth: CLAUDE.md sections 4-5.
// This is the *display* voice (first person, card-formatted) — distinct from
// the third-person RAG corpus in content/chunks.json at the repo root (see
// CLAUDE.md section 6 for why display and embedded text can differ).

export const nav = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  name: "Sandeep Kumar",
  tagline: "AI/ML engineer building AI agents.",
};

export const about = {
  paragraphs: [
    "I'm an AI/ML engineer focused on building AI agents. What keeps me in this field is how fast it moves — I like learning something new, using it to build something, and then doing it all over again the next day. Most of my projects start that way: I pick up a technique, then find an excuse to put it to work.",
    "I approach my work in an organized way, but I stay flexible and adapt as things change — which tends to be often in this space.",
    "I'm currently looking for full-time opportunities where I can build production-grade AI systems.",
  ],
};

export const education = [
  {
    degree: "M.Sc. Data Science",
    school: "Monash University, Melbourne",
    period: "2024–2026",
    detail: "Graduated with Distinction",
  },
  {
    degree: "B.Tech Information Technology",
    school: "Manipal University, Jaipur",
    period: "2020–2024",
    detail: "8.56 CGPA",
  },
];

export const publications = [
  {
    title:
      "A Comprehensive Survey on Role of Artificial Intelligence in Solar Energy Processes",
    description:
      "A review paper examining how AI techniques are applied across solar energy processes, published at the 2022 IEEE 7th International Conference for Convergence in Technology (I2CT). Co-authored with classmates and faculty during my bachelor's.",
    doi: "10.1109/I2CT54291.2022.9824314",
    url: "https://doi.org/10.1109/I2CT54291.2022.9824314",
  },
];

export const flagshipProjects = [
  {
    id: "fieldmedic",
    name: "FieldMedic — AI Clinical Decision Support System",
    summary:
      "An end-to-end RAG-based triage assistant that retrieves relevant medical knowledge and generates structured, safety-checked recommendations. Built with FastAPI, Streamlit, PostgreSQL (pgvector), and Gemini.",
    long: "FieldMedic is a clinical decision support system that combines semantic retrieval with LLM reasoning to help with medical triage. It uses Sentence Transformers to embed and chunk over 300 medical knowledge documents, stores them in PostgreSQL with pgvector for semantic search, and retrieves the most relevant context for a given query. On top of retrieval, an agent pipeline combines the retrieved knowledge with LLM reasoning (Gemini) and a layer of safety rules to produce structured triage recommendations — rather than free-form, unconstrained output. The system is containerized with Docker Compose across three services and exposes four REST API endpoints.",
    githubUrl: "https://github.com/SandeepKr24/FieldMedic",
    status: "not-hosted" as const,
  },
  {
    id: "smart-grid-finetuning",
    name: "LLM Fine-Tuning Pipeline for Smart Grid Incident Analysis",
    summary:
      "Fine-tuned LLaMA-2 with LoRA for outage classification on smart-grid incident records, with a full training, evaluation, and inference pipeline built on HuggingFace and vLLM.",
    long: "This project fine-tunes LLaMA-2 using LoRA (via HuggingFace PEFT) on a large set of smart-grid incident records to classify outage types. It covers the full pipeline end-to-end: preprocessing and annotation of the incident data, training and evaluation with HuggingFace, and a FastAPI inference service deployed with vLLM for efficient serving. The project was built to apply and practice LLM fine-tuning techniques — parameter-efficient tuning, dataset preparation, and production-style deployment — on a real-world structured-data classification task outside the usual chatbot/text-generation use case. Currently unavailable while I work on fixing unexpected problems.",
    githubUrl: null,
    status: "unavailable" as const,
  },
  {
    id: "agentic-energy",
    name: "Agentic AI Workflow for Energy Consumption Analytics",
    summary:
      "A LangChain-based AI agent for querying and analyzing energy consumption data, using tool-calling for dynamic SQL execution and anomaly detection.",
    long: "This project built a LangChain-based agent to query and analyze energy consumption datasets, using tool-calling pipelines to dynamically generate and execute SQL queries and detect anomalies in the data. It also automated sustainability reporting workflows that would otherwise require manual analysis. Currently unavailable while I work on fixing unexpected problems.",
    githubUrl: null,
    status: "unavailable" as const,
  },
];

export const miniProjects = [
  {
    name: "Train Ticket Details Extractor",
    summary:
      "Extracts key details from train ticket photos or PDFs and saves them as structured JSON.",
    githubUrl: "https://github.com/SandeepKr24/ticket_details_extractor",
  },
  {
    name: "English-to-Hinglish Translator",
    summary:
      "A Python tool that translates between English and Hinglish in both directions.",
    githubUrl: "https://github.com/SandeepKr24/eng_2_hing",
  },
  {
    name: "Photo Scraper",
    summary:
      "Downloads a specified number of images from Google Image Search based on a keyword.",
    githubUrl: "https://github.com/SandeepKr24/PhotoScraper",
  },
  {
    name: "Binary Image Classification Model",
    summary:
      "A binary image classifier built from scratch as a hands-on exercise in core ML fundamentals.",
    githubUrl: "https://github.com/SandeepKr24/Image-Classification",
  },
];

export const skills = [
  { category: "Programming", tags: ["Python", "SQL"] },
  {
    category: "Machine Learning & LLMs",
    tags: [
      "Scikit-learn",
      "TensorFlow",
      "NLP",
      "Transformers",
      "LLM Fine-Tuning (LoRA, QLoRA, PEFT)",
      "HuggingFace Transformers",
      "Model Evaluation (ROUGE, BLEU)",
    ],
  },
  {
    category: "Generative AI",
    tags: [
      "LangChain",
      "Langflow",
      "LLMs",
      "Prompt-Engineering",
      "GPT",
      "RAG Pipelines",
      "Agentic AI Systems",
      "LLM Tool-Calling",
    ],
  },
  { category: "Data Engineering", tags: ["Apache Spark", "Databricks"] },
  {
    category: "Infrastructure / CI-CD",
    tags: ["AWS", "Docker", "Git", "GitHub Actions", "Jenkins"],
  },
  {
    category: "Backend & Deployment",
    tags: ["FastAPI", "REST APIs", "vLLM", "Model Inference Optimization"],
  },
  {
    category: "Databases & Storage",
    tags: [
      "PostgreSQL",
      "pgvector",
      "Delta Lake",
      "Iceberg",
      "Qdrant",
      "Pinecone",
    ],
  },
  {
    category: "Analytics & BI",
    tags: ["Power BI", "Tableau", "Microsoft Excel"],
  },
];

export const hobbies = {
  paragraph:
    "Outside of work, I'm usually gaming — mostly FIFA and racing titles. Sim racing is the one I'm most into; I don't have a proper sim setup yet, so I get my fix at gaming cafés when I can. I also run an Instagram account where I post virtual car photography from games like Forza Horizon, Gran Turismo, and Assetto Corsa — @clicks.waz24.",
  instagramHandle: "@clicks.waz24",
  instagramUrl: "https://instagram.com/clicks.waz24",
};

export const contact = {
  email: "sandeep.workmail24@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/sandeep-24-au/",
  githubUrl: "https://github.com/SandeepKr24",
  instagramUrl: "https://instagram.com/clicks.waz24",
};
