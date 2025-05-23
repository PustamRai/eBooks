import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Book } from "@/models/book.models";
import "@/models/user.models";

connectDB();

export async function GET() {
  try {
    const books = await Book.find({}).populate("author", "name");

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
    console.log("Error in listing books", error);
    return NextResponse.json(
      {
        success: false,
        message: "failed in list books",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
