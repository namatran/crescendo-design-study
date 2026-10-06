import type { Metadata } from "next";
import { PALETTES, paletteVars, themeInitScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hush — design study",
  description: "An unofficial design study of a focus music player.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Server renders night (it can't know the viewer's clock); the inline script swaps in
    // the real theme before first paint, so React must accept whatever the DOM has.
    <html
      lang="en"
      className="h-full antialiased"
      data-theme="night"
      style={paletteVars(PALETTES.night)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
