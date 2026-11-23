'use client';

import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  X,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  Building,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useMarketplace();

  if (!selectedProduct) return null;

  const discount = selectedProduct.originalPrice
    ? Math.round(
        ((selectedProduct.originalPrice - selectedProduct.price) /
          selectedProduct.originalPrice) *
          100
      )
    : null;

  const cleanNumber = selectedProduct.sellerContact.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Hi ${selectedProduct.sellerName}, I saw your listing for "${selectedProduct.title}" on College OLX (${selectedProduct.collegeName}). Is it still available?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        {/* Header Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>{selectedProduct.category}</span>
            <span>•</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{selectedProduct.collegeName}</span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 relative">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700">
                  {selectedProduct.condition}
                </span>
              </div>
            </div>

            {/* Product & Seller Info */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                      ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discount && discount > 0 && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {discount}% off
                    </span>
                  )}
                </div>

                {selectedProduct.isNegotiable && (
                  <span className="inline-block mt-1 text-xs text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                    Price Negotiable
                  </span>
                )}

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-3 leading-snug">
                  {selectedProduct.title}
                </h2>

                {/* Campus Location */}
                <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                    <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{selectedProduct.collegeName}</span>
                  </div>
                  {selectedProduct.hostelLocation && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Location: {selectedProduct.hostelLocation}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>Posted {selectedProduct.postedAt}</span>
                  </div>
                </div>
              </div>

              {/* Seller Contact Box */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Student Seller
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {selectedProduct.sellerName}
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                    Verified Campus Peer
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${cleanNumber}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Seller</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Description
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {selectedProduct.description}
            </p>
          </div>

          {/* Campus Safety Notice */}
          <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 rounded-2xl text-xs text-amber-900 dark:text-amber-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Campus Safety Guidelines:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs pl-5">
              Always meet in public campus zones (Library, Student Canteen, Main Gate). Inspect the item physically before paying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
