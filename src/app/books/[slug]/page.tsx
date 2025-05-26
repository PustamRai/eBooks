import { Book } from "@/types";
import Image from "next/image";
import React from "react";
import DownloadButton from "./components/DownloadButton";
import { Metadata } from "next";

// Generate dynamic metadata based on the book data
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/api/books/single-book/${slug}`);
    if (!response.ok) {
      throw new Error("An error occurred while retrieving single book data");
    }
    const data = await response.json();
    const book: Book = data.data;

    return {
      title: `${book.title} by ${book.author.name}`,
      description: book.description,
      keywords: [book.title, book.author.name, "book", "download", "read"],
      authors: [{ name: book.author.name }],
      openGraph: {
        title: book.title,
        description: book.description,
        images: [
          {
            url: book.coverImage,
            width: 800,
            height: 600,
            alt: book.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: book.title,
        description: book.description,
        images: [book.coverImage],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.log("Error generating metadata: ", error);
    return {
      title: "Book Not Found",
      description: "The requested book could not be found.",
    };
  }
}

async function SingleBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  let book: Book | null = null;
  try {
    const response = await fetch(`${BASE_URL}/api/books/single-book/${slug}`);

    if (!response.ok) {
      throw new Error("An error occured while retrieving single book data");
    }

    const data = await response.json();
    book = data.data;
  } catch (error) {
    console.log("Error retrieving single book: ", error);
  }

  if (!book) {
    throw new Error("Book not found");
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-14">
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
        <span className="font-semibold">by {book.author.name}</span>
        <p className="mt-5 text-lg leading-8">{book.description}</p>
        <DownloadButton fileLink={book.file} />
      </div>
      <div className="flex justify-end">
        <Image
          src={book.coverImage}
          alt={book.title}
          className="rounded-md border"
          width={100}
          height={100}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default SingleBookPage;
