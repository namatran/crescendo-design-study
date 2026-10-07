export const content = {
  brand: "Hush",
  nav: { about: "About", toggleDark: "Switch to dark player", toggleLight: "Switch to light player" },
  loading: "Tuning in…",
  player: {
    play: "Play",
    pause: "Pause",
    next: "Next track",
    shuffle: "Shuffle",
    shuffleOn: "Shuffle on",
    shuffleOff: "Shuffle off",
    loop: "Loop track",
    loopOn: "Loop on",
    loopOff: "Loop off",
    volume: "Volume",
    poweredBy: "via BreakingCopyright",
    missing: "Audio file not found. Add it to public/audio/ (see README).",
  },
  about: {
    title: "About Hush",
    close: "Close",
    lead: "Hush is a small, single-purpose music player for long stretches of focused work.",
    body: "There is no catalogue to browse and no feed to scroll. Press play, pick nothing, and let calm instrumental tracks carry you from one hour to the next. The colours follow your clock, warm in the morning, bright through the afternoon, deep blue at night.",
    featuresTitle: "What it does",
    features: [
      "One quiet card, nothing else on screen",
      "Colours that shift with morning, afternoon and night",
      "Shuffle, skip and loop, with your volume remembered across tracks",
      "A light or dark player to suit the room",
    ],
    musicTitle: "The music",
    music:
      "Every track is a free-to-use release (Creative Commons or YouTube Free) shared by the BreakingCopyright channel and credited under the player. Thank you to the artists.",
    studyTitle: "About this project",
    study:
      "Hush is an unofficial design study of crescendomusic.live, rebuilt from scratch with original code, copy and artwork. It is not affiliated with Crescendo.",
  },
  footer: {
    // Fixed rather than computed: the page is prerendered, so a computed year would mismatch on hydration.
    year: 2026,
    line: "Quiet music for deep work",
    credit: "Unofficial design study of crescendomusic.live. Not affiliated.",
  },
} as const;
