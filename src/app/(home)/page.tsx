import { Book } from "@/types";
import BookList from "./components/BookList";

export default async function Home() {
  // data fetching
  let books: Book[] = [];

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/books/list-books`);

    if (!response.ok) {
      throw new Error("An error occured while fetching the data.");
    }

    const data = await response.json();
    books = data.data;

    console.log("books: ", books);
  } catch (error) {
    console.log("Error in retrieving book list: ", error);
  }

  return (
    <div className="mt-8">
      <h2 className="text-center text-orange-500 font-bold text-2xl font-mono">
        Welcome to eBook store
      </h2>
      <BookList books={books} />
    </div>
  );
}
