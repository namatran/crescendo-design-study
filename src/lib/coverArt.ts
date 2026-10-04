import { hashString, seededRandom } from "./random";

export interface Orb {
  cx: number;
  cy: number;
  r: number;
  /** Which theme stop fills it. */
  stop: "primary" | "accent" | "secondary";
  opacity: number;
}

export interface CoverArtSpec {
  angle: number;
  orbs: Orb[];
  /** Concentric ring radii, centred on the first orb: a quiet "sound wave" motif. */
  rings: number[];
}

const STOPS: Orb["stop"][] = ["primary", "accent", "secondary"];

/** Deterministic abstract cover for a track, in a 100×100 viewBox. Colours come from the active theme. */
export function coverArtSpec(seed: string): CoverArtSpec {
  const rand = seededRandom(hashString(seed));
  const between = (min: number, max: number) => min + rand() * (max - min);

  const orbs: Orb[] = Array.from({ length: 4 }, (_, i) => ({
    cx: between(10, 90),
    cy: between(10, 90),
    r: between(22, 46),
    stop: STOPS[(i + Math.floor(rand() * 3)) % 3],
    opacity: between(0.55, 0.9),
  }));

  const ringCount = 3 + Math.floor(rand() * 3);
  const gap = between(6, 10);
  const rings = Array.from({ length: ringCount }, (_, i) => 8 + i * gap);

  return { angle: Math.round(between(0, 360)), orbs, rings };
}
