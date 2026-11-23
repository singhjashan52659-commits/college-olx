'use client';

import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { detectCollegeFromEmail } from '../data/colleges';
import {
  X,
  GraduationCap,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const QUICK_CAMPUS_DEMOS = [
  { name: 'Priya Verma', email: 'priya@iitd.ac.in', campus: 'IIT Delhi' },
  { name: 'Kabir Singhania', email: 'kabir@pilani.bits-pilani.ac.in', campus: 'BITS Pilani' },
  { name: 'Sneha Nair', email: 'sneha@vitstudent.ac.in', campus: 'VIT Vellore' },
  { name: 'Devansh Patil', email: 'devansh@iitb.ac.in', campus: 'IIT Bombay' },
];

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginWithEduEmail } = useMarketplace();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hostel, setHostel] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  // Live detection of college from entered email
  const liveDetection = detectCollegeFromEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your student email address.');
      return;
    }

    const result = loginWithEduEmail(email, name, hostel, phone);
    if (!result.success) {
      setErrorMsg(result.message);
      return;
    }

    setIsLoginModalOpen(false);
  };

  const handleQuickLogin = (demoName: string, demoEmail: string) => {
    setEmail(demoEmail);
    setName(demoName);
    setErrorMsg('');
    const res = loginWithEduEmail(demoEmail, demoName);
    if (res.success) {
      setIsLoginModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col transition-colors">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Student Verification
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log in with your institution email
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Campus Email (.edu.in / .ac.in / .edu) *
            </label>
            <input
              type="email"
              required
              autoFocus
              placeholder="e.g. name@iitd.ac.in or student@vit.ac.in"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-xs"
            />
          </div>

          {/* Live Auto-Detection Result Banner */}
          {email.includes('@') && (
            <div className="animate-fadeIn">
              {liveDetection.college ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                      Recognized: {liveDetection.college.name}
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 text-[11px] block mt-0.5">
                      📍 {liveDetection.college.city}, {liveDetection.college.state} • Automatically switches to this campus feed on login
                    </span>
                  </div>
                </div>
              ) : liveDetection.isEduOrAc ? (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-blue-900 dark:text-blue-200 block">
                      Valid Student Domain: @{liveDetection.domain}
                    </span>
                    <span className="text-blue-700 dark:text-blue-400 text-[11px]">
                      Campus detected from domain structure.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Please use an official campus ID ending with .edu.in, .ac.in, or .edu</span>
                </div>
              )}
            </div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Priya Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Optional Hostel & Phone */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Hostel / Block
              </label>
              <input
                type="text"
                placeholder="e.g. Block C / PG"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                placeholder="e.g. +91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify & Enter Campus Market</span>
          </button>

          {/* Quick Demo Logins */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
              Quick Test Accounts:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {QUICK_CAMPUS_DEMOS.map((demo) => (
                <button
                  type="button"
                  key={demo.email}
                  onClick={() => handleQuickLogin(demo.name, demo.email)}
                  className="px-2.5 py-1.5 text-left text-xs bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-500 rounded-lg transition-all truncate"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                    {demo.campus}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono truncate">
                    {demo.email}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
