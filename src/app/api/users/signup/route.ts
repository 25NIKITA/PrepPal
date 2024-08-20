import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';  // Ensure you use bcryptjs directly

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log('Request Body:', reqBody);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log('User Saved:', savedUser);

    return NextResponse.json({
      message: 'User saved successfully',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
