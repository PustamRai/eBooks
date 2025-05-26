import { Metadata } from "next";
import SignupForm from "@/components/signup/SignupForm";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Create Your Account",
  description:
    "Join thousands of readers and start building your digital library today.",
  robots: {
    index: false, // Don't index auth pages
    follow: true,
  },
  openGraph: {
    title: "Join eBook",
    description: "Start your digital reading journey today",
    type: "website",
    images: [
      {
        url: "/og-signup.png",
        width: 1200,
        height: 630,
        alt: "Join eBook",
      },
    ],
  },
  alternates: {
    canonical: "https://e-books-two.vercel.app/signup",
  },
};

function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 mx-auto">
      <div className="max-w-md w-full px-6 py-8 rounded-lg">
        <h2 className="text-2xl font-normal text-center text-gray-800 mb-6 font-serif">
          Sign Up<span className="mx-2">—</span>
        </h2>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
