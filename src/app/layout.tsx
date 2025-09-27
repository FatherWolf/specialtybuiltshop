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
  title: "Specialty Built Performance and Fab - Diesel Repair & Custom Fabrication",
  description: "Expert diesel repair specializing in Duramax, Cummins, and Powerstroke engines. Custom fabrication services with FABMD partnership. 4+ years experience in diesel performance.",
  keywords: "diesel repair, Duramax specialist, Cummins repair, Powerstroke bulletproofing, custom fabrication, diesel performance, FABMD partnership",
  authors: [{ name: "Dan - Specialty Built Performance and Fab" }],
  openGraph: {
    title: "Specialty Built Performance and Fab - Diesel Repair & Custom Fabrication",
    description: "Expert diesel repair specializing in Duramax, Cummins, and Powerstroke engines. Custom fabrication services with FABMD partnership.",
    type: "website",
    locale: "en_US",
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
