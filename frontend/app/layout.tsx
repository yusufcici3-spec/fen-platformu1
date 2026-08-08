import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAssistantWidget } from "@/components/assistant/AIAssistantWidget";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FenLab | Ortaokul Fen Bilimleri Eğitim Platformu",
    template: "%s | FenLab",
  },
  description:
    "5, 6, 7 ve 8. sınıf öğrencileri için konu anlatımları, sorular, denemeler ve eğitsel oyunlarla fen bilimleri öğrenme platformu.",
  keywords: ["fen bilimleri", "ortaokul", "5. sınıf", "6. sınıf", "7. sınıf", "8. sınıf", "eğitim platformu"],
  openGraph: {
    title: "FenLab | Ortaokul Fen Bilimleri Eğitim Platformu",
    description:
      "Konu anlatımları, sorular, denemeler ve eğitsel oyunlarla fen bilimlerini keşfet.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} font-body`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AIAssistantWidget />
        </Providers>
      </body>
    </html>
  );
}
