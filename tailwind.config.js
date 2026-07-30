/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      colors: {
        vscode: {
          bg: "var(--bg)",
          bg2: "var(--bg2)",
          bg3: "var(--bg3)",
          bg4: "var(--bg4)",
          title: "var(--title)",
          border: "var(--border)",
          text: "var(--text)",
          dim: "var(--dim)",
          bright: "var(--bright)",
          blue: "var(--blue)",
          blue2: "var(--blue2)",
          green: "var(--green)",
          gcm: "var(--gcm)",
          yel: "var(--yellow)",
          orange: "var(--orange)",
          purple: "var(--purple)",
          pink: "var(--pink)",
          red: "var(--red)",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        display: ["Syne", "sans-serif"],
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "fade-in": "fadeIn 0.15s ease",
        "slide-up": "slideUp 0.5s ease forwards",
        "toast-in": "toastIn 0.3s ease",
        "su-1": "slideUp 0.5s ease 0.1s forwards",
        "su-2": "slideUp 0.5s ease 0.3s forwards",
        "su-3": "slideUp 0.5s ease 0.5s forwards",
        "su-4": "slideUp 0.5s ease 0.7s forwards",
        "su-5": "slideUp 0.5s ease 0.9s forwards",
        "su-6": "slideUp 0.5s ease 1.1s forwards",
        "su-7": "slideUp 0.5s ease 1.3s forwards",
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        toastIn: {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
    },
  },
  plugins: [],
};
