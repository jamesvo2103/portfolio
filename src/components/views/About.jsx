import { profile, education, aboutFocus } from "../../data/portfolio";
import { useReveal } from "../../hooks";

export default function About() {
  useReveal("about");

  return (
    <div className="px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[16px] mb-3">
        {"<!-- about.html - Hieu Vo -->"}
      </p>
      <h2 className="font-display text-[40px] font-extrabold text-vscode-bright tracking-tight mb-1">
        About Me
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">
        // who I am · what I build · where I'm headed
      </p>

      <div className="reveal bg-white/[0.025] border border-vscode-border rounded p-6 mb-4">
        <p className="text-[13px] text-vscode-dim leading-[1.9]">
          Hi! I'm <strong className="text-vscode-blue font-medium">Hieu Vo</strong>, a
          Computer Engineering student at{" "}
          <strong className="text-vscode-blue font-medium">Villanova University</strong>{" "}
          who spends most of his time on{" "}
          <strong className="text-vscode-blue font-medium">backend systems</strong>,{" "}
          <strong className="text-vscode-blue font-medium">
            distributed data pipelines
          </strong>
          , and <strong className="text-vscode-blue font-medium">applied ML</strong>. So
          far that's meant a distributed notification engine on Java + Spring Boot + CockroachDB, an
          NLP platform chewing through a{" "}
          <strong className="text-vscode-blue font-medium">40M+ article corpus</strong>,
          and a GPU training pipeline I cut from 10 hours to 2. Currently a{" "}
          <strong className="text-vscode-blue font-medium">
            Software Engineer Intern at Sharedi.io
          </strong>{" "}
          in Mountain View, CA.
        </p>
      </div>

      <div className="reveal bg-white/[0.025] border border-vscode-border rounded p-5 mb-4 hover:border-white/[0.12] transition-colors">
        <div className="text-[18px] uppercase tracking-[0.2em] text-vscode-green mb-3">
          Current Focus
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          {aboutFocus.map(([emoji, text]) => (
            <div
              key={text}
              className="flex gap-2.5 mb-2.5 text-[12px] text-vscode-dim leading-relaxed"
            >
              <span>{emoji}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal">
        <div className="text-[18px] uppercase tracking-[0.2em] text-vscode-green mb-3">
          Education
        </div>
        <div className="flex flex-col gap-3">
          {education.map((e) => (
            <div
              key={e.id}
              className="bg-white/[0.025] border border-vscode-border rounded p-5 hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <span className="text-[16px] font-semibold text-vscode-bright block">
                    {e.icon} {e.institution}
                  </span>
                  {e.university && (
                    <span className="text-[14px] text-vscode-dim">{e.university}</span>
                  )}
                </div>
                <span className="text-[14px] text-vscode-dim whitespace-nowrap mt-0.5">
                  {e.period}
                </span>
              </div>
              <p className="text-[12px] text-vscode-blue mt-1.5">{e.degree}</p>
              {e.minor && <p className="text-[12px] text-vscode-dim mt-0.5">{e.minor}</p>}
              <p className="text-[12px] text-vscode-green mt-1">{e.gpa}</p>
              {e.extra && (
                <p className="text-[12px] text-vscode-dim mt-2 leading-[1.8]">
                  {e.extra}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
