import { describe, expect, it } from "vitest";
import { clamp, formatTime, fractionAt } from "./time";

describe("formatTime", () => {
  it.each([
    [0, "00:00"],
    [9.9, "00:09"],
    [83.6, "01:23"],
    [3600, "60:00"],
    [NaN, "00:00"],
    [Infinity, "00:00"],
    [-4, "00:00"],
  ])("%s → %s", (input, expected) => {
    expect(formatTime(input)).toBe(expected);
  });
});

describe("clamp", () => {
  it("bounds a value", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
    expect(clamp(2, 0, 1)).toBe(1);
  });
});

describe("fractionAt", () => {
  const rect = { left: 100, width: 200 };
  it("maps pointer x to a fraction", () => {
    expect(fractionAt(200, rect)).toBe(0.5);
  });
  it("clamps outside the element", () => {
    expect(fractionAt(50, rect)).toBe(0);
    expect(fractionAt(400, rect)).toBe(1);
  });
  it("handles zero width", () => {
    expect(fractionAt(100, { left: 0, width: 0 })).toBe(0);
  });
});
