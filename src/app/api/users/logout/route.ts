import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 0, // Immediately expire
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in logout: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed logout",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
