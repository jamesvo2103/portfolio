import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { files } from "../data/portfolio";
import { themes, useClock } from "../hooks";

function Item({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-1 sm:px-1.5 py-0.5 rounded-sm hover:bg-white/15 active:bg-white/20 transition-colors whitespace-nowrap leading-none ${className}`}
    >
      {children}
    </button>
  );
}

function ThemePicker({ themeId, onSelect }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ bottom: 0, right: 0 });
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open || !btnRef.current) return;
    const raf = requestAnimationFrame(() => {
      if (!btnRef.current || !panelRef.current) return;
      const r = btnRef.current.getBoundingClientRect();
      setPos({
        bottom: window.innerHeight - r.top + 8,
        right: window.innerWidth - r.right,
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const onDown = useCallback((e) => {
    const inBtn = btnRef.current?.contains(e.target);
    const inPanel = panelRef.current?.contains(e.target);
    if (!inBtn && !inPanel) setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open, onDown]);

  const current = themes.find((t) => t.id === themeId) ?? themes[0];

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm hover:bg-white/15 transition-colors text-[11px] text-white/85 whitespace-nowrap"
        title="Change theme"
      >
        <span>{current.icon}</span>
        <span>{current.name}</span>
        <span className="opacity-50 text-[9px]">{open ? "▼" : "▲"}</span>
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed w-52 rounded overflow-hidden border z-[9999]"
            style={{
              bottom: pos.bottom,
              right: pos.right,
              background: "var(--bg3)",
              borderColor: "var(--border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
            }}
          >
            <div
              className="px-3 py-2 text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "var(--dim)", borderBottom: "1px solid var(--border)" }}
            >
              Color Theme
            </div>
            {themes.map((t) => {
              const on = t.id === themeId;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelect(t.id);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-[12px] transition-colors cursor-pointer"
                  style={{
                    background: on ? "rgba(255,255,255,0.08)" : "transparent",
                    color: on ? "var(--bright)" : "var(--text)",
                    borderLeft: on ? `2px solid ${t.accent}` : "2px solid transparent",
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
                    style={{
                      background: t.accent,
                      boxShadow: `0 0 0 2px ${t.accent}44`,
                    }}
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
          </div>,
          document.body,
        )}
    </>
  );
}

export default function StatusBar({
  activeFile,
  onToggleTerm,
  themeId,
  onThemeChange,
  onToggleCopilot,
}) {
  const time = useClock();
  const file = files.find((f) => f.id === activeFile);

  return (
    <div
      style={{ gridArea: "status", background: "var(--blue2)" }}
      className="flex items-center px-2 sm:px-3 text-[10px] sm:text-[11px] text-white/85 gap-1 sm:gap-3 select-none overflow-hidden"
    >
      <Item onClick={onToggleTerm} className="flex-shrink-0">
        ⚠ 0 <span className="hidden xs:inline">{"  ⊗ 0"}</span>
      </Item>
      <Item className="flex-shrink-0 hidden sm:flex">⎇ main</Item>
      <Item className="hidden md:flex">🔄 Hieu's Portfolio</Item>

      <div className="ml-auto flex items-center gap-0.5 sm:gap-2 flex-shrink-0">
        <Item onClick={onToggleCopilot} className="flex-shrink-0">
          Copilot
        </Item>
        {file && <Item className="hidden sm:flex">{file.lang}</Item>}
        <Item className="hidden lg:flex">UTF-8</Item>
        <Item className="hidden lg:flex">Prettier</Item>
        <ThemePicker themeId={themeId} onSelect={onThemeChange} />
        <Item className="text-white/70 flex-shrink-0">{time}</Item>
      </div>
    </div>
  );
}
