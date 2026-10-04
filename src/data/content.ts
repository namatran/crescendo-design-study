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
    missing: "Audio file not found. Add it to public/audio/ (see README).",
  },
  footer: {
    line: "Quiet music for deep work",
    credit: "Unofficial design study of crescendomusic.live. Not affiliated.",
  },
} as const;
