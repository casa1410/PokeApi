export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { getUserFromToken } from "@/lib/auth/server-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokeApp",
  description: "Pokedex con SSR y roles",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: `
      radial-gradient(ellipse at top, #1b1f2b 0%, #0c1017 40%, #0a0e14 100%),
      repeating-linear-gradient(180deg, #0c1017 0%, #101522 50%, #0c1017 100%)
    `,
          backgroundSize: "100% 400px, 100% 600px",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
          color: "white",
          minHeight: "100vh",
        }}
      >
        {user && <Header />}
        {children}
      </body>
    </html>
  );
}
