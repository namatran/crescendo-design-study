"use client";

import { useEffect, useLayoutEffect } from "react";
import { applyTheme, getThemeName } from "@/lib/theme";

// useLayoutEffect warns during SSR; the server render never needs it.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Keeps `<html>` on the viewer's time-of-day theme. The first paint is handled by the
 * inline script in the root layout; this re-applies it after hydration (React Strict Mode
 * resets `<html>` attributes in dev) and re-checks every minute.
 */
export function useTimeTheme(): void {
  useIsomorphicLayoutEffect(() => {
    const update = () => applyTheme(document.documentElement, getThemeName(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
}
