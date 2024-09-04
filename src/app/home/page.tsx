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
            <li className="group">
              <button
                onClick={() => router.push('/matching')}
                className="flex items-center p-3 text-left hover:bg-purple-600 transition-all duration-300 w-full"
              >
                <span className="text-2xl">💡</span>
                <span className="ml-3">Matching</span>
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => router.push('/study-rooms')}
                className="flex items-center p-3 text-left hover:bg-purple-600 transition-all duration-300 w-full"
              >
                <span className="text-2xl">📖</span>
                <span className="ml-3">Study Rooms</span>
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => router.push('/community')}
                className="flex items-center p-3 text-left hover:bg-purple-600 transition-all duration-300 w-full"
              >
                <span className="text-2xl">🤝</span>
                <span className="ml-3">Community</span>
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => router.push('/resources')}
                className="flex items-center p-3 text-left hover:bg-purple-600 transition-all duration-300 w-full"
              >
                <span className="text-2xl">📚</span>
                <span className="ml-3">Resources</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="w-full flex items-center justify-between p-4 bg-white bg-opacity-90 shadow-md">
          <div className="text-2xl font-extrabold text-purple-800">Welcome to PrepPal</div>
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
                  className="w-full text-left px-4 py-3 hover:bg-purple-50 transition duration-300"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-purple-50 transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center relative mt-4">
          {/* Timer */}
          <div className="absolute top-6 right-8 bg-white bg-opacity-90 p-4 rounded-lg shadow-xl z-10">
            <h2 className="text-lg font-semibold text-purple-800">Pomodoro Timer</h2>
            <div className="text-2xl font-bold text-purple-600">
              {Math.floor(time / 3600)}:{String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:
              {String(time % 60).padStart(2, '0')}
            </div>
          </div>

          {/* Task Manager */}
          <div className="w-full max-w-lg p-6 bg-white bg-opacity-90 rounded-lg shadow-xl mt-16">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Task Manager</h2>
            <div className="mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={addTask}
                className="mt-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Add Task
              </button>
            </div>
            <ul className="space-y-3">
              {tasks.map(task => (
                <li key={task.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition duration-300">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="form-checkbox h-6 w-6 text-purple-600"
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
          © 2024 Preppal
        </footer>
      </div>
    </div>
  );
}
