import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/verifyToken";
import { User } from "@/models/user.models";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const { id } = verifyToken(token);

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
