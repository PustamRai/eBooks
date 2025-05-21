import connectDB from "@/config/db";
import { Book } from "@/models/book.models";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const books = await Book.find({}); // .populate("author", "name")

    if (books.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No books found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "List of books retrieved successfully",
        data: books,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in listing books", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to list books",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   return NextResponse.json(
//     {
//       message: "ebook get endpoint",
//     },
//     { status: 200 }
//   );
// }
