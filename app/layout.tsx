import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

// Only used for the map address label (as in the Figma design).
const inter = Inter({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hotel Aristocrat Inn · Gulshan-2, Dhaka",
    template: "%s · Hotel Aristocrat Inn, Gulshan-2",
  },
  description:
    "A secure, friendly stay in Gulshan's diplomatic zone. Buffet breakfast, free airport pickup and WiFi up to 50 Mbps, all included.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body>
        <MotionProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
