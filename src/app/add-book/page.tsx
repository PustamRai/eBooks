"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function AddBookPage() {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    description: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverImage || !bookFile) {
      toast.error("Both files are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("genre", form.genre);
    formData.append("description", form.description);
    formData.append("coverImage", coverImage);
    formData.append("file", bookFile);

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/add-book`,
        formData
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "book upload successfully");
      }
    } catch (error) {
      console.log("Error uploading book: ", error);
      toast.error("book upload failed");
      // toast.error(error.response?.data?.message || "book upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a New Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <div>
          <label className="block font-medium mb-1">
            Cover Image (JPG/PNG):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            required
            className="block"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Book File (PDF):</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setBookFile(e.target.files?.[0] || null)}
            required
            className="block"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>
    </div>
  );
}

export default AddBookPage;
