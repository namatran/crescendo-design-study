# Design references

Measured on 2026-10-03 from crescendomusic.live with `getComputedStyle` and
`getBoundingClientRect` at 1440×900, 768×1024 and 375×812.

The live site's song API fails CORS, so the page stays on "Loading music…" and
the player never renders. The shell below was measured live. The player card,
about modal and theme palettes come from reading the reference's public
source for layout values only (no code copied).

## 1. Sections

| Section | Layout |
|---|---|
| Page | Full-viewport gradient (to bottom-right, 3 stops), card centred both ways, 24px padding |
| Card | Glass panel, `width: 90%`, `max-width: 768px`, `min-height: 70vh`, flex column |
| Header | Gradient bar (left→right, same 3 stops), wordmark left, About + theme icon right |
| Main | `flex: 1`, centres the player, 32px padding |
| Player | White 90% card, 176px square art left, title/artist + progress + controls right |
| Footer | Gradient bar, copyright line left, Contact link right |
| About modal | Fixed overlay, white panel, close button top-right, heading + paragraphs + feature list |

## 2. Type

System stack throughout: `-apple-system, BlinkMacSystemFont, "Segoe UI", …`.

| Role | Size / LH | Weight | Colour | Phone |
|---|---|---|---|---|
| Wordmark | 20 / 28 | 700 | #fff | same |
| Nav button | 14 / 20 | 500 | #fff | same |
| Loading text | 18 / 28 | 400 | #fff | same |
| Track title | 24 / 32 | 700 | gray-900 #111827 | — |
| Artist | 16 / 24 | 400 | gray-500 #6b7280 | — |
| Time labels | 14 / 20 | 400 | gray-500 | — |
| Footer | 12 / 16 | 400 (brand 700) | #fff | wraps to 2 lines (32px) |
| Modal H1 | 36 / 40 | 700 | gray-900 | — |
| Modal H2 | 24 / 32 | 600 | gray-900 | — |
| Modal body | 16 (lead 18) | 400 | gray-700 #374151 | — |

## 3. Colour

| Theme | Hours | Primary | Accent (via) | Secondary |
|---|---|---|---|---|
| Morning | 05–11 | #e8a84d | #ff8c42 | #c85a3f |
| Afternoon | 11–18 | #f4a261 | #2a9d8f | #e9c46a |
| Night | 18–05 | #1e3a5f | #818cf8 | #2d1b4e |

The page gradient is `to bottom right` (primary → accent → secondary), and the header/footer gradient is
`to right` with the same stops. The accent also tints the progress fill, volume fill and active loop icon.
The card is `rgba(255,255,255,.2)` with a 1px `rgba(255,255,255,.2)` border. The player card is `rgba(255,255,255,.9)`, the
progress/volume track is #e5e7eb, and the modal overlay is `rgba(0,0,0,.2)`.

The study matches these palettes (colour values are design measurements, not assets). They live in `src/lib/theme.ts`.

## 4. Grid and spacing (1440)

- Card 768×630 at (336,135): `max-width` caps it, and it is vertically centred.
- Header 68px tall, padding 16/24. Footer 40px tall, padding 12/24.
- Main padding 32. Player: padding 24, gap 24, `width: 90%`, `max-width: 672px`, radius 16.
- Art 176×176, radius 12, `shadow-md`.
- Controls: progress bar 6px, then the time row, then the button row, with 16px between them.

## 5. Breakpoints

No breakpoints. Everything is fluid percentages:
- 768: card 648 wide (90%).
- 375: card 294 wide, the footer wraps to 56px, and the player row would be cramped (176px art + controls in about 230px).
  The study stacks the player vertically below 640px.

## 6. Components

| Component | Size | Radius | Padding | Hover |
|---|---|---|---|---|
| Nav text button | 64×36 | 8 | 8/12 | `bg rgba(255,255,255,.2)`, 150ms |
| Nav icon button | 34×34 (18px icon) | 8 | 8 | same |
| Play button | 44 (24px icon) | full | 10 | gray-100 bg, `active:scale(.95)` |
| Loop button | 36 (20px icon) | full | 8 | gray-100, gray-400 → accent when on |
| Volume slider | 6px track | 8 | — | accent fill to value, rest #e5e7eb |
| Card | — | 16 | — | `shadow-2xl` (0 25 50 -12 rgba(0,0,0,.25)), `blur(12px)` |
| Modal | `max-width: 672px`, `width: 90%` | 16 | 32 | close button 40 round, gray-100 hover |

## 7. Motion

- Button colour/background: 150ms `cubic-bezier(.4,0,.2,1)`.
- Progress fill width: 100ms transition.
- Modal: fade-in keyframe on open.
- No preloader, scroll or load animations. Theme switches once, on mount.

## 8. Assets and replacements

| Reference | Study |
|---|---|
| "Crescendo" wordmark/name | "Hush" placeholder wordmark |
| Unsplash album photos | Generative SVG cover art seeded per track |
| BreakingCopyright tracks served from their backend | Same channel's tracks, but downloaded only via official description links, with license recorded in `src/data/songs.ts`, served from `public/audio/` and later Vercel Blob |
| lucide-react icons | lucide-react (ISC-licensed library, not a site asset) |
| About copy | Original copy in `src/data/content.ts` |
