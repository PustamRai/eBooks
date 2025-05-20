import { Suspense } from "react";
import BookList from "./components/BookList";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Home() {
  return (
    <div className="mt-12">
      <h2 className="text-center text-orange-500 font-bold text-2xl font-mono">
        Welcome to eBook store
      </h2>

      <Suspense fallback={<LoadingSkeleton count={3} />}>
        <BookList />
      </Suspense>
    </div>
  );
}
