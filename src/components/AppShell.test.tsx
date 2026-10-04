import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

beforeEach(() => localStorage.clear());

const card = () => screen.getByRole("main").parentElement!;

describe("AppShell dark player toggle", () => {
  it("flips the player theme and remembers it", async () => {
    render(<AppShell>child</AppShell>);
    expect(card()).not.toHaveAttribute("data-dark-player");

    await userEvent.click(screen.getByRole("button", { name: "Switch to dark player" }));
    expect(card()).toHaveAttribute("data-dark-player");
    expect(localStorage.getItem("hush:dark-player")).toBe("true");
    expect(screen.getByRole("button", { name: "Switch to light player" })).toHaveAttribute("aria-pressed", "true");
  });

  it("restores a stored preference", () => {
    localStorage.setItem("hush:dark-player", "true");
    render(<AppShell>child</AppShell>);
    expect(card()).toHaveAttribute("data-dark-player");
  });
});
