"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function Logout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");

      toast.success("Logout successful");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error in logout: ", error);
      toast.error("Logout failed");
      // toast.error(error.response?.data?.message || "Logout failed");
    }
  };
  return (
    <div>
      <button
        type="submit"
        className="h-10 rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-500 hover:text-white transition cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
