"use client";

import { Pause, Play } from "lucide-react";
import { CoverArt } from "@/components/CoverArt";
import { content } from "@/data/content";
import type { Song } from "@/data/songs";
import { usePlayback } from "@/hooks/usePlayback";
import { audioUrl } from "@/lib/songs";
import { ProgressBar } from "./ProgressBar";

export const iconButton =
  "rounded-full transition duration-150 hover:bg-[var(--hover)] active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)] motion-reduce:active:scale-100";

export function Player({ song }: { song: Song }) {
  const { audioProps, isPlaying, currentTime, duration, error, toggle, seek } = usePlayback(audioUrl(song));

  return (
    <section
      aria-label="Player"
      className="player flex w-[90%] max-w-2xl gap-6 rounded-2xl bg-[var(--surface)] p-6 text-[var(--ink)] shadow-xl backdrop-blur-sm"
    >
      <div className="h-44 w-44 flex-shrink-0">
        <CoverArt seed={song.id} label={`Cover for ${song.title}`} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h2 className="mb-1 truncate text-2xl font-bold">{song.title}</h2>
          <p className="text-base text-[var(--muted)]">{song.artist}</p>
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {content.player.missing}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
          <div className="-ml-2 flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              disabled={error}
              aria-label={isPlaying ? content.player.pause : content.player.play}
              className={`${iconButton} p-2.5 disabled:opacity-40`}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
      </div>

      <audio {...audioProps} />
    </section>
  );
}
