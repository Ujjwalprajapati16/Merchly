import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from "@/providers/QueryProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" value={{ light: "light", dark: "dark" }} enableSystem>
            <Navbar />
            <Toaster 
              position="bottom-right"
              toastOptions={{
                className: 'bg-popover text-popover-foreground shadow-md dark:shadow-none dark:bg-popover/60 dark:text-popover-foreground',
                duration: 3000,
              }}
            />
            {children}
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html >
  );
}
