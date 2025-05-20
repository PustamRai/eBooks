import { Book } from "@/types";
import React from "react";
import BookCard from "./BookCard";

function BookList({ books }: { books: Book[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
      {books.map((book) => (
        <BookCard key={book._id} books={book} />
      ))}
    </div>
  );
}

export default BookList;
