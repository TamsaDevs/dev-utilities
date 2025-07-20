import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevUtils - Free Online Developer Tools | JSON, JWT, Base64 & More",
    template: "%s | DevUtils - Free Developer Tools"
  },
  description: "Free online developer tools for JSON formatting, JWT token parsing, Base64 encoding/decoding, and query parameter conversion. Fast, secure, and privacy-focused developer utilities.",
  keywords: ["developer tools", "json formatter", "jwt decoder", "base64 encoder", "query params converter", "online tools", "free developer utilities"],
  authors: [{ name: "DevUtils" }],
  creator: "DevUtils",
  publisher: "DevUtils",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devutils.dev',
    siteName: 'DevUtils - Free Developer Tools',
    title: 'DevUtils - Free Online Developer Tools | JSON, JWT, Base64 & More',
    description: 'Free online developer tools for JSON formatting, JWT token parsing, Base64 encoding/decoding, and query parameter conversion. Fast, secure, and privacy-focused developer utilities.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevUtils - Free Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevUtils - Free Online Developer Tools | JSON, JWT, Base64 & More',
    description: 'Free online developer tools for JSON formatting, JWT token parsing, Base64 encoding/decoding, and query parameter conversion.',
    images: ['/og-image.png'],
    creator: '@devutils',
  },
  alternates: {
    canonical: 'https://devutils.dev',
  },
  verification: {
    google: 'OWpUMgmc_RVRO1eKN76u4MOXAuP7YuGAuehsQ-OcID4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
