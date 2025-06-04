"use client";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-2">
        <p className="text-2xl text-blue-500">Welcome, to eBook Store</p>
        <p className="text-orange-400 text-2xl font-bold">{user?.name}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
