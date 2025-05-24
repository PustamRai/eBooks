import { Book } from "@/types";
import React from "react";
import BookCard from "./BookCard";
import { headers } from "next/headers";

async function BookList() {
  // data fetching
  let books: Book[] = [];

  try {
    const host = (await headers()).get("host");

    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const response = await fetch(`${protocol}://${host}/api/books/list-books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("An error occured while fetching the data.");
    }

    const data = await response.json();
    books = data.data;
  } catch (error) {
    console.log("Error in retrieving book list: ", error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
      {books.map((book) => (
        <BookCard key={book._id} books={book} />
      ))}
    </div>
  );
}

export default BookList;
