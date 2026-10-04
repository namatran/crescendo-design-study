import { content } from "@/data/content";

export function Footer() {
  return (
    <footer className="theme-gradient-r flex flex-col gap-1 px-6 py-3 text-xs text-white sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p>
        <span className="font-bold">© {new Date().getFullYear()} {content.brand}</span> — {content.footer.line}
      </p>
      <p className="text-white/80 sm:text-right">{content.footer.credit}</p>
    </footer>
  );
}
