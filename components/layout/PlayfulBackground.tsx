"use client";

import React from "react";
import { motion } from "motion/react";

export function PlayfulBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Sky Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/90 via-amber-50/70 to-emerald-50/80" />

      {/* Cheerful Sun in Top Corner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-12 -right-12 sm:-top-8 sm:-right-8 w-40 h-40 sm:w-56 sm:h-56 opacity-80"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Sun rays */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2="100"
              y2="15"
              stroke="#FDE047"
              strokeWidth="8"
              strokeLinecap="round"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          {/* Sun Core */}
          <circle cx="100" cy="100" r="55" fill="#FACC15" />
          <circle cx="100" cy="100" r="48" fill="#FBBF24" />
          {/* Cute Sun Face */}
          <circle cx="85" cy="92" r="4.5" fill="#78350F" />
          <circle cx="115" cy="92" r="4.5" fill="#78350F" />
          <circle cx="78" cy="98" r="5" fill="#F87171" opacity="0.6" />
          <circle cx="122" cy="98" r="5" fill="#F87171" opacity="0.6" />
          <path d="M92,108 Q100,118 108,108" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* Floating Cloud 1 - Top Left */}
      <motion.div
        animate={{
          x: [-15, 20, -15],
          y: [-5, 8, -5],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-4 sm:left-16 w-36 sm:w-52 opacity-85 drop-shadow-sm"
      >
        <svg viewBox="0 0 200 120" fill="none">
          <ellipse cx="70" cy="80" rx="45" ry="30" fill="#FFFFFF" />
          <ellipse cx="130" cy="80" rx="45" ry="30" fill="#FFFFFF" />
          <ellipse cx="100" cy="55" rx="45" ry="38" fill="#FFFFFF" />
          <ellipse cx="60" cy="65" rx="35" ry="30" fill="#FFFFFF" />
          <ellipse cx="140" cy="65" rx="35" ry="30" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Floating Cloud 2 - Top Center-Right */}
      <motion.div
        animate={{
          x: [15, -20, 15],
          y: [6, -6, 6],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-24 right-1/4 w-32 sm:w-44 opacity-70 drop-shadow-sm hidden md:block"
      >
        <svg viewBox="0 0 200 120" fill="none">
          <ellipse cx="70" cy="80" rx="45" ry="30" fill="#FFFFFF" />
          <ellipse cx="130" cy="80" rx="45" ry="30" fill="#FFFFFF" />
          <ellipse cx="100" cy="55" rx="45" ry="38" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Floating Balloon 1 - Left Side */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [-3, 4, -3],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-3 sm:left-6 w-16 sm:w-20 opacity-90 drop-shadow-md hidden sm:block"
      >
        <svg viewBox="0 0 100 140" fill="none">
          <ellipse cx="50" cy="45" rx="36" ry="42" fill="#F43F5E" />
          <ellipse cx="36" cy="30" rx="8" ry="16" fill="#FDA4AF" opacity="0.6" transform="rotate(-20 36 30)" />
          <polygon points="50,86 44,93 56,93" fill="#E11D48" />
          <path d="M50,93 Q58,110 46,130" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
        </svg>
      </motion.div>

      {/* Floating Balloon 2 - Right Side */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [4, -5, 4],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/2 -right-3 sm:right-8 w-16 sm:w-20 opacity-90 drop-shadow-md hidden sm:block"
      >
        <svg viewBox="0 0 100 140" fill="none">
          <ellipse cx="50" cy="45" rx="36" ry="42" fill="#0EA5E9" />
          <ellipse cx="36" cy="30" rx="8" ry="16" fill="#BAE6FD" opacity="0.6" transform="rotate(-20 36 30)" />
          <polygon points="50,86 44,93 56,93" fill="#0284C7" />
          <path d="M50,93 Q42,110 54,130" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
        </svg>
      </motion.div>

      {/* Floating Balloon 3 - Left Bottom */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [-4, 3, -4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-28 left-4 w-14 sm:w-16 opacity-80 drop-shadow-md hidden lg:block"
      >
        <svg viewBox="0 0 100 140" fill="none">
          <ellipse cx="50" cy="45" rx="36" ry="42" fill="#FBBF24" />
          <ellipse cx="36" cy="30" rx="8" ry="16" fill="#FEF08A" opacity="0.6" transform="rotate(-20 36 30)" />
          <polygon points="50,86 44,93 56,93" fill="#F59E0B" />
          <path d="M50,93 Q56,110 48,130" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
        </svg>
      </motion.div>

      {/* Sparkles / Stars in Background */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-1/3 text-amber-300 text-3xl font-black"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-64 left-1/4 text-pink-300 text-2xl font-black"
      >
        ★
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 right-1/4 text-sky-300 text-3xl font-black"
      >
        ✦
      </motion.div>

      {/* Cheerful Rainbow Ribbon (Top Left to Top Right subtle curve) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-15 pointer-events-none">
        <svg viewBox="0 0 800 400" fill="none">
          <path d="M50,380 Q400,50 750,380" stroke="#FF6B6B" strokeWidth="18" fill="none" />
          <path d="M50,398 Q400,68 750,398" stroke="#FFA94D" strokeWidth="18" fill="none" />
          <path d="M50,416 Q400,86 750,416" stroke="#FFE066" strokeWidth="18" fill="none" />
          <path d="M50,434 Q400,104 750,434" stroke="#69DB7C" strokeWidth="18" fill="none" />
          <path d="M50,452 Q400,122 750,452" stroke="#4DABF7" strokeWidth="18" fill="none" />
          <path d="M50,470 Q400,140 750,470" stroke="#DA77F2" strokeWidth="18" fill="none" />
        </svg>
      </div>

      {/* Gentle Green Playful Hills at the Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 opacity-70 pointer-events-none">
        <svg viewBox="0 0 1440 200" className="w-full h-full preserve-3d" fill="none">
          {/* Back soft hill */}
          <path
            d="M0,120 Q360,40 720,100 T1440,60 L1440,200 L0,200 Z"
            fill="#86EFAC"
            opacity="0.5"
          />
          {/* Front cute hill */}
          <path
            d="M0,140 Q420,70 900,130 T1440,110 L1440,200 L0,200 Z"
            fill="#4ADE80"
            opacity="0.6"
          />
          {/* Little cute flowers on hills */}
          <circle cx="180" cy="150" r="5" fill="#F43F5E" />
          <circle cx="180" cy="150" r="2.5" fill="#FEF08A" />

          <circle cx="560" cy="135" r="5" fill="#FB923C" />
          <circle cx="560" cy="135" r="2.5" fill="#FEF08A" />

          <circle cx="980" cy="145" r="5" fill="#38BDF8" />
          <circle cx="980" cy="145" r="2.5" fill="#FEF08A" />

          <circle cx="1300" cy="130" r="5" fill="#EC4899" />
          <circle cx="1300" cy="130" r="2.5" fill="#FEF08A" />
        </svg>
      </div>
    </div>
  );
}
