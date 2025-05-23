import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import validator from "validator";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 400 }
      );
    }

    // validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        {
          success: true,
          message: "Please enter a valide email",
        },
        { status: 400 }
      );
    }

    if (!password || password.length < 3) {
      return NextResponse.json(
        {
          success: true,
          message: "Password must be greater than 3",
        },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    const newUser = await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in signup: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Signup failed",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
