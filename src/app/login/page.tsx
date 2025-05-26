import { Metadata } from "next";
import LoginForm from "@/components/login/LoginForm";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Login to Your Account",
  description:
    "Sign in to access your personal ebook library and continue reading.",
  robots: {
    index: false, // Don't index auth pages
    follow: true,
  },
  openGraph: {
    title: "Login to eBook",
    description: "Access your personal digital library",
    type: "website",
    images: [
      {
        url: "/og-login.png",
        width: 1200,
        height: 630,
        alt: "Login to eBook",
      },
    ],
  },
  alternates: {
    canonical: "https://e-books-two.vercel.app/login",
  },
};

function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen  p-4 mx-auto">
      <div className="max-w-md w-full px-6 py-8 rounded-lg ">
        <h2 className="text-2xl font-normal text-center text-gray-800 mb-6 font-serif">
          Login<span className="mx-2">—</span>
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
