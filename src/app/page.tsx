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
import { ArrowUpDown, PlusCircle, SearchX, Building2, ShieldCheck } from 'lucide-react';

export default function Home() {
  const {
    filteredProducts,
    currentCollege,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setIsPostModalOpen,
    setIsCollegeModalOpen,
    currentUser,
    setIsLoginModalOpen,
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedCategory === 'All' ? 'Campus Listings' : selectedCategory}</span>
              {currentCollege && (
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                  {currentCollege.shortName}
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {searchQuery ? (
                <span>
                  Search results for "<span className="font-semibold text-slate-700 dark:text-slate-200">{searchQuery}</span>" ({sortedProducts.length} items)
                </span>
              ) : (
                <span>{sortedProducts.length} items available</span>
              )}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="latest">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-10 text-center max-w-md mx-auto my-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No items found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
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
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post an Ad</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              C
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">College OLX</span>
            <span>— Minimalist Campus Marketplace</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCollegeModalOpen(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Browse Campuses
            </button>
            {!currentUser && (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Student Edu Login
              </button>
            )}
            <span>Direct Campus Deals</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CollegeSelectorModal />
      <ProductDetailModal />
      <PostAdModal />
      <LoginModal />
    </div>
  );
}
