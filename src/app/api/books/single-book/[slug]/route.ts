import connectDB from "@/lib/db";
import { Book } from "@/models/book.models";
import { NextResponse } from "next/server";
import "@/models/user.models";

// Connect to DB
connectDB();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const book = await Book.findOne({ slug }).populate("author", "name");

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Book retrieved successfully",
        data: book,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
