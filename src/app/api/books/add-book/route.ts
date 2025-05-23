import { NextResponse, NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import slugify from "slugify";
// import { getTokenFromRequest } from "@/lib/auth"; // custom auth logic
import connectDB from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { Book } from "@/models/book.models";

connectDB();

export async function POST(request: NextRequest) {
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

    // Save cover image to temp file
    const coverArrayBuffer = await coverImage.arrayBuffer();
    const coverBuffer = Buffer.from(coverArrayBuffer);
    const coverFilePath = path.join("/tmp", coverImage.name);
    await fs.writeFile(coverFilePath, coverBuffer);

    // Upload cover to cloudinary
    const coverUpload = await cloudinary.uploader.upload(coverFilePath, {
      filename_override: coverImage.name,
      folder: "eBook/book-covers",
      format: coverImage.type.split("/").pop(),
    });

    // Save book file to temp
    const bookArrayBuffer = await bookFile.arrayBuffer();
    const bookBuffer = Buffer.from(bookArrayBuffer);
    const bookFilePath = path.join("/tmp", bookFile.name);
    await fs.writeFile(bookFilePath, bookBuffer);

    // Upload book PDF to cloudinary
    const bookUpload = await cloudinary.uploader.upload(bookFilePath, {
      filename_override: bookFile.name,
      resource_type: "raw",
      folder: "eBook/book-pdfs",
      format: "pdf",
    });

    // Delete local files
    await fs.unlink(coverFilePath);
    await fs.unlink(bookFilePath);

    if (!coverUpload.secure_url || !bookUpload.secure_url) {
      return NextResponse.json(
        { success: false, message: "Failed to upload to Cloudinary" },
        { status: 500 }
      );
    }

    // Assume you extract userId from token
    // const userId = getTokenFromRequest(request);

    const newBook = await Book.create({
      title,
      genre,
      description,
      coverImage: coverUpload.secure_url,
      file: bookUpload.secure_url,
      slug,
      author: "683070c377b29e0d6d6ec2a5",
    });

    return NextResponse.json({
      success: true,
      message: "Book uploaded successfully",
      data: newBook._id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
