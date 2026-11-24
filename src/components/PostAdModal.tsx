'use client';

import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { POPULAR_COLLEGES } from '../data/colleges';
import { CATEGORIES } from '../data/mockListings';
import { Condition, Category } from '../types';
import { X, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

const PRESET_IMAGES = [
  {
    label: 'Bicycle',
    url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Textbook / Notes',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Calculator / Tech',
    url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Hostel Furniture',
    url: 'https://images.unsplash.com/photo-1580481077195-c29b6f196c14?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Kettle / Appliance',
    url: 'https://images.unsplash.com/photo-1594213114663-ddfeefe7649a?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Sports Gear',
    url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
  },
];

export const PostAdModal: React.FC = () => {
  const { isPostModalOpen, setIsPostModalOpen, selectedCollegeId, addProduct, currentUser } =
    useMarketplace();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Books & Notes');
  const [collegeId, setCollegeId] = useState(
    currentUser
      ? currentUser.collegeId
      : selectedCollegeId !== 'all'
      ? selectedCollegeId
      : 'iit-delhi'
  );
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState<Condition>('Good');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [hostelLocation, setHostelLocation] = useState(currentUser?.hostel || '');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [sellerName, setSellerName] = useState(currentUser?.name || '');
  const [sellerContact, setSellerContact] = useState(currentUser?.phone || '');

  useEffect(() => {
    if (currentUser) {
      setSellerName(currentUser.name);
      setCollegeId(currentUser.collegeId);
      if (currentUser.phone) setSellerContact(currentUser.phone);
      if (currentUser.hostel) setHostelLocation(currentUser.hostel);
    }
  }, [currentUser]);

  if (!isPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !price.trim() || !sellerName.trim() || !sellerContact.trim()) {
      alert('Please fill in Title, Price, Name, and Phone.');
      return;
    }

    const selectedCollegeObj = POPULAR_COLLEGES.find((c) => c.id === collegeId);
    const collegeName = selectedCollegeObj
      ? selectedCollegeObj.shortName
      : currentUser?.collegeName || 'Campus Peer';

    addProduct({
      title: title.trim(),
      category,
      price: parseFloat(price) || 0,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      condition,
      isNegotiable,
      collegeId,
      collegeName,
      hostelLocation: hostelLocation.trim() || 'Campus Hostel / PG',
      description:
        description.trim() ||
        'Item is in good condition. Contact for direct campus pickup.',
      images: [imageUrl],
      sellerName: sellerName.trim(),
      sellerContact: sellerContact.trim(),
      sellerEmail: currentUser?.email,
    });

    setIsPostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] transition-colors pb-safe">
        {/* Mobile Pull Handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Sell an Item
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              List for students in your college to buy
            </p>
          </div>
          <button
            onClick={() => setIsPostModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hero Sprint Cycle with Lock / Casio Scientific Calculator"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Category & College */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Target Campus *
              </label>
              <select
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              >
                {POPULAR_COLLEGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.shortName} ({c.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Original Price, Condition */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                placeholder="1200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Orig. Price
              </label>
              <input
                type="number"
                placeholder="2500"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as Condition)}
                className="w-full px-2 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Negotiable & Hostel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Hostel / Pickup Spot
              </label>
              <input
                type="text"
                placeholder="e.g. Block C / Main Gate"
                value={hostelLocation}
                onChange={(e) => setHostelLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="pt-1 sm:pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isNegotiable}
                  onChange={(e) => setIsNegotiable(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Allow Price Negotiation</span>
              </label>
            </div>
          </div>

          {/* Photo Presets */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex justify-between">
              <span>Photo Preset</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-normal">Tap to choose</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {PRESET_IMAGES.map((preset) => {
                const isSelected = imageUrl === preset.url;
                return (
                  <button
                    type="button"
                    key={preset.label}
                    onClick={() => setImageUrl(preset.url)}
                    className={`relative rounded-xl overflow-hidden border aspect-square text-left transition-all ${
                      isSelected
                        ? 'ring-2 ring-blue-600 border-blue-600'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-slate-950/80 text-[8px] sm:text-[9px] text-white px-1 py-0.5 truncate text-center block">
                      {preset.label}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Condition details, accessories included, availability..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Seller Information */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Seller Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name *"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <input
                type="tel"
                required
                placeholder="WhatsApp Phone Number *"
                value={sellerContact}
                onChange={(e) => setSellerContact(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
          >
            Post Item to Campus
          </button>
        </form>
      </div>
    </div>
  );
};
