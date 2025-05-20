import BookList from "./components/BookList";

export default async function Home() {
  // data fetching
  const response = await fetch(`${process.env.BACKEND_URL}/books/list-books`);

  if (!response.ok) {
    throw new Error("An error occured while fetching the data.");
  }

  const data = await response.json();
  const books = data.data;

  console.log("books: ", books);

  return (
    <div>
      <h2>Welcome to eBook store</h2>
      <BookList books={books} />
    </div>
  );
}
