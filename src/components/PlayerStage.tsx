"use client";

import { useEffect, useState } from "react";
import { content } from "@/data/content";
import { songs } from "@/data/songs";
import { nextIndex } from "@/lib/queue";
import { Player, type PlayerSettings } from "./player/Player";

interface Current {
  index: number;
  autoPlay: boolean;
}

/** Owns the queue. Picks the opening track on the client so server and client renders agree. */
export function PlayerStage() {
  const [current, setCurrent] = useState<Current | null>(null);
  // Lives above the per-track remount so it carries across tracks.
  const [settings, setSettings] = useState<PlayerSettings>({ volume: 0.75, loop: false, shuffle: true });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pick must wait for the client
    setCurrent({ index: Math.floor(Math.random() * songs.length), autoPlay: false });
  }, []);

  if (current === null) return <p className="text-lg text-white">{content.loading}</p>;

  const song = songs[current.index];
  return (
    <Player
      key={song.id}
      song={song}
      autoPlay={current.autoPlay}
      settings={settings}
      onSettingsChange={(next) => setSettings((prev) => ({ ...prev, ...next }))}
      onNext={(autoPlay) =>
        setCurrent((prev) => prev && { index: nextIndex(prev.index, songs.length, settings.shuffle), autoPlay })
      }
    />
  );
}
