# Reusable prompt: design study of a web app (Next.js)

This is the prompt that produced this repo, adapted from the earlier Kerra and
RiceApps design-study prompts for an interactive app instead of a marketing page.
Swap the URL, the feature list and the asset rules for the next study.

---

```text
I want to recreate the design of https://www.crescendomusic.live/ as a learning
project: an unofficial design study. I'm not technical, so handle the setup
yourself: create the project in ~/Dev/<name>-design-study, choose a free port
for the local preview, install what's needed, and give me the link to open when
it's running. If a port is already in use, choose another one and never stop a
program that's already running.

GOAL
Match the original's LAYOUT, TYPE, SPACING, COLOR and MOTION as closely as
possible, and rebuild its FEATURES with original code and content. Work in
phases. Do not start Phase 2 until the Phase 1 document is written.

PHASE 0: PLAN → PLAN.md and CLAUDE.md
Use plan mode. Write PLAN.md with the architecture, the data model, and an
ordered feature list where each item is one Conventional Commit
(feat/fix/style/docs/test/chore). Write CLAUDE.md with the commands, the
conventions below and the rules. Make the scaffold the first commit.

PHASE 1: MEASURE THE ORIGINAL → docs/DESIGN-REFS.md
Open the site in a browser tool that can run JavaScript. Measure with
getComputedStyle and getBoundingClientRect at 1440×900, 768×1024 and 375×812.
Record the sections, a type table, colours (including every theme variant), the
grid and spacing, the breakpoints, the components and their hover states, the
motion, and the assets plus what you'll use instead. If part of the app doesn't
render (for example a dead API), say so and fill the gap from the public
repo's layout values only. Never copy its code.

PHASE 2: BUILD, ONE FEATURE PER COMMIT
Stack: Next.js (App Router) + TypeScript + Tailwind + lucide-react. Tests use
Vitest + Testing Library. No backend unless a feature needs one.
- All copy goes in src/data/content.ts. Theme colours are CSS variables.
- Pure logic goes in src/lib/ with unit tests, and components stay thin.
- Compute anything clock-based or random on the client so it doesn't cause hydration mismatches.
For each feature in PLAN.md: build it, write tests, run test + typecheck +
lint, check it in the browser at the three widths against the original, tick
it off in PLAN.md, then commit with a Conventional Commit message.

MUSIC
Use tracks from the BreakingCopyright channel only via the official download
links in each video's description, never by downloading from YouTube itself.
For each track, record title, artist, source URL and license in
src/data/songs.ts, and show the credit in the player. Skip any track whose
license doesn't allow use in a website. Keep audio out of git (start with
public/audio/ for a few tracks, then move to Vercel Blob). This is the one
allowed exception to the "no original assets" rule. Ask me before each download.

RULES
- Do NOT copy the original's images, logos, icons, code or written text. Use an
  original placeholder brand name, generated artwork and original copy.
- Add `robots: noindex` and this footer line: "Unofficial design study of
  crescendomusic.live. Not affiliated."
- Respect prefers-reduced-motion. Make every control keyboard accessible.
- Commit in small steps, one feature per commit. Never push anywhere without asking.
- If something is unclear, ask me instead of guessing.
- Before you say it's done, run `npm run build`, run /code-review on the
  branch, and compare the two sites side by side. Then tell me what still
  looks different.

WHEN YOU FINISH
Give me the local link, plus a README that covers how to start it again, where
things live, and a handoff prompt for the next session.
```
