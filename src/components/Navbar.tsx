'use client';

import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Search,
  MapPin,
  Plus,
  GraduationCap,
  ChevronDown,
  X,
  Sun,
  Moon,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentCollege,
    setIsCollegeModalOpen,
    searchQuery,
    setSearchQuery,
    setIsPostModalOpen,
    setIsLoginModalOpen,
    currentUser,
    logout,
    theme,
    toggleTheme,
  } = useMarketplace();

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-2.5 sm:gap-5">
          {/* Logo & Campus Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                C
              </div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                College<span className="text-blue-600 dark:text-blue-400">OLX</span>
              </span>
            </div>

            {/* Campus Selector Pill */}
            <button
              onClick={() => setIsCollegeModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/90 dark:border-slate-700/80 rounded-xl transition-all text-slate-800 dark:text-slate-200 max-w-[130px] sm:max-w-xs truncate"
              title="Change campus"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="font-semibold truncate">
                {currentCollege ? currentCollege.shortName : 'All Campuses'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                currentCollege
                  ? `Search in ${currentCollege.shortName}...`
                  : 'Search cycles, books, calculators...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 bg-slate-100 dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 border border-transparent focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-all"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Auth / Student Login */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-xl">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left text-xs max-w-[110px] truncate leading-tight">
                  <span className="font-semibold text-slate-900 dark:text-white block truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 truncate block">
                    {currentUser.collegeName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
              >
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Edu Login</span>
              </button>
            )}

            {/* Post Ad Button */}
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>SELL</span>
            </button>
          </div>

          {/* Mobile Right Controls: Fast Sell & Login Button */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {currentUser ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-1.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-800/80"
                title="Student Login"
              >
                <GraduationCap className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-2.5 py-1 text-xs font-extrabold text-slate-950 bg-amber-400 active:bg-amber-300 rounded-xl flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
              <span>SELL</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Always visible on mobile top) */}
        <div className="mt-2 md:hidden relative">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              currentCollege
                ? `Search items in ${currentCollege.shortName}...`
                : 'Search cycles, books, hostel items...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
