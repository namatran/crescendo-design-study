"use client";

import { useState, type ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeBackdrop } from "./ThemeBackdrop";

export function AppShell({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeBackdrop>
      <div className="flex min-h-[70vh] w-[90%] max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/20 shadow-2xl backdrop-blur-md">
        <Header darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} onAboutClick={() => {}} />
        <main className="flex flex-1 items-center justify-center p-8">{children}</main>
        <Footer />
      </div>
    </ThemeBackdrop>
  );
}
