"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "@/types/user.types";

// props type
interface AuthProviderProps {
  children: ReactNode;
}

// context value type
interface AuthContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  // auto refresh
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/users/me");

      setUser(response?.data?.data);
    } catch (error) {
      console.log("Error fetching user: ", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
