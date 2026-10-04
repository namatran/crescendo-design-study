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
  give the wrong theme and a hydration mismatch). Until it resolves, the night
  palette shows.
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
- [ ] docs: add design references for the study
- [ ] feat: add time-of-day theme engine
- [ ] feat: add glass shell with header and footer
- [ ] feat: add song library with license metadata
- [ ] feat: add generative cover art
- [ ] feat: add audio player with play/pause and seek
- [ ] feat: add volume and loop controls
- [ ] feat: add shuffle and auto-advance
- [ ] feat: show track credit in the player
- [ ] feat: add dark mode toggle
- [ ] feat: add about modal
- [ ] style: tune phone layout and reduced motion
- [ ] docs: add readme with handoff prompt

## Needs the owner
- [ ] Approve each track download (official description links only) into `public/audio/`
- [ ] Vercel Blob store + token, then `chore: serve audio from vercel blob`
