import { useState, useEffect, useRef } from "react";
import { fileNames, nameToId, profile, gitLog } from "../data/portfolio";

const LINE_CLASS = {
  cmd: "text-vscode-bright",
  out: "text-vscode-dim",
  ok: "text-vscode-green",
  err: "text-vscode-red",
  info: "text-vscode-blue",
};

const HELP = [
  { type: "ok", text: "Available commands:" },
  { type: "out", text: "  ls               — list files in current directory" },
  { type: "out", text: "  pwd              — print working directory" },
  { type: "out", text: "  cd <dir>         — change directory (cd .. to go up)" },
  { type: "out", text: "  cat <file>       — view / open a file in the editor" },
  { type: "out", text: "  open <file>      — same as cat" },
  { type: "out", text: "  whoami           — who am I?" },
  { type: "out", text: "  echo <text>      — print text" },
  { type: "out", text: "  date             — show current date & time" },
  { type: "out", text: "  git log          — show recent commits" },
  { type: "out", text: "  python --version — show Python version" },
  { type: "out", text: "  clear            — clear the terminal" },
];

export default function Terminal({ onClose, onOpenFile }) {
  const [lines, setLines] = useState([
    { type: "info", text: "Welcome! Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const emit = (out) => setLines((prev) => [...prev, ...out]);

  const runCommand = (raw) => {
    const line = raw.trim();
    if (!line) return;

    setHistory((h) => [line, ...h]);
    setHistIdx(-1);

    const [cmd, ...rest] = line.split(/\s+/);
    const arg = rest.join(" ");

    emit([{ type: "cmd", text: line }]);

    switch (cmd.toLowerCase()) {
      case "help":
        emit(HELP);
        break;

      case "ls":
        emit([{ type: "ok", text: fileNames.join("   ") }]);
        break;

      case "pwd":
        emit([
          {
            type: "ok",
            text:
              `/home/hieu/${cwd === "~" ? "" : cwd}`.replace(/\/$/, "") || "/home/hieu",
          },
        ]);
        break;

      case "cd":
        if (!arg || arg === "~" || arg === "/" || arg === "..") {
          setCwd("~");
          emit([{ type: "out", text: "" }]);
        } else {
          emit([{ type: "err", text: `cd: ${arg}: No such directory` }]);
        }
        break;

      case "cat":
      case "open": {
        if (!arg) {
          emit([{ type: "err", text: `${cmd}: missing operand` }]);
          break;
        }
        const id = nameToId[arg];
        if (id) {
          emit([{ type: "ok", text: `Opening ${arg} in editor…` }]);
          setTimeout(() => onOpenFile(id), 300);
        } else {
          emit([
            { type: "err", text: `${cmd}: ${arg}: No such file` },
            { type: "out", text: `Try: ${fileNames.join(", ")}` },
          ]);
        }
        break;
      }

      case "whoami":
        emit([
          { type: "ok", text: "hieu" },
          { type: "out", text: profile.role },
          {
            type: "out",
            text: "Backend Engineer · Distributed Systems · AI/ML Developer",
          },
          { type: "out", text: `${profile.location}  ·  ${profile.email}` },
        ]);
        break;

      case "echo":
        emit([{ type: "ok", text: arg }]);
        break;

      case "date":
        emit([{ type: "ok", text: new Date().toString() }]);
        break;

      case "clear":
        setLines([]);
        break;

      case "git":
        if (arg.startsWith("log")) {
          emit(gitLog.map((text) => ({ type: "out", text })));
        } else if (arg === "status") {
          emit([
            { type: "ok", text: "On branch main" },
            { type: "out", text: "Your branch is up to date with origin/main." },
          ]);
        } else {
          emit([{ type: "out", text: "git: try 'git log' or 'git status'" }]);
        }
        break;

      case "python":
      case "python3":
        emit(
          arg === "--version" || arg === "-V"
            ? [{ type: "ok", text: "Python 3.11.0" }]
            : [{ type: "out", text: "Python interactive mode not available here." }],
        );
        break;

      default:
        emit([
          {
            type: "err",
            text: `command not found: ${cmd} — type 'help' for commands`,
          },
        ]);
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const clear = () => setLines([]);
    window.addEventListener("terminal:clear", clear);
    return () => window.removeEventListener("terminal:clear", clear);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      if (history[next]) setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  const Prompt = () => (
    <>
      <span className="text-vscode-green">hieu</span>
      <span className="text-vscode-dim">@portfolio</span>
      <span className="text-vscode-dim">:</span>
      <span className="text-vscode-green">{cwd}</span>
      <span className="text-vscode-dim">$</span>
      <span> </span>
    </>
  );

  return (
    <div className="bg-vscode-bg2 border-t border-vscode-border flex flex-col h-[220px] animate-slide-up flex-shrink-0">
      <div className="flex items-center gap-2 px-3 py-1 border-b border-vscode-border bg-vscode-bg3 flex-shrink-0">
        {["TERMINAL", "PROBLEMS", "OUTPUT"].map((tab, i) => (
          <button
            key={tab}
            className={`text-xs px-2 py-0.5 rounded transition-colors ${
              i === 0
                ? "text-vscode-text bg-white/[0.07]"
                : "text-vscode-dim hover:bg-white/[0.05]"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={onClose}
          className="ml-auto text-vscode-dim hover:text-vscode-text text-sm transition-colors"
        >
          ✕
        </button>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto thin-scroll px-3.5 pt-2 pb-1 text-xs leading-[1.8] cursor-text font-mono"
      >
        {lines.map((l, i) => (
          <div key={i}>
            {l.type === "cmd" && <Prompt />}
            <span className={LINE_CLASS[l.type] ?? "text-vscode-dim"}>{l.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 px-3.5 pb-2 font-mono text-xs">
        <Prompt />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent border-none outline-none text-vscode-bright text-xs font-mono"
        />
        <span className="term-cursor" />
      </div>
    </div>
  );
}
