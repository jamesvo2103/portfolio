import { RESUME_FILE, files } from "../data/portfolio";

const resumeName = files.find((f) => f.download)?.name || "Hieu_Vo_Resume.pdf";

export function downloadResume() {
  const a = document.createElement("a");
  a.href = RESUME_FILE;
  a.download = resumeName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
