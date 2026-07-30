import { useState, useEffect, useRef } from "react";
import { files } from "../data/portfolio";
import { fileIcons, SparkleIcon } from "./icons";

const COMMANDS = [
  {
    id: "copilot",
    name: "Open Hieu's Copilot",
    hint: "Ctrl+Shift+C",
    isAction: true,
    icon: <SparkleIcon size={14} stroke="#9370db" width="2" />,
    color: "#b48eff",
  },
];

export default function CommandPalette({
  query,
  onQueryChange,
  onSelect,
  onClose,
  onToggleCopilot,
}) {
  const inputRef = useRef(null);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const q = query.toLowerCase();
  const matchedFiles = files.filter((f) => f.name.toLowerCase().includes(q));
  const matchedCmds = COMMANDS.filter((c) => c.name.toLowerCase().includes(q));
  const all = [...matchedCmds, ...matchedFiles];

  useEffect(() => setCursor(0), [query]);

  const pick = (item) => {
    if (item.isAction) {
      onToggleCopilot?.();
      onClose();
    } else {
      onSelect(item.id);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((i) => Math.min(i + 1, all.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = all[cursor];
        if (item) pick(item);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cursor, all]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="fixed inset-0 bg-black/55 z-50 flex items-start justify-center pt-20 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#2d2d30] border border-white/15 rounded-md w-[540px] max-w-[92vw] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/[0.07]">
          <span className="text-vscode-dim text-sm">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Go to file or run command..."
            className="flex-1 bg-transparent border-none outline-none text-vscode-bright font-mono text-[14px] placeholder:text-vscode-dim"
          />
          <kbd
            className="text-[10px] px-1.5 py-0.5 rounded border hidden sm:block"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderColor: "var(--border)",
              color: "var(--dim)",
            }}
          >
            Esc
          </kbd>
        </div>

        <div className="max-h-[320px] overflow-y-auto thin-scroll">
          {matchedCmds.length > 0 && (
            <>
              <div
                className="px-3.5 py-1 text-[10px] tracking-widest uppercase"
                style={{
                  color: "var(--dim)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                Commands
              </div>
              {matchedCmds.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => pick(c)}
                  onMouseEnter={() => setCursor(i)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-left transition-colors"
                  style={{
                    background: cursor === i ? "rgba(110,64,201,0.18)" : "transparent",
                    borderLeft:
                      cursor === i ? "2px solid #6E40C9" : "2px solid transparent",
                    color: c.color || "var(--text)",
                  }}
                >
                  <span className="flex-shrink-0">{c.icon}</span>
                  <span className="flex-1 font-medium">{c.name}</span>
                  {c.hint && (
                    <kbd
                      className="text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        borderColor: "var(--border)",
                        color: "var(--dim)",
                      }}
                    >
                      {c.hint}
                    </kbd>
                  )}
                </button>
              ))}
            </>
          )}

          {matchedFiles.length > 0 && (
            <>
              <div
                className="px-3.5 py-1 text-[10px] tracking-widest uppercase"
                style={{
                  color: "var(--dim)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                Files
              </div>
              {matchedFiles.map((f, i) => {
                const Icon = fileIcons[f.id];
                const idx = matchedCmds.length + i;
                return (
                  <button
                    key={f.id}
                    onClick={() => pick(f)}
                    onMouseEnter={() => setCursor(idx)}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-left transition-colors"
                    style={{
                      background:
                        cursor === idx ? "rgba(255,255,255,0.08)" : "transparent",
                      borderLeft:
                        cursor === idx
                          ? "2px solid var(--blue)"
                          : "2px solid transparent",
                      color: "var(--text)",
                    }}
                  >
                    <span className="flex-shrink-0">
                      <Icon />
                    </span>
                    <span className="flex-1">{f.name}</span>
                    <span className="text-vscode-dim text-[11px]">
                      {f.folder === "root" ? "./" : f.folder + "/"}
                    </span>
                  </button>
                );
              })}
            </>
          )}

          {all.length === 0 && (
            <div
              className="px-3.5 py-6 text-center text-[12px]"
              style={{ color: "var(--dim)" }}
            >
              No results for "{query}"
            </div>
          )}
        </div>

        <div
          className="px-3.5 py-1.5 border-t border-white/[0.05] flex items-center gap-3"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <span className="text-[10px]" style={{ color: "var(--dim)" }}>
            ↑↓ navigate · ↵ open · Esc close
          </span>
          <span className="ml-auto text-[10px]" style={{ color: "var(--dim)" }}>
            Tip: type "copilot" to open AI chat
          </span>
        </div>
      </div>
    </div>
  );
}
