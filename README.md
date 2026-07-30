# Hieu Vo — Portfolio

A VS Code–styled portfolio: activity bar, explorer, tabs, breadcrumbs, integrated
terminal, command palette, six color themes, and an AI copilot panel.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Editing content

**All copy lives in `src/data/portfolio.js`.** Profile, links, education, experience,
projects, skills, and the fake `git log` are plain exports — edit that one file and
every view updates. To swap the résumé PDF, replace `public/Hieu_Vo_Resume.pdf` and
update the matching entry in the `files` array.

## Keyboard shortcuts

| Key            | Action                   |
| -------------- | ------------------------ |
| `Ctrl+P`       | Command palette          |
| `Ctrl+B`       | Toggle sidebar           |
| `Ctrl+` `      | Toggle terminal          |
| `Ctrl+Shift+C` | Toggle copilot           |
| `↑` / `↓`      | Terminal history         |
| `Esc`          | Close overlay            |

## Terminal commands

`help` · `ls` · `pwd` · `cd` · `cat <file>` · `open <file>` · `whoami` · `echo` ·
`date` · `git log` · `git status` · `python --version` · `clear`

`cat about.html` opens that file in the editor pane.

## The copilot

`src/lib/copilot.js` answers questions from the résumé data locally — no API key or
server needed. It first tries `POST /api/chat` (OpenAI-compatible response shape), so
if you later add a real LLM backend at that route it will be used automatically and
the local answers become the fallback.

Run out of messages and a pixel dino runner appears — score 50 to earn more.

## Layout

```
src/
  data/portfolio.js      all content
  lib/copilot.js         offline answer engine + optional /api/chat
  lib/resume.js          PDF download helper
  hooks/index.js         theme, typewriter, reveal, clock, breakpoint
  components/            shell: TitleBar, MenuBar, ActivityBar, Sidebar, Tabs,
                         StatusBar, CommandPalette, Terminal, Copilot, DinoGame
  components/views/      Home, About, Projects, Skills, Experience, Contact, Readme
  index.css              theme tokens (:root + [data-theme]) and custom rules
```

## Notes

- The contact form opens a pre-filled draft in the visitor's mail client (no backend).
- The retro cursor is desktop-only; below 1024px the app switches to a compact layout
  with a slide-in drawer.
