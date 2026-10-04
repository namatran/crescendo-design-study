"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { formatTime, fractionAt } from "@/lib/time";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
}

const STEP_SECONDS = 5;

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const ready = duration > 0;
  const percent = ready ? (currentTime / duration) * 100 : 0;

  const seekToPointer = (e: PointerEvent<HTMLDivElement>) => {
    if (!ready || !trackRef.current) return;
    onSeek(fractionAt(e.clientX, trackRef.current.getBoundingClientRect()) * duration);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    seekToPointer(e);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) seekToPointer(e);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const targets: Record<string, number> = {
      ArrowLeft: currentTime - STEP_SECONDS,
      ArrowDown: currentTime - STEP_SECONDS,
      ArrowRight: currentTime + STEP_SECONDS,
      ArrowUp: currentTime + STEP_SECONDS,
      Home: 0,
      End: duration,
    };
    if (!ready || !(e.key in targets)) return;
    e.preventDefault();
    onSeek(targets[e.key]);
  };

  return (
    <div className="space-y-2">
      {/* Padding gives the 6px track a taller hit area. */}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
        className="group -my-2 cursor-pointer touch-none py-2 focus-visible:outline-none"
      >
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--track)] ring-[var(--theme-accent)] ring-offset-2 ring-offset-[var(--surface)] group-focus-visible:ring-2">
          <div
            className="h-full rounded-full bg-[var(--theme-accent)] transition-[width] duration-100 motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-[var(--muted)] tabular-nums">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
