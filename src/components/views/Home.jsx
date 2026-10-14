import { profile, taglines, heroStats } from "../../data/portfolio";
import { useTypewriter } from "../../hooks";
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "../icons";

const ROLES = [
  ["#4ec9b0", "Backend Engineer"],
  ["#c586c0", "Distributed Systems"],
  ["#4fc1ff", "AI / ML Dev"],
];

export default function Home({ onNavigate }) {
  const typed = useTypewriter(taglines);

  const links = [
    { icon: <GithubIcon />, label: "GitHub", href: profile.links.github, color: "#e6edf3" },
    {
      icon: <LinkedinIcon />,
      label: "LinkedIn",
      href: profile.links.linkedin,
      color: "#0a66c2",
    },
    {
      icon: <MailIcon />,
      label: "Email",
      href: `mailto:${profile.email}`,
      color: "#4ec9b0",
    },
    {
      icon: <PhoneIcon />,
      label: profile.phone,
      href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
      color: "#dcdcaa",
    },
  ];

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <p className="text-xs text-vscode-green mb-2.5 opacity-0 animate-su-1">
          // hello world !! Welcome to my portfolio
        </p>

        <div className="flex items-center gap-4 mb-3.5 opacity-0 animate-su-2">
          <h1
            className="font-display font-extrabold leading-none text-vscode-bright tracking-[-2.5px]"
            style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
          >
            {profile.firstName}
            <br />
            <em className="not-italic text-vscode-pink relative">
              {profile.lastName}
              <span className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-gradient-to-r from-vscode-pink to-transparent" />
            </em>
          </h1>

          <div className="home-avatar flex-shrink-0">
            <div className="avatar-ring">
              {profile.avatar ? (
                <img
                  className="avatar-img"
                  src={profile.avatar}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                profile.initials
              )}
            </div>
            <div className="avatar-glow" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 opacity-0 animate-su-3">
          {ROLES.map(([color, label]) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs border border-white/10 rounded-sm bg-white/[0.03] hover:border-white/20 transition-colors"
            >
              <span
                className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                style={{ background: color }}
              />
              {label}
            </div>
          ))}
          <div className="chip-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-sm">
            <span className="w-[7px] h-[7px] rounded-full bg-vscode-pink flex-shrink-0" />
            @ Sharedi.io
          </div>
        </div>

        <p className="text-sm text-vscode-dim mb-5 min-h-[25px] opacity-0 animate-su-3">
          {typed}
          <span className="text-vscode-pink animate-blink">|</span>
        </p>

        <p className="text-[14px] text-vscode-dim leading-[1.9] max-w-[520px] mb-7 opacity-0 animate-su-4">
          Computer Engineering @ Villanova. I build{" "}
          <strong className="text-vscode-blue font-medium">backend services</strong>,{" "}
          <strong className="text-vscode-blue font-medium">data pipelines</strong>, and{" "}
          <strong className="text-vscode-blue font-medium">ML systems</strong> — and I
          measure them in{" "}
          <strong className="text-vscode-blue font-medium">
            milliseconds, bytes, and query counts
          </strong>
          .
        </p>

        <div className="flex gap-2.5 flex-wrap opacity-0 animate-su-5">
          <button
            onClick={() => onNavigate("projects")}
            className="inline-flex items-center gap-2 px-5 py-2 bg-vscode-blue2 text-white text-xs font-mono rounded-sm hover:opacity-85 transition-opacity"
          >
            📁 Projects
          </button>
          <button
            onClick={() => onNavigate("experience")}
            className="inline-flex items-center gap-2 px-5 py-2 border border-white/14 text-vscode-text text-xs font-mono rounded-sm hover:border-white/35 transition-colors"
          >
            💼 Experience
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 px-5 py-2 border border-white/14 text-vscode-text text-xs font-mono rounded-sm hover:border-white/35 transition-colors"
          >
            ✉ Contact
          </button>
        </div>

        <div className="grid grid-cols-4 gap-px mt-12 border border-vscode-border rounded overflow-hidden opacity-0 animate-su-6">
          {heroStats.map(([value, label]) => (
            <div
              key={label}
              className="px-4 py-4 bg-white/[0.02] text-center hover:bg-white/[0.04] transition-colors"
            >
              <span className="font-display text-[22px] font-extrabold text-vscode-bright block mb-0.5">
                {value}
              </span>
              <span className="text-[10px] text-vscode-dim uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6 flex-wrap opacity-0 animate-su-7">
          {links.map(({ icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-vscode-border rounded-sm text-vscode-dim text-xs transition-all no-underline"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color + "66";
                e.currentTarget.style.color = "var(--bright)";
                e.currentTarget.style.background = color + "15";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.color = "";
                e.currentTarget.style.background = "";
              }}
            >
              <span
                style={{ color, display: "flex", alignItems: "center", flexShrink: 0 }}
              >
                {icon}
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
