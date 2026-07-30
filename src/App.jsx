import { useState, useEffect, useRef, useCallback } from "react";

import TitleBar from "./components/TitleBar";
import MenuBar from "./components/MenuBar";
import ActivityBar from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import { Tabs, Breadcrumbs } from "./components/Tabs";
import StatusBar from "./components/StatusBar";
import CommandPalette from "./components/CommandPalette";
import Terminal from "./components/Terminal";
import Toasts from "./components/Toasts";
import MobileDrawer from "./components/MobileDrawer";
import Copilot from "./components/Copilot";

import Home from "./components/views/Home";
import About from "./components/views/About";
import Projects from "./components/views/Projects";
import Skills from "./components/views/Skills";
import Experience from "./components/views/Experience";
import Contact from "./components/views/Contact";
import Readme from "./components/views/Readme";

import { useTheme, useIsCompact, themes } from "./hooks";
import { RESUME_FILE } from "./data/portfolio";

const COPILOT_MIN = 260;
const COPILOT_MAX = 520;
const COPILOT_DEFAULT = 320;

export default function App() {
  const [openTabs, setOpenTabs] = useState(["home"]);
  const [activeFile, setActiveFile] = useState("home");
  const [termOpen, setTermOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotWidth, setCopilotWidth] = useState(COPILOT_DEFAULT);

  const compact = useIsCompact();
  const { themeId, setThemeId } = useTheme();

  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartW = useRef(0);

  useEffect(() => {
    setSidebarOpen(!compact);
    setDrawerOpen(false);
  }, [compact]);

  const toast = useCallback((icon, msg) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, icon, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const changeTheme = useCallback(
    (id) => {
      setThemeId(id);
      const t = themes.find((x) => x.id === id);
      if (t) toast(t.icon, `Theme switched to ${t.name}`);
    },
    [setThemeId, toast],
  );

  const openFile = useCallback((id) => {
    if (id === "resume") {
      window.open(RESUME_FILE, "_blank");
      return;
    }
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    setActiveFile(id);
  }, []);

  const closeTab = useCallback((id) => {
    setOpenTabs((tabs) => {
      const rest = tabs.filter((t) => t !== id);
      const next = rest.length ? rest : ["home"];
      setActiveFile((cur) => (cur === id ? next[next.length - 1] : cur));
      return next;
    });
  }, []);

  const closeAllTabs = useCallback(() => {
    setOpenTabs(["home"]);
    setActiveFile("home");
  }, []);

  const toggleCopilot = useCallback(() => setCopilotOpen((v) => !v), []);

  /* ── Keyboard shortcuts ───────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "p") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (mod && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      }
      if (mod && e.key === "`") {
        e.preventDefault();
        setTermOpen((v) => !v);
      }
      if (mod && e.shiftKey && e.key === "C") {
        e.preventDefault();
        toggleCopilot();
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleCopilot]);

  /* ── Retro cursor (desktop only) ──────────────────────────────── */
  useEffect(() => {
    if (compact) return;

    const style = document.createElement("style");
    style.id = "retro-cursor-style";
    style.textContent = `
      * { cursor: none !important; }
      #retro-cursor-outer {
        position: fixed;
        width: 26px; height: 26px;
        border: 1.5px solid rgba(255,255,255,0.55);
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        transition: width 0.18s ease, height 0.18s ease, border-color 0.18s ease, background 0.18s ease;
      }
      #retro-cursor-outer::before, #retro-cursor-outer::after {
        content: ''; position: absolute; background: rgba(255,255,255,0.4);
      }
      #retro-cursor-outer::before {
        top: 50%; left: -5px; width: 4px; height: 1px; transform: translateY(-50%);
      }
      #retro-cursor-outer::after {
        left: 50%; top: -5px; height: 4px; width: 1px; transform: translateX(-50%);
      }
      #retro-cursor-inner {
        position: fixed;
        width: 5px; height: 5px;
        background: rgba(255,255,255,0.9);
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 6px rgba(255,255,255,0.5);
      }
    `;
    document.head.appendChild(style);

    const outer = document.createElement("div");
    outer.id = "retro-cursor-outer";
    const inner = document.createElement("div");
    inner.id = "retro-cursor-inner";
    document.body.appendChild(outer);
    document.body.appendChild(inner);

    let mx = -100;
    let my = -100;
    let ox = -100;
    let oy = -100;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      inner.style.left = mx + "px";
      inner.style.top = my + "px";

      const el = document.elementFromPoint(mx, my);
      const interactive =
        el &&
        (el.closest("a") ||
          el.closest("button") ||
          el.closest("input") ||
          el.closest("textarea"));

      if (interactive) {
        outer.style.width = "38px";
        outer.style.height = "38px";
        outer.style.borderColor = "rgba(78,201,176,0.8)";
        outer.style.background = "rgba(78,201,176,0.06)";
        inner.style.background = "#4ec9b0";
        inner.style.boxShadow = "0 0 6px rgba(78,201,176,0.7)";
      } else {
        outer.style.width = "40px";
        outer.style.height = "40px";
        outer.style.borderColor = "rgba(255,255,255,0.55)";
        outer.style.background = "transparent";
        inner.style.background = "rgba(255,255,255,0.9)";
        inner.style.boxShadow = "0 0 6px rgba(255,255,255,0.5)";
      }
    };

    let raf;
    const tick = () => {
      ox += (mx - ox) * 0.75;
      oy += (my - oy) * 0.13;
      outer.style.left = ox + "px";
      outer.style.top = oy + "px";
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.getElementById("retro-cursor-style")?.remove();
      document.getElementById("retro-cursor-outer")?.remove();
      document.getElementById("retro-cursor-inner")?.remove();
    };
  }, [compact]);

  /* ── Copilot pane resize ──────────────────────────────────────── */
  const startResize = useCallback(
    (e) => {
      e.preventDefault();
      dragging.current = true;
      dragStartX.current = e.clientX;
      dragStartW.current = copilotWidth;

      const onMove = (ev) => {
        if (!dragging.current) return;
        const delta = dragStartX.current - ev.clientX;
        setCopilotWidth(
          Math.min(COPILOT_MAX, Math.max(COPILOT_MIN, dragStartW.current + delta)),
        );
      };
      const onUp = () => {
        dragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [copilotWidth],
  );

  const gridStyle = (() => {
    const side = sidebarOpen ? "220px" : "0px";
    return copilotOpen
      ? {
          gridTemplateColumns: `48px ${side} 1fr ${copilotWidth}px`,
          gridTemplateAreas: `'title  title  title  title'
           'menu   menu   menu   menu'
           'act    side   editor copilot'
           'status status status status'`,
        }
      : {
          gridTemplateColumns: `48px ${side} 1fr`,
          gridTemplateAreas: `'title  title  title'
         'menu   menu   menu'
         'act    side   editor'
         'status status status'`,
        };
  })();

  const renderView = () => {
    switch (activeFile) {
      case "home":
        return <Home onNavigate={openFile} />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "experience":
        return <Experience />;
      case "contact":
        return <Contact onToast={toast} />;
      case "readme":
        return <Readme />;
      default:
        return <div className="p-6 text-vscode-dim text-sm">File not found</div>;
    }
  };

  const palette = paletteOpen && (
    <CommandPalette
      query={query}
      onQueryChange={setQuery}
      onSelect={(id) => {
        if (id === "copilot") {
          toggleCopilot();
        } else {
          openFile(id);
        }
        setPaletteOpen(false);
        setQuery("");
      }}
      onClose={() => {
        setPaletteOpen(false);
        setQuery("");
      }}
      onToggleCopilot={toggleCopilot}
    />
  );

  /* ── Compact (mobile / tablet) layout ─────────────────────────── */
  if (compact) {
    const bar = {
      display: "block",
      height: "1.5px",
      width: "18px",
      borderRadius: "2px",
      background: "var(--text)",
    };

    return (
      <>
        <div className="app-grid app-compact">
          <div className="compact-topbar">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open explorer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "6px",
                borderRadius: "4px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={bar} />
              <span style={bar} />
              <span style={bar} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                overflow: "hidden",
                flex: 1,
                minWidth: 0,
              }}
            >
              <span style={{ color: "var(--dim)", flexShrink: 0 }}>~/</span>
              <span
                style={{
                  color: "var(--text)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {copilotOpen ? "copilot" : activeFile}
              </span>
            </div>

            <button
              onClick={toggleCopilot}
              title="Hieu's Copilot (Ctrl+Shift+C)"
              style={{
                flexShrink: 0,
                width: "28px",
                height: "28px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: copilotOpen
                  ? "rgba(110,64,201,0.4)"
                  : "rgba(255,255,255,0.06)",
                border: copilotOpen
                  ? "1px solid rgba(110,64,201,0.6)"
                  : "1px solid transparent",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={copilotOpen ? "#b48eff" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
              </svg>
              {!copilotOpen && (
                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#6E40C9",
                    animation: "pulse-dot 2s infinite",
                  }}
                />
              )}
            </button>

            <button
              onClick={() => setPaletteOpen(true)}
              style={{
                marginLeft: "4px",
                flexShrink: 0,
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.06)",
                color: "var(--dim)",
                border: "none",
                cursor: "pointer",
              }}
            >
              🔍
            </button>
          </div>

          <div className="compact-content">
            {copilotOpen ? (
              <Copilot onClose={() => setCopilotOpen(false)} />
            ) : (
              <div className="pane-enter" key={activeFile}>
                {renderView()}
              </div>
            )}
          </div>

          <div className="compact-status">
            <StatusBar
              activeFile={activeFile}
              onToggleTerm={() => {}}
              themeId={themeId}
              onThemeChange={changeTheme}
              onToggleCopilot={toggleCopilot}
            />
          </div>
        </div>

        {drawerOpen && (
          <MobileDrawer
            activeFile={activeFile}
            onNavigate={openFile}
            onClose={() => setDrawerOpen(false)}
            themeId={themeId}
            onThemeChange={changeTheme}
            onToggleCopilot={toggleCopilot}
          />
        )}

        {palette}
        <Toasts toasts={toasts} />
      </>
    );
  }

  /* ── Desktop layout ───────────────────────────────────────────── */
  return (
    <>
      <div className="app-grid" style={gridStyle}>
        <TitleBar onOpenCmd={() => setPaletteOpen(true)} />

        <MenuBar
          onToggleTerm={() => setTermOpen((v) => !v)}
          onOpenCmd={() => setPaletteOpen(true)}
          onNavigate={openFile}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          onToggleCopilot={toggleCopilot}
          activeFile={activeFile}
          openTabs={openTabs}
          onCloseTab={closeTab}
          onCloseAllTabs={closeAllTabs}
        />

        <ActivityBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          onOpenCmd={() => setPaletteOpen(true)}
          onToggleTerm={() => setTermOpen((v) => !v)}
          themeId={themeId}
          onThemeChange={changeTheme}
          copilotOpen={copilotOpen}
          onToggleCopilot={toggleCopilot}
        />

        {sidebarOpen && (
          <Sidebar
            activeFile={activeFile}
            onFileClick={openFile}
            copilotOpen={copilotOpen}
            onToggleCopilot={toggleCopilot}
          />
        )}

        <div
          style={{ gridArea: "editor" }}
          className="flex flex-col overflow-hidden bg-vscode-bg"
        >
          <Tabs
            openTabs={openTabs}
            activeFile={activeFile}
            onTabClick={openFile}
            onTabClose={closeTab}
          />
          <Breadcrumbs activeFile={activeFile} />
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="pane-enter" key={activeFile}>
              {renderView()}
            </div>
          </div>
          {termOpen && (
            <Terminal onClose={() => setTermOpen(false)} onOpenFile={openFile} />
          )}
        </div>

        {copilotOpen && (
          <div
            style={{
              gridArea: "copilot",
              borderLeft: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              position: "relative",
              height: "100%",
            }}
          >
            <div
              onMouseDown={startResize}
              title="Drag to resize"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "5px",
                cursor: "col-resize",
                zIndex: 10,
                background: "transparent",
                transition: "background .15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(110,64,201,0.35)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            />
            <Copilot onClose={() => setCopilotOpen(false)} />
          </div>
        )}

        <StatusBar
          activeFile={activeFile}
          onToggleTerm={() => setTermOpen((v) => !v)}
          themeId={themeId}
          onThemeChange={changeTheme}
          onToggleCopilot={toggleCopilot}
        />
      </div>

      {palette}
      <Toasts toasts={toasts} />
    </>
  );
}
