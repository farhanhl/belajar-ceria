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
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <ChildCard
        borderColor={borderColor}
        bgGradient={bgGradient}
        className="relative overflow-hidden group shadow-xl h-full flex flex-col justify-between"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <div
              className={`inline-flex items-center gap-1.5 ${badgeBgColor} ${badgeTextColor} font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>{badgeText}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {title}
            </h3>
            <p className="text-sm font-bold text-slate-700">
              {subtitle}
            </p>
          </div>

          {/* Decorative Visual Box */}
          <div
            className={`relative w-24 h-24 sm:w-28 sm:h-28 ${visualBgColor} rounded-3xl border-4 ${visualBorderColor} flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform shrink-0`}
          >
            <span
              className={`text-4xl sm:text-5xl select-none font-black ${visualTextColor}`}
            >
              {visualEmoji}
            </span>
          </div>
        </div>

        <div className="pt-4">
          <Link href={href}>
            <ChildButton
              variant={buttonVariant}
              size="md"
              icon={<Play className={`w-5 h-5 ${buttonIconFill || "fill-current"}`} />}
              className="w-full sm:w-auto font-black"
            >
              {buttonText}
            </ChildButton>
          </Link>
        </div>
      </ChildCard>
    </motion.div>
  );
}
