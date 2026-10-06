"use client";

import type { ReactNode } from "react";
import { useTimeTheme } from "@/hooks/useTimeTheme";

export function ThemeBackdrop({ children }: { children: ReactNode }) {
  useTimeTheme();

  return <div className="theme-gradient-br flex min-h-screen items-center justify-center p-6">{children}</div>;
}
