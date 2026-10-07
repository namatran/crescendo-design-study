import type { Song } from "@/data/songs";

const DEFAULT_AUDIO_BASE = "/audio";

/** Where a track's audio lives: `public/audio/` locally, a Blob store once NEXT_PUBLIC_AUDIO_BASE_URL is set. */
export function audioUrl(song: Song, base = process.env.NEXT_PUBLIC_AUDIO_BASE_URL || DEFAULT_AUDIO_BASE): string {
  return `${base.replace(/\/+$/, "")}/${encodeURIComponent(song.file)}`;
}

/** Plain-text credit in the format the license asks for: title, artist, license. */
export function creditLine(song: Song): string {
  const name = song.license.name;
  const license = name.startsWith("CC ") ? `Creative Commons ${name.slice(3)}` : name;
  return `${song.artist} – ${song.title} is under a ${license} license.`;
}
