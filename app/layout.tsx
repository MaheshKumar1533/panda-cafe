import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panda Cafe | Premium Coffee Experience",
  description: "A premium mobile-first café website with cinematic motion, luxury visuals, and a cozy coffee-inspired palette.",
  applicationName: "Panda Cafe",
  keywords: ["café", "coffee", "restaurant", "premium website", "mobile first", "motion design"],
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Panda Cafe",
    description: "Premium mobile-first animated café website.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panda Cafe",
    description: "Premium mobile-first animated café website.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
