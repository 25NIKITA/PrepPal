'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [profileComplete, setProfileComplete] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // If not logged in, redirect to the login page
      router.push('/login');
      return;
    }

    // Check if the profile is complete
    const isProfileComplete = localStorage.getItem('profileComplete') === 'true';
    setProfileComplete(isProfileComplete);

    if (!isProfileComplete) {
      // If profile is not complete, redirect to the profile creation page
      router.push('/profile');
    }
  }, [router]);

  const handleLogout = () => {
    // Remove login status and redirect to the login page
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('profileComplete');
    router.push('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  if (!profileComplete) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-600 text-white flex flex-col">
        <div className="p-4 bg-green-700 flex items-center justify-center">
          <h1 className="text-2xl font-bold">PREPPAL</h1>
        </div>
        <nav className="mt-6 flex-1">
          <ul>
            <li>
              <button
                onClick={() => router.push('/matching')}
                className="w-full text-left px-4 py-2 hover:bg-green-500"
              >
                Matching
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/study-rooms')}
                className="w-full text-left px-4 py-2 hover:bg-green-500"
              >
                Study Rooms
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/community')}
                className="w-full text-left px-4 py-2 hover:bg-green-500"
              >
                Community
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/resources')}
                className="w-full text-left px-4 py-2 hover:bg-green-500"
              >
                Resources
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="w-full flex items-center p-4 bg-white shadow-md">
          <div className="ml-auto flex items-center space-x-4">
            <div
              className="relative cursor-pointer"
              onClick={() => router.push('/messages')}
            >
              {/* Messaging Icon */}
            </div>
            <div className="relative">
              <img
                src="/profile-pic.jpeg"
                alt="Profile Icon"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      router.push('/profile');
                      closeDropdown();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-green-50"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeDropdown();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-green-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-4">This is the home page</h1>
        </main>

        <footer className="w-full p-4 text-center text-gray-600 bg-gray-200">
          © 2024 Your Company. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
