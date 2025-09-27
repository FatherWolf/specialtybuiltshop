import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
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
  title: "Specialty Built Performance and Fab - Diesel Parts & Custom Fabrication",
  description: "Premium diesel performance parts for Duramax, Cummins, and Powerstroke engines. Custom fabrication services with FABMD partnership. Shop diesel parts online.",
  keywords: "diesel parts, performance parts, Duramax parts, Cummins parts, Powerstroke parts, custom fabrication, diesel performance, turbo, injectors",
  authors: [{ name: "Dan - Specialty Built Performance and Fab" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Specialty Built Performance and Fab - Diesel Parts & Custom Fabrication",
    description: "Premium diesel performance parts for Duramax, Cummins, and Powerstroke engines. Custom fabrication services with FABMD partnership.",
    type: "website",
    locale: "en_US",
    url: "https://specialtybuiltshop.com",
    siteName: "Specialty Built Performance and Fab",
    images: [
      {
        url: 'https://specialtybuiltshop.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Specialty Built Performance and Fab Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Specialty Built Performance and Fab - Diesel Parts & Custom Fabrication",
    description: "Premium diesel performance parts for Duramax, Cummins, and Powerstroke engines. Custom fabrication services with FABMD partnership.",
    images: ['https://specialtybuiltshop.com/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
