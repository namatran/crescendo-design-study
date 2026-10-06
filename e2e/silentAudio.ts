import type { Page } from "@playwright/test";

const SAMPLE_RATE = 8000;

/** A silent mono 8-bit PCM WAV, so the tests don't need the real (git-ignored) tracks. */
export function silentWav(seconds: number): Buffer {
  const dataSize = SAMPLE_RATE * seconds;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16); // fmt chunk size
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE, 28); // byte rate
  header.writeUInt16LE(1, 32); // block align
  header.writeUInt16LE(8, 34); // bits per sample
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);
  return Buffer.concat([header, Buffer.alloc(dataSize, 0x80)]); // 0x80 is silence in unsigned 8-bit
}

/** Serve a silent track for every /audio/* request, with Range support so seeking works. */
export async function stubAudio(page: Page, seconds = 60): Promise<void> {
  const wav = silentWav(seconds);
  await page.route("**/audio/*", (route) => {
    const range = /bytes=(\d*)-(\d*)/.exec(route.request().headers()["range"] ?? "");
    const headers = { "content-type": "audio/wav", "accept-ranges": "bytes" };
    if (!range) return route.fulfill({ status: 200, headers, body: wav });
    const start = range[1] ? Number(range[1]) : 0;
    const end = Math.min(range[2] ? Number(range[2]) : wav.length - 1, wav.length - 1);
    return route.fulfill({
      status: 206,
      headers: { ...headers, "content-range": `bytes ${start}-${end}/${wav.length}` },
      body: wav.subarray(start, end + 1),
    });
  });
}
