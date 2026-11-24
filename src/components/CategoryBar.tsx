'use client';

import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Category } from '../types';
import {
  BookOpen,
  Bike,
  Laptop,
  Armchair,
  FlaskConical,
  Trophy,
  Shirt,
  LayoutGrid,
} from 'lucide-react';

interface CategoryItem {
  name: Category;
  icon: React.ReactNode;
}

const CATEGORIES_LIST: CategoryItem[] = [
  { name: 'All', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { name: 'Books & Notes', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { name: 'Bicycles & Vehicles', icon: <Bike className="w-3.5 h-3.5" /> },
  { name: 'Electronics & Gadgets', icon: <Laptop className="w-3.5 h-3.5" /> },
  { name: 'Hostel & Furniture', icon: <Armchair className="w-3.5 h-3.5" /> },
  { name: 'Lab Gear & Uniforms', icon: <FlaskConical className="w-3.5 h-3.5" /> },
  { name: 'Sports & Fitness', icon: <Trophy className="w-3.5 h-3.5" /> },
  { name: 'Fashion & Accessories', icon: <Shirt className="w-3.5 h-3.5" /> },
];

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useMarketplace();

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 py-2 sm:py-2.5 overflow-x-auto no-scrollbar transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center gap-1.5 sm:gap-2 min-w-max">
        {CATEGORIES_LIST.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-blue-400 dark:text-blue-600' : 'text-slate-400 dark:text-slate-500'}>
                {cat.icon}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
