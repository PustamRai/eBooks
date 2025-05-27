import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
        data: token,
      },
      { status: 200 }
    );

    // clear the cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.log("Error in logout: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Logout Failed",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
