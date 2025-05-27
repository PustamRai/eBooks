import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exists with this email",
        },
        { status: 400 }
      );
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 400 }
      );
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    const loggedInUser = await User.findById(user._id).select("-password");

    // cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: { token, loggedInUser },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("Error login user: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
