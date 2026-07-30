/* ── File-type icons (explorer / tabs / palette) ───────────────── */

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <circle cx="12" cy="12" r="2.05" fill="#61dafb" />
    <g fill="none" stroke="#61dafb" strokeWidth="1.1">
      <ellipse rx="10.5" ry="3.8" cx="12" cy="12" />
      <ellipse rx="10.5" ry="3.8" cx="12" cy="12" transform="rotate(60 12 12)" />
      <ellipse rx="10.5" ry="3.8" cx="12" cy="12" transform="rotate(120 12 12)" />
    </g>
  </svg>
);

const TsIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#3178c6" />
    <path
      d="M14.39 18.18V20c.36.18.8.32 1.3.42.5.1 1.03.15 1.58.15.54 0 1.05-.06 1.53-.17.48-.12.9-.3 1.26-.56.36-.25.64-.58.85-.97.21-.4.31-.87.31-1.43 0-.41-.06-.77-.18-1.08-.12-.31-.3-.59-.53-.83-.23-.24-.51-.46-.84-.65-.33-.2-.7-.38-1.11-.56-.3-.12-.56-.24-.79-.36-.23-.11-.42-.23-.58-.35-.16-.12-.28-.25-.36-.39a.92.92 0 0 1-.12-.47c0-.16.04-.31.11-.44.07-.13.17-.24.31-.33.13-.09.29-.16.48-.21.18-.05.39-.07.62-.07.17 0 .34.01.53.04.18.03.37.07.55.14.18.06.36.14.53.24.17.1.32.21.45.35v-1.7a5.4 5.4 0 0 0-1.09-.31 7.3 7.3 0 0 0-1.24-.1c-.52 0-1.01.06-1.48.18-.46.12-.87.31-1.22.56-.35.25-.62.57-.83.96-.2.39-.31.85-.31 1.39 0 .69.2 1.27.59 1.74.4.47.97.86 1.74 1.18.31.12.6.25.86.37.26.12.49.24.68.38.19.13.34.28.45.44.11.16.16.34.16.55 0 .15-.03.3-.1.43-.07.13-.17.25-.31.35-.13.1-.3.18-.5.24-.2.06-.43.09-.69.09-.44 0-.88-.08-1.31-.25a4.5 4.5 0 0 1-1.17-.76zM8.75 10.1H11.5V8.5H4.5v1.6H7.25V20h1.5V10.1z"
      fill="white"
    />
  </svg>
);

const JsIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#f7df1e" />
    <path
      d="M7.5 17.8c.4.65 1.15 1.2 2.15 1.2 1.1 0 1.85-.6 1.85-1.7V12h-1.6v5.25c0 .55-.25.8-.65.8-.4 0-.7-.25-.9-.6l-.85.35zM13.5 17.6c.5.8 1.35 1.4 2.65 1.4 1.35 0 2.35-.7 2.35-1.95 0-1.1-.65-1.6-1.85-2.1l-.4-.15c-.6-.25-.85-.4-.85-.8 0-.35.25-.6.65-.6.4 0 .65.2.9.6l1.25-.8c-.55-.9-1.3-1.2-2.15-1.2-1.25 0-2.1.8-2.1 1.95 0 1.1.65 1.6 1.65 2.05l.4.15c.7.3 1.05.5 1.05.95 0 .4-.35.7-.9.7-.65 0-1.05-.35-1.35-.85l-1.3.65z"
      fill="black"
    />
  </svg>
);

const JsonIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#cbcb41" opacity="0.18" />
    <text
      x="2"
      y="17"
      fontFamily="monospace"
      fontSize="11"
      fontWeight="bold"
      fill="#cbcb41"
    >
      {"{ }"}
    </text>
  </svg>
);

const MdIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#519aba" opacity="0.18" />
    <rect
      x="2"
      y="5.5"
      width="20"
      height="13"
      rx="1.5"
      fill="none"
      stroke="#519aba"
      strokeWidth="1.2"
    />
    <path
      d="M5.5 10v4M5.5 10l2 2 2-2v4M13 14v-4l2 2 2-2"
      fill="none"
      stroke="#519aba"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#264de4" opacity="0.18" />
    <path
      d="M3 2l1.72 19.29L12 23l7.27-1.71L21 2H3zm14.1 5.73-.26 2.8-4.84 1.37 4.84.04-.33 3.88-4.51 1.31-4.52-1.26-.3-3.38h2.8l.15 1.77 1.87.5 1.88-.5.2-2.32-6.08-.04.19-2.09 5.7.02.2-1.84H7.82l-.2-2.26h10.74l-.26.0z"
      fill="#264de4"
    />
  </svg>
);

const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#e34c26" opacity="0.18" />
    <path
      d="M3 2l1.72 19.29L12 23l7.27-1.71L21 2H3zm13.12 14.04-4.1 1.13-4.12-1.13-.27-3.06h2.07l.14 1.6 2.18.6 2.17-.6.23-2.56H8.08l-.19-2.16h7.04l.18-2.01H6.96L6.77 5.9h10.46l-1.11 10.14z"
      fill="#e34c26"
    />
  </svg>
);

const PdfIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#f44336" opacity="0.15" />
    <path
      d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      fill="none"
      stroke="#f44336"
      strokeWidth="1.3"
    />
    <path d="M14 2v5h5" fill="none" stroke="#f44336" strokeWidth="1.3" />
    <text
      x="5"
      y="17"
      fontFamily="monospace"
      fontSize="5.5"
      fontWeight="bold"
      fill="#f44336"
    >
      PDF
    </text>
  </svg>
);

export const fileIcons = {
  home: ReactIcon,
  about: HtmlIcon,
  projects: JsIcon,
  skills: JsonIcon,
  experience: TsIcon,
  contact: CssIcon,
  readme: MdIcon,
  resume: PdfIcon,
};

/* ── Activity-bar icons ────────────────────────────────────────── */

export const ExplorerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const BranchIcon = ({ size = 22, width = "1.4" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="12" r="3" />
    <path d="M6 9v6M9 12h6" />
  </svg>
);

export const GearIcon = ({ size = 22, width = "1.4" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const DownloadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <polyline points="9 14 12 17 15 14" />
  </svg>
);

export const SparkleIcon = ({ size = 20, stroke = "currentColor", width = "1.8" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
  </svg>
);

/* ── Social / contact icons ────────────────────────────────────── */

export const GithubIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const LinkedinIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const MailIcon = ({ size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const PhoneIcon = ({ size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ── Copilot / chat icons ──────────────────────────────────────── */

export const BotIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#6E40C9" opacity="0.18" />
    <path
      d="M8 2.5C5.5 2.5 3.5 4.5 3.5 7c0 1.2.45 2.3 1.18 3.13.1.12.18.3.18.5V12a.5.5 0 00.5.5h5.28a.5.5 0 00.5-.5v-1.37c0-.2.07-.38.18-.5A4.48 4.48 0 0012.5 7c0-2.5-2-4.5-4.5-4.5z"
      fill="#6E40C9"
    />
    <circle cx="6.2" cy="7" r=".95" fill="white" />
    <circle cx="9.8" cy="7" r=".95" fill="white" />
    <path
      d="M6.3 9.5c.45.35 1.05.55 1.7.55s1.25-.2 1.7-.55"
      stroke="white"
      strokeWidth=".8"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 8l3.22 3.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 9.06l-3.22 3.22a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
  </svg>
);

export const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z" />
  </svg>
);

export const SendIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.724 1.053a.5.5 0 00-.714.545l1.403 4.85a.5.5 0 00.397.354l5.69.953c.268.053.268.437 0 .49l-5.69.953a.5.5 0 00-.397.354l-1.403 4.85a.5.5 0 00.714.545l13-6.5a.5.5 0 000-.894l-13-6.5z" />
  </svg>
);

export const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
  </svg>
);

export const ThumbUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
  </svg>
);

export const ThumbDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
    <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
  </svg>
);

export const SmallSparkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="M7.5 1.5C7.5.672 8.172 0 9 0s1.5.672 1.5 1.5v.75h.75c.828 0 1.5.672 1.5 1.5S12.078 5.25 11.25 5.25H10.5V6c0 .828-.672 1.5-1.5 1.5S7.5 6.828 7.5 6v-.75h-.75C5.922 5.25 5.25 4.578 5.25 3.75S5.922 2.25 6.75 2.25H7.5V1.5z" />
  </svg>
);
