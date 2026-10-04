"use client";

import { useEffect, useState } from "react";
import { content } from "@/data/content";
import { songs } from "@/data/songs";
import { Player, type PlayerSettings } from "./player/Player";

/** Picks the opening track on the client so server and client renders agree. */
export function PlayerStage() {
  const [index, setIndex] = useState<number | null>(null);
  // Lives above the per-track remount so it carries across tracks.
  const [settings, setSettings] = useState<PlayerSettings>({ volume: 0.75, loop: false });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pick must wait for the client
    setIndex(Math.floor(Math.random() * songs.length));
  }, []);

  if (index === null) return <p className="text-lg text-white">{content.loading}</p>;
  const song = songs[index];
  return (
    <Player
      key={song.id}
      song={song}
      settings={settings}
      onSettingsChange={(next) => setSettings((prev) => ({ ...prev, ...next }))}
    />
  );
}
