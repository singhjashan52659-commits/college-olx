'use client';

import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { POPULAR_COLLEGES, searchColleges } from '../data/colleges';
import { X, Search, MapPin, Check, Building2, Globe } from 'lucide-react';

export const CollegeSelectorModal: React.FC = () => {
  const {
    isCollegeModalOpen,
    setIsCollegeModalOpen,
    selectedCollegeId,
    setSelectedCollegeId,
  } = useMarketplace();

  const [query, setQuery] = useState('');

  if (!isCollegeModalOpen) return null;

  const filtered = searchColleges(query);

  const handleSelect = (id: string) => {
    setSelectedCollegeId(id);
    setIsCollegeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] transition-colors">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Select Campus
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your college to see items listed by students on campus
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCollegeModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search college, short code, city (e.g. IIT, BITS, VIT)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Option: All Campuses */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleSelect('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left border transition-all ${
              selectedCollegeId === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4" />
              <div>
                <span className="font-semibold text-xs sm:text-sm block">All Campuses</span>
                <span className={`text-[10px] block ${selectedCollegeId === 'all' ? 'text-blue-100' : 'text-slate-400'}`}>
                  Explore listings across all colleges
                </span>
              </div>
            </div>
            {selectedCollegeId === 'all' && <Check className="w-4 h-4 text-white" />}
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filtered.map((college) => {
            const isSelected = selectedCollegeId === college.id;
            return (
              <button
                key={college.id}
                onClick={() => handleSelect(college.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      {college.name}
                    </span>
                    {college.badge && (
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                        {college.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {college.city}, {college.state}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      @{college.domain}
                    </span>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
