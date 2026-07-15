import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/Footer";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rapidev Global",
  description: "Interior Decorations; Beautifying spaces",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        {/* Navbar fixed at top */}
        <Navbar />

        <main className="relative overflow-hidden">
          {children}
        </main>

        {/* Footer fixed at bottom */}
        <Footer />
      </body>
    </html>
  );
}
