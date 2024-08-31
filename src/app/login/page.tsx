'use client';

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.data.success) {
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        localStorage.setItem('profileComplete', response.data.profileComplete ? 'true' : 'false'); // Assuming profileComplete is sent in response
        toast.success('Login successful');
        router.push(response.data.profileComplete ? '/home' : '/profile'); // Redirect based on profile completion
      } else {
        toast.error(response.data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl transform transition hover:scale-105 hover:shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-900">{loading ? "Processing..." : "Login"}</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>
        <hr className="mt-6 border-t-2 border-gray-300" />

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-3 mt-6 text-white bg-purple-700 rounded-lg font-bold hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition transform hover:scale-105 ${
              buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={buttonDisabled}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-700">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-700 hover:text-purple-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
