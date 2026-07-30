import {
  profile,
  experience,
  projects,
  skillGroups,
  education,
} from "../data/portfolio";

/* Offline answer engine. The chat UI first tries POST /api/chat so a real
   LLM backend can be dropped in later; if none exists, it falls back here. */

const bulletList = (items) => items.map((i) => `- ${i}`).join("\n");

const intro = () =>
  `**${profile.firstName} ${profile.lastName}** — ${profile.role}, based in ${profile.location}.

He's a Computer Engineering student at Villanova University (minor in Computer Science & Cybersecurity, GPA 3.6) graduating **May 2028**, and he's done three software engineering internships so far.

What he actually works on:
${bulletList([
  "**Backend services** — Java/Spring Boot, FastAPI, Django REST, Express",
  "**Distributed data pipelines** — Kafka, Celery, RabbitMQ, Redis",
  "**Applied ML/NLP** — spaCy, NLTK, BERTopic, PyTorch, OpenCV",
])}

Ask me about his experience, projects, tech stack, or how to reach him.`;

const experienceAnswer = () =>
  `${profile.firstName} has had **three software engineering internships**:

${experience
  .map(
    (job, i) =>
      `**${i + 1}. ${job.role} @ ${job.company}** — ${job.date}${
        job.location ? ` · ${job.location}` : ""
      }
${bulletList(job.bullets)}`,
  )
  .join("\n\n")}`;

const projectsAnswer = () =>
  `Here are the projects on his résumé:

${projects
  .map(
    (p) => `**${p.name}** ${p.icon} — *${p.type}*
${p.desc}
\`${p.tags.join("` · `")}\``,
  )
  .join("\n\n")}`;

const skillsAnswer = () =>
  `His tech stack, grouped:

${skillGroups
  .map((g) => `**${g.group}:** ${g.items.map((i) => i.name).join(", ")}`)
  .join("\n")}`;

const educationAnswer = () =>
  `**Education**

${education
  .map(
    (e) =>
      `${e.icon} **${e.institution}** — ${e.period}
${e.degree}${e.minor ? `\n${e.minor}` : ""}
${e.gpa}${e.extra ? `\n\n${e.extra}` : ""}`,
  )
  .join("\n\n")}`;

const contactAnswer = () =>
  `Easiest ways to reach ${profile.firstName}:

${bulletList([
  `**Email** — ${profile.email}`,
  `**Phone** — ${profile.phone}`,
  `**LinkedIn** — ${profile.links.linkedin}`,
  `**GitHub** — ${profile.links.github}`,
])}

He's open to internships, new grad roles, and collaborations.`;

const impactAnswer = () =>
  `Some numbers he's shipped:

${bulletList([
  "**93%** smaller RabbitMQ payloads (6 KB → 400 bytes/event)",
  "**1,001 → 2** database queries for 1,000-subscriber preference lookups",
  "**20–50 ms → <5 ms** unread-notification count lookups (in-memory cache)",
  "**75%** faster deployments (automated Spring Boot → Google Compute Engine)",
  "**4x** NLP throughput (15K → 60K+ articles/day via Kafka + Celery + Redis)",
  "**80%** shorter batch processing (5h → 1h) and **40%** lower query latency (2.5s → 1.5s)",
  "**80%** shorter GPU training (10h → 2h) and **70%** lower infra cost via LoRA fine-tuning",
  "**98%** faster design iteration on the L3Harris airfoil screening service",
])}`;

const currentAnswer = () => {
  const job = experience[0];
  return `Right now he's a **${job.role} at ${job.company}** (${job.date}${
    job.location ? `, ${job.location}` : ""
  }).

${bulletList(job.bullets)}

Stack: \`${job.tags.join("` · `")}\``;
};

const resumeAnswer = () =>
  `The PDF opens in a new browser tab — a few ways to get there:

${bulletList([
  "Click **Hieu_Vo_Resume.pdf** in the explorer sidebar",
  "Use the **document icon** in the activity bar on the left",
  "**File → View Resume** in the menu bar",
])}

Your browser can still save it from there if you want a local copy.`;

const RULES = [
  {
    keys: ["experience", "work", "intern", "job", "career", "employ", "britea", "mela", "l3harris", "harris"],
    answer: experienceAnswer,
  },
  { keys: ["project", "built", "build", "clinsync", "fixbuddy", "hackathon", "ship"], answer: projectsAnswer },
  {
    keys: ["skill", "stack", "tech", "language", "framework", "tool", "know", "database", "kafka", "spring", "python", "java"],
    answer: skillsAnswer,
  },
  {
    keys: ["education", "school", "university", "college", "villanova", "degree", "gpa", "graduat", "major", "minor", "course"],
    answer: educationAnswer,
  },
  { keys: ["contact", "reach", "email", "hire", "phone", "linkedin", "github", "connect"], answer: contactAnswer },
  {
    keys: ["impact", "metric", "number", "result", "achiev", "optimi", "improve", "performance", "latency", "faster", "reduce"],
    answer: impactAnswer,
  },
  { keys: ["current", "now", "doing", "today", "present"], answer: currentAnswer },
  { keys: ["resume", "cv", "download", "pdf"], answer: resumeAnswer },
  { keys: ["who", "about", "tell me", "yourself", "himself", "background", "intro", "hieu"], answer: intro },
];

const FALLBACK = `I answer from ${profile.firstName}'s résumé, so I'm best on these:

${bulletList([
  "**Experience** — his three internships and what he built at each",
  "**Projects** — ClinSync and FixBuddy",
  "**Skills** — languages, backend, data, ML, DevOps",
  "**Education** — Villanova, coursework, honors",
  "**Impact** — the concrete numbers he moved",
  "**Contact** — how to reach him",
])}

Try one of those, or email him directly at ${profile.email}.`;

/** Pick the best canned answer for a question. */
export function answerLocally(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const rule of RULES) {
    const score = rule.keys.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0);
    if (score > bestScore) {
      bestScore = score;
      best = rule;
    }
  }

  return best ? best.answer() : FALLBACK;
}

/** Try a real backend first; fall back to the local engine. */
export async function askCopilot(messages, signal) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    if (res.ok) {
      const json = await res.json();
      const text = json?.choices?.[0]?.message?.content;
      if (text) return text;
    }
  } catch (err) {
    if (err.name === "AbortError") throw err;
  }

  const last = messages[messages.length - 1]?.content ?? "";
  // Small delay so the typing indicator reads naturally.
  await new Promise((r) => setTimeout(r, 420));
  return answerLocally(last);
}
