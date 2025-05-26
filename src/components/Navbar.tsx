import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import Logout from "./LogoutButton";
import AddBookButton from "./AddBookButton";
import Image from "next/image";

async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const isLoggedIn = !!token; // set isloggedIn true, if token exists, otherwise false

  return (
    <nav className="border-b border-gray-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <div>
          <Link href={"/"}>
            <div className="flex">
              <Image src="/favicon.ico" alt="favicon " width={30} height={30} />
              <h2 className="text-orange-500 font-bold">eBook</h2>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex gap-4 ">
              <AddBookButton />
              <Logout />
            </div>
          ) : (
            <div className="flex gap-5">
              <Link href={"/login"}>
                <button className="h-10 rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-900 transition-all hover:border-orange-500 hover:bg-orange-500 active:border-black active:bg-blue-500 cursor-pointer">
                  Sign in
                </button>
              </Link>

              <Link href={"/signup"}>
                <button className="h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-gray-800 transition-all bg-orange-300 hover:bg-orange-500 active:bg-blue-500 cursor-pointer">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
