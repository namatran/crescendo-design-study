import { describe, expect, it } from "vitest";
import { nextIndex } from "./queue";

describe("nextIndex", () => {
  it("advances in order and wraps when shuffle is off", () => {
    expect(nextIndex(0, 4, false)).toBe(1);
    expect(nextIndex(3, 4, false)).toBe(0);
  });

  it("never repeats the current track when shuffling", () => {
    for (let current = 0; current < 4; current++) {
      for (const r of [0, 0.2, 0.5, 0.74, 0.99]) {
        const next = nextIndex(current, 4, true, () => r);
        expect(next).not.toBe(current);
        expect(next).toBeGreaterThanOrEqual(0);
        expect(next).toBeLessThan(4);
      }
    }
  });

  it("reaches every other track when shuffling", () => {
    const seen = new Set([0, 0.34, 0.67].map((r) => nextIndex(1, 4, true, () => r)));
    expect(seen).toEqual(new Set([0, 2, 3]));
  });

  it("stays put with one or no tracks", () => {
    expect(nextIndex(0, 1, true)).toBe(0);
    expect(nextIndex(0, 0, false)).toBe(0);
  });
});
