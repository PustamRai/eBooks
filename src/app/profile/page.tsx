"use client";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl text-blue-500 flex gap-2">
        <span></span>
        Welcome to eBook Store,{" "}
        <span className="text-orange-400 font-bold">{user.name}</span>
      </h1>
    </div>
  );
}

export default ProfilePage;
