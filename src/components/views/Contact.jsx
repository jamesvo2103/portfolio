import { useState, useRef } from "react";
import { profile } from "../../data/portfolio";
import { useReveal } from "../../hooks";
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "../icons";

const STYLES = {
  email: { color: "#4ec9b0", bg: "rgba(78,201,176,0.08)" },
  phone: { color: "#dcdcaa", bg: "rgba(220,220,170,0.08)" },
  linkedin: { color: "#0a66c2", bg: "rgba(10,102,194,0.08)" },
  github: { color: "#e6edf3", bg: "rgba(230,237,243,0.06)" },
};

const INPUT = `field-input w-full bg-white/[0.03] border border-vscode-border rounded-sm
  text-vscode-text font-mono text-xs px-3 py-2 outline-none mb-3
  focus:border-vscode-blue2 transition-colors`;

export default function Contact({ onToast }) {
  useReveal("contact");
  const [state, setState] = useState("idle");
  const formRef = useRef(null);

  const channels = [
    {
      icon: <MailIcon />,
      label: "email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <PhoneIcon />,
      label: "phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: <LinkedinIcon />,
      label: "linkedin",
      value: "linkedin.com/in/hieu-james-vo",
      href: profile.links.linkedin,
    },
    {
      icon: <GithubIcon />,
      label: "github",
      value: "github.com/jamesvo2103",
      href: profile.links.github,
    },
  ];

  const send = () => {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const name = (data.get("name") || "").trim();
    const email = (data.get("email") || "").trim();
    const subject = (data.get("subject") || "").trim();
    const message = (data.get("message") || "").trim();

    if (!name || !email || !message) {
      onToast?.("⚠️", "Please fill in all required fields.");
      return;
    }

    setState("sending");
    const body = `${message}\n\n— ${name} (${email})`;
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || `Portfolio message from ${name}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
    setState("sent");
    onToast?.("✉️", "Opening your mail client…");
  };

  return (
    <div className="px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        /* contact.css — let's build something */
      </p>
      <h2 className="font-display text-[35px] font-extrabold text-vscode-bright tracking-tight mb-1">
        Contact
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">
        // open to internships, collabs & good conversations
      </p>

      <div className="grid grid-cols-2 gap-7">
        <div>
          <div className="text-[20px] uppercase tracking-[0.2em] text-vscode-green mb-3">
            Find me on
          </div>
          {channels.map(({ icon, label, value, href }) => {
            const s = STYLES[label] ?? {
              color: "#888",
              bg: "rgba(255,255,255,0.04)",
            };
            return (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="reveal flex items-center gap-3 px-3.5 py-2.5 border border-vscode-border rounded no-underline mb-2 transition-all"
                style={{ background: "rgba(255,255,255,0.01)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.color + "55";
                  e.currentTarget.style.background = s.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                }}
              >
                <span
                  className="w-8 h-8 flex items-center justify-center rounded flex-shrink-0"
                  style={{
                    color: s.color,
                    background: s.bg,
                    border: `1px solid ${s.color}33`,
                  }}
                >
                  {icon}
                </span>
                <div className="min-w-0">
                  <span
                    className="block text-[12px] tracking-widest uppercase mb-0.5 font-semibold"
                    style={{ color: s.color }}
                  >
                    {label}
                  </span>
                  <span className="text-[12px] text-vscode-text truncate block">
                    {value}
                  </span>
                </div>
                <span className="ml-auto text-[12px] opacity-25 flex-shrink-0">↗</span>
              </a>
            );
          })}
        </div>

        <div className="reveal">
          <div className="text-[20px] uppercase tracking-[0.2em] text-vscode-green mb-3">
            Send a message
          </div>
          <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <label className="block text-[12px] text-vscode-dim tracking-widest uppercase mb-1.5">
              // your_name <span style={{ color: "#f44747" }}>*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="string"
              required
              className={INPUT}
            />

            <label className="block text-[12px] text-vscode-dim tracking-widest uppercase mb-1.5">
              // your_email <span style={{ color: "#f44747" }}>*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="string"
              required
              className={INPUT}
            />

            <label className="block text-[12px] text-vscode-dim tracking-widest uppercase mb-1.5">
              // subject
            </label>
            <input name="subject" type="text" placeholder="string" className={INPUT} />

            <label className="block text-[12px] text-vscode-dim tracking-widest uppercase mb-1.5">
              // message <span style={{ color: "#f44747" }}>*</span>
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="'''your message'''"
              required
              className={`${INPUT} resize-none`}
            />
          </form>

          <button
            onClick={send}
            disabled={state === "sending"}
            className="w-full px-5 py-2.5 font-mono text-xs rounded-sm text-left transition-opacity"
            style={{
              background: state === "sent" ? "rgba(78,201,176,0.25)" : "var(--blue2)",
              color: state === "sent" ? "#4ec9b0" : "white",
              opacity: state === "sending" ? 0.6 : 1,
              cursor: state === "sending" ? "default" : "pointer",
            }}
          >
            {state === "sending"
              ? "→ Opening mail client..."
              : state === "sent"
                ? "→ Sent to your mail app! :)"
                : "→ send_message()"}
          </button>

          <p className="text-[12px] text-vscode-dim mt-2 opacity-80">
            // Opens a pre-filled draft in your mail client — or just email me directly
          </p>
        </div>
      </div>
    </div>
  );
}
