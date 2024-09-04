'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResourcesPage() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
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

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 text-white flex flex-col">
        <div className="p-4 bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center">
          <h1 className="text-3xl font-extrabold">PREPPAL</h1>
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            <li className="group">
              <button
                onClick={() => router.push('/home')}
                className="flex items-center p-3 text-left hover:bg-indigo-700 transition-all duration-300 w-full"
              >
                Home
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => router.push('/study-rooms')}
                className="flex items-center p-3 text-left hover:bg-indigo-700 transition-all duration-300 w-full"
              >
                Study Rooms
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => router.push('/community')}
                className="flex items-center p-3 text-left hover:bg-indigo-700 transition-all duration-300 w-full"
              >
                Community
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => router.push('/resources')}
                className="flex items-center p-3 text-left hover:bg-indigo-700 transition-all duration-300 w-full"
              >
                Resources
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="w-full flex items-center justify-between p-4 bg-white bg-opacity-70 shadow-md">
          <div className="text-2xl font-extrabold text-gray-800">Resources</div>
          <div className="relative">
            <img
              src="/profile-pic.jpeg"
              alt="Profile Icon"
              className="w-14 h-14 rounded-full cursor-pointer border-4 border-gradient-to-r from-purple-400 to-pink-500"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                <button
                  onClick={() => {
                    router.push('/profile');
                    closeDropdown();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition duration-300"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center mt-4">
          <div className="flex flex-col space-y-6 p-4">
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold text-gray-800">#CAT Resources</h2>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
                <ul className="list-disc list-inside mt-2">
                  <li><a href="/resources/cat/notes1.pdf" className="text-blue-500 hover:underline">Notes 1</a></li>
                  <li><a href="/resources/cat/notes2.pdf" className="text-blue-500 hover:underline">Notes 2</a></li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">PDFs</h3>
                <ul className="list-disc list-inside mt-2">
                  <li><a href="/resources/cat/pdf1.pdf" className="text-blue-500 hover:underline">PDF 1</a></li>
                  <li><a href="/resources/cat/pdf2.pdf" className="text-blue-500 hover:underline">PDF 2</a></li>
                </ul>
              </div>
            </div>
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold text-gray-800">#GRE Resources</h2>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
                <ul className="list-disc list-inside mt-2">
                  <li><a href="/resources/gre/notes1.pdf" className="text-blue-500 hover:underline">Notes 1</a></li>
                  <li><a href="/resources/gre/notes2.pdf" className="text-blue-500 hover:underline">Notes 2</a></li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">PDFs</h3>
                <ul className="list-disc list-inside mt-2">
                  <li><a href="/resources/gre/pdf1.pdf" className="text-blue-500 hover:underline">PDF 1</a></li>
                  <li><a href="/resources/gre/pdf2.pdf" className="text-blue-500 hover:underline">PDF 2</a></li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full p-4 text-center text-gray-600 bg-gray-200">
          © 2024 Preppal
        </footer>
      </div>
    </div>
  );
}
