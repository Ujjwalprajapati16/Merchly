import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from "@/providers/QueryProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Merchly – Minimal & Clean Merchandise Store",
  description: "Merchly is a modern e-commerce platform offering high-quality merchandise with a sleek, minimal design. Shop effortlessly for your favorite products and experience a clean, intuitive interface.",
  keywords: ["Merchly", "E-commerce", "Merchandise", "Minimal Design", "Online Store", "Fashion", "Apparel", "Shop"],
  authors: [{ name: "Merchly", url: "" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
