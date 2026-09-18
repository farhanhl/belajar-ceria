import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";
import { PlayfulBackground } from "@/components/layout/PlayfulBackground";
import { AppFooter } from "@/components/navigation/AppFooter";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belajar Ceria — Belajar Jadi Menyenangkan!",
  description: "Website pembelajaran interaktif dan permainan edukatif untuk anak usia dini dengan panduan suara Ibu Guru ramah anak.",
  keywords: ["belajar ceria", "edukasi anak", "game edukasi", "anak 5 tahun", "mencocokkan gambar", "tts anak"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${nunito.variable} h-full antialiased`}>
      <body className="font-sans min-h-screen bg-sky-50 text-slate-800 flex flex-col selection:bg-amber-300 selection:text-amber-900 relative">
        <PlayfulBackground />
        <AppProvider>
          <div className="flex-1 flex flex-col relative z-10">
            {children}
          </div>
          <AppFooter />
        </AppProvider>
      </body>
    </html>
  );
}
