import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "@fontsource-variable/geist-mono";
import "./globals.css";
import Preloader from "../src/site/components/Preloader";
import SmoothScroll from "../src/site/components/SmoothScroll";

// Fonts: Inter for display/body, Geist_Mono (self-hosted variable font,
// @fontsource-variable/geist-mono) for numbers/eyebrows/buttons/labels.
// IBM Plex Mono kept only for the preloader readout.

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fineness — Tokenized Asset Venue Register",
  description:
    "Monthly ranked register scoring tokenized asset venues on a 0-1000 fineness scale. Editorial judgement on public information, not audits or ratings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
