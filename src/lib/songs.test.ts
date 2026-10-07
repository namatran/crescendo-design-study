import { describe, expect, it } from "vitest";
import { songs, type Song } from "@/data/songs";
import { audioUrl, creditLine } from "./songs";

const song = songs[0];

describe("audioUrl", () => {
  it("defaults to the local public/audio folder", () => {
    expect(audioUrl(song, "/audio")).toBe("/audio/sappheiros-embrace.mp3");
  });

  it("uses a remote base without doubling slashes", () => {
    expect(audioUrl(song, "https://blob.example.com/audio/")).toBe(
      "https://blob.example.com/audio/sappheiros-embrace.mp3",
    );
  });

  it("encodes file names", () => {
    const spaced: Song = { ...song, file: "a b.mp3" };
    expect(audioUrl(spaced, "/audio")).toBe("/audio/a%20b.mp3");
  });
});

describe("creditLine", () => {
  it("names artist, title and license", () => {
    expect(creditLine(song)).toBe("Sappheiros – Embrace is under a Creative Commons BY 3.0 license.");
  });

  it("keeps non-Creative Commons license names as written", () => {
    const free: Song = { ...song, license: { name: "YouTube Free", url: song.sourceUrl } };
    expect(creditLine(free)).toBe("Sappheiros – Embrace is under a YouTube Free license.");
  });
});

describe("song library", () => {
  it("only lists CC BY, CC BY-SA or YouTube Free tracks from official BreakingCopyright pages", () => {
    for (const s of songs) {
      if (s.license.name === "YouTube Free") expect(s.license.url).toBe(s.sourceUrl);
      else expect(s.license.url).toMatch(/^https:\/\/creativecommons\.org\/licenses\/by(-sa)?\//);
      expect(s.sourceUrl).toMatch(/^https:\/\/breakingcopyright\.com\/song\//);
    }
  });

  it("has unique ids and files", () => {
    expect(new Set(songs.map((s) => s.id)).size).toBe(songs.length);
    expect(new Set(songs.map((s) => s.file)).size).toBe(songs.length);
  });
});
