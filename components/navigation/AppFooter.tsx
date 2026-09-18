import React from "react";

export function AppFooter() {
  return (
    <footer className="w-full py-4 px-4 text-center select-none relative z-20">
      <p className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-amber-200/80 shadow-xs">
        <span>developed with</span>
        <span className="text-rose-500 animate-pulse inline-block">❤️</span>
        <span>by</span>
        <a
          href="https://farhanhl.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-amber-700 hover:text-amber-900 underline decoration-amber-400 decoration-2 underline-offset-2 transition-colors hover:scale-105 inline-block"
        >
          O&apos;om
        </a>
      </p>
    </footer>
  );
}
