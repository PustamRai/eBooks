"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const meResponse = await axios.get("api/users/me");
        setUser(meResponse?.data?.data); // this sets the user right after login
        toast.success(response.data.message || "Login successful!");
        router.push("/profile");
        router.refresh();
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log("Error login user: ", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-500 rounded-xs focus:outline-none focus:ring-1 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-500 rounded-xs focus:outline-none focus:ring-1 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mt-2 mb-6">
          <div className="text-gray-600 hover:underline">
            Forgot your password?
          </div>

          <Link href={"/signup"}>
            <div className="text-gray-600 hover:underline flex items-center">
              Create account
            </div>
          </Link>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto md:px-12 py-2 bg-black text-white text-sm font-medium rounded-xs hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 mx-auto block cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
