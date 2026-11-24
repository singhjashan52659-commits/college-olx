'use client';

import React from 'react';
import { Product } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct } = useMarketplace();

  const getConditionColor = (cond: string) => {
    switch (cond) {
      case 'Brand New':
        return 'bg-emerald-500/90 text-white';
      case 'Like New':
        return 'bg-blue-600/90 text-white';
      case 'Good':
        return 'bg-amber-500/90 text-white';
      default:
        return 'bg-slate-700/90 text-white';
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 active:scale-[0.98] transition-all duration-150 flex flex-col cursor-pointer shadow-xs"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Condition Badge */}
        <span
          className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold backdrop-blur-md shadow-xs ${getConditionColor(
            product.condition
          )}`}
        >
          {product.condition}
        </span>

        {/* Negotiable Tag */}
        {product.isNegotiable && (
          <span className="hidden sm:inline-block absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-medium px-1.5 py-0.5 rounded">
            Negotiable
          </span>
        )}

        {/* Category Tag */}
        <span className="absolute top-2 right-2 bg-slate-950/75 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded truncate max-w-[80px]">
          {product.category.split(' ')[0]}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discount && discount > 0 && (
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                {discount}% off
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm mt-1 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
        </div>

        {/* Location & Time Footer */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 truncate">
            <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium truncate">{product.collegeName}</span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
            <span className="truncate">{product.postedAt}</span>
            <span className="flex items-center gap-0.5 font-medium text-slate-600 dark:text-slate-400 truncate">
              <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate max-w-[65px]">{product.sellerName.split(' ')[0]}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
