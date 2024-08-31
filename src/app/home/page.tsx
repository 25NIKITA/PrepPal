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
    const isProfileComplete = localStorage.getItem('profileComplete') === 'true';

    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login if not logged in
      return;
    }

    setProfileComplete(isProfileComplete);

    if (!isProfileComplete) {
      router.push('/profile'); // Redirect to profile if not complete
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

  // Ensure that the component doesn't render if profile isn't complete
  if (!profileComplete) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/your-cool-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Sidebar */}
      <aside className="w-80 bg-gradient-to-r from-purple-400 to-pink-500 text-white flex flex-col">
        <div className="p-4 bg-purple-600 flex items-center justify-center">
          <h1 className="text-3xl font-extrabold">PREPPAL</h1>
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            <li className="group">
              <button
                onClick={() => router.push('/home')}
                className="flex items-center p-3 text-left hover:bg-purple-600 transition-all duration-300 w-full"
              >
                <span className="text-2xl">🏠</span>
                <span className="ml-3">Home</span>
              </button>
            </li>
            {/* Add other navigation items */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="w-full flex items-center justify-between p-4 bg-white bg-opacity-90 shadow-md">
          <div className="text-2xl font-extrabold text-purple-800">Welcome to Preppal</div>
          <div className="relative">
            <img
              src="/profile-pic.jpeg"
              alt="Profile Icon"
              className="w-14 h-14 rounded-full cursor-pointer border-4 border-purple-400"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                <button
                  onClick={() => {
                    router.push('/profile');
                    closeDropdown();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-purple-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 space-y-4 overflow-auto">
          <h2 className="text-2xl font-extrabold text-purple-900">{`Current Time: ${time}`}</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-extrabold text-purple-700">Tasks</h3>
            <ul className="mt-4">
              {tasks.map(task => (
                <li key={task.id} className="flex items-center justify-between">
                  <span className={`text-purple-900 ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="p-2 rounded-full bg-purple-200 text-purple-800 hover:bg-purple-300 transition"
                  >
                    {task.completed ? '✅' : '⏳'}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex">
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                className="flex-1 p-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Add new task..."
              />
              <button
                onClick={addTask}
                className="px-4 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
