"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logout from "../LogoutButton";
import AddBookButton from "../AddBookButton";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

function Navbar() {
  // const token = request.cookies.get("token")?.value;

  // const isLoggedIn = !!token; // set isloggedIn true, if token exists, otherwise false

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { user } = useAuth();

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

        <div className="relative">
          {user ? (
            <button
              className="p-1 hover:text-gray-500 transition-colors hover:cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="">
                <p className="text-blue-400 font-bold text-lg">{user?.name}</p>
              </div>
            </button>
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

          {user && isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 cursor-pointer"
                  onClick={() => {
                    router.push("/add-book");
                    setIsDropdownOpen(false);
                  }}
                >
                  <AddBookButton />
                </button>
                <button
                  className="w-full text-left px-4 py-2  cursor-pointer"
                  onClick={() => {
                    router.push("/");
                    setIsDropdownOpen(false);
                  }}
                >
                  <Logout />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
