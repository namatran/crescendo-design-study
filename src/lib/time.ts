/** 83.6 → "01:23". Non-finite or negative input reads as 00:00. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const whole = Math.floor(seconds);
  const m = Math.floor(whole / 60);
  const s = whole % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Horizontal pointer position inside an element as a 0–1 fraction. */
export function fractionAt(clientX: number, rect: { left: number; width: number }): number {
  if (rect.width <= 0) return 0;
  return clamp((clientX - rect.left) / rect.width, 0, 1);
}
