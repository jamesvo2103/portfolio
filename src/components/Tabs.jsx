import { useState, useRef } from "react";
import { files } from "../data/portfolio";
import { fileIcons } from "./icons";

export function Tabs({ openTabs, activeFile, onTabClick, onTabClose }) {
  return (
    <div className="flex bg-vscode-bg2 border-b border-vscode-border overflow-x-auto no-scroll h-[35px] flex-shrink-0">
      {openTabs.map((id) => {
        const file = files.find((f) => f.id === id);
        if (!file) return null;
        const Icon = fileIcons[id];
        const active = activeFile === id;
        return (
          <div
            key={id}
            onClick={() => onTabClick(id)}
            className={`relative flex items-center gap-1.5 px-3.5 h-[35px] text-xs cursor-pointer border-r border-vscode-border flex-shrink-0 max-w-[160px] group transition-colors duration-100 ${
              active
                ? "bg-vscode-bg text-vscode-bright tab-active"
                : "bg-vscode-bg2 text-vscode-dim hover:text-vscode-text"
            }`}
          >
            <span className="flex-shrink-0">
              <Icon />
            </span>
            <span className="truncate">{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(id);
              }}
              className={`ml-0.5 w-4 h-4 flex items-center justify-center rounded text-[11px] flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100 ${
                active ? "opacity-100" : ""
              } hover:bg-white/10 hover:text-vscode-text text-vscode-dim`}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** Draggable breadcrumb trail — segments can be reordered for fun. */
export function Breadcrumbs({ activeFile }) {
  const file = files.find((f) => f.id === activeFile);
  const base = file
    ? file.folder === "root"
      ? ["hieu-vo", file.name]
      : ["hieu-vo", file.folder, file.name]
    : [];

  const [crumbs, setCrumbs] = useState(base);
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const dragRef = useRef(null);

  if (!file) return null;

  if (crumbs.join() !== base.join() && dragIdx === null) setCrumbs(base);

  const onDragEnd = () => {
    if (dragRef.current !== null && overIdx !== null && dragRef.current !== overIdx) {
      const next = [...crumbs];
      const [moved] = next.splice(dragRef.current, 1);
      next.splice(overIdx, 0, moved);
      setCrumbs(next);
    }
    dragRef.current = null;
    setDragIdx(null);
    setOverIdx(null);
  };

  return (
    <div className="flex items-center gap-0.5 px-4 py-1 text-xs text-vscode-dim border-b border-vscode-border bg-vscode-bg flex-shrink-0 min-h-[26px] select-none">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-0.5">
          <span
            draggable
            onDragStart={() => {
              dragRef.current = i;
              setDragIdx(i);
            }}
            onDragEnter={() => setOverIdx(i)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className="flex items-center gap-0.5 px-1 rounded cursor-grab active:cursor-grabbing transition-all"
            style={{
              opacity: dragIdx === i ? 0.35 : 1,
              background: overIdx === i && dragIdx !== i ? "var(--bg3)" : "transparent",
              outline:
                overIdx === i && dragIdx !== i ? "1px dashed var(--border)" : "none",
              color: i === crumbs.length - 1 ? "var(--text)" : "var(--dim)",
            }}
          >
            {crumb}
          </span>
          {i < crumbs.length - 1 && (
            <span className="opacity-30 text-[10px] mx-0.5 pointer-events-none">›</span>
          )}
        </span>
      ))}
    </div>
  );
}
