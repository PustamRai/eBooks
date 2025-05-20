import { Book } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BookCard({ books }: { books: Book }) {
  return (
    <div className="flex gap-4 border border-gray-300 p-3 shadow-md hover:shadow-lg transition-all duration-100 rounded-sm">
      <Image
        src={books.coverImage}
        alt={books.title}
        width={100}
        height={100}
        className="rounded-sm"
      />

      <div className="flex flex-col">
        <h2 className="line-clamp-2 text-xl font-bold text-orange-600 text-balance">
          {books.title}
        </h2>
        <p className="font-bold text-gray-900 mt-1">{books.author.name}</p>
        <Link
          href={`/books/${books._id}`}
          className="py-1 px-2 rounded border border-orange-500 mt-4 inline-block text-orange-500 font-medium text-sm hover:border-orange-200 hover:bg-orange-100 transition"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
