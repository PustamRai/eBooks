import Link from "next/link";
import React from "react";

function AddBookButton() {
  return (
    <Link href={"/add-book"}>
      <div className="h-10 rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-500 hover:text-white transition">
        add book
      </div>
    </Link>
  );
}

export default AddBookButton;
