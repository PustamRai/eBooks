import { Book } from "@/types";
import Image from "next/image";
import React from "react";
import DownloadButton from "./components/DownloadButton";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

async function SingleBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let book: Book | null = null;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/books/single-book/${slug}`
    );

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
