"use client";

import { Pause, Play, Repeat, Shuffle, SkipForward, Volume2, VolumeX } from "lucide-react";
import { CoverArt } from "@/components/CoverArt";
import { content } from "@/data/content";
import type { Song } from "@/data/songs";
import { usePlayback } from "@/hooks/usePlayback";
import { audioUrl } from "@/lib/songs";
import { ProgressBar } from "./ProgressBar";
import { TrackCredit } from "./TrackCredit";

export const iconButton =
  "rounded-full transition duration-150 hover:bg-[var(--hover)] active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)] motion-reduce:active:scale-100";

export interface PlayerSettings {
  volume: number;
  loop: boolean;
  shuffle: boolean;
}

interface PlayerProps {
  song: Song;
  settings: PlayerSettings;
  onSettingsChange: (next: Partial<PlayerSettings>) => void;
  /** Advance to the next track; `autoPlay` says whether it should start on its own. */
  onNext: (autoPlay: boolean) => void;
  autoPlay?: boolean;
}

export function Player({ song, settings, onSettingsChange, onNext, autoPlay = false }: PlayerProps) {
  const { volume, loop, shuffle } = settings;
  const { audioProps, isPlaying, currentTime, duration, error, toggle, seek } = usePlayback(audioUrl(song), {
    volume,
    loop,
    autoPlay,
    onEnded: () => onNext(true),
  });
  const VolumeIcon = volume === 0 ? VolumeX : Volume2;

  return (
    <div className="flex w-[90%] max-w-2xl flex-col gap-3">
      <section
        aria-label="Player"
        className="player flex gap-6 rounded-2xl bg-[var(--surface)] p-6 text-[var(--ink)] shadow-xl backdrop-blur-sm"
      >
        <div className="h-44 w-44 flex-shrink-0">
          <CoverArt seed={song.id} label={`Cover for ${song.title}`} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h2 className="mb-1 truncate text-2xl font-bold">{song.title}</h2>
            <p className="text-base text-[var(--muted)]">{song.artist}</p>
            {error && (
              <p role="alert" className="mt-2 text-sm text-[var(--danger)]">
                {content.player.missing}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
            <div className="-ml-2 flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                disabled={error}
                aria-label={isPlaying ? content.player.pause : content.player.play}
                className={`${iconButton} p-2.5 disabled:opacity-40`}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                type="button"
                onClick={() => onNext(isPlaying)}
                aria-label={content.player.next}
                className={`${iconButton} p-2 text-[var(--soft)]`}
              >
                <SkipForward size={20} />
              </button>

              <button
                type="button"
                onClick={() => onSettingsChange({ shuffle: !shuffle })}
                aria-label={content.player.shuffle}
                aria-pressed={shuffle}
                title={shuffle ? content.player.shuffleOn : content.player.shuffleOff}
                className={`${iconButton} p-2 ${shuffle ? "text-[var(--theme-accent)]" : "text-[var(--faint)]"}`}
              >
                <Shuffle size={20} />
              </button>

              <button
                type="button"
                onClick={() => onSettingsChange({ loop: !loop })}
                aria-label={content.player.loop}
                aria-pressed={loop}
                title={loop ? content.player.loopOn : content.player.loopOff}
                className={`${iconButton} p-2 ${loop ? "text-[var(--theme-accent)]" : "text-[var(--faint)]"}`}
              >
                <Repeat size={20} />
              </button>

              <label className="ml-2 flex flex-1 items-center gap-3">
                <VolumeIcon size={20} aria-hidden className="flex-shrink-0 text-[var(--soft)]" />
                <span className="sr-only">{content.player.volume}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => onSettingsChange({ volume: Number(e.target.value) })}
                  className="volume-range h-1.5 flex-1 cursor-pointer appearance-none rounded-lg"
                  style={{ "--fill": `${volume * 100}%` } as React.CSSProperties}
                />
              </label>
            </div>
          </div>
        </div>

        <audio {...audioProps} />
      </section>
      <TrackCredit song={song} />
    </div>
  );
}
