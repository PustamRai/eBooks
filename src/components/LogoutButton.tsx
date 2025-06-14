"use client";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function Logout() {
  const { setUser } = useAuth();
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      setUser(null);
      toast.success("Logout successful");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("Error in logout: ", error);
      toast.error("Logout failed");
      // toast.error(error.response?.data?.message || "Logout failed");
    }
  };
  return (
    <div
      className="h-10 w-full text-center rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-400 hover:text-white transition cursor-pointer"
      onClick={logout}
    >
      Logout
    </div>
  );
}

export default Logout;
