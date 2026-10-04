import { AppShell } from "@/components/AppShell";
import { content } from "@/data/content";

export default function Home() {
  return (
    <AppShell>
      <p className="text-lg text-white">{content.loading}</p>
    </AppShell>
  );
}
