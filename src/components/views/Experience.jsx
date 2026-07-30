import { experience } from "../../data/portfolio";
import { useReveal } from "../../hooks";

export default function Experience() {
  useReveal("experience");

  return (
    <div className="px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        // experience.ts - professional journey
      </p>
      <h2 className="font-display text-[35px] font-extrabold text-vscode-bright tracking-tight mb-1">
        Experience
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">
        interface Career extends Timeline {"{}"}
      </p>

      <div className="pl-3 border-l border-vscode-border">
        {experience.map((job) => (
          <div
            key={job.date}
            className={`reveal relative pl-5 mb-9 ${job.current ? "tl-dot" : "tl-dot-dim"}`}
          >
            <div className="text-[14px] text-vscode-dim tracking-wide mb-1.5">
              {job.date}
              {job.location && <span className="ml-2 opacity-70">· {job.location}</span>}
            </div>
            <div className="font-display text-[20px] font-extrabold text-vscode-bright mb-0.5">
              {job.role}
            </div>
            <div className="text-[14px] text-vscode-blue mb-2.5">@ {job.company}</div>

            <ul className="mb-3 space-y-1.5">
              {job.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-2.5 text-[13px] text-vscode-dim leading-[1.8]"
                >
                  <span className="text-vscode-green flex-shrink-0 mt-0.5">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="tag-tech text-[12px] px-1.5 py-0.5 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
