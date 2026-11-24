'use client';

import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { MapPin, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { POPULAR_COLLEGES } from '../data/colleges';

export const CampusBanner: React.FC = () => {
  const {
    currentCollege,
    filteredProducts,
    setIsCollegeModalOpen,
    setSelectedCollegeId,
    currentUser,
    setIsLoginModalOpen,
  } = useMarketplace();

  if (currentCollege) {
    return (
      <div className="bg-slate-900 text-white dark:bg-slate-950 border-b border-slate-800 py-4 sm:py-6 px-3.5 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                <MapPin className="w-3 h-3 shrink-0" />
                {currentCollege.city}, {currentCollege.state}
              </span>
              {currentUser && currentUser.collegeId === currentCollege.id && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3 shrink-0" />
                  Your Campus
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white line-clamp-1">
              {currentCollege.name}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-400">
              <span className="font-semibold text-white">{filteredProducts.length} items</span> listed by students for in-person campus pickup.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              onClick={() => setIsCollegeModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl active:scale-95 transition-all"
            >
              <span>Change Campus</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setSelectedCollegeId('all')}
              className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              All Campuses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // All Campuses Banner
  return (
    <div className="bg-slate-900 dark:bg-slate-950 text-white border-b border-slate-800 py-5 sm:py-7 px-3.5 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Campus Classifieds</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Buy & sell cycles, textbooks, calculators, and hostel essentials directly with students in your college.
            </p>
          </div>

          {!currentUser && (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="self-start sm:self-center px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Login with .edu.in</span>
            </button>
          )}
        </div>

        {/* Swipeable Campus Chips on Mobile */}
        <div className="pt-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-medium text-slate-400 shrink-0">Popular:</span>
          {POPULAR_COLLEGES.slice(0, 6).map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollegeId(col.id)}
              className="px-2.5 py-1 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 rounded-lg text-xs font-medium text-slate-200 whitespace-nowrap active:scale-95 transition-all"
            >
              {col.shortName}
            </button>
          ))}
          <button
            onClick={() => setIsCollegeModalOpen(true)}
            className="px-2.5 py-1 text-xs text-blue-400 hover:text-blue-300 font-semibold whitespace-nowrap shrink-0"
          >
            + More
          </button>
        </div>
      </div>
    </div>
  );
};
