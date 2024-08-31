'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MatchingPage() {
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

  const profiles = [
    {
      name: 'Nikita Naik',
      image: '/nikita.jpeg', // replace with actual path
      degree: 'Engineering ENTC',
      location: 'Pune, India',
      focus: 'CAT',
      linkedin: '#',
      github: '#',
      about: 'Hi! I am pursuing Engineering in ENTC. I am interested in Web development...',
      interests: ['SAT', 'CAT'],
      score: 57,
    },
    {
      name: 'Shruti Nayak',
      image: '/shruti.jpeg', // replace with actual path
      degree: 'Engineering ENTC',
      location: 'Pune, India',
      focus: 'CAT',
      linkedin: '#',
      github: '#',
      about: 'Hi! I am pursuing Engineering in ENTC. I am passionate about Business Analytics...',
      interests: ['SAT', 'CAT', 'Marketing'],
      score: 57,
    },
    {
      name: 'Raj Sharma',
      image: '/raj.jpeg', // replace with actual path
      degree: 'BCA',
      location: 'Paris',
      focus: 'GMAT',
      linkedin: '#',
      github: '#',
      about: 'Hi! I am pursuing BCA. I am passionate about Business Analytics...',
      interests: ['GMAT', 'SAT', 'Marketing'],
      score: 18,
    },
  ];

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
          <div className="text-2xl font-extrabold text-gray-800">Find Your Study Partner</div>
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
          <div className="flex flex-wrap justify-center gap-6">
            {profiles.map((profile, index) => (
              <div key={index} className="bg-white bg-opacity-80 p-6 rounded-lg shadow-xl w-80">
                <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-sm text-gray-600">{profile.degree}</p>
                <p className="text-sm text-gray-600">{profile.location}</p>
                <p className="text-sm text-gray-600">Focus: {profile.focus}</p>
                <div className="flex justify-center mt-2">
                  <a href={profile.linkedin} className="mx-2 text-blue-500 hover:underline">LinkedIn</a>
                  <a href={profile.github} className="mx-2 text-black hover:underline">GitHub</a>
                </div>
                <p className="mt-4 text-gray-600">{profile.about}</p>
                <div className="flex justify-center mt-4">
                  {profile.interests.map((interest, i) => (
                    <span key={i} className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mx-1">
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-gray-800 text-xl font-bold">{profile.score}</div>
              </div>
            ))}
          </div>
        </main>

        <footer className="w-full p-4 text-center text-gray-600 bg-gray-200">
          © 2024 Preppal
        </footer>
      </div>
    </div>
  );
}
