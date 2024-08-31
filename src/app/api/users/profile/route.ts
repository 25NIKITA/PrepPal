import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connect } from '@/dbConfig/dbConfig';
import UserProfile from '@/models/profileModel';
import User from '@/models/userModel';

connect(); // Ensure the database is connected

interface JwtPayload {
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { firstName, lastName, role, field, year, exam } = reqBody;

    // Get JWT token from cookies
    const token = request.cookies.get('token');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const userId = decoded.id;

    // Check if the profile already exists (optional logic)
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return NextResponse.json({ error: 'Profile already exists' }, { status: 400 });
    }

    // Create and save the new profile
    const profile = new UserProfile({
      user: userId,
      firstName,
      lastName,
      role,
      field,
      year,
      exam,
    });

    const savedProfile = await profile.save();

    return NextResponse.json({ message: 'Profile created successfully', profile: savedProfile });
  } catch (error: any) {
    console.error('Profile creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}