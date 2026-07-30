import { useState, useEffect } from "react";
import { files, profile } from "../data/portfolio";
import { fileIcons, BranchIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import { themes } from "../hooks";
import { openResume } from "../lib/resume";

const SHORTCUTS = [
  ["Ctrl+P", "Command palette"],
  ["Ctrl+B", "Toggle sidebar"],
  ["Ctrl+`", "Toggle terminal"],
  ["Esc", "Close overlay"],
  ["↑ / ↓", "Terminal history"],
];

const LINKS = [
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
];

function IconBtn({ children, onClick, title, active = false }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-7 h-7 flex items-center justify-center rounded transition-colors"
      style={{
        color: active ? "var(--bright)" : "rgba(255,255,255,0.4)",
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
      }}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="px-5 pt-3 pb-1.5 text-[10px] font-bold tracking-[0.15em] uppercase"
      style={{ color: "var(--dim)" }}
    >
      {children}
    </div>
  );
}

function Sep() {
  return <div className="mx-4 my-1" style={{ borderTop: "1px solid var(--border)" }} />;
}

export default function MobileDrawer({
  activeFile,
  onNavigate,
  onClose,
  themeId,
  onThemeChange,
  onToggleCopilot,
}) {
  const [view, setView] = useState("explorer");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pick = (f) => {
    if (f.external) {
      openResume();
      onClose();
      return;
    }
    onNavigate(f.id);
    onClose();
  };

  const openCopilot = () => {
    onToggleCopilot?.();
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col"
        style={{
          width: "260px",
          background: "var(--bg2)",
          borderRight: "1px solid var(--border)",
          boxShadow: "8px 0 32px rgba(0,0,0,0.5)",
          animation: "slideInLeft 0.22s ease",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--bg3)" }}
        >
          <span
            className="text-[11px] font-bold tracking-[0.15em] uppercase"
            style={{ color: "var(--dim)" }}
          >
            {view === "explorer" ? "Explorer" : "Settings"}
          </span>
          <div className="flex items-center gap-1">
            <IconBtn
              active={view === "settings"}
              title="Settings"
              onClick={() => setView((v) => (v === "settings" ? "explorer" : "settings"))}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </IconBtn>
            <IconBtn onClick={onClose} title="Close">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </IconBtn>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto thin-scroll">
          {view === "explorer" && (
            <>
              <div
                className="px-4 py-2 text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: "var(--dim)" }}
              >
                📁 hieu-vo
              </div>
              <div className="pb-2">
                {files.map((f) => {
                  const Icon = fileIcons[f.id];
                  const active = activeFile === f.id && !f.external;
                  const isExternal = !!f.external;
                  return (
                    <button
                      key={f.id}
                      onClick={() => pick(f)}
                      className="w-full flex items-center gap-2.5 px-6 py-2.5 text-xs text-left border-l-2 transition-all group"
                      style={{
                        color: active ? "var(--bright)" : "var(--dim)",
                        background: active ? "rgba(255,255,255,0.07)" : "transparent",
                        borderLeftColor: active ? "var(--blue2)" : "transparent",
                      }}
                    >
                      {Icon && (
                        <span className="flex-shrink-0">
                          <Icon />
                        </span>
                      )}
                      <span className="flex-1">{f.name}</span>
                      {active && (
                        <span className="text-[9px]" style={{ color: "var(--blue2)" }}>
                          ●
                        </span>
                      )}
                      {isExternal && <span className="text-[11px]">↗</span>}
                    </button>
                  );
                })}
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={openCopilot}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs rounded-md transition-all"
                  style={{
                    color: "var(--dim)",
                    background: "rgba(110,64,201,0.07)",
                    border: "1px solid rgba(110,64,201,0.2)",
                    textAlign: "left",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9370db"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
                  </svg>
                  <span className="flex-1">Ask Hieu's Copilot</span>
                  <span className="text-[10px]" style={{ color: "var(--dim)" }}>
                    AI
                  </span>
                </button>
              </div>
            </>
          )}

          {view === "settings" && (
            <div className="py-2">
              <div className="px-4 pt-3 pb-2">
                <button
                  onClick={openCopilot}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] rounded-md transition-all"
                  style={{
                    color: "#b48eff",
                    background: "rgba(110,64,201,0.1)",
                    border: "1px solid rgba(110,64,201,0.25)",
                    textAlign: "left",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b48eff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
                  </svg>
                  <span className="flex-1 font-medium">Open Hieu's Copilot</span>
                  <span
                    className="text-[10px]"
                    style={{ color: "rgba(180,142,255,0.55)" }}
                  >
                    AI ✨
                  </span>
                </button>
              </div>

              <Sep />
              <SectionLabel>🎨 Color Theme</SectionLabel>
              {themes.map((t) => {
                const on = t.id === themeId;
                return (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange?.(t.id)}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-left transition-colors border-l-2 cursor-pointer"
                    style={{
                      background: on ? "rgba(255,255,255,0.07)" : "transparent",
                      color: on ? "var(--bright)" : "var(--text)",
                      borderColor: on ? t.accent : "transparent",
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{
                        background: t.accent,
                        boxShadow: `0 0 0 2px ${t.accent}44`,
                      }}
                    />
                    <span className="flex-1">
                      {t.icon} {t.name}
                    </span>
                    {on && (
                      <span className="text-[11px]" style={{ color: t.accent }}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}

              <Sep />
              <SectionLabel>⌨️ Keyboard Shortcuts</SectionLabel>
              {SHORTCUTS.map(([key, desc]) => (
                <div key={key} className="flex items-center gap-3 px-5 py-1.5">
                  <kbd
                    className="text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "var(--border)",
                      color: "var(--yellow)",
                    }}
                  >
                    {key}
                  </kbd>
                  <span className="text-[12px]" style={{ color: "var(--dim)" }}>
                    {desc}
                  </span>
                </div>
              ))}

              <Sep />
              <SectionLabel>🌐 Links</SectionLabel>
              {LINKS.map(({ icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 text-[13px] no-underline transition-all"
                  style={{ color: "var(--dim)" }}
                >
                  <span
                    style={{
                      color,
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </span>
                  <span className="flex-1">{label}</span>
                  <span className="text-[11px] opacity-40">↗</span>
                </a>
              ))}

              <Sep />
              <div className="px-5 py-3">
                <p className="text-[11px] mb-1" style={{ color: "var(--dim)" }}>
                  Portfolio v1.0 · React + Vite + Tailwind
                </p>
                <p className="text-[11px]" style={{ color: "var(--dim)" }}>
                  Made with 🌊 by{" "}
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--blue)" }}
                  >
                    Hieu Vo
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        <div
          className="px-4 py-3 flex items-center gap-2 text-[11px] flex-shrink-0"
          style={{ borderTop: "1px solid var(--border)", color: "var(--dim)" }}
        >
          <BranchIcon size={13} width="2" />
          <span style={{ color: "var(--text)" }}>⎇ main</span>
          <span className="ml-auto" style={{ color: "var(--gcm)" }}>
            ↑1
          </span>
        </div>
      </div>
    </>
  );
}
