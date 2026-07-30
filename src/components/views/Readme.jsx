import { profile, readmeStack, readmeBadges } from "../../data/portfolio";

const HIGHLIGHTS = [
  ["🔭", "Building", "notification & delivery infrastructure", "at BriteAI"],
  ["🧠", "NLP pipelines over a 40M+ article corpus", "", ""],
  ["⚡", "Cut", "RabbitMQ payloads by 93% and training time by 80%", ""],
  ["✨", "Always learning, always shipping", "", ""],
];

export default function Readme() {
  return (
    <div className="px-12 py-12 max-w-[760px]">
      <h1 className="font-display text-[35px] font-extrabold text-vscode-bright pb-2.5 border-b border-vscode-border mb-3">
        Hieu Vo
      </h1>
      <p className="text-[14px] text-vscode-dim leading-relaxed mb-2.5">
        {profile.role} · {profile.location}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {readmeBadges.map(([emoji, label, color]) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[12px] border"
            style={{ background: color + "22", borderColor: color, color }}
          >
            {emoji} {label}
          </span>
        ))}
      </div>

      <hr className="border-none border-t border-vscode-border my-4" />

      <h2 className="font-display text-[16px] font-bold text-vscode-bright mt-5 mb-2">
        🌊 About
      </h2>
      <p className="text-[14px] text-vscode-dim leading-[1.8] mb-4">{profile.bio2}</p>

      <ul className="pl-6 mb-3 space-y-1">
        {HIGHLIGHTS.map(([emoji, pre, strong, post], i) => (
          <li key={i} className="text-[13px] text-vscode-dim leading-[1.8]">
            {emoji} {pre}{" "}
            {strong && (
              <strong className="text-vscode-text font-medium">{strong}</strong>
            )}{" "}
            {post}
          </li>
        ))}
      </ul>

      <hr className="border-none border-t border-vscode-border my-4" />

      <h2 className="font-display text-[30px] font-bold text-vscode-bright mt-5 mb-2">
        Stack
      </h2>
      {readmeStack.map(([group, items]) => (
        <p key={group} className="text-[14px] text-vscode-dim leading-[1.8] mb-1">
          <strong className="text-vscode-text font-medium">{group}:</strong>{" "}
          {items.map((it) => (
            <code
              key={it}
              className="bg-white/[0.07] px-2 py-px rounded-sm text-vscode-orange text-[14px] mx-0.5"
            >
              {it}
            </code>
          ))}
        </p>
      ))}

      <hr className="border-none border-t border-vscode-border my-4" />

      <h2 className="font-display text-[30px] font-bold text-vscode-bright mt-5 mb-2">
        Connect
      </h2>
      <ul className="pl-5 space-y-1">
        {[
          ["Email", profile.email],
          ["Phone", profile.phone],
          ["GitHub", "jamesvo2103"],
          ["LinkedIn", "hieu-james-vo"],
        ].map(([label, value]) => (
          <li key={label} className="text-[14px] text-vscode-dim leading-[1.8]">
            {label}: <strong className="text-vscode-text font-medium">{value}</strong>
          </li>
        ))}
      </ul>

      <hr className="border-none border-t border-vscode-border my-4" />

      <div className="bg-white/[0.025] border border-vscode-border rounded p-5 mb-4">
        <h2 className="font-display text-[14px] font-bold text-vscode-bright mb-3">
          🛠 About this site
        </h2>
        <p className="text-[13px] text-vscode-dim leading-[1.8] mb-3">
          A VS Code–styled portfolio built with{" "}
          <strong className="text-vscode-text font-medium">
            React, Vite, and Tailwind
          </strong>
          . Six color themes, an integrated terminal with a working command set, a command
          palette, a draggable breadcrumb trail, and an offline AI copilot that answers
          from this résumé.
        </p>
        <p className="text-[13px] text-vscode-dim leading-[1.8]">
          Try <code className="bg-white/[0.07] px-1.5 rounded-sm text-vscode-orange">
            Ctrl+`
          </code>{" "}
          for the terminal,{" "}
          <code className="bg-white/[0.07] px-1.5 rounded-sm text-vscode-orange">
            Ctrl+P
          </code>{" "}
          for the palette, and{" "}
          <code className="bg-white/[0.07] px-1.5 rounded-sm text-vscode-orange">
            Ctrl+Shift+C
          </code>{" "}
          for the copilot.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[12px] text-vscode-dim">
          © {new Date().getFullYear()} Hieu Vo · All rights reserved
        </p>
        <p className="text-[12px] text-vscode-dim">Made with 🌊 from Villanova, PA</p>
      </div>
    </div>
  );
}
