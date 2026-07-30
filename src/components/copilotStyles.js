export const copilotStyles = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.cp-root {
  display: flex; flex-direction: column;
  height: 100%; max-height: 100%;
  background: var(--bg,#1e1e1e);
  font-family: -apple-system,"Segoe UI",system-ui,sans-serif;
  font-size: 13px; color: var(--text,#ccc);
  overflow: hidden; position: relative;
}
.cp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 10px; height: 36px; flex-shrink: 0;
  background: var(--bg2,#252526); border-bottom: 1px solid var(--border,#2d2d2d);
}
.cp-header-l { display: flex; align-items: center; gap: 7px; }
.cp-header-title { font-size: 11.5px; font-weight: 600; color: var(--text,#ccc); }
.cp-header-r { display: flex; gap: 1px; }
.cp-hbtn {
  background: transparent; border: none; color: var(--dim,#858585);
  cursor: pointer; width: 26px; height: 26px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center; transition: all .12s;
}
.cp-hbtn:hover { background: rgba(255,255,255,.08); color: var(--text,#ccc); }
.cp-ctx {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 10px; flex-shrink: 0;
  border-bottom: 1px solid var(--border,#2d2d2d);
  background: rgba(255,255,255,.015);
}
.cp-ctx-lbl { font-size: 10px; color: var(--dim,#666); text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
.cp-ctx-pill {
  display: inline-flex; align-items: center; gap: 4px;
  background: rgba(0,122,204,.1); border: 1px solid rgba(0,122,204,.25);
  border-radius: 4px; padding: 2px 8px; font-size: 11px; color: #75beff;
}
.cp-ctx-dot { width: 5px; height: 5px; border-radius: 50%; background: #75beff; opacity: .7; }
.cp-msgs {
  flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden;
  padding: 8px 0 4px;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.08) transparent;
}
.cp-msgs::-webkit-scrollbar { width: 4px; }
.cp-msgs::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 3px; }
.cp-welcome {
  display: flex; flex-direction: column; align-items: center;
  padding: 20px 14px 8px; gap: 5px; animation: cp-in .22s ease;
}
.cp-welcome-av {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(110,64,201,.15); border: 1.5px solid rgba(110,64,201,.35);
  display: flex; align-items: center; justify-content: center; margin-bottom: 4px;
}
.cp-welcome-title { font-size: 14px; font-weight: 700; color: var(--bright,#fff); margin: 0; }
.cp-welcome-sub { font-size: 11.5px; color: var(--dim,#858585); margin: 0 0 8px; text-align: center; line-height: 1.55; max-width: 240px; }
.cp-sug-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; width: 100%; }
.cp-sug-card {
  display: flex; align-items: flex-start; gap: 5px;
  background: rgba(255,255,255,.025); border: 1px solid var(--border,#2d2d2d);
  border-radius: 7px; padding: 8px 9px; font-size: 11.5px; color: var(--dim,#858585);
  cursor: pointer; text-align: left; font-family: inherit; line-height: 1.35; transition: all .12s;
}
.cp-sug-card:hover { background: rgba(110,64,201,.12); border-color: rgba(110,64,201,.35); color: var(--text,#ccc); }
.cp-sug-card svg { flex-shrink: 0; margin-top: 2px; color: #6E40C9; }
.cp-user-av {
  width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg,#007acc,#0050a0);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: white; margin-top: 1px;
}
.cp-asst-av {
  width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
  background: rgba(110,64,201,.2); border: 1px solid rgba(110,64,201,.4);
  display: flex; align-items: center; justify-content: center; margin-top: 1px;
}
.cp-user-row {
  display: flex; justify-content: flex-end; align-items: flex-start;
  gap: 7px; padding: 3px 10px; animation: cp-in .18s ease;
}
.cp-bubble-user {
  max-width: 82%; background: rgba(0,122,204,.14);
  border: 1px solid rgba(0,122,204,.22); border-radius: 10px 10px 2px 10px;
  padding: 7px 11px; font-size: 13px; color: var(--text,#ccc);
  line-height: 1.5; word-break: break-word;
}
.cp-asst-row { display: flex; align-items: flex-start; gap: 8px; padding: 4px 10px; animation: cp-in .18s ease; }
.cp-asst-body { flex: 1; min-width: 0; }
.cp-asst-label {
  font-size: 10.5px; font-weight: 600; color: var(--dim,#858585);
  margin-bottom: 4px; display: flex; align-items: center; gap: 5px;
}
.cp-badge { font-size: 9px; background: rgba(110,64,201,.2); color: #b48eff; border-radius: 3px; padding: 0 4px; }
.cp-bubble-asst {
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
  border-radius: 2px 10px 10px 10px; padding: 9px 11px;
}
.cp-md { line-height: 1.6; }
.cp-p { margin: 0 0 5px; color: var(--text,#ccc); font-size: 13px; }
.cp-p:last-child { margin-bottom: 0; }
.cp-ul { margin: 4px 0 7px; padding: 0; list-style: none; }
.cp-li { display: flex; gap: 7px; margin: 3px 0; font-size: 13px; color: var(--text,#ccc); align-items: flex-start; }
.cp-li-dot { color: #6E40C9; flex-shrink: 0; font-size: 9px; margin-top: 4px; }
.cp-ol { margin: 4px 0 7px; padding: 0; list-style: none; }
.cp-oli { display: flex; gap: 7px; margin: 4px 0; font-size: 13px; color: var(--text,#ccc); align-items: flex-start; }
.cp-oli-num { color: #6E40C9; font-weight: 700; flex-shrink: 0; min-width: 16px; font-size: 12px; }
.cp-icode { font-family:"Cascadia Code",Consolas,monospace; font-size:11.5px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); border-radius:3px; padding:0 4px; color:#ce9178; }
.cp-cursor { display:inline-block; width:2px; height:13px; background:#6E40C9; vertical-align:text-bottom; margin-left:1px; border-radius:1px; animation:cp-blink .7s infinite; }
.cp-code { background:#0d0d0d; border:1px solid rgba(255,255,255,.09); border-radius:6px; overflow:hidden; margin:6px 0; }
.cp-code-head { display:flex; align-items:center; justify-content:space-between; padding:4px 10px; background:rgba(255,255,255,.04); border-bottom:1px solid rgba(255,255,255,.06); }
.cp-code-lang { font-family:Consolas,monospace; font-size:10px; color:var(--dim,#858585); text-transform:uppercase; letter-spacing:.06em; }
.cp-code-copy { display:flex; align-items:center; gap:3px; background:transparent; border:none; color:var(--dim,#858585); font-size:11px; font-family:inherit; cursor:pointer; padding:2px 6px; border-radius:3px; transition:all .1s; }
.cp-code-copy:hover { background:rgba(255,255,255,.08); color:var(--text,#ccc); }
.cp-code-pre { margin:0; padding:10px 14px; font-family:"Cascadia Code",Consolas,monospace; font-size:12px; line-height:1.65; color:#d4d4d4; overflow-x:auto; white-space:pre; }
.cp-acts { display:flex; gap:2px; margin-top:5px; }
.cp-act { background:transparent; border:none; color:#4a4a4a; cursor:pointer; padding:3px 5px; border-radius:3px; display:flex; align-items:center; gap:3px; font-size:11px; font-family:inherit; transition:all .1s; }
.cp-act:hover { background:rgba(255,255,255,.07); color:var(--text,#ccc); }
.cp-act--up { color:#4ec9b0!important; }
.cp-act--dn { color:#f44747!important; }
.cp-typing { display:flex; align-items:center; gap:8px; padding:5px 10px; animation:cp-in .15s ease; }
.cp-dots { display:flex; gap:4px; }
.cp-dots span { width:6px; height:6px; border-radius:50%; background:#6E40C9; animation:cp-bounce 1.1s infinite; }
.cp-dots span:nth-child(2) { animation-delay:.18s; }
.cp-dots span:nth-child(3) { animation-delay:.36s; }
.cp-err { margin:4px 10px; padding:8px 11px; background:rgba(244,71,71,.08); border:1px solid rgba(244,71,71,.2); border-radius:6px; font-size:12px; color:#f88; }
.cp-countdown { text-align:center; padding:3px 10px; font-size:10.5px; color:#fbbf24; border-top:1px solid var(--border,#2d2d2d); flex-shrink:0; }
.cp-chips { padding:5px 8px; display:flex; flex-wrap:wrap; gap:4px; border-top:1px solid var(--border,#2d2d2d); flex-shrink:0; }
.cp-chip { display:inline-flex; align-items:center; gap:4px; background:transparent; border:1px solid var(--border,#333); border-radius:10px; padding:2px 9px; font-size:11px; color:var(--dim,#858585); cursor:pointer; font-family:inherit; transition:all .1s; }
.cp-chip:hover { background:rgba(110,64,201,.1); color:var(--text,#ccc); border-color:rgba(110,64,201,.4); }
.cp-input-area { padding:6px 8px 6px; border-top:1px solid var(--border,#2d2d2d); flex-shrink:0; }
.cp-input-box { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); border-radius:9px; overflow:hidden; transition:border-color .15s; }
.cp-input-box:focus-within { border-color:rgba(110,64,201,.55); box-shadow:0 0 0 3px rgba(110,64,201,.08); }
.cp-textarea { width:100%; background:transparent; border:none; outline:none; color:var(--text,#ccc); font-family:inherit; font-size:13px; padding:9px 11px 3px; resize:none; min-height:34px; max-height:100px; line-height:1.5; caret-color:#6E40C9; }
.cp-textarea::placeholder { color:var(--dim,#444); }
.cp-textarea:disabled { opacity:.4; cursor:not-allowed; }
.cp-toolbar { display:flex; align-items:center; padding:3px 7px 5px; gap:4px; }
.cp-toolbar-info { font-size:10px; color:var(--dim,#444); }
.cp-send { margin-left:auto; width:28px; height:28px; border-radius:6px; background:linear-gradient(135deg,#6E40C9,#4a2d8e); border:none; color:white; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .12s; flex-shrink:0; box-shadow:0 2px 8px rgba(110,64,201,.3); }
.cp-send:hover:not(:disabled) { background:linear-gradient(135deg,#7c52d4,#5a3d9e); transform:translateY(-1px); box-shadow:0 4px 12px rgba(110,64,201,.4); }
.cp-send:disabled { opacity:.3; cursor:not-allowed; transform:none; box-shadow:none; }
.cp-disclaimer { text-align:center; font-size:10px; color:var(--dim,#3a3a3a); margin:3px 0 0; }
.cp-modal-overlay {
  position: absolute; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.85);
  display: flex; align-items: center; justify-content: center;
  padding: 12px; animation: cp-in .2s ease; backdrop-filter: blur(4px);
  overflow-y: auto;
}
.cp-modal {
  background: #0d0d1a; border: 2px solid rgba(110,64,201,.6); border-radius: 10px;
  padding: 18px 16px; width: 100%; max-width: 360px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  box-shadow: 0 0 40px rgba(110,64,201,.25), 0 0 80px rgba(110,64,201,.1);
}
.cp-modal-header { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.cp-pixel-title { font-family: 'Press Start 2P', monospace; font-size: 11px; color: #ff4444; text-shadow: 2px 2px 0 #800, 0 0 10px rgba(255,68,68,.4); letter-spacing: .05em; }
.cp-pixel-lives { font-family: 'Press Start 2P', monospace; font-size: 12px; color: #ff4444; display: flex; gap: 3px; }
.cp-modal-sub { font-family: 'Press Start 2P', monospace; font-size: 7px; color: rgba(255,255,255,.55); text-align: center; line-height: 1.9; margin: 0; }
.cp-pixel-highlight { color: #fbbf24; }
.cp-modal-score-row { display: flex; align-items: center; justify-content: space-between; width: 100%; font-family: 'Press Start 2P', monospace; font-size: 8px; }
.cp-pixel-score { color: rgba(255,255,255,.5); }
.cp-pixel-target { color: #f44747; }
.cp-pixel-unlocked { color: #4ec9b0; animation: cp-blink .8s infinite; }
.cp-modal-unlock-btn { font-family: 'Press Start 2P', monospace; font-size: 9px; background: linear-gradient(135deg,#4ec9b0,#22a891); color: #0d0d1a; border: none; border-radius: 5px; padding: 10px 20px; cursor: pointer; width: 100%; letter-spacing: .05em; transition: opacity .12s; text-shadow: none; box-shadow: 0 0 12px rgba(78,201,176,.4); }
.cp-modal-unlock-btn:hover { opacity: .88; }
.cp-modal-coffee-btn { display: block; width: 100%; text-align: center; font-family: 'Press Start 2P', monospace; font-size: 8px; background: linear-gradient(135deg,#f59e0b,#e07b0a); color: #0d0d1a; border: none; border-radius: 5px; padding: 10px 16px; cursor: pointer; text-decoration: none; letter-spacing: .04em; box-shadow: 0 0 12px rgba(245,158,11,.35); transition: opacity .12s; }
.cp-modal-coffee-btn:hover { opacity: .88; }
.cp-modal-skip { font-family: 'Press Start 2P', monospace; font-size: 7px; background: transparent; border: none; color: rgba(255,255,255,.25); cursor: pointer; text-decoration: underline; letter-spacing: .03em; padding: 0; }
.cp-modal-skip:hover { color: rgba(255,255,255,.5); }

@keyframes cp-in { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
@keyframes cp-blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes cp-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
`;
