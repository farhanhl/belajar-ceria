"use client";

import React from "react";
import { ColorId, ShapeId } from "../types";
import { getColorById } from "../data/colors-shapes-data";

interface ShapeVectorProps {
  shapeId: ShapeId;
  colorId?: ColorId;
  colorHex?: string;
  isSilhouette?: boolean;
  size?: number | string;
  className?: string;
  showFace?: boolean;
}

export function ShapeVector({
  shapeId,
  colorId,
  colorHex,
  isSilhouette = false,
  size = "100%",
  className = "",
  showFace = true,
}: ShapeVectorProps) {
  const colorItem = colorId ? getColorById(colorId) : undefined;
  const fillColor = isSilhouette
    ? "#94A3B8"
    : colorHex || colorItem?.hex || "#F59E0B";

  const strokeColor = isSilhouette ? "#64748B" : "rgba(0, 0, 0, 0.15)";

  const renderShapePath = () => {
    switch (shapeId) {
      case "circle":
        return <circle cx="100" cy="100" r="82" fill={fillColor} stroke={strokeColor} strokeWidth="6" />;
      case "square":
        return (
          <rect
            x="20"
            y="20"
            width="160"
            height="160"
            rx="24"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="6"
          />
        );
      case "triangle":
        return (
          <polygon
            points="100,18 184,174 16,174"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinejoin="round"
          />
        );
      case "rectangle":
        return (
          <rect
            x="16"
            y="36"
            width="168"
            height="128"
            rx="20"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="6"
          />
        );
      case "star":
        return (
          <polygon
            points="100,16 124,72 184,74 136,112 154,170 100,136 46,170 64,112 16,74 76,72"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinejoin="round"
          />
        );
      case "heart":
        return (
          <path
            d="M100 170 C100 170 24 120 24 64 C24 34 48 20 74 20 C90 20 100 32 100 32 C100 32 110 20 126 20 C152 20 176 34 176 64 C176 120 100 170 100 170 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinejoin="round"
          />
        );
      case "oval":
        return (
          <ellipse
            cx="100"
            cy="100"
            rx="64"
            ry="84"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="6"
          />
        );
      case "diamond":
        return (
          <polygon
            points="100,16 182,100 100,184 18,100"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinejoin="round"
          />
        );
      default:
        return <circle cx="100" cy="100" r="80" fill={fillColor} />;
    }
  };

  const renderFace = () => {
    if (isSilhouette || !showFace) return null;

    // Cheerful cute face for kids
    return (
      <g className="cute-face pointer-events-none">
        {/* Left eye */}
        <ellipse cx="80" cy="94" rx="6" ry="8" fill="#1E293B" />
        <circle cx="82" cy="91" r="2.5" fill="#FFFFFF" />

        {/* Right eye */}
        <ellipse cx="120" cy="94" rx="6" ry="8" fill="#1E293B" />
        <circle cx="122" cy="91" r="2.5" fill="#FFFFFF" />

        {/* Cheeks */}
        <circle cx="68" cy="106" r="7" fill="#F43F5E" opacity="0.35" />
        <circle cx="132" cy="106" r="7" fill="#F43F5E" opacity="0.35" />

        {/* Happy smiling mouth */}
        <path
          d="M90 106 Q100 118 110 106"
          fill="none"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`select-none filter drop-shadow-sm ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="highlightGlow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {renderShapePath()}
      {renderFace()}
    </svg>
  );
}
