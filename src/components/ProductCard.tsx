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
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Like New':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Good':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Condition Badge */}
        <span
          className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-md ${getConditionColor(
            product.condition
          )}`}
        >
          {product.condition}
        </span>

        {/* Category Tag */}
        <span className="absolute top-2.5 right-2.5 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
          {product.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                {discount && discount > 0 && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    {discount}% off
                  </span>
                )}
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm mt-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Location & Seller Footer */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 truncate">
            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium truncate">{product.collegeName}</span>
            {product.hostelLocation && (
              <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate">
                • {product.hostelLocation}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {product.postedAt}
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {product.sellerName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
