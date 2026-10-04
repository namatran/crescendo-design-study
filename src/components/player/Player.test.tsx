import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { songs } from "@/data/songs";
import { Player, type PlayerSettings } from "./Player";

const song = songs[0];
const settings: PlayerSettings = { volume: 0.75, loop: false, shuffle: true };

function renderPlayer(overrides: Partial<PlayerSettings> = {}, onSettingsChange = vi.fn(), onNext = vi.fn()) {
  render(
    <Player song={song} settings={{ ...settings, ...overrides }} onSettingsChange={onSettingsChange} onNext={onNext} />,
  );
  return onSettingsChange;
}

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
    renderPlayer();
    expect(screen.getByRole("heading", { name: song.title })).toBeInTheDocument();
    expect(screen.getByText(song.artist)).toBeInTheDocument();
    expect(document.querySelector("audio")?.getAttribute("src")).toBe(`/audio/${song.file}`);
  });

  it("toggles play and pause", async () => {
    renderPlayer();
    await userEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Pause" }));
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  it("shows duration and seeks with the keyboard", () => {
    renderPlayer();
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
    renderPlayer();
    fireEvent(document.querySelector("audio")!, new Event("error"));
    expect(screen.getByRole("alert")).toHaveTextContent("public/audio/");
    expect(screen.getByRole("button", { name: "Play" })).toBeDisabled();
  });

  it("applies volume to the audio element and reports changes", () => {
    const onChange = renderPlayer({ volume: 0.4 });
    expect(document.querySelector("audio")!.volume).toBeCloseTo(0.4);
    fireEvent.change(screen.getByRole("slider", { name: "Volume" }), { target: { value: "0.2" } });
    expect(onChange).toHaveBeenCalledWith({ volume: 0.2 });
  });

  it("toggles loop and reflects it on the audio element", async () => {
    const onChange = renderPlayer({ loop: true });
    expect(document.querySelector("audio")!.loop).toBe(true);
    const button = screen.getByRole("button", { name: "Loop track" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button);
    expect(onChange).toHaveBeenCalledWith({ loop: false });
  });

  it("advances and autoplays when a track ends", () => {
    const onNext = vi.fn();
    renderPlayer({}, vi.fn(), onNext);
    fireEvent(document.querySelector("audio")!, new Event("ended"));
    expect(onNext).toHaveBeenCalledWith(true);
  });

  it("skips without autoplay while paused", async () => {
    const onNext = vi.fn();
    renderPlayer({}, vi.fn(), onNext);
    await userEvent.click(screen.getByRole("button", { name: "Next track" }));
    expect(onNext).toHaveBeenCalledWith(false);
  });

  it("toggles shuffle", async () => {
    const onChange = renderPlayer({ shuffle: true });
    await userEvent.click(screen.getByRole("button", { name: "Shuffle" }));
    expect(onChange).toHaveBeenCalledWith({ shuffle: false });
  });
});
