'use client';

import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Home,
  MapPin,
  Plus,
  GraduationCap,
  Sun,
  Moon,
  User,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    currentCollege,
    setIsCollegeModalOpen,
    setIsPostModalOpen,
    setIsLoginModalOpen,
    currentUser,
    setSelectedCategory,
    setSearchQuery,
    theme,
    toggleTheme,
  } = useMarketplace();

  const handleHomeClick = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed md:hidden bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800/90 px-3 py-1.5 pb-safe transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home / Feed */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-transform"
        >
          <Home className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        {/* Campus Picker */}
        <button
          onClick={() => setIsCollegeModalOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-transform"
        >
          <div className="relative">
            <MapPin className="w-5 h-5 stroke-[1.8] text-blue-600 dark:text-blue-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
          </div>
          <span className="text-[10px] font-semibold max-w-[58px] truncate">
            {currentCollege ? currentCollege.shortName : 'Campus'}
          </span>
        </button>

        {/* Center Floating SELL Button */}
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="relative -top-2 flex flex-col items-center group active:scale-90 transition-transform"
          aria-label="Post an ad"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white dark:border-slate-900">
            <Plus className="w-6 h-6 stroke-[2.8]" />
          </div>
          <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
            SELL
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 active:scale-95 transition-transform"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 stroke-[1.8]" />
          ) : (
            <Sun className="w-5 h-5 stroke-[1.8] text-amber-400" />
          )}
          <span className="text-[10px] font-semibold">
            {theme === 'light' ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Profile / Edu Login */}
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-transform"
        >
          {currentUser ? (
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <GraduationCap className="w-5 h-5 stroke-[1.8]" />
          )}
          <span className="text-[10px] font-semibold">
            {currentUser ? 'Profile' : 'Login'}
          </span>
        </button>
      </div>
    </nav>
  );
};
