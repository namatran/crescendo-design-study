import { describe, expect, it } from "vitest";
import { coverArtSpec } from "./coverArt";

describe("coverArtSpec", () => {
  it("is deterministic per seed", () => {
    expect(coverArtSpec("sappheiros-embrace")).toEqual(coverArtSpec("sappheiros-embrace"));
  });

  it("differs between seeds", () => {
    expect(coverArtSpec("a")).not.toEqual(coverArtSpec("b"));
  });

  it("keeps shapes inside sensible bounds", () => {
    const spec = coverArtSpec("savfk-the-grid");
    expect(spec.orbs).toHaveLength(4);
    for (const orb of spec.orbs) {
      expect(orb.cx).toBeGreaterThanOrEqual(10);
      expect(orb.cx).toBeLessThanOrEqual(90);
      expect(orb.r).toBeGreaterThanOrEqual(22);
      expect(orb.opacity).toBeLessThanOrEqual(0.9);
    }
    expect(spec.rings.length).toBeGreaterThanOrEqual(3);
    expect(spec.rings.length).toBeLessThanOrEqual(5);
  });
});
