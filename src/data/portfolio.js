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
  role: "Software Engineer Intern @ BriteAI",
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
    download: true,
  },
];

export const fileNames = files.map((f) => f.name);

export const nameToId = files.reduce((acc, f) => {
  if (!f.download) acc[f.name] = f.id;
  return acc;
}, {});

export const education = [
  {
    id: 1,
    institution: "Villanova University",
    university: "College of Engineering · Villanova, PA",
    degree: "B.S. in Computer Engineering",
    minor: "Minor: Computer Science & Cybersecurity",
    gpa: "GPA: 3.6 / 4.0",
    period: "2024 – May 2028",
    location: "Villanova, PA",
    icon: "🎓",
    extra:
      "Coursework: Analysis of Algorithms, Database Systems, Computer Networks, Web & Mobile Design, C++ Algorithms and Data Structures, Discrete Structures, Digital Systems, Signal Processing",
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
    icon: "🩺",
    accent: "#4ec9b0",
    type: "Full Stack · Multi-Agent AI · Winner",
    name: "ClinSync — RevolutionUC Winner",
    desc: "Clinical trial recruitment platform built with FastAPI, MongoDB, and React.js, orchestrating multi-agent AI workflows for automated eligibility screening and cutting patient–trial matching latency by 50%. Moved OCR client-side with Tesseract.js, dropping backend compute 15% and server-side exposure of sensitive health documents by 99%. Retrieval and reasoning run on ChromaDB + LangChain/LangGraph with Gemini-powered agents, improving trial-matching accuracy 20%.",
    tags: [
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
    id: 1,
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
    id: 2,
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
];

export const experience = [
  {
    date: "May 2026 – Present",
    current: true,
    role: "Software Engineer Intern",
    company: "BriteAI",
    location: "Mountain View, CA",
    bullets: [
      "Built a notification service using Java, Spring Boot, CockroachDB, and WebSocket/STOMP, supporting 3 notification workflows across 2 delivery channels: real-time in-app updates and email.",
      "Reduced RabbitMQ payload size by 93% (6 KB → 400 bytes/event) by sending events containing only IDs and metadata, while cutting preference lookups from 1,001 database queries to 2 for 1,000 subscribers.",
      "Added an in-memory cache for unread notification counts, reducing count lookup time from 20–50 ms to under 5 ms.",
      "Automated deployment of a Spring Boot service to Google Compute Engine, reducing deployment time by 75%, while securing internal APIs with HMAC-SHA256 and adding health checks for database pools and background workers.",
    ],
    tags: [
      "Java",
      "Spring Boot",
      "CockroachDB",
      "WebSocket/STOMP",
      "RabbitMQ",
      "Google Compute Engine",
      "HMAC-SHA256",
    ],
  },
  {
    date: "Oct 2025 – May 2026",
    current: false,
    role: "Software Engineer Intern",
    company: "Media Landscape (MeLa) Lab",
    location: "Villanova, PA",
    bullets: [
      "Built a Django REST and PostgreSQL analytics platform over 40M+ news articles, letting researchers compare coverage, temporal, linguistic, and stylistic media bias across 500+ outlets; optimized indexes to cut query latency 40% (2.5s → 1.5s).",
      "Architected an NLP pipeline using Kafka, Celery, and Redis, dividing workloads across parallel workers to increase throughput 4x (15K → 60K+ articles/day) and reduce batch processing time 80% (5h → 1h).",
      "Engineered 10+ automated Python data pipelines using spaCy and NLTK to process 60K+ articles daily from 500+ outlets, enabling high-volume feature extraction and analytics via 10 API endpoints.",
      "Built a BERTopic pipeline using Sentence Transformers, UMAP, and HDBSCAN to identify 17+ major news topics from 50K articles and enable scalable topic assignment across a 40M+ article corpus.",
    ],
    tags: [
      "Django REST",
      "PostgreSQL",
      "Kafka",
      "Celery",
      "Redis",
      "spaCy",
      "NLTK",
      "BERTopic",
    ],
  },
  {
    date: "Jun 2025 – Jul 2025",
    current: false,
    role: "Software Engineer Intern",
    company: "L3Harris Technologies",
    location: "Villanova, PA",
    bullets: [
      "Engineered a high-throughput image-processing pipeline using Python and OpenCV to convert 4K+ wind tunnel videos into 12K+ paired training images for an AI-based airfoil screening system.",
      "Improved compute efficiency through LoRA fine-tuning, adaptive batch sizing, and GPU memory footprint optimization, reducing training time 80% (10h → 2h) and infrastructure cost 70%.",
      "Launched an AI-driven aerodynamic screening service using FastAPI, MySQL, React, and Docker CI/CD, providing scalable on-demand airflow predictions and enabling 98% faster design iteration.",
    ],
    tags: ["Python", "OpenCV", "LoRA", "FastAPI", "MySQL", "React", "Docker"],
  },
];

export const heroStats = [
  ["3", "Internships"],
  ["4", "Projects"],
  ["↑", "Always Learning"],
];

export const readmeStack = [
  ["Languages", ["Python", "Java", "C/C++", "TypeScript", "SQL"]],
  ["Backend", ["Spring Boot", "FastAPI", "Django REST", "Express.js"]],
  ["Data", ["PostgreSQL", "CockroachDB", "MongoDB", "Redis", "Kafka"]],
  ["DevOps", ["Docker", "GCE", "Maven", "Flyway", "Git"]],
];

export const readmeBadges = [
  ["🐍", "Python", "#3572a5"],
  ["☕", "Java", "#f97316"],
  ["🌱", "Spring Boot", "#4ec9b0"],
  ["⚡", "FastAPI", "#22c55e"],
  ["🐘", "PostgreSQL", "#4fc1ff"],
];

export const aboutFocus = [
  ["🔭", "Building notification & delivery system at BriteAI"],
  ["🧠", "NLP pipelines over 40M+ document corpora"],
  ["🌱", "Currently exploring distributed systems & MLOps"],
  ["💬", "Talk to me about Java, Spring Boot, Python, APIs"],
  ["⚡", "Obsessed with latency, payload size, and query counts"],
  ["✨", "Always learning, always shipping"],
];

export const gitLog = [
  "a3f1c2e (HEAD → main) feat: cut RabbitMQ payload 6KB → 400B",
  "b7d4a1f perf: cache unread counts, 20-50ms → <5ms",
  "d1f8c4a chore: automate Spring Boot deploy to GCE",
  "e2a0b5c feat: Kafka + Celery workers, 15K → 60K articles/day",
];
