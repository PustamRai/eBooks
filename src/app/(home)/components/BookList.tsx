import { Book } from "@/types";
import React from "react";

function BookList({ books }: { books: Book[] }) {
  return (
    <div>
      {books.map((book) => (
        <h2 key={book._id}>{book.title}</h2>
      ))}
    </div>
  );
}

export default BookList;
