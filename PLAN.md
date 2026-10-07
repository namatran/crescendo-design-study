# Plan

Hush is an unofficial design study of crescendomusic.live: one glass card on a
time-of-day gradient, with a compact player inside. Next.js App Router,
TypeScript, Tailwind v4, lucide-react, Vitest + Testing Library.

## Architecture
- Static, client-rendered player. No backend: the track list is a typed module,
  audio is static files (`public/audio/` now, Vercel Blob later).
- `NEXT_PUBLIC_AUDIO_BASE_URL` switches audio from `/audio` to a Blob store
  without code changes.
- Theme is picked on the client from the viewer's local clock (server time would
  give the wrong theme and a hydration mismatch). The server renders the night
  palette and an inline script in `<head>` swaps in the real one before first paint.
- Pure logic in `src/lib/` (theme, time formatting, shuffle, audio URLs, cover art),
  each with unit tests.

## Music rule
Tracks come from the BreakingCopyright channel only via the official download
links in each video's description, never ripped from YouTube. Each entry in
`src/data/songs.ts` records title, artist, source URL and license, and the
player shows the credit. Skip any track whose license doesn't allow use on a
website. Audio stays out of git.

## Features (one commit each)
- [x] chore: scaffold next.js app with tailwind and vitest
- [x] docs: add design references for the study
- [x] feat: add time-of-day theme engine
- [x] feat: add glass shell with header and footer
- [x] feat: add song library with license metadata
- [x] feat: add generative cover art
- [x] feat: add audio player with play/pause and seek
- [x] feat: add volume and loop controls
- [x] feat: add shuffle and auto-advance
- [x] feat: show track credit in the player
- [x] feat: add dark mode toggle
- [x] feat: add about modal
- [x] style: tune phone layout and reduced motion
- [x] docs: add readme with handoff prompt
- [x] fix: remove the night-theme flash with a pre-paint script
- [x] test: add playwright e2e for play, seek, next and the modal

## Needs the owner
- [x] Approve each track download (official description links only) into `public/audio/`
- [ ] Vercel Blob store + token, then `chore: serve audio from vercel blob`
