import { Moon, Sun } from "lucide-react";
import { content } from "@/data/content";

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  onAboutClick: () => void;
}

const navButton = "rounded-lg text-white transition-colors duration-150 hover:bg-white/20 focus-visible:bg-white/20 focus-visible:outline-none";

export function Header({ darkMode, onToggleDark, onAboutClick }: HeaderProps) {
  return (
    <header className="theme-gradient-r flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold text-white">{content.brand}</h1>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onAboutClick} className={`${navButton} px-3 py-2 text-sm font-medium`}>
          {content.nav.about}
        </button>
        <button
          type="button"
          onClick={onToggleDark}
          aria-label={darkMode ? content.nav.toggleLight : content.nav.toggleDark}
          aria-pressed={darkMode}
          className={`${navButton} p-2`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
