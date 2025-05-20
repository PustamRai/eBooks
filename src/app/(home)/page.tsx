import BookCard from "./components/BookCard";

export default async function Home() {
  // data fetching
  const response = await fetch(`${process.env.BACKEND_URL}/books/list-books`);

  if (!response.ok) {
    throw new Error("An error occured while fetching the data.");
  }

  const books = await response.json();
  console.log("books: ", books);

  return (
    <div>
      <h2>Welcome to eBook store</h2>
      <BookCard books={books} />
    </div>
  );
}
