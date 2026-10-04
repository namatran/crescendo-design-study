import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Node 25 has its own experimental global localStorage that shadows jsdom's
// and is unusable without a backing file. Use jsdom's instead.
const jsdomWindow = (globalThis as { jsdom?: { window: Window } }).jsdom?.window;
if (jsdomWindow) {
  Object.defineProperty(globalThis, "localStorage", { value: jsdomWindow.localStorage, configurable: true });
}

// Vitest runs without globals, so Testing Library can't register its own cleanup.
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
