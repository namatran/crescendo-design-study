import { expect, test } from "@playwright/test";
import { stubAudio } from "./silentAudio";

test.beforeEach(async ({ page }) => {
  await stubAudio(page, 60);
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Player" })).toBeVisible();
});

const currentTime = (page: import("@playwright/test").Page) =>
  page.locator("audio").evaluate((a: HTMLAudioElement) => a.currentTime);

test("plays and pauses", async ({ page }) => {
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
  await expect.poll(() => currentTime(page)).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(page.getByRole("button", { name: "Play", exact: true })).toBeVisible();
  expect(await page.locator("audio").evaluate((a: HTMLAudioElement) => a.paused)).toBe(true);
});

test("seeks by keyboard and by clicking the bar", async ({ page }) => {
  const slider = page.getByRole("slider", { name: "Seek" });
  await expect(slider).toHaveAttribute("aria-valuemax", "60");

  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "5");

  const box = (await slider.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect.poll(() => currentTime(page)).toBeGreaterThan(25);
  expect(await currentTime(page)).toBeLessThan(35);
});

test("next switches track and keeps playing", async ({ page }) => {
  const title = page.getByRole("heading", { level: 2 });
  const first = await title.textContent();

  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Next track" }).click();
  await expect(title).not.toHaveText(first!);
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
});

test("next while paused stays paused", async ({ page }) => {
  const title = page.getByRole("heading", { level: 2 });
  const first = await title.textContent();

  await page.getByRole("button", { name: "Next track" }).click();
  await expect(title).not.toHaveText(first!);
  await expect(page.getByRole("button", { name: "Play", exact: true })).toBeVisible();
});

test("about modal opens and closes with button, Escape and backdrop", async ({ page }) => {
  const dialog = page.getByRole("dialog", { name: "About Hush" });
  const open = () => page.getByRole("button", { name: "About", exact: true }).click();
  await expect(dialog).toBeHidden();

  await open();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();

  await open();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await open();
  await page.mouse.click(5, 5); // outside the panel, on the backdrop
  await expect(dialog).toBeHidden();
});

test("a drag that starts inside the modal and ends on the backdrop keeps it open", async ({ page }) => {
  await page.getByRole("button", { name: "About", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "About Hush" });
  const box = (await dialog.boundingBox())!;

  await page.mouse.move(box.x + box.width / 2, box.y + 40);
  await page.mouse.down();
  await page.mouse.move(5, 5);
  await page.mouse.up();
  await expect(dialog).toBeVisible();
});

test("the real theme is on <html> at first paint, not after hydration", async ({ browser }) => {
  // 07:30 local time is morning. Checked from an init script's view: before any app JS runs.
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.clock.install({ time: new Date(2026, 5, 1, 7, 30) });
  await page.route("**/_next/static/**/*.js", (route) => route.abort()); // no hydration at all
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "morning");
  await expect(page.locator("html")).toHaveCSS("--theme-accent", "#ff8c42");
  await context.close();
});
