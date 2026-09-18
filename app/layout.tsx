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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://belajar-ceria-zeta.vercel.app"),
  title: "Belajar Ceria — Belajar Jadi Menyenangkan!",
  description: "Website pembelajaran interaktif dan permainan edukatif untuk anak usia dini dengan panduan suara Ibu Guru ramah anak.",
  keywords: [
    "belajar ceria",
    "edukasi anak",
    "game edukasi",
    "anak usia dini",
    "PAUD",
    "TK",
    "mencocokkan gambar",
    "tts suara anak",
    "game anak cerdas"
  ],
  authors: [{ name: "O'om (Farhan)", url: "https://farhanhl.dev/" }],
  creator: "Farhan (@farhanhl)",
  publisher: "Belajar Ceria",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://belajar-ceria-zeta.vercel.app",
    siteName: "Belajar Ceria",
    title: "Belajar Ceria — Belajar Jadi Menyenangkan!",
    description: "Website pembelajaran interaktif dan permainan edukatif untuk anak usia dini dengan panduan suara Ibu Guru ramah anak.",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Logo Belajar Ceria - Game Edukasi Anak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belajar Ceria — Belajar Jadi Menyenangkan!",
    description: "Website pembelajaran interaktif dan permainan edukatif untuk anak usia dini dengan panduan suara Ibu Guru ramah anak.",
    images: ["/logo.png"],
    creator: "@farhanhl",
  },
  appleWebApp: {
    capable: true,
    title: "Belajar Ceria",
    statusBarStyle: "default",
  },
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
