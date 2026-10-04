/**
 * Track list. Every track comes from the BreakingCopyright channel, fetched only
 * through the "Official download link" in the video's description. Only tracks
 * whose license allows use on a website are listed (Creative Commons BY).
 *
 * Audio files are NOT in git. Put them in `public/audio/` (or the Blob store set
 * by NEXT_PUBLIC_AUDIO_BASE_URL) under each track's `file` name.
 */

export interface License {
  name: string;
  url: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistUrl: string;
  /** Official download link from the video description. */
  sourceUrl: string;
  /** BreakingCopyright video the credit points back to. */
  videoUrl: string;
  license: License;
  file: string;
}

const CC_BY_3: License = { name: "CC BY 3.0", url: "https://creativecommons.org/licenses/by/3.0/" };
const CC_BY_4: License = { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" };

export const songs: Song[] = [
  {
    id: "sappheiros-embrace",
    title: "Embrace",
    artist: "Sappheiros",
    artistUrl: "https://open.spotify.com/artist/5ZVHXQZAIn9WJXvy6qn9K0",
    sourceUrl: "https://breakingcopyright.com/song/sappheiros-embrace",
    videoUrl: "https://youtu.be/DzYp5uqixz0",
    license: CC_BY_3,
    file: "sappheiros-embrace.mp3",
  },
  {
    id: "sappheiros-dawn",
    title: "Dawn",
    artist: "Sappheiros",
    artistUrl: "https://open.spotify.com/artist/5ZVHXQZAIn9WJXvy6qn9K0",
    sourceUrl: "https://breakingcopyright.com/song/sappheiros-dawn",
    videoUrl: "https://youtu.be/pWAP7fIwGnI",
    license: CC_BY_3,
    file: "sappheiros-dawn.mp3",
  },
  {
    id: "scott-buckley-filaments",
    title: "Filaments",
    artist: "Scott Buckley",
    artistUrl: "https://youtube.com/user/musicbyscottb",
    sourceUrl: "https://breakingcopyright.com/song/scott-buckley-filaments",
    videoUrl: "https://youtu.be/taAxpw03dgM",
    license: CC_BY_3,
    file: "scott-buckley-filaments.mp3",
  },
  {
    id: "savfk-the-grid",
    title: "The Grid",
    artist: "Savfk",
    artistUrl: "https://youtube.com/savfkmusic",
    sourceUrl: "https://breakingcopyright.com/song/savfk-the-grid",
    videoUrl: "https://youtu.be/zTdzbNVf6lE",
    license: CC_BY_4,
    file: "savfk-the-grid.mp3",
  },
];
