import { useState, useRef } from "react";
import { Dropdown, MenuItem, MenuSep, MenuLabel } from "./Menu";
import { files, profile } from "../data/portfolio";
import { openResume } from "../lib/resume";

const BTN =
  "px-2 py-0.5 rounded text-xs text-vscode-text cursor-pointer hover:bg-white/[0.08] transition-colors select-none";

const SHORTCUTS = [
  ["Ctrl+P", "Go to file"],
  ["Ctrl+B", "Toggle sidebar"],
  ["Ctrl+`", "Toggle terminal"],
  ["Ctrl+Shift+C", "Toggle Copilot ✨"],
  ["Esc", "Close overlay"],
];

export default function MenuBar({
  onToggleTerm,
  onOpenCmd,
  onNavigate,
  onToggleSidebar,
  onToggleCopilot,
  activeFile,
  openTabs,
  onCloseTab,
  onCloseAllTabs,
}) {
  const [open, setOpen] = useState(null);
  const refs = {
    file: useRef(null),
    edit: useRef(null),
    view: useRef(null),
    go: useRef(null),
    run: useRef(null),
    terminal: useRef(null),
    help: useRef(null),
  };

  const toggle = (k) => setOpen((cur) => (cur === k ? null : k));
  const close = () => setOpen(null);
  const run = (fn) => {
    fn?.();
    close();
  };

  const zoom = (delta) => {
    const el = document.documentElement;
    const cur = parseFloat(el.style.fontSize || "100");
    el.style.fontSize =
      (delta > 0 ? Math.min(cur + 10, 150) : Math.max(cur - 10, 70)) + "%";
  };

  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  };

  return (
    <div
      style={{ gridArea: "menu" }}
      className="bg-vscode-bg3 flex items-center gap-0.5 px-2 border-b border-vscode-border"
    >
      {/* File */}
      <div ref={refs.file}>
        <button className={BTN} onClick={() => toggle("file")}>
          File
        </button>
        <Dropdown anchorRef={refs.file} open={open === "file"} onClose={close}>
          <MenuItem
            label="New Tab"
            shortcut="Ctrl+T"
            onClick={() => run(() => onNavigate?.("home"))}
          />
          <MenuItem label="Open File…" shortcut="Ctrl+P" onClick={() => run(onOpenCmd)} />
          <MenuSep />
          <MenuItem
            label="Close Tab"
            shortcut="Ctrl+W"
            disabled={!activeFile}
            onClick={() => run(() => activeFile && onCloseTab?.(activeFile))}
          />
          <MenuItem
            label="Close All Tabs"
            disabled={!openTabs?.length}
            onClick={() => run(onCloseAllTabs)}
          />
          <MenuSep />
          <MenuLabel>Open Recent</MenuLabel>
          {files.slice(0, 4).map((f) => (
            <MenuItem
              key={f.id}
              label={`    ${f.name}`}
              onClick={() => run(() => onNavigate?.(f.id))}
            />
          ))}
          <MenuSep />
          <MenuItem label="View Resume ↗" onClick={() => run(openResume)} />
        </Dropdown>
      </div>

      {/* Edit */}
      <div ref={refs.edit}>
        <button className={BTN} onClick={() => toggle("edit")}>
          Edit
        </button>
        <Dropdown anchorRef={refs.edit} open={open === "edit"} onClose={close}>
          <MenuItem label="Find…" shortcut="Ctrl+P" onClick={() => run(onOpenCmd)} />
          <MenuSep />
          <MenuItem
            label="Select All"
            shortcut="Ctrl+A"
            onClick={() => run(() => document.execCommand("selectAll"))}
          />
          <MenuItem
            label="Copy"
            shortcut="Ctrl+C"
            onClick={() => run(() => document.execCommand("copy"))}
          />
        </Dropdown>
      </div>

      {/* View */}
      <div ref={refs.view}>
        <button className={BTN} onClick={() => toggle("view")}>
          View
        </button>
        <Dropdown anchorRef={refs.view} open={open === "view"} onClose={close}>
          <MenuItem
            label="Command Palette"
            shortcut="Ctrl+P"
            onClick={() => run(onOpenCmd)}
          />
          <MenuSep />
          <MenuItem
            label="Toggle Sidebar"
            shortcut="Ctrl+B"
            onClick={() => run(onToggleSidebar)}
          />
          <MenuItem
            label="Toggle Terminal"
            shortcut="Ctrl+`"
            onClick={() => run(onToggleTerm)}
          />
          <MenuItem
            label="✨ Hieu's Copilot"
            shortcut="Ctrl+Shift+C"
            highlight
            onClick={() => run(onToggleCopilot)}
          />
          <MenuSep />
          <MenuItem
            label="Enter Full Screen"
            shortcut="F11"
            onClick={() => run(fullscreen)}
          />
          <MenuItem label="Zoom In" shortcut="Ctrl++" onClick={() => run(() => zoom(1))} />
          <MenuItem
            label="Zoom Out"
            shortcut="Ctrl+-"
            onClick={() => run(() => zoom(-1))}
          />
          <MenuItem
            label="Reset Zoom"
            onClick={() =>
              run(() => {
                document.documentElement.style.fontSize = "";
              })
            }
          />
        </Dropdown>
      </div>

      {/* Go */}
      <div ref={refs.go}>
        <button className={BTN} onClick={() => toggle("go")}>
          Go
        </button>
        <Dropdown anchorRef={refs.go} open={open === "go"} onClose={close}>
          <MenuItem label="Go to File…" shortcut="Ctrl+P" onClick={() => run(onOpenCmd)} />
          <MenuSep />
          <MenuLabel>Files</MenuLabel>
          {files.map((f) => (
            <MenuItem
              key={f.id}
              label={`    ${f.name}`}
              onClick={() => run(() => onNavigate?.(f.id))}
            />
          ))}
        </Dropdown>
      </div>

      {/* Run */}
      <div ref={refs.run}>
        <button className={BTN} onClick={() => toggle("run")}>
          Run
        </button>
        <Dropdown anchorRef={refs.run} open={open === "run"} onClose={close}>
          <MenuItem
            label="Start Terminal"
            shortcut="Ctrl+`"
            onClick={() => run(onToggleTerm)}
          />
          <MenuItem label="Run Last Command" disabled onClick={close} />
        </Dropdown>
      </div>

      {/* Terminal */}
      <div ref={refs.terminal}>
        <button className={BTN} onClick={() => toggle("terminal")}>
          Terminal
        </button>
        <Dropdown anchorRef={refs.terminal} open={open === "terminal"} onClose={close}>
          <MenuItem
            label="New Terminal"
            shortcut="Ctrl+`"
            onClick={() => run(onToggleTerm)}
          />
          <MenuItem
            label="Toggle Terminal"
            shortcut="Ctrl+`"
            onClick={() => run(onToggleTerm)}
          />
          <MenuSep />
          <MenuItem
            label="Clear Terminal"
            onClick={() =>
              run(() => window.dispatchEvent(new CustomEvent("terminal:clear")))
            }
          />
        </Dropdown>
      </div>

      {/* Help */}
      <div ref={refs.help}>
        <button className={BTN} onClick={() => toggle("help")}>
          Help
        </button>
        <Dropdown anchorRef={refs.help} open={open === "help"} onClose={close}>
          <MenuItem
            label="Command Palette"
            shortcut="Ctrl+P"
            onClick={() => run(onOpenCmd)}
          />
          <MenuSep />
          <MenuLabel>Keyboard Shortcuts</MenuLabel>
          {SHORTCUTS.map(([key, desc]) => (
            <div key={key} className="flex items-center gap-3 px-4 py-1">
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded border"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "var(--border)",
                  color: "var(--yellow)",
                }}
              >
                {key}
              </kbd>
              <span className="text-[11px]" style={{ color: "var(--dim)" }}>
                {desc}
              </span>
            </div>
          ))}
          <MenuSep />
          <MenuItem
            label="GitHub ↗"
            onClick={() => run(() => window.open(profile.links.github, "_blank"))}
          />
          <MenuItem
            label="About"
            onClick={() =>
              run(() =>
                alert("Hieu Vo Portfolio v1.0\nBuilt with React + Vite + Tailwind 🌊"),
              )
            }
          />
        </Dropdown>
      </div>

      <div>
        <button
          className={BTN}
          onClick={onToggleCopilot}
          title="Toggle Hieu's Copilot (Ctrl+Shift+C)"
        >
          Copilot
        </button>
      </div>
    </div>
  );
}
