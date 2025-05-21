import { Suspense } from "react";
import BookList from "./components/BookList";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import AddBook from "./components/AddBook";

export default function Home() {
  return (
    <div className="mt-12 min-h-screen relative">
      <h2 className="text-center text-orange-500 font-bold text-2xl font-mono">
        Welcome to eBook store
      </h2>

      <Suspense fallback={<LoadingSkeleton count={3} />}>
        <BookList />
      </Suspense>

      <div className="fixed z-10 bottom-6 left-[840px] right-0">
        <AddBook />
      </div>
    </div>
  );
}
