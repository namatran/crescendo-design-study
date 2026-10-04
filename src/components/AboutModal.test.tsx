import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AboutModal } from "./AboutModal";

beforeEach(() => {
  // jsdom lacks the modal API; emulate the open attribute and close event.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

describe("AboutModal", () => {
  it("opens with original copy and the study disclaimer", () => {
    render(<AboutModal open onClose={vi.fn()} />);
    const dialog = screen.getByRole("dialog", { name: "About Hush" });
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveTextContent("unofficial design study");
    expect(dialog).toHaveTextContent("Creative Commons BY");
  });

  it("closes from the close button", async () => {
    const onClose = vi.fn();
    render(<AboutModal open onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("closes when the backdrop is clicked but not the panel", () => {
    const onClose = vi.fn();
    render(<AboutModal open onClose={onClose} />);
    fireEvent.click(screen.getByRole("heading", { name: "About Hush" }));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalled();
  });
});
