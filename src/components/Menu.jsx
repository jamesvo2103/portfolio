import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

/** Dropdown anchored under a menu-bar button. */
export function Dropdown({ anchorRef, open, onClose, children }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open || !anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 1, left: r.left });
  }, [open, anchorRef]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (
        !anchorRef.current?.contains(e.target) &&
        !panelRef.current?.contains(e.target)
      )
        onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      className="fixed z-[9999] min-w-[200px] rounded border animate-fade-in py-0.5"
      style={{
        top: pos.top,
        left: pos.left,
        background: "var(--bg3)",
        borderColor: "var(--border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.65)",
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

/** Flyout panel anchored to the right of an activity-bar button. */
export function Flyout({ anchorRef, open, onClose, children }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      if (!anchorRef.current || !panelRef.current) return;
      const r = anchorRef.current.getBoundingClientRect();
      const h = panelRef.current.offsetHeight;
      const vh = window.innerHeight;
      const top = r.top + h > vh - 16 ? Math.max(8, vh - h - 16) : r.top;
      setPos({ top, left: r.right + 8 });
    });
    return () => cancelAnimationFrame(raf);
  }, [open, anchorRef]);

  const onDown = useCallback(
    (e) => {
      const inAnchor = anchorRef.current?.contains(e.target);
      const inPanel = panelRef.current?.contains(e.target);
      if (!inAnchor && !inPanel) onClose();
    },
    [onClose, anchorRef],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open, onDown]);

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      className="fixed z-[9999] w-72 rounded border overflow-y-auto thin-scroll"
      style={{
        top: pos.top,
        left: pos.left,
        maxHeight: "calc(100vh - 40px)",
        background: "var(--bg2)",
        borderColor: "var(--border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.65)",
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

export function MenuItem({
  label,
  shortcut,
  onClick,
  disabled = false,
  danger = false,
  highlight = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-2 px-4 py-[5px] text-[12px] text-left transition-colors disabled:opacity-35 cursor-pointer border-none outline-none"
      style={{
        color: danger ? "var(--red)" : highlight ? "#b48eff" : "var(--text)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = "var(--blue2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span className="flex-1">{label}</span>
      {shortcut && (
        <span className="text-[10px]" style={{ color: "var(--dim)" }}>
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function MenuSep() {
  return <div className="my-0.5 border-t" style={{ borderColor: "var(--border)" }} />;
}

export function MenuLabel({ children }) {
  return (
    <div
      className="px-4 pt-1.5 pb-0.5 text-[10px] tracking-widest uppercase"
      style={{ color: "var(--dim)" }}
    >
      {children}
    </div>
  );
}

export function FlyoutHeader({ children }) {
  return (
    <div
      className="px-3 py-2 text-[10px] font-bold tracking-widest uppercase sticky top-0 z-10"
      style={{
        color: "var(--dim)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg2)",
      }}
    >
      {children}
    </div>
  );
}

export function FlyoutSection({ children }) {
  return (
    <div
      className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase"
      style={{ color: "var(--dim)" }}
    >
      {children}
    </div>
  );
}

export function FlyoutSep() {
  return <div className="mx-3 my-1" style={{ borderTop: "1px solid var(--border)" }} />;
}
