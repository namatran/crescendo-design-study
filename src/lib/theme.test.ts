import { afterEach, describe, expect, it, vi } from "vitest";
import { applyTheme, getThemeName, paletteVars, PALETTES, themeInitScript } from "./theme";

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

describe("applyTheme", () => {
  it("sets data-theme and palette variables on the element", () => {
    const el = document.createElement("div");
    applyTheme(el, "morning");
    expect(el.dataset.theme).toBe("morning");
    expect(el.style.getPropertyValue("--theme-primary")).toBe(PALETTES.morning.primary);
    expect(el.style.getPropertyValue("--theme-accent")).toBe(PALETTES.morning.accent);
    expect(el.style.getPropertyValue("--theme-secondary")).toBe(PALETTES.morning.secondary);
  });
});

describe("themeInitScript", () => {
  afterEach(() => {
    vi.useRealTimers();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("style");
  });

  it.each([0, 4, 5, 10, 11, 17, 18, 23])("applies the same theme as getThemeName at %i:30", (hour) => {
    vi.useFakeTimers();
    vi.setSystemTime(at(hour, 30));
    new Function(themeInitScript())();
    const expected = getThemeName(at(hour, 30));
    expect(document.documentElement.dataset.theme).toBe(expected);
    expect(document.documentElement.style.getPropertyValue("--theme-accent")).toBe(PALETTES[expected].accent);
  });
});
