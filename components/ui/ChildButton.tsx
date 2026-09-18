"use client";

import React from "react";
import { motion } from "motion/react";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";

export type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "purple";
export type ButtonSize = "md" | "lg" | "xl";

interface ChildButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  playAudio?: boolean;
}

export function ChildButton({
  variant = "primary",
  size = "lg",
  icon,
  children,
  className = "",
  playAudio = true,
  onClick,
  disabled,
  ...props
}: ChildButtonProps) {
  const { soundEnabled, volume } = useSettingsStore();

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-amber-400 hover:bg-amber-500 text-amber-950 border-b-4 border-amber-600 shadow-amber-200",
    secondary:
      "bg-sky-400 hover:bg-sky-500 text-sky-950 border-b-4 border-sky-600 shadow-sky-200",
    success:
      "bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 shadow-emerald-200",
    warning:
      "bg-orange-400 hover:bg-orange-500 text-orange-950 border-b-4 border-orange-600 shadow-orange-200",
    danger:
      "bg-rose-500 hover:bg-rose-600 text-white border-b-4 border-rose-700 shadow-rose-200",
    purple:
      "bg-purple-500 hover:bg-purple-600 text-white border-b-4 border-purple-700 shadow-purple-200",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    md: "px-5 py-2.5 text-lg font-bold rounded-2xl min-h-[48px]",
    lg: "px-7 py-3.5 text-xl font-extrabold rounded-3xl min-h-[58px]",
    xl: "px-9 py-5 text-2xl font-black rounded-3xl min-h-[72px]",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playAudio && soundEnabled && !disabled) {
      soundFx.playClick(volume);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.96, y: 2 }}
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-3 transition-colors select-none cursor-pointer shadow-lg active:border-b-0 ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed filter grayscale" : ""} ${className}`}
      {...(props as any)}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </motion.button>
  );
}
