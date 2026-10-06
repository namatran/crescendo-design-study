export type ThemeName = "morning" | "afternoon" | "night";

export interface Palette {
  primary: string;
  accent: string;
  secondary: string;
}

export const PALETTES: Record<ThemeName, Palette> = {
  morning: { primary: "#e8a84d", accent: "#ff8c42", secondary: "#c85a3f" },
  afternoon: { primary: "#f4a261", accent: "#2a9d8f", secondary: "#e9c46a" },
  night: { primary: "#1e3a5f", accent: "#818cf8", secondary: "#2d1b4e" },
};

const MORNING_START = 5;
const AFTERNOON_START = 11;
const NIGHT_START = 18;

/** Morning 05:00–10:59, afternoon 11:00–17:59, night 18:00–04:59 (viewer's local time). */
export function getThemeName(date: Date): ThemeName {
  const hour = date.getHours();
  if (hour >= MORNING_START && hour < AFTERNOON_START) return "morning";
  if (hour >= AFTERNOON_START && hour < NIGHT_START) return "afternoon";
  return "night";
}

/** CSS custom properties for a palette, ready to spread into a `style` prop. */
export function paletteVars(palette: Palette): Record<string, string> {
  return {
    "--theme-primary": palette.primary,
    "--theme-accent": palette.accent,
    "--theme-secondary": palette.secondary,
  };
}

/** Set the theme's `data-theme` and palette variables on an element (normally `<html>`). */
export function applyTheme(el: HTMLElement, theme: ThemeName): void {
  el.dataset.theme = theme;
  for (const [name, value] of Object.entries(paletteVars(PALETTES[theme]))) {
    el.style.setProperty(name, value);
  }
}

/**
 * Inline script for `<head>` that applies the viewer's time-of-day theme to `<html>`
 * while the HTML is parsed, before first paint. Built from the same palettes and hour
 * thresholds as `getThemeName` so the two can't drift apart.
 */
export function themeInitScript(): string {
  return `(function(){try{var P=${JSON.stringify(PALETTES)};var h=new Date().getHours();var t=h>=${MORNING_START}&&h<${AFTERNOON_START}?"morning":h>=${AFTERNOON_START}&&h<${NIGHT_START}?"afternoon":"night";var e=document.documentElement,p=P[t];e.setAttribute("data-theme",t);e.style.setProperty("--theme-primary",p.primary);e.style.setProperty("--theme-accent",p.accent);e.style.setProperty("--theme-secondary",p.secondary)}catch(x){}})()`;
}
