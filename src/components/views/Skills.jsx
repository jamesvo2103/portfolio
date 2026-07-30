import { useState, useEffect, useRef } from "react";
import { skillGroups, alsoFamiliar } from "../../data/portfolio";
import { useReveal } from "../../hooks";

function SkillBar({ name, pct, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWidth(pct);
      },
      { threshold: 0.2 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="flex items-center gap-3 mb-3">
      <span className="w-28 text-[13px] text-vscode-dim flex-shrink-0">{name}</span>
      <div className="flex-1 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1400ms] ease-out"
          style={{ width: width + "%", background: color }}
        />
      </div>
      <span className="w-8 text-right text-[13px] flex-shrink-0" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

export default function Skills() {
  useReveal("skills");

  return (
    <div className="px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        // skills.json — tech stack & tools I actually use
      </p>
      <h2 className="font-display text-[35px] font-extrabold text-vscode-bright tracking-tight mb-1">
        Skills
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">
        {'{ "status": "always_learning", "passion": "immeasurable" }'}
      </p>

      <div className="grid grid-cols-2 gap-x-10 gap-y-6 mb-8">
        {skillGroups.map((g) => (
          <div key={g.group} className="reveal">
            <div className="text-[16px] uppercase tracking-[0.2em] text-vscode-yel mb-4 pb-2 border-b border-vscode-border">
              {g.group}
            </div>
            {g.items.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        ))}
      </div>

      <div className="reveal">
        <div className="text-[16px] uppercase tracking-[0.2em] text-vscode-yel mb-4 pb-2 border-b border-vscode-border">
          Also familiar with
        </div>
        <div className="flex flex-wrap gap-2">
          {alsoFamiliar.map((t) => (
            <span
              key={t}
              className="text-[13px] px-2.5 py-1 border border-vscode-border rounded text-vscode-dim cursor-default transition-all hover:border-vscode-blue2 hover:text-vscode-blue"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
