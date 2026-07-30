import { useState, useEffect, useRef, useCallback } from "react";
import DinoGame from "./DinoGame";
import { askCopilot } from "../lib/copilot";
import { profile } from "../data/portfolio";
import {
  BotIcon,
  CloseIcon,
  PencilIcon,
  SendIcon,
  CopyIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  SmallSparkIcon,
} from "./icons";
import { copilotStyles } from "./copilotStyles";

const FREE_MESSAGES = 5;
const GAME_BONUS = 3;
const MAX_MESSAGES = FREE_MESSAGES + GAME_BONUS;
/* Per-session, not persisted: answers are generated locally so there's no cost
   to reset the counter on a fresh visit — it only gates the dino easter egg. */
const COUNT_KEY = "hieu_copilot_count";

const SUGGESTIONS = [
  "Tell me about Hieu?",
  "What projects has Hieu built?",
  "Tell me about his work experience",
  "What's his tech stack?",
  "What impact has he had?",
  "How can I contact Hieu?",
];

/* ── Markdown-ish renderer (bold, inline code, lists, fences) ───── */

function Markdown({ text }) {
  const fence = /```(\w*)\n?([\s\S]*?)```/g;
  const blocks = [];
  let last = 0;
  let m;
  while ((m = fence.exec(text)) !== null) {
    if (m.index > last) blocks.push({ t: "txt", v: text.slice(last, m.index) });
    blocks.push({ t: "code", lang: m[1] || "text", v: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) blocks.push({ t: "txt", v: text.slice(last) });

  const inline = (s) =>
    s.split(/(\*\*[^*]+\*\*|`[^`\n]+`)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return (
          <strong key={i} style={{ color: "var(--bright,#fff)", fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("`") && part.endsWith("`"))
        return (
          <code key={i} className="cp-icode">
            {part.slice(1, -1)}
          </code>
        );
      return <span key={i}>{part}</span>;
    });

  const renderText = (chunk, bi) => {
    const lines = chunk.split("\n").filter((l) => l.trim());
    const out = [];
    let bullets = [];
    let numbers = [];

    const flushBullets = () => {
      if (!bullets.length) return;
      out.push(
        <ul className="cp-ul" key={`b${bi}-${out.length}`}>
          {bullets.map((b, i) => (
            <li className="cp-li" key={i}>
              <span className="cp-li-dot">▸</span>
              <span>{inline(b)}</span>
            </li>
          ))}
        </ul>,
      );
      bullets = [];
    };

    const flushNumbers = () => {
      if (!numbers.length) return;
      out.push(
        <ol className="cp-ol" key={`n${bi}-${out.length}`}>
          {numbers.map((n, i) => (
            <li className="cp-oli" key={i}>
              <span className="cp-oli-num">{i + 1}.</span>
              <span>{inline(n)}</span>
            </li>
          ))}
        </ol>,
      );
      numbers = [];
    };

    lines.forEach((raw, i) => {
      const line = raw.trim();
      if (/^[-•*]\s+/.test(line)) {
        flushNumbers();
        bullets.push(line.replace(/^[-•*]\s+/, ""));
      } else if (/^\d+\.\s+/.test(line)) {
        flushBullets();
        numbers.push(line.replace(/^\d+\.\s+/, ""));
      } else {
        flushBullets();
        flushNumbers();
        out.push(
          <p className="cp-p" key={i}>
            {inline(line)}
          </p>,
        );
      }
    });

    flushBullets();
    flushNumbers();
    return out;
  };

  return (
    <div className="cp-md">
      {blocks.map((b, i) =>
        b.t === "code" ? (
          <div className="cp-code" key={i}>
            <div className="cp-code-head">
              <span className="cp-code-lang">{b.lang}</span>
              <button
                className="cp-code-copy"
                onClick={() => navigator.clipboard.writeText(b.v.trim())}
              >
                <CopyIcon /> Copy
              </button>
            </div>
            <pre className="cp-code-pre">{b.v.trim()}</pre>
          </div>
        ) : (
          renderText(b.v, i)
        ),
      )}
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────────────── */

const AssistantAvatar = () => (
  <div className="cp-asst-av" title="Hieu's Copilot">
    <BotIcon size={11} />
  </div>
);

const UserAvatar = () => (
  <div className="cp-user-av" title="You">
    <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z" />
    </svg>
  </div>
);

const Typing = () => (
  <div className="cp-typing">
    <AssistantAvatar />
    <div className="cp-dots">
      <span />
      <span />
      <span />
    </div>
  </div>
);

const Welcome = ({ onSuggest }) => (
  <div className="cp-welcome">
    <div className="cp-welcome-av">
      <BotIcon size={28} />
    </div>
    <p className="cp-welcome-title">Hi! I'm Hieu's Copilot 👋</p>
    <p className="cp-welcome-sub">
      Ask me anything about his projects, skills, experience, or achievements.
    </p>
    <div className="cp-sug-grid">
      {SUGGESTIONS.map((s) => (
        <button key={s} className="cp-sug-card" onClick={() => onSuggest(s)}>
          <SmallSparkIcon />
          <span>{s}</span>
        </button>
      ))}
    </div>
  </div>
);

function AssistantMessage({ text }) {
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="cp-asst-row">
      <AssistantAvatar />
      <div className="cp-asst-body">
        <div className="cp-asst-label">
          Hieu's Copilot <span className="cp-badge">local</span>
        </div>
        <div className="cp-bubble-asst">
          <Markdown text={text} />
        </div>
        <div className="cp-acts">
          <button
            className={`cp-act ${up ? "cp-act--up" : ""}`}
            onClick={() => {
              setUp((v) => !v);
              setDown(false);
            }}
            title="Good"
          >
            <ThumbUpIcon />
          </button>
          <button
            className={`cp-act ${down ? "cp-act--dn" : ""}`}
            onClick={() => {
              setDown((v) => !v);
              setUp(false);
            }}
            title="Bad"
          >
            <ThumbDownIcon />
          </button>
          <button className="cp-act" onClick={copy} title="Copy">
            <CopyIcon />{" "}
            {copied && <span style={{ fontSize: 10, marginLeft: 2 }}>Copied!</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

function OutOfTokensModal({ onUnlock, allUsed }) {
  const [score, setScore] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const update = (s) => {
    setScore(s);
    if (s >= 50) setUnlocked(true);
  };

  return (
    <div className="cp-modal-overlay">
      <div className="cp-modal">
        <div className="cp-modal-header">
          <span className="cp-pixel-title">OUT OF TOKENS!</span>
          <div className="cp-pixel-lives">
            <span>♥</span>
            <span>♥</span>
            <span style={{ opacity: 0.3 }}>♥</span>
          </div>
        </div>

        <p className="cp-modal-sub">
          {allUsed ? (
            <span>all chances used! enjoy the game 🎮</span>
          ) : (
            <>
              <span className="cp-pixel-highlight">{FREE_MESSAGES} FREE MESSAGES</span>{" "}
              used.
              <br />
              beat the dino for +{GAME_BONUS} more!
            </>
          )}
        </p>

        <DinoGame onScoreUpdate={update} />

        {!allUsed && (
          <div className="cp-modal-score-row">
            <span className="cp-pixel-score">
              SCORE: {String(score).padStart(5, "0")}
            </span>
            {unlocked ? (
              <span className="cp-pixel-unlocked">🎉 +{GAME_BONUS} MSGS UNLOCKED!</span>
            ) : (
              <span className="cp-pixel-target">TARGET: 00050</span>
            )}
          </div>
        )}

        {!allUsed && unlocked && (
          <button className="cp-modal-unlock-btn" onClick={() => onUnlock(true)}>
            ▶ CONTINUE ({GAME_BONUS} msgs left)
          </button>
        )}

        <a
          href={`mailto:${profile.email}`}
          className="cp-modal-coffee-btn"
          onClick={() => onUnlock(false)}
        >
          ✉ EMAIL HIEU DIRECTLY
        </a>

        <button className="cp-modal-skip" onClick={() => onUnlock(false)}>
          skip &gt;&gt; (maybe later)
        </button>
      </div>
    </div>
  );
}

/* ── Main panel ────────────────────────────────────────────────── */

export default function Copilot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [used, setUsed] = useState(() => {
    try {
      return parseInt(sessionStorage.getItem(COUNT_KEY) || "0", 10);
    } catch {
      return 0;
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [bonusUnlocked, setBonusUnlocked] = useState(false);

  const endRef = useRef(null);
  const textareaRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    try {
      sessionStorage.setItem(COUNT_KEY, String(used));
    } catch {}
  }, [used]);

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setBusy(false);
    setError(null);
    setShowModal(false);
  };

  const send = useCallback(
    async (raw) => {
      const question = raw.trim();
      if (!question || busy) return;

      const next = used + 1;
      const cap = bonusUnlocked ? MAX_MESSAGES : FREE_MESSAGES;
      if (next > cap) {
        setShowModal(true);
        return;
      }
      setUsed(next);

      const userMsg = { id: Date.now(), role: "user", content: question };
      const history = [...messages, userMsg];
      setMessages(history);
      setDraft("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setBusy(true);
      setError(null);

      abortRef.current = new AbortController();
      try {
        const answer = await askCopilot(
          history.map((m) => ({ role: m.role, content: m.content })),
          abortRef.current.signal,
        );
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "assistant", content: answer },
        ]);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Something went wrong — please try again.");
      } finally {
        setBusy(false);
      }
    },
    [busy, messages, used, bonusUnlocked],
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(draft);
    }
  };

  const left = Math.max(0, (bonusUnlocked ? MAX_MESSAGES : FREE_MESSAGES) - used);
  const showCountdown = left <= 2 && left > 0 && messages.length > 0;

  return (
    <>
      <style>{copilotStyles}</style>
      <div className="cp-root">
        {showModal && (
          <OutOfTokensModal
            allUsed={bonusUnlocked}
            onUnlock={(playAgain) => {
              setShowModal(false);
              if (playAgain) {
                setBonusUnlocked(true);
                setUsed(FREE_MESSAGES);
              }
            }}
          />
        )}

        <div className="cp-header">
          <div className="cp-header-l">
            <BotIcon size={15} />
            <span className="cp-header-title">Hieu's AI Assistant</span>
          </div>
          <div className="cp-header-r">
            <button className="cp-hbtn" title="New chat" onClick={reset}>
              <PencilIcon />
            </button>
            <button className="cp-hbtn" title="Close" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="cp-ctx">
          <span className="cp-ctx-lbl">Workspace</span>
          <div className="cp-ctx-pill">
            <span className="cp-ctx-dot" />
            portfolio · hieu-vo
          </div>
        </div>

        <div className="cp-msgs thin-scroll">
          {messages.length === 0 ? (
            <Welcome onSuggest={send} />
          ) : (
            messages.map((m) =>
              m.role === "user" ? (
                <div className="cp-user-row" key={m.id}>
                  <div className="cp-bubble-user">{m.content}</div>
                  <UserAvatar />
                </div>
              ) : (
                <AssistantMessage key={m.id} text={m.content} />
              ),
            )
          )}
          {busy && <Typing />}
          {error && <div className="cp-err">⚠️ {error}</div>}
          <div ref={endRef} />
        </div>

        {showCountdown && (
          <div className="cp-countdown">
            ⚡ {left} message{left !== 1 ? "s" : ""} left —{" "}
            <a
              href={`mailto:${profile.email}`}
              style={{ color: "#f59e0b", textDecoration: "underline" }}
            >
              email Hieu
            </a>
            !
          </div>
        )}

        {messages.length > 0 && messages.length <= 2 && !busy && (
          <div className="cp-chips">
            {SUGGESTIONS.slice(0, 4).map((s) => (
              <button key={s} className="cp-chip" onClick={() => send(s)}>
                <SmallSparkIcon />
                {s.length > 26 ? s.slice(0, 25) + "…" : s}
              </button>
            ))}
          </div>
        )}

        <div className="cp-input-area">
          <div className="cp-input-box">
            <textarea
              ref={textareaRef}
              className="cp-textarea"
              rows={1}
              placeholder="Ask about Hieu's projects, experience, skills…"
              value={draft}
              disabled={busy}
              onChange={(e) => {
                setDraft(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
              }}
              onKeyDown={onKeyDown}
            />
            <div className="cp-toolbar">
              <span className="cp-toolbar-info">
                {left} msg{left !== 1 ? "s" : ""} left
              </span>
              <button
                className="cp-send"
                disabled={!draft.trim() || busy}
                onClick={() => send(draft)}
                title="Send (Enter)"
              >
                <SendIcon />
              </button>
            </div>
          </div>
          <p className="cp-disclaimer">
            Answers come from Hieu's résumé · Contact him directly for anything important
          </p>
        </div>
      </div>
    </>
  );
}
