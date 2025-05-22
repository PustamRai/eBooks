import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="border-b border-gray-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <div>
          <Link href={"/"}>
            <div className="">
              <h2>eBook</h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="h-10 rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-900 transition-all hover:border-orange-500 hover:bg-orange-500 active:border-black active:bg-blue-500 cursor-pointer">
            Sign in
          </button>

          <Link href={"/signup"}>
            <button className="h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-gray-800 transition-all bg-orange-300 hover:bg-orange-500 active:bg-blue-500 cursor-pointer">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
