"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";

interface ChildPageHeaderProps {
  title: string | React.ReactNode;
  backHref?: string;
  backLabel?: string;
  rightContent?: React.ReactNode;
  className?: string;
}

export function ChildPageHeader({
  title,
  backHref = "/learn",
  backLabel,
  rightContent,
  className = "",
}: ChildPageHeaderProps) {
  const router = useRouter();
  const { language } = useSettingsStore();
  const label = backLabel || getTranslation("app.backToMenu", {}, language);

  const handleBack = () => {
    // Use browser back navigation so scroll position is restored natively.
    // Fall back to href if there is no history entry to go back to.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(backHref);
    }
  };

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <button
        onClick={handleBack}
        className="p-2.5 sm:px-4 sm:py-2 bg-amber-100 hover:bg-amber-200 active:bg-amber-300 text-amber-900 rounded-2xl transition flex items-center gap-1.5 font-bold text-sm sm:text-base shadow-sm shrink-0 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{label}</span>
      </button>

      <div className="flex items-center gap-3">
        {typeof title === "string" ? (
          <h1 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight text-right">
            {title}
          </h1>
        ) : (
          title
        )}
        {rightContent}
      </div>
    </div>
  );
}
