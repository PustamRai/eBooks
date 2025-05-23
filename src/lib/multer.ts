// lib/multer.js
import multer from "multer";
import path from "path";

// Configure multer for local file storage
export const upload = multer({
  dest: path.join(process.cwd(), "public/data/uploads"),
  limits: { fileSize: 30 * 1024 * 1024 }, // 30 MB
});
