"use client";

import { useEffect, useState } from "react";
import { getThemeName, type ThemeName } from "@/lib/theme";

/**
 * Theme from the viewer's clock. Starts as night so the server render and first
 * client render agree, then resolves after mount and re-checks every minute.
 */
export function useTimeTheme(): ThemeName {
  const [theme, setTheme] = useState<ThemeName>("night");

  useEffect(() => {
    const update = () => setTheme(getThemeName(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return theme;
}
