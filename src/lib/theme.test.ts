import { describe, expect, it } from "vitest";
import { getThemeName, paletteVars, PALETTES } from "./theme";

const at = (h: number, m = 0) => new Date(2026, 0, 1, h, m);

describe("getThemeName", () => {
  it.each([
    [at(4, 59), "night"],
    [at(5), "morning"],
    [at(10, 59), "morning"],
    [at(11), "afternoon"],
    [at(17, 59), "afternoon"],
    [at(18), "night"],
    [at(0), "night"],
  ])("%s → %s", (date, expected) => {
    expect(getThemeName(date)).toBe(expected);
  });
});

describe("paletteVars", () => {
  it("maps a palette to theme custom properties", () => {
    expect(paletteVars(PALETTES.night)).toEqual({
      "--theme-primary": "#1e3a5f",
      "--theme-accent": "#818cf8",
      "--theme-secondary": "#2d1b4e",
    });
  });
});
