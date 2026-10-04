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

/** Morning 05:00–10:59, afternoon 11:00–17:59, night 18:00–04:59 (viewer's local time). */
export function getThemeName(date: Date): ThemeName {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 18) return "afternoon";
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
