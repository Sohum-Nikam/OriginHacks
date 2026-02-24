import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ParticleBackground } from "@/components/ui/particle-background";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ORIGIN ∞ - The Human Continuum Engine",
  description: "Explore your psychological origins and simulate multi-generational ripple effects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative overflow-x-hidden`}
      >
        <ParticleBackground />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}