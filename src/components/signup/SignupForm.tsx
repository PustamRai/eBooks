"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/users/signup`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Signup successful!");
        router.push("/login");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.log("Error in signup: ", error);
      toast.error("failed in signup");
      // toast.error(error.response?.data?.message || "failed in signup");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-500 rounded-xs focus:outline-none focus:ring-1 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <Link href={"/login"}>
            <div className="text-gray-600 hover:underline">Login Here</div>
          </Link>
        </div>

        <button
          type="submit"
          className="w-auto px-10 py-2 bg-black text-white text-sm font-medium rounded-xs hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 mx-auto block"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
