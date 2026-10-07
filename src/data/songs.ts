/**
 * Track list. Every track comes from the BreakingCopyright channel, fetched only
 * through the "Official download link" in the video's description. Only tracks
 * whose license allows use on a website are listed: Creative Commons BY, BY-SA,
 * or the uploader's "YouTube Free" license, credited as the description asks.
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
const CC_BY_SA_3: License = { name: "CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/" };
/** "YouTube Free" has no license page of its own, so it links to the track's official page. */
const youtubeFree = (sourceUrl: string): License => ({ name: "YouTube Free", url: sourceUrl });

const TOKYO_MUSIC_WALKER = "https://www.youtube.com/channel/UC3lLfvhpPGtwd5qD25cMDcA";

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
  {
    id: "artificialmusic-nighttime-stroll",
    title: "Nighttime Stroll",
    artist: "Artificial.Music",
    artistUrl: "https://www.youtube.com/channel/UCC49uNuUk7pY77NoVMlNYDA",
    sourceUrl: "https://breakingcopyright.com/song/artificialmusic-nighttime-stroll",
    videoUrl: "https://youtu.be/oRWZys-kwLw",
    license: CC_BY_3,
    file: "artificialmusic-nighttime-stroll.mp3",
  },
  {
    id: "tokyo-music-walker-slowly",
    title: "Slowly",
    artist: "Tokyo Music Walker",
    artistUrl: TOKYO_MUSIC_WALKER,
    sourceUrl: "https://breakingcopyright.com/song/tokyo-music-walker-slowly",
    videoUrl: "https://youtu.be/L4snZSpQApo",
    license: CC_BY_3,
    file: "tokyo-music-walker-slowly.mp3",
  },
  {
    id: "purrple-cat-warm-horizon",
    title: "Warm Horizon",
    artist: "Purrple Cat",
    artistUrl: "https://youtube.com/purrplecatmusic",
    sourceUrl: "https://breakingcopyright.com/song/purrple-cat-warm-horizon",
    videoUrl: "https://youtu.be/n_Ostub3y90",
    license: CC_BY_SA_3,
    file: "purrple-cat-warm-horizon.mp3",
  },
  {
    id: "supapao-cant-fall-in-love",
    title: "Can't Fall In Love",
    artist: "Supapao",
    artistUrl: "https://soundcloud.com/supapao",
    sourceUrl: "https://breakingcopyright.com/song/supapao-cant-fall-in-love",
    videoUrl: "https://youtu.be/VZkFJAb_gx4",
    license: youtubeFree("https://breakingcopyright.com/song/supapao-cant-fall-in-love"),
    file: "supapao-cant-fall-in-love.mp3",
  },
  {
    id: "tokyo-music-walker-way-home",
    title: "Way Home",
    artist: "Tokyo Music Walker",
    artistUrl: TOKYO_MUSIC_WALKER,
    sourceUrl: "https://breakingcopyright.com/song/tokyo-music-walker-way-home",
    videoUrl: "https://youtu.be/Q7HjxOAU5Kc",
    license: youtubeFree("https://breakingcopyright.com/song/tokyo-music-walker-way-home"),
    file: "tokyo-music-walker-way-home.mp3",
  },
  {
    id: "tokyo-music-walker-your-little-wings",
    title: "Your Little Wings",
    artist: "Tokyo Music Walker",
    artistUrl: TOKYO_MUSIC_WALKER,
    sourceUrl: "https://breakingcopyright.com/song/tokyo-music-walker-your-little-wings",
    videoUrl: "https://youtu.be/znarNyPELcU",
    license: youtubeFree("https://breakingcopyright.com/song/tokyo-music-walker-your-little-wings"),
    file: "tokyo-music-walker-your-little-wings.mp3",
  },
];
