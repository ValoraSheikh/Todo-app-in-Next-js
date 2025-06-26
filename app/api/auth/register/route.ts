import dbConnect from "@/lib/db";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const checkingUserExistance = await User.findOne({ email });

    if (checkingUserExistance) {
      return NextResponse.json(
        {
          error: "User already exist",
        },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { messsage: "User registered Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in creating user", error);

    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
