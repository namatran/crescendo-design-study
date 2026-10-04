"use client";

import type { ReactNode } from "react";
import { useTimeTheme } from "@/hooks/useTimeTheme";
import { PALETTES, paletteVars } from "@/lib/theme";

export function ThemeBackdrop({ children }: { children: ReactNode }) {
  const theme = useTimeTheme();

  return (
    <div
      data-theme={theme}
      style={paletteVars(PALETTES[theme])}
      className="theme-gradient-br flex min-h-screen items-center justify-center p-6"
    >
      {children}
    </div>
  );
}
