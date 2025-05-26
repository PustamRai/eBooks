import { Suspense } from "react";
import BookList from "./components/BookList";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "eBook - Your Digital Library",
  description:
    "Discover thousands of ebooks across all genres. Read, share, and explore literature in our comprehensive digital library platform.",
  keywords: [
    "ebooks",
    "digital library",
    "online books",
    "reading platform",
    "book collection",
    "literature",
    "novels",
    "free books",
    "digital reading",
    "book sharing",
    "online reading",
  ],
  openGraph: {
    title: "eBook - Your Digital Library",
    description:
      "Discover thousands of ebooks across all genres. Start reading today!",
    type: "website",
    url: "https://e-books-two.vercel.app",
    images: [
      {
        url: "/og-homepage.png",
        width: 1200,
        height: 630,
        alt: "eBook - Digital Library Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eBook - Your Digital Library",
    description: "Discover thousands of ebooks across all genres.",
    images: ["/twitter-homepage.png"],
  },
  alternates: {
    canonical: "https://e-books-two.vercel.app",
  },
  other: {
    "application-name": "eBook",
    "apple-mobile-web-app-title": "eBook",
    "msapplication-TileColor": "#2563eb",
    "theme-color": "#2563eb",
  },
};

export default function Home() {
  return (
    <div className="mt-12 min-h-screen mb-6">
      <h2 className="text-center text-blue-500 font-bold text-2xl font-mono">
        Welcome to eBook store
      </h2>

      <Suspense fallback={<LoadingSkeleton count={3} />}>
        <BookList />
      </Suspense>
    </div>
  );
}
