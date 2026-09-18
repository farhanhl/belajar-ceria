"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Play } from "lucide-react";
import { ChildCard } from "@/components/ui/ChildCard";
import { ChildButton, ButtonVariant } from "@/components/ui/ChildButton";

export interface GameMenuCardProps {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeBgColor: string;
  badgeTextColor?: string;
  borderColor: string;
  bgGradient: string;
  visualBgColor: string;
  visualBorderColor: string;
  visualEmoji: string;
  visualTextColor?: string;
  href: string;
  buttonVariant: ButtonVariant;
  buttonText: string;
  buttonIconFill?: string;
}

export function GameMenuCard({
  title,
  subtitle,
  badgeText,
  badgeBgColor,
  badgeTextColor = "text-white",
  borderColor,
  bgGradient,
  visualBgColor,
  visualBorderColor,
  visualEmoji,
  visualTextColor = "",
  href,
  buttonVariant,
  buttonText,
  buttonIconFill,
}: GameMenuCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <ChildCard
        borderColor={borderColor}
        bgGradient={bgGradient}
        className="relative overflow-hidden group shadow-lg h-full flex flex-col justify-between p-5 sm:p-6 bg-white/95"
      >
        <div>
          {/* Header with Category Badge and Visual Emoji Box */}
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <div
              className={`inline-flex items-center gap-1.5 ${badgeBgColor} ${badgeTextColor} font-black text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>{badgeText}</span>
            </div>

            {/* Decorative Visual Box */}
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 ${visualBgColor} rounded-2xl sm:rounded-3xl border-3 sm:border-4 ${visualBorderColor} flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform shrink-0`}
            >
              <span
                className={`text-3xl sm:text-4xl select-none font-black ${visualTextColor}`}
              >
                {visualEmoji}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5 text-left mb-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 mt-auto">
          <Link href={href} className="block w-full">
            <ChildButton
              variant={buttonVariant}
              size="md"
              icon={<Play className={`w-4 h-4 ${buttonIconFill || "fill-current"}`} />}
              className="w-full font-black justify-center py-3 shadow-md hover:shadow-lg transition-all"
            >
              {buttonText}
            </ChildButton>
          </Link>
        </div>
      </ChildCard>
    </motion.div>
  );
}
