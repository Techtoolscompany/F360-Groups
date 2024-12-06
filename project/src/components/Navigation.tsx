import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Navigation() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const isAuth = location.pathname === '/';

  if (isAuth) return null;

  return (
    <nav className="bg-white dark:bg-dark-lighter border-b border-gray-200 dark:border-gray-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="w-96 bg-gray-100 dark:bg-dark rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-accent-blue text-gray-900 dark:text-gray-100"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg"
            >
              {isDark ? (
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <img src="https://ui-avatars.com/api/?name=User" alt="Profile" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;