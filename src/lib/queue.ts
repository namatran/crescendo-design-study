/**
 * Index of the track after `current`. Shuffle picks any other track at random,
 * otherwise play continues in order and wraps.
 */
export function nextIndex(current: number, length: number, shuffle: boolean, random: () => number = Math.random): number {
  if (length <= 1) return 0;
  if (!shuffle) return (current + 1) % length;
  // Pick from the other length-1 tracks, then step over the current one.
  const pick = Math.floor(random() * (length - 1));
  return pick >= current ? pick + 1 : pick;
}
