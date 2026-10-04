import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { songs } from "@/data/songs";
import { Player } from "./Player";

const song = songs[0];

beforeEach(() => {
  // jsdom has no media playback: fake play/pause and fire the events a browser would.
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
    Object.defineProperty(this, "paused", { value: false, configurable: true });
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) {
    Object.defineProperty(this, "paused", { value: true, configurable: true });
    this.dispatchEvent(new Event("pause"));
  });
});

function loadMetadata(seconds: number) {
  const audio = document.querySelector("audio")!;
  Object.defineProperty(audio, "duration", { value: seconds, configurable: true });
  fireEvent(audio, new Event("loadedmetadata"));
  return audio;
}

describe("Player", () => {
  it("shows the track and points the audio at its file", () => {
    render(<Player song={song} />);
    expect(screen.getByRole("heading", { name: song.title })).toBeInTheDocument();
    expect(screen.getByText(song.artist)).toBeInTheDocument();
    expect(document.querySelector("audio")?.getAttribute("src")).toBe(`/audio/${song.file}`);
  });

  it("toggles play and pause", async () => {
    render(<Player song={song} />);
    await userEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Pause" }));
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  it("shows duration and seeks with the keyboard", () => {
    render(<Player song={song} />);
    const audio = loadMetadata(120);
    expect(screen.getByText("02:00")).toBeInTheDocument();

    const slider = screen.getByRole("slider", { name: "Seek" });
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(audio.currentTime).toBe(5);
    fireEvent.keyDown(slider, { key: "End" });
    expect(audio.currentTime).toBe(120);
    fireEvent.keyDown(slider, { key: "Home" });
    expect(audio.currentTime).toBe(0);
  });

  it("explains a missing audio file", () => {
    render(<Player song={song} />);
    fireEvent(document.querySelector("audio")!, new Event("error"));
    expect(screen.getByRole("alert")).toHaveTextContent("public/audio/");
    expect(screen.getByRole("button", { name: "Play" })).toBeDisabled();
  });
});
