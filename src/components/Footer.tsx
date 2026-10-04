import { content } from "@/data/content";

export function Footer() {
  return (
    <footer className="theme-gradient-r flex items-center justify-between gap-4 px-6 py-3 text-xs text-white">
      <p>
        <span className="font-bold">© {new Date().getFullYear()} {content.brand}</span> — {content.footer.line}
      </p>
      <p className="text-right text-white/80">{content.footer.credit}</p>
    </footer>
  );
}
