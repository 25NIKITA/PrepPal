'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useTimer from '@/hooks/useTimer';

export default function HomePage() {
  const router = useRouter();
  const { time } = useTimer();
  const [profileComplete, setProfileComplete] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const isProfileComplete = localStorage.getItem('profileComplete') === 'true';
    setProfileComplete(isProfileComplete);

    if (!isProfileComplete) {
      router.push('/profile');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('profileComplete');
    localStorage.removeItem('focusTime');
    router.push('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  if (!profileComplete) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundImage: 'url(th.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-green-600 bg-opacity-80 text-white flex flex-col">
        <div className="p-4 bg-green-500 flex items-center justify-center">
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
        <header className="w-full flex items-center justify-between p-4 bg-white bg-opacity-80 shadow-md">
          <h1 className="text-3xl font-bold text-green-800"></h1>
          <div className="flex items-center space-x-4">
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
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
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

        <main className="flex-1 flex flex-col items-center justify-center text-center relative mt-4">
          {/* Timer */}
          <div className="absolute top-4 right-8 bg-white bg-opacity-80 p-3 rounded-lg shadow-lg">
            <h2 className="text-md font-bold text-green-800">Focus Timer</h2>
            <div className="text-xl font-extrabold text-green-600">
              {Math.floor(time / 3600)}:{String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:
              {String(time % 60).padStart(2, '0')}
            </div>
          </div>

          {/* Task Manager */}
          <div className="w-full max-w-md p-4 bg-white bg-opacity-90 rounded-lg shadow-md mt-12">
            <h2 className="text-lg font-bold text-green-800 mb-4">Task Manager</h2>
            <div className="mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={addTask}
                className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Add Task
              </button>
            </div>
            <ul className="space-y-2">
              {tasks.map(task => (
                <li key={task.id} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <footer className="w-full p-4 text-center text-gray-600 bg-gray-200">
          © 2024 Your Company. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
