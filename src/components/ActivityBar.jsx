import { useState, useRef } from "react";
import { Flyout, FlyoutHeader, FlyoutSection, FlyoutSep } from "./Menu";
import {
  ExplorerIcon,
  SearchIcon,
  BranchIcon,
  GearIcon,
  DownloadIcon,
  SparkleIcon,
} from "./icons";
import { themes } from "../hooks";
import { profile } from "../data/portfolio";
import { downloadResume } from "../lib/resume";

const SHORTCUTS = [
  ["Ctrl P", "Go to file (command palette)"],
  ["Ctrl `", "Toggle terminal"],
  ["Ctrl B", "Toggle sidebar"],
  ["Esc", "Close overlay"],
  ["↑ / ↓", "Terminal history"],
];

function ActBtn({ icon, title, active = false, onClick }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`relative w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 cursor-pointer border-none outline-none ${
        active
          ? "text-white ab-active"
          : "text-white/40 hover:text-white/85 hover:bg-white/[0.05]"
      }`}
    >
      {icon}
    </button>
  );
}

export default function ActivityBar({
  sidebarOpen,
  onToggleSidebar,
  onOpenCmd,
  onToggleTerm,
  themeId,
  onThemeChange,
  copilotOpen,
  onToggleCopilot,
  mobile = false,
}) {
  const [scmOpen, setScmOpen] = useState(false);
  const [setOpen, setSetOpen] = useState(false);
  const scmRef = useRef(null);
  const setRef = useRef(null);

  const cls = mobile
    ? "bg-vscode-bg3 flex flex-row items-center justify-around px-2 py-1 border-b border-vscode-border"
    : "bg-vscode-bg4 flex flex-col items-center pt-1 border-r border-vscode-border gap-0.5";

  const quickActions = [
    {
      icon: "🔍",
      label: "Command Palette",
      hint: "Ctrl+P",
      action: () => {
        onOpenCmd?.();
        setSetOpen(false);
      },
    },
    {
      icon: "📟",
      label: "Toggle Terminal",
      hint: "Ctrl+`",
      action: () => {
        onToggleTerm?.();
        setSetOpen(false);
      },
    },
    {
      icon: "✨",
      label: "Copilot Chat",
      hint: "",
      action: () => {
        onToggleCopilot?.();
        setSetOpen(false);
      },
    },
    {
      icon: "📄",
      label: "Download Resume",
      hint: "",
      action: () => {
        downloadResume();
        setSetOpen(false);
      },
    },
    {
      icon: "🖥️",
      label: "Toggle Fullscreen",
      hint: "F11",
      action: () => {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.();
        setSetOpen(false);
      },
    },
  ];

  return (
    <div style={mobile ? {} : { gridArea: "act" }} className={cls}>
      <ActBtn
        icon={<ExplorerIcon />}
        title="Explorer"
        active={sidebarOpen && !mobile}
        onClick={onToggleSidebar}
      />
      <ActBtn icon={<SearchIcon />} title="Search (Ctrl+P)" onClick={onOpenCmd} />

      <div ref={scmRef} className="relative">
        <ActBtn
          icon={<BranchIcon />}
          title="Source Control"
          active={scmOpen}
          onClick={() => setScmOpen((v) => !v)}
        />
        <Flyout anchorRef={scmRef} open={scmOpen} onClose={() => setScmOpen(false)}>
          <FlyoutHeader>Source Control</FlyoutHeader>
          <div
            className="px-3 py-2.5 flex items-center gap-2"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="2"
            >
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="12" r="3" />
              <path d="M6 9v6M9 12h6" />
            </svg>
            <span className="text-[12px] text-vscode-text font-medium">main</span>
            <span className="ml-auto text-[11px]" style={{ color: "var(--gcm)" }}>
              ↑ 1 commit ahead
            </span>
          </div>
          <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
            {[
              ["3", "Modified", "#ce9178"],
              ["1", "Added", "#4ec9b0"],
              ["0", "Deleted", "#f44747"],
            ].map(([n, label, color]) => (
              <div key={label} className="flex-1 py-2 text-center">
                <div className="text-[14px] font-bold" style={{ color }}>
                  {n}
                </div>
                <div className="text-[9px] text-vscode-dim">{label}</div>
              </div>
            ))}
          </div>
          <div className="px-3 py-2 mt-1">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] hover:opacity-75 transition-opacity"
              style={{ color: "var(--blue)" }}
            >
              View on GitHub ↗
            </a>
          </div>
        </Flyout>
      </div>

      <ActBtn
        icon={<DownloadIcon />}
        title="Download Resume"
        onClick={downloadResume}
      />
      <ActBtn
        icon={<SparkleIcon />}
        title="Hieu's Copilot Chat"
        active={copilotOpen}
        onClick={onToggleCopilot}
      />

      {!mobile && <div className="flex-1" />}

      <div ref={setRef} className="relative" style={mobile ? {} : { marginBottom: 4 }}>
        <ActBtn
          icon={<GearIcon />}
          title="Settings"
          active={setOpen}
          onClick={() => setSetOpen((v) => !v)}
        />
        <Flyout anchorRef={setRef} open={setOpen} onClose={() => setSetOpen(false)}>
          <FlyoutHeader>Settings</FlyoutHeader>
          <FlyoutSection>🎨 Color Theme</FlyoutSection>
          {themes.map((t) => {
            const on = t.id === themeId;
            return (
              <button
                key={t.id}
                onClick={() => onThemeChange?.(t.id)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-[12px] transition-colors border-l-2 cursor-pointer"
                style={{
                  background: on ? "rgba(255,255,255,0.08)" : "transparent",
                  color: on ? "var(--bright)" : "var(--text)",
                  borderColor: on ? t.accent : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!on) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!on) e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ background: t.accent, boxShadow: `0 0 0 2px ${t.accent}44` }}
                />
                <span className="flex-1">
                  {t.icon} {t.name}
                </span>
                {on && (
                  <span className="text-[10px]" style={{ color: t.accent }}>
                    ✓
                  </span>
                )}
              </button>
            );
          })}

          <FlyoutSep />
          <FlyoutSection>⚡ Quick Actions</FlyoutSection>
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={a.action}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-[12px] transition-colors"
              style={{ color: "var(--text)", background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span className="w-4 text-center flex-shrink-0">{a.icon}</span>
              <span className="flex-1">{a.label}</span>
              {a.hint && <span className="text-[10px] text-vscode-dim">{a.hint}</span>}
            </button>
          ))}

          <FlyoutSep />
          <FlyoutSection>⌨️ Keyboard Shortcuts</FlyoutSection>
          {SHORTCUTS.map(([key, desc]) => (
            <div key={key} className="flex items-center gap-3 px-3 py-1.5">
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderColor: "var(--border)",
                  color: "var(--yellow)",
                }}
              >
                {key}
              </kbd>
              <span className="text-[11px] text-vscode-dim">{desc}</span>
            </div>
          ))}

          <FlyoutSep />
          <div className="px-3 py-3">
            <p className="text-[11px] mb-1 text-vscode-dim">
              Portfolio v1.0 · React + Vite + Tailwind
            </p>
            <p className="text-[11px] text-vscode-dim">
              Made with 🌊 by{" "}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--blue)" }}
                className="hover:opacity-75 transition-opacity"
              >
                Hieu Vo
              </a>
            </p>
          </div>
        </Flyout>
      </div>
    </div>
  );
}
