/* ─────────────────────────────────────────────────────────────
   All portfolio content lives here. Edit this file to update
   the site — every view reads from these exports.
   ───────────────────────────────────────────────────────────── */

export const RESUME_FILE = "/Hieu_Vo_Resume.pdf";

export const profile = {
  firstName: "Hieu",
  lastName: "Vo",
  // Shown in the hero avatar. Set to null to fall back to the initials.
  avatar: "/profile.jpg",
  initials: "HV",
  role: "Software Engineer Intern @ Sharedi.io",
  location: "Villanova, PA 🇺🇸",
  phone: "(484) 588-8415",
  email: "vongochieu2103@gmail.com",
  bio2: "Hi, Hieu here! I'm a Computer Engineering student at Villanova who likes systems that hold up under load — notification pipelines, NLP workers chewing through millions of articles, GPU jobs that used to take ten hours and now take two. I care about the numbers behind a change: payload sizes, query counts, p99s. Outside of that I'm usually reading about distributed systems, grinding LeetCode, or shipping something at a hackathon at 3am. Glad you're here!",
  links: {
    github: "https://github.com/jamesvo2103",
    linkedin: "https://www.linkedin.com/in/hieu-james-vo",
  },
};

export const taglines = [
  "Building backend systems that scale 🚀",
  "40M+ articles, 60K/day pipelines 🧠",
  "Java · Spring Boot · FastAPI · Django ⚡",
  "Cutting latency, payloads, and cost 📉",
  "Always learning, always shipping ✨",
];

export const files = [
  { id: "home", name: "home.tsx", folder: "src", lang: "TypeScript React" },
  { id: "about", name: "about.html", folder: "src", lang: "HTML" },
  { id: "projects", name: "projects.js", folder: "src", lang: "JavaScript" },
  { id: "skills", name: "skills.json", folder: "data", lang: "JSON" },
  { id: "experience", name: "experience.ts", folder: "src", lang: "TypeScript" },
  { id: "contact", name: "contact.css", folder: "src", lang: "CSS" },
  { id: "readme", name: "README.md", folder: "root", lang: "Markdown" },
  {
    id: "resume",
    name: "Hieu_Vo_Resume.pdf",
    folder: "root",
    lang: "PDF",
    // Opens in a new browser tab rather than rendering as an editor view.
    external: true,
  },
];

export const fileNames = files.map((f) => f.name);

export const nameToId = files.reduce((acc, f) => {
  if (!f.external) acc[f.name] = f.id;
  return acc;
}, {});

export const education = [
  {
    id: 1,
    institution: "Villanova University",
    university: "College of Engineering · Villanova, PA",
    degree: "B.S. in Computer Engineering",
    minor: "Minor: Computer Science",
    gpa: "GPA: 3.6 / 4.0",
    period: "2024 – May 2028",
    location: "Villanova, PA",
    icon: "🎓",
    extra:
      "Coursework: Data Structures & Algorithms, Web & Mobile Dev, Database Systems, Computer Architecture, Operating Systems, Computer Networks, Network Security, Signal Processing",
  },
  {
    id: 2,
    institution: "Honors & Awards",
    degree: "Dean's List — all terms",
    gpa: "RevolutionUC Hackathon Winner — Best Use of MongoDB Atlas",
    period: "2024 – Present",
    location: "",
    icon: "🏆",
  },
];

export const projects = [
  {
    id: 0,
    icon: "🧠",
    accent: "#c586c0",
    type: "Backend · Go · Developer Tools",
    name: "AI Coding Memory System",
    desc: "Persistent Go daemon and PostgreSQL backend that gives AI coding tools memory across sessions, using pgx connection pooling to serve multiple clients without per-command database initialization. PostgreSQL full-text search with weighted indexing and relevance ranking returns results with sub-second latency while capping retrieved context at 2,000 tokens. Automated PostgreSQL setup, Docker Compose startup, and migrations bring local setup under 5 minutes, with generated credentials and secure config permissions.",
    tags: ["Go", "PostgreSQL", "pgx", "Docker Compose", "golang-migrate"],
    link: "https://github.com/jamesvo2103",
    period: "2026",
  },
  {
    id: 1,
    icon: "🩺",
    accent: "#4ec9b0",
    type: "Full Stack · Multi-Agent AI · Winner",
    name: "ClinSync — Clinical Trial Matching",
    desc: "Clinical trial recruitment platform (RevolutionUC winner) built with Python, FastAPI, MongoDB, and React.js, orchestrating multi-agent AI workflows that cut patient–trial matching latency from 8s to 4s. Moved OCR client-side with Tesseract.js, replacing 5 MB patient-document uploads with 50 KB extracted-text payloads so raw documents never reach the backend. A retrieval and reasoning pipeline on ChromaDB + LangChain/LangGraph with Gemini-powered agents raised trial-matching accuracy from 65% to 78%.",
    tags: [
      "Python",
      "FastAPI",
      "MongoDB",
      "React.js",
      "Gemini API",
      "LangChain",
      "LangGraph",
      "ChromaDB",
      "Tesseract.js",
    ],
    link: "https://github.com/jamesvo2103",
    period: "2026",
  },
  {
    id: 2,
    icon: "🔧",
    accent: "#ff9d4b",
    type: "Backend · Multi-Agent AI · Node.js",
    name: "FixBuddy",
    desc: "AI-powered repair platform I led a team of 2 to build — modular backend services on Node.js, Express, and MongoDB that cut average API response time by 45%. A multi-agent architecture on Gemini API + LangChain separates item diagnosis from repair-instruction generation, improving reasoning consistency and reducing error rates 70%. RESTful API design and database indexing brought query latency down 35% under concurrent load.",
    tags: ["Node.js", "Express", "MongoDB", "Gemini API", "LangChain", "REST"],
    link: "https://github.com/jamesvo2103",
    period: "2025",
  },
  {
    id: 3,
    icon: "📄",
    accent: "#4fc1ff",
    type: "Full Stack · Next.js · Client-Side AI",
    name: "ResuMate",
    desc: "Full-stack resume analysis platform built with Next.js and React, using server-side rendering and optimized routing for low-latency page loads. Document processing runs entirely in the browser via Pyodide and PyPDF2, parsing PDFs client-side to cut backend workload and improve scalability. An AI chatbot on the Cerebras API (Llama 3) delivers real-time, personalized resume feedback through a chat interface.",
    tags: [
      "Next.js",
      "React",
      "Pyodide",
      "PyPDF2",
      "Cerebras API",
      "Llama 3",
    ],
    link: "https://github.com/jamesvo2103",
    demo: "https://resumate-blush.vercel.app/",
  },
];

export const skillGroups = [
  {
    group: "Languages",
    items: [
      { name: "Python", pct: 92, color: "#ff6fd8" },
      { name: "Java", pct: 88, color: "#f97316" },
      { name: "Go", pct: 78, color: "#00add8" },
      { name: "C / C++", pct: 82, color: "#38bdf8" },
      { name: "JavaScript", pct: 84, color: "#facc15" },
      { name: "TypeScript", pct: 78, color: "#38bdf8" },
      { name: "SQL", pct: 88, color: "#a855f7" },
      { name: "MATLAB", pct: 70, color: "#ef4444" },
    ],
  },
  {
    group: "Backend & APIs",
    items: [
      { name: "Spring Boot", pct: 88, color: "#22c55e" },
      { name: "FastAPI", pct: 90, color: "#34d399" },
      { name: "Django REST", pct: 86, color: "#22c55e" },
      { name: "Express.js", pct: 84, color: "#facc15" },
      { name: "Flask", pct: 78, color: "#6366f1" },
      { name: "WebSocket / STOMP", pct: 82, color: "#38bdf8" },
    ],
  },
  {
    group: "Distributed Systems & Messaging",
    items: [
      { name: "Kafka", pct: 84, color: "#a855f7" },
      { name: "RabbitMQ", pct: 86, color: "#f97316" },
      { name: "Celery", pct: 85, color: "#22c55e" },
      { name: "Redis", pct: 82, color: "#ef4444" },
      { name: "HikariCP", pct: 76, color: "#38bdf8" },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "PostgreSQL", pct: 88, color: "#38bdf8" },
      { name: "CockroachDB", pct: 80, color: "#6366f1" },
      { name: "MongoDB", pct: 86, color: "#22c55e" },
      { name: "MySQL", pct: 82, color: "#f97316" },
      { name: "ChromaDB", pct: 78, color: "#a855f7" },
    ],
  },
  {
    group: "AI · ML · NLP",
    items: [
      { name: "PyTorch", pct: 82, color: "#ef4444" },
      { name: "scikit-learn", pct: 85, color: "#facc15" },
      { name: "spaCy", pct: 86, color: "#22c55e" },
      { name: "NLTK", pct: 80, color: "#6366f1" },
      { name: "BERTopic / UMAP", pct: 80, color: "#a855f7" },
      { name: "OpenCV", pct: 84, color: "#34d399" },
    ],
  },
  {
    group: "LLM Engineering",
    items: [
      { name: "LangChain", pct: 86, color: "#34d399" },
      { name: "LangGraph", pct: 82, color: "#22c55e" },
      { name: "Multi-Agent Workflows", pct: 84, color: "#a855f7" },
      { name: "RAG Pipelines", pct: 82, color: "#38bdf8" },
      { name: "LoRA Fine-tuning", pct: 78, color: "#fbbf24" },
    ],
  },
  {
    group: "DevOps & Tools",
    items: [
      { name: "Docker", pct: 86, color: "#38bdf8" },
      { name: "Linux", pct: 84, color: "#facc15" },
      { name: "Google Compute Engine", pct: 82, color: "#facc15" },
      { name: "Git / GitHub", pct: 92, color: "#f97316" },
      { name: "Maven", pct: 80, color: "#ef4444" },
      { name: "Flyway", pct: 76, color: "#22c55e" },
      { name: "systemd / cron", pct: 80, color: "#a855f7" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", pct: 84, color: "#38bdf8" },
      { name: "Next.js", pct: 76, color: "#a855f7" },
      { name: "HTML / CSS", pct: 88, color: "#34d399" },
      { name: "Responsive Design", pct: 84, color: "#22c55e" },
    ],
  },
];

export const alsoFamiliar = [
  "pgx",
  "golang-migrate",
  "Docker Compose",
  "Tesseract.js",
  "Full-Text Search",
  "Sentence Transformers",
  "HDBSCAN",
  "Pyodide",
  "PyPDF2",
  "Cerebras API",
  "Server-Side Rendering",
  "HMAC-SHA256",
  "Postman",
  "CI/CD",
  "Connection Pooling",
  "Database Indexing",
  "Caching Strategies",
  "Health Checks",
  "Signal Processing",
  "Digital Systems",
  "Computer Networks",
  "Operating Systems",
  "Network Security",
];

export const experience = [
  {
    date: "May 2026 – Present",
    current: true,
    role: "Software Engineer Intern",
    company: "Sharedi.io",
    location: "Mountain View, CA",
    bullets: [
      "Architected a distributed notification engine using Java, Spring Boot, and CockroachDB, supporting 100K concurrent users while delivering real-time in-app updates via WebSocket with STOMP and email.",
      "Reduced RabbitMQ event payloads from 6 KB to 400 bytes by publishing only IDs and metadata, while batch-loading subscriber preferences to cut 1,001 database queries to 2 for 1,000 recipients.",
      "Engineered a distributed Redis caching layer for unread notification aggregates, cutting read latencies from 20–50 ms to under 5 ms under high concurrency.",
      "Automated deployment of the Spring Boot service to Google Compute Engine and added HMAC authentication, idempotent event processing, and service health checks.",
    ],
    tags: [
      "Java",
      "Spring Boot",
      "CockroachDB",
      "WebSocket/STOMP",
      "RabbitMQ",
      "Redis",
      "Google Compute Engine",
    ],
  },
  {
    date: "Oct 2025 – May 2026",
    current: false,
    role: "Software Engineer Intern",
    company: "Media Landscape (MeLa) Lab",
    location: "Villanova, PA",
    bullets: [
      "Built a Django REST and PostgreSQL analytics platform over 40M news articles, enabling researchers to compare media bias across 500+ outlets; optimized database indexes to reduce query latency from 2.5 to 1.5 seconds.",
      "Implemented a Kafka-based NLP pipeline with parallel Python workers, increasing ingestion from 15K to 60K articles/day and reducing batch processing time from 5 hours to 1 hour.",
      "Developed 10 automated Python data pipelines to process 60K articles daily from 500 outlets, transforming raw article data into structured features exposed through 10 REST API endpoints.",
      "Built a BERTopic-based processing pipeline over 50K articles to identify major news themes and support automated topic assignment across a 40M-article corpus for downstream analytics.",
    ],
    tags: ["Django REST", "PostgreSQL", "Kafka", "Python", "BERTopic", "NLP"],
  },
  {
    date: "Jun 2025 – Jul 2025",
    current: false,
    role: "Software Engineer Intern",
    company: "L3Harris Technologies",
    location: "Bryn Mawr, PA",
    bullets: [
      "Engineered a high-throughput image-processing workflow using Python and OpenCV to convert 4K wind tunnel videos into 12K paired training images for an AI-based airfoil screening system.",
      "Optimized a GPU-based model training pipeline through adaptive batch sizing and memory management, reducing training time from 10 hours to 2 hours.",
      "Developed a containerized aerodynamic screening service using FastAPI, MySQL, and Docker, exposing model predictions through backend APIs for on-demand airfoil evaluation.",
    ],
    tags: ["Python", "OpenCV", "FastAPI", "MySQL", "Docker"],
  },
];

export const heroStats = [
  ["3", "Internships"],
  ["4", "Projects"],
  ["↑", "Always Learning"],
];

export const readmeStack = [
  ["Languages", ["Python", "Java", "Go", "C/C++", "TypeScript", "SQL"]],
  ["Backend", ["Spring Boot", "FastAPI", "Django REST", "Express.js"]],
  ["Data", ["PostgreSQL", "CockroachDB", "MongoDB", "Redis", "Kafka", "RabbitMQ"]],
  ["DevOps", ["Docker", "GCE", "Linux", "Git"]],
];

export const readmeBadges = [
  ["🐍", "Python", "#3572a5"],
  ["☕", "Java", "#f97316"],
  ["🌱", "Spring Boot", "#4ec9b0"],
  ["⚡", "FastAPI", "#22c55e"],
  ["🐘", "PostgreSQL", "#4fc1ff"],
];

export const aboutFocus = [
  ["🔭", "Building a distributed notification engine at Sharedi.io"],
  ["🧠", "NLP pipelines over a 40M-article corpus"],
  ["🌱", "Currently exploring distributed systems & MLOps"],
  ["💬", "Talk to me about Java, Spring Boot, Python, APIs"],
  ["⚡", "Obsessed with latency, payload size, and query counts"],
  ["✨", "Always learning, always shipping"],
];

export const gitLog = [
  "a3f1c2e (HEAD → main) feat: cut RabbitMQ payload 6KB → 400B",
  "b7d4a1f perf: Redis cache for unread counts, 20-50ms → <5ms",
  "d1f8c4a chore: automate Spring Boot deploy to GCE",
  "e2a0b5c feat: Kafka NLP workers, 15K → 60K articles/day",
];
