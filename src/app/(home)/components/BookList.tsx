import { Book } from "@/types";
import React from "react";
import BookCard from "./BookCard";

async function BookList() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // data fetching
  let books: Book[] = [];

  try {
    const response = await fetch(`${BASE_URL}/api/books/list-books`, {
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
