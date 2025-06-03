import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eBook",
  description:
    "An ebook (short for electronic book) is a digital version of a printed book.",
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
      >
        <AuthProvider>
          <div className="sm:px-36 bg-gray-200 min-h-screen max-w-[1400px] mx-auto px-3">
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
            <Toaster position="top-center" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
