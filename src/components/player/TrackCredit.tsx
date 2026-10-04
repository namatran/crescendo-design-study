import { content } from "@/data/content";
import type { Song } from "@/data/songs";

const link = "underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white";

/** Attribution the CC BY license asks for: title, artist and license link, plus where it came from. */
export function TrackCredit({ song }: { song: Song }) {
  return (
    <p className="text-center text-xs leading-5 text-white/85">
      <a href={song.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>
        {song.title}
      </a>{" "}
      by{" "}
      <a href={song.artistUrl} target="_blank" rel="noopener noreferrer" className={link}>
        {song.artist}
      </a>{" "}
      ·{" "}
      <a href={song.license.url} target="_blank" rel="noopener noreferrer license" className={link}>
        {song.license.name}
      </a>{" "}
      ·{" "}
      <a href={song.videoUrl} target="_blank" rel="noopener noreferrer" className={link}>
        {content.player.poweredBy}
      </a>
    </p>
  );
}
