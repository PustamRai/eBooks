import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import slugify from "slugify";
import connectDB from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { Book } from "@/models/book.models";
import { verifyToken } from "@/lib/auth/verifyToken";

connectDB();

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized: No token ",
      },
      { status: 401 }
    );
  }

  let userId: string;
  try {
    const decoded = verifyToken(token);
    userId = decoded.id;
  } catch (error) {
    console.log("Error in token validation: ", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const genre = formData.get("genre")?.toString();
    const description = formData.get("description")?.toString();
    const slug = slugify(title || "", { lower: true });

    const coverImage = formData.get("coverImage") as File | null;
    const bookFile = formData.get("file") as File | null;

    if (!coverImage || !bookFile) {
      return NextResponse.json(
        { success: false, message: "Both files are required" },
        { status: 400 }
      );
    }

    // Handle Cover Image
    const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
    const coverPath = path.join("/tmp", coverImage.name);
    await fs.writeFile(coverPath, coverBuffer);

    const coverUpload = await cloudinary.uploader.upload(coverPath, {
      filename_override: coverImage.name,
      folder: "eBook/book-covers",
      format: coverImage.type.split("/").pop(),
    });

    // Handle Book File
    const bookBuffer = Buffer.from(await bookFile.arrayBuffer());
    const bookPath = path.join("/tmp", bookFile.name);
    await fs.writeFile(bookPath, bookBuffer);

    const bookUpload = await cloudinary.uploader.upload(bookPath, {
      filename_override: bookFile.name,
      resource_type: "raw",
      folder: "eBook/book-pdfs",
      format: "pdf",
    });

    // Clean temp files
    await fs.unlink(coverPath);
    await fs.unlink(bookPath);

    if (!coverUpload.secure_url || !bookUpload.secure_url) {
      return NextResponse.json(
        { success: false, message: "Failed to upload to Cloudinary" },
        { status: 500 }
      );
    }

    // Save to DB (hardcoded author for now)
    const newBook = await Book.create({
      title,
      genre,
      description,
      slug,
      coverImage: coverUpload.secure_url,
      file: bookUpload.secure_url,
      author: userId,
    });

    return NextResponse.json({
      success: true,
      message: "Book uploaded successfully",
      data: newBook._id,
    });
  } catch (error) {
    console.error("Book upload error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
