"use client";

import React, { useEffect } from "react";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";

interface StarRatingProps {
  stars: number; // 0 to 5
  maxStars?: number;
  size?: number;
  animate?: boolean;
  className?: string;
}

export function StarRating({
  stars,
  maxStars = 5,
  size = 36,
  animate = true,
  className = "",
}: StarRatingProps) {
  const { soundEnabled, volume } = useSettingsStore();

  useEffect(() => {
    if (animate && stars > 0 && soundEnabled) {
      for (let i = 0; i < stars; i++) {
        setTimeout(() => {
          soundFx.playStarPop(i, volume);
        }, (i + 1) * 200);
      }
    }
  }, [stars, animate, soundEnabled, volume]);

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < stars;
        return (
          <motion.div
            key={index}
            initial={animate ? { scale: 0, rotate: -30 } : false}
            animate={
              animate && isFilled
                ? { scale: 1, rotate: 0 }
                : { scale: 1, rotate: 0 }
            }
            transition={{
              delay: animate ? index * 0.18 : 0,
              type: "spring",
              stiffness: 350,
              damping: 14,
            }}
            className="relative select-none"
          >
            <Star
              style={{ width: size, height: size }}
              className={`transition-colors drop-shadow-md ${
                isFilled
                  ? "fill-amber-400 text-amber-500 stroke-[2.5]"
                  : "fill-slate-100 text-slate-300 stroke-[2]"
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
