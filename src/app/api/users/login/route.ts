import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
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
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 400 }
      );
    }

    // generate token
    const token = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
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
