import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AOSProvider from "@/components/AOSProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiger Hill Transport LLC - Carrier & Owner-Operator Partner",
  description: "Licensed carrier (MC: 1091445, DOT: 3394301) partnering with owner-operators for quality freight opportunities. Competitive rates and reliable settlements.",
  keywords: "trucking, owner operator, transportation, freight, shipping, logistics, Tiger Hill Transport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <AOSProvider />
      </body>
    </html>
  );
}
