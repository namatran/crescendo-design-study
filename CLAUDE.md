@AGENTS.md

# Hush (design study)

Unofficial design study of crescendomusic.live: a focus music player with
time-of-day themes. Original code, copy, art and audio only. Never copy the
reference's images, audio, logos or text. See `docs/DESIGN-REFS.md` and `PLAN.md`.

## Commands
- `npm run dev` → http://localhost:4337
- `npm test` (Vitest + Testing Library), `npm run typecheck`, `npm run lint`, `npm run build`
- `npm run test:e2e` (Playwright, Chromium; starts the dev server if it isn't running). Audio is stubbed, so no real tracks needed. First time: `npx playwright install chromium`

## Conventions
- One feature from PLAN.md = one Conventional Commit. Tick it off in PLAN.md in the same commit.
- Tests, typecheck and lint must pass before committing. Never push without asking.
- Keep logic in pure functions under `src/lib/` with unit tests; components stay thin.
- All user-facing copy lives in `src/data/content.ts`.
- Theme colours are CSS variables set per theme; components read `var(--…)`, never hard-code theme hex.
- Respect `prefers-reduced-motion`. Keep the page `noindex`.
