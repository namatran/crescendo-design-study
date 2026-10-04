import { AppShell } from "@/components/AppShell";
import { CoverArt } from "@/components/CoverArt";
import { songs } from "@/data/songs";

export default function Home() {
  return (
    <AppShell>
      <div className="flex gap-4">
        {songs.map((s) => (
          <div key={s.id} className="h-44 w-44">
            <CoverArt seed={s.id} label={s.title} />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
