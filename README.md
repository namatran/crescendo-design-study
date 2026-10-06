# Hush (design study)

An **unofficial design study** of [crescendomusic.live](https://www.crescendomusic.live/),
a focus music player whose colours follow the time of day. It rebuilds the
reference's glass card, gradients, type, spacing and player with original code,
copy and generative artwork in Next.js. "Hush" is a placeholder name. This project
is not affiliated with Crescendo. The page ships `noindex` (meta tag,
`X-Robots-Tag` header and a disallow-all `robots.txt`), and a footer credit marks it as a study.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react.
Tests: Vitest + Testing Library (jsdom), Playwright for e2e (audio is stubbed with a silent WAV). There is no backend: the page is static, and
audio is plain files.

## Run

```bash
npm install
npm run dev        # http://localhost:4337
npm test           # unit + component tests
npm run test:e2e   # Playwright e2e (first run: npx playwright install chromium)
npm run typecheck
npm run lint
npm run build && npm start
```

## Music

Tracks are Creative Commons BY releases from the BreakingCopyright channel. Each
one was found through the **📥 Official download link** in its YouTube
description, which points to its breakingcopyright.com song page. Nothing is
downloaded from YouTube. `src/data/songs.ts` records each track's title, artist,
source URL, video URL and license, and the player credits every track with links.

**Audio files are not in git.** To play locally, download each track from its
`sourceUrl` and save it in `public/audio/` under its `file` name:

| File | Track | License |
|---|---|---|
| `sappheiros-embrace.mp3` | Embrace by Sappheiros | CC BY 3.0 |
| `sappheiros-dawn.mp3` | Dawn by Sappheiros | CC BY 3.0 |
| `scott-buckley-filaments.mp3` | Filaments by Scott Buckley | CC BY 3.0 |
| `savfk-the-grid.mp3` | The Grid by Savfk | CC BY 4.0 |

If a file is missing, the player says so instead of failing silently. To serve the files from
Vercel Blob later, upload them and set `NEXT_PUBLIC_AUDIO_BASE_URL` to the folder
URL. No code changes are needed.

> **Open question:** BreakingCopyright's FAQ says compilations are not allowed
> "even giving credits to each of the artists". Each track's CC BY license
> permits reuse, but check whether a public multi-track player counts as a
> compilation before you deploy it publicly.

## Where things live

| Path | What |
|---|---|
| `PLAN.md` | Architecture, music rule, feature checklist (one commit each) |
| `CLAUDE.md` | Commands and conventions for Claude Code sessions |
| `docs/DESIGN-REFS.md` | Phase 1 measurements: sections, type, theme palettes, spacing, components, motion |
| `e2e/` | Playwright specs; `silentAudio.ts` stubs `/audio/*` with a silent WAV |
| `docs/PROMPT.md` | The reusable prompt for the next design study |
| `src/data/content.ts` | Every user-facing string |
| `src/data/songs.ts` | Track list with source and license metadata |
| `src/lib/theme.ts` | Time-of-day palettes and `getThemeName(date)` |
| `src/lib/queue.ts` | Shuffle / next-track logic |
| `src/lib/coverArt.ts`, `random.ts` | Seeded generative cover art |
| `src/lib/songs.ts`, `time.ts` | Audio URLs, credit line, time formatting |
| `src/hooks/usePlayback.ts` | Wraps one `<audio>` element (play, seek, volume, loop, ended) |
| `src/components/AppShell.tsx` | Glass card, header, footer, dark player toggle, About modal |
| `src/components/PlayerStage.tsx` | Queue and the settings that persist across tracks |
| `src/components/player/*` | Player card, progress bar, track credit |

## Differences from the reference

- The reference has no breakpoints. Below 640px this study stacks the player
  (art above the controls) and the footer, because the side-by-side layout doesn't fit at 375.
- It adds Next and Shuffle buttons (the reference shuffles silently). At 768 the
  volume slider wraps to its own row.
- The moon/sun toggle switches the player card between light and dark (in the
  reference it has no visible effect), and the choice is remembered.
- The server renders the night theme because it can't know the viewer's clock. An inline
  script in `<head>` (`themeInitScript` in `src/lib/theme.ts`) sets the real theme on `<html>`
  before first paint, and `useTimeTheme` keeps it current.
- The live reference's song API currently fails CORS, so its player could only be
  measured from its public source.

## Handoff prompt for the next session

```text
Continue the Hush design study in ~/Dev/crescendo-design-study. Read CLAUDE.md,
PLAN.md and README.md first. Every feature in PLAN.md is done. Next steps, one
commit each:
1. Once I confirm, add the four audio files to public/audio/ from their
   sourceUrl (official BreakingCopyright pages only) and check that every track plays.
2. chore: serve audio from vercel blob (upload the files, set NEXT_PUBLIC_AUDIO_BASE_URL).
Run test, typecheck, lint and build before each commit. Never push without asking.
```
