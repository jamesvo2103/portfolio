import { RESUME_FILE } from "../data/portfolio";

/** Open the résumé in a new tab so the browser renders it inline. */
export function openResume() {
  window.open(RESUME_FILE, "_blank", "noopener,noreferrer");
}
