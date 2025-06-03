import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/verifyToken";
import { cookies } from "next/headers";
import { User } from "@/models/user.models";

connectDB();

export async function GET() {
  console.log("GET /api/users/me handler triggered");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    console.log("me token: ", token);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const { id } = verifyToken(token);

    console.log("User ID from token:", id);

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
