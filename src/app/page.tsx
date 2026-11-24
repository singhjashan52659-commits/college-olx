'use client';

import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Navbar } from '../components/Navbar';
import { CategoryBar } from '../components/CategoryBar';
import { CampusBanner } from '../components/CampusBanner';
import { ProductCard } from '../components/ProductCard';
import { CollegeSelectorModal } from '../components/CollegeSelectorModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { PostAdModal } from '../components/PostAdModal';
import { LoginModal } from '../components/LoginModal';
import { BottomNav } from '../components/BottomNav';
import { ArrowUpDown, PlusCircle, SearchX } from 'lucide-react';

export default function Home() {
  const {
    filteredProducts,
    currentCollege,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setIsPostModalOpen,
    currentUser,
  } = useMarketplace();

  const [sortBy, setSortBy] = useState<'latest' | 'price-low' | 'price-high'>('latest');

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <CampusBanner />
      <CategoryBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 sm:pb-12">
        {/* Results Header */}
        <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
          <div>
            <h2 className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
              <span>{selectedCategory === 'All' ? 'Campus Listings' : selectedCategory}</span>
              {currentCollege && (
                <span className="text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 sm:px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 shrink-0">
                  {currentCollege.shortName}
                </span>
              )}
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              {searchQuery ? (
                <span>
                  Results for "<span className="font-semibold text-slate-700 dark:text-slate-200">{searchQuery}</span>" ({sortedProducts.length})
                </span>
              ) : (
                <span>{sortedProducts.length} items available</span>
              )}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="hidden sm:flex text-xs text-slate-400 dark:text-slate-500 items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-[11px] sm:text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 sm:px-2.5 py-1 sm:py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 transition-colors shadow-2xs"
            >
              <option value="latest">Recent</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
            </select>
          </div>
        </div>

        {/* 2-Column Responsive Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 sm:p-12 text-center max-w-md mx-auto my-6 sm:my-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
              No items found
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-5 leading-relaxed">
              {currentCollege
                ? `No student has listed an item matching this in ${currentCollege.shortName} yet.`
                : 'No items match your active filters or search keyword.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post an Ad</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Desktop Footer (Hidden on mobile to keep view clean, since bottom nav is present) */}
      <footer className="hidden sm:block bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              C
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">College OLX</span>
            <span>— Mobile-Ready Campus Marketplace</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Direct Campus Deals</span>
            <span>Zero Platform Fees</span>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Bottom Bar */}
      <BottomNav />

      {/* Modals & Sheets */}
      <CollegeSelectorModal />
      <ProductDetailModal />
      <PostAdModal />
      <LoginModal />
    </div>
  );
}
