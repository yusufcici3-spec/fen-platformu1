import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAssistantWidget } from "@/components/assistant/AIAssistantWidget";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: "Fen ve Bilim Kulübü | Ortaokul Fen Bilimleri Eğitim Platformu",
    template: "%s | Fen ve Bilim Kulübü",
  },
  description:
    "5, 6, 7 ve 8. sınıf öğrencileri için konu anlatımları, sorular, denemeler ve eğitsel oyunlarla fen bilimleri öğrenme platformu.",
  keywords: ["fen bilimleri", "ortaokul", "5. sınıf", "6. sınıf", "7. sınıf", "8. sınıf", "eğitim platformu"],
  openGraph: {
    title: "Fen ve Bilim Kulübü | Ortaokul Fen Bilimleri Eğitim Platformu",
    description:
      "Konu anlatımları, sorular, denemeler ve eğitsel oyunlarla fen bilimlerini keşfet.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="font-body">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AIAssistantWidget />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
