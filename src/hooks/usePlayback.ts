"use client";

import { useCallback, useRef, useState } from "react";
import { clamp } from "@/lib/time";

/**
 * Drives one <audio> element. The element is the source of truth: state mirrors
 * its events, and actions call its methods. Remount (key by track) to reset.
 */
export function usePlayback(src: string) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch {
      // Autoplay blocked or source failed; the error event (if any) sets state.
    }
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void play();
    else audio.pause();
  }, [play]);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = clamp(seconds, 0, audio.duration);
    setCurrentTime(audio.currentTime);
  }, []);

  const audioProps = {
    ref: audioRef,
    src,
    preload: "metadata" as const,
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => setCurrentTime(e.currentTarget.currentTime),
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => setDuration(e.currentTarget.duration),
    onError: () => {
      setError(true);
      setIsPlaying(false);
    },
  };

  return { audioRef, audioProps, isPlaying, currentTime, duration, error, play, toggle, seek };
}
