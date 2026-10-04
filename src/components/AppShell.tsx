"use client";

import type { ReactNode } from "react";
import { useStoredBoolean } from "@/hooks/useStoredBoolean";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeBackdrop } from "./ThemeBackdrop";

export function AppShell({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useStoredBoolean("hush:dark-player", false);

  return (
    <ThemeBackdrop>
      <div
        data-dark-player={darkMode || undefined}
        className="flex min-h-[70vh] w-[90%] max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/20 shadow-2xl backdrop-blur-md"
      >
        <Header darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} onAboutClick={() => {}} />
        <main className="flex flex-1 items-center justify-center p-8">{children}</main>
        <Footer />
      </div>
    </ThemeBackdrop>
  );
}
