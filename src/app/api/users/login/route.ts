import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';  
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log('Request Body:', reqBody);

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if the password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            console.log('Invalid password for user:', email);
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Ensure TOKEN_SECRET is defined
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET is not defined');
        }

        // Create the token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        // Set the token in the response cookies
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.error('Error in login route:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
