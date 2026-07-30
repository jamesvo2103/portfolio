import { useState, useEffect } from "react";

export const themes = [
  { id: "default", name: "Hieu Dark", icon: "🌊", accent: "#007acc" },
  { id: "rose-pine", name: "Rosé Pine", icon: "🌸", accent: "#eb6f92" },
  { id: "tokyo-night", name: "Tokyo Night", icon: "🌃", accent: "#7aa2f7" },
  { id: "catppuccin", name: "Catppuccin", icon: "🐱", accent: "#cba6f7" },
  { id: "nord", name: "Nord", icon: "🧊", accent: "#88c0d0" },
  { id: "gruvbox", name: "Gruvbox", icon: "🔥", accent: "#fabd2f" },
];

const THEME_KEY = "hieu-portfolio-theme";

export function useTheme() {
  const [themeId, setThemeId] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "default";
    } catch {
      return "default";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeId === "default") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", themeId);
    try {
      localStorage.setItem(THEME_KEY, themeId);
    } catch {}
  }, [themeId]);

  return { themeId, setThemeId, themes };
}

/** Typewriter that cycles through a list of phrases. */
export function useTypewriter(phrases, speed = 70, pause = 2000) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    const t = setTimeout(
      () => {
        if (deleting) {
          setText(phrase.slice(0, charIdx - 1));
          if (charIdx - 1 <= 0) {
            setDeleting(false);
            setPhraseIdx((i) => (i + 1) % phrases.length);
            setCharIdx(0);
            return;
          }
          setCharIdx((i) => i - 1);
        } else {
          setText(phrase.slice(0, charIdx + 1));
          if (charIdx + 1 >= phrase.length) {
            setTimeout(() => setDeleting(true), pause);
            return;
          }
          setCharIdx((i) => i + 1);
        }
      },
      deleting ? 28 : speed,
    );
    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return text;
}

/** Staggered fade-in for elements carrying `.reveal`. */
export function useReveal(key) {
  useEffect(() => {
    document
      .querySelectorAll(".reveal")
      .forEach((el, i) => setTimeout(() => el.classList.add("in"), i * 70));
  }, [key]);
}

export function useClock() {
  const read = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes(),
    ).padStart(2, "0")}`;
  };
  const [time, setTime] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setTime(read()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function useIsCompact() {
  const [compact, setCompact] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return compact;
}
