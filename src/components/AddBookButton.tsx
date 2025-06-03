import Link from "next/link";
import React from "react";

function AddBookButton() {
  return (
    <Link href={"/add-book"}>
      <div className="h-10 w-full text-center rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-400 hover:text-white transition">
        add book
      </div>
    </Link>
  );
}

export default AddBookButton;
