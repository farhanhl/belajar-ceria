import React from "react";

interface ChildCardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  bgGradient?: string;
  onClick?: () => void;
}

export function ChildCard({
  children,
  className = "",
  borderColor = "border-amber-200",
  bgGradient = "bg-white",
  onClick,
}: ChildCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border-4 ${borderColor} ${bgGradient} shadow-xl p-6 transition-all duration-300 ${
        onClick ? "cursor-pointer hover:shadow-2xl hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
