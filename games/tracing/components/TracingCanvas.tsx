"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { TracingItem, UserPoint } from "../types";
import { pointsToSvgPath } from "../lib/tracing-engine";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";
import { Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface TracingCanvasProps {
  item: TracingItem;
  currentStrokeIndex: number;
  completedStrokes: { strokeId: string; points: UserPoint[]; accuracy: number }[];
  currentPoints: UserPoint[];
  selectedColor: string;
  isItemCompleted: boolean;
  onStartDrawing: (point: UserPoint) => void;
  onAddPoint: (point: UserPoint) => void;
  onFinishDrawing: () => { strokeCompleted: boolean; itemCompleted: boolean; starsEarned: number };
  onReset: () => void;
  soundEnabled?: boolean;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  item,
  currentStrokeIndex,
  completedStrokes,
  currentPoints,
  selectedColor,
  isItemCompleted,
  onStartDrawing,
  onAddPoint,
  onFinishDrawing,
  onReset,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [guideStarPos, setGuideStarPos] = useState<{ x: number; y: number } | null>(null);
  const { language } = useSettingsStore();

  // Get active stroke
  const activeStroke = item.strokes[currentStrokeIndex];

  // Set guide star position at the start of the current stroke's first waypoint
  useEffect(() => {
    if (activeStroke && activeStroke.waypoints && activeStroke.waypoints.length > 0) {
      setGuideStarPos(activeStroke.waypoints[0]);
    } else {
      setGuideStarPos(null);
    }
  }, [activeStroke, currentStrokeIndex]);

  // Trigger celebration confetti when item is completed
  useEffect(() => {
    if (isItemCompleted) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3B82F6", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6"],
      });
    }
  }, [isItemCompleted]);

  // Transform screen client coordinates to SVG viewBox (0..400, 0..400) coordinates
  const getSvgCoordinates = useCallback(
    (clientX: number, clientY: number): UserPoint | null => {
      if (!svgRef.current) return null;
      const rect = svgRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 400;
      const y = ((clientY - rect.top) / rect.height) * 400;
      return {
        x: Math.max(0, Math.min(400, Math.round(x))),
        y: Math.max(0, Math.min(400, Math.round(y))),
        time: Date.now(),
      };
    },
    []
  );

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    const point = getSvgCoordinates(e.clientX, e.clientY);
    if (point) onStartDrawing(point);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.buttons !== 1) return;
    e.preventDefault();
    const point = getSvgCoordinates(e.clientX, e.clientY);
    if (point) onAddPoint(point);
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    onFinishDrawing();
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const point = getSvgCoordinates(touch.clientX, touch.clientY);
      if (point) onStartDrawing(point);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const point = getSvgCoordinates(touch.clientX, touch.clientY);
      if (point) onAddPoint(point);
    }
  };

  const handleTouchEnd = () => {
    onFinishDrawing();
  };

  const itemTitle = item.title[language] || item.title.id;

  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none touch-none">
      {/* Background Decorative Board */}
      <div className="absolute inset-0 bg-white/95 rounded-3xl shadow-2xl border-4 border-indigo-300 backdrop-blur-sm overflow-hidden" />

      {/* Grid Guide Paper lines */}
      <div
        className="absolute inset-4 rounded-2xl opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="relative z-10 w-full h-full cursor-crosshair touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <defs>
          {/* Shadow Filter for user drawing */}
          <filter id="crayon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" floodColor="#4F46E5" />
          </filter>
        </defs>

        {/* 1. Guideline paths (Dashed and wide light background) */}
        {item.strokes.map((stroke, idx) => {
          const isCompleted = completedStrokes.some((cs) => cs.strokeId === stroke.id);
          const isCurrent = idx === currentStrokeIndex && !isItemCompleted;

          return (
            <g key={stroke.id}>
              {/* Thick background trace track */}
              <path
                d={stroke.path}
                fill="none"
                stroke={isCurrent ? "#E0E7FF" : "#F1F5F9"}
                strokeWidth="38"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dashed guide line */}
              <path
                d={stroke.path}
                fill="none"
                stroke={isCurrent ? "#6366F1" : isCompleted ? "#10B981" : "#CBD5E1"}
                strokeWidth="4"
                strokeDasharray={stroke.waypoints.length === 1 ? "none" : "8,8"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Stroke Order Indicator Badge */}
              {stroke.waypoints.length > 0 && (
                <g transform={`translate(${stroke.waypoints[0].x}, ${stroke.waypoints[0].y})`}>
                  <circle
                    r="14"
                    fill={isCompleted ? "#10B981" : isCurrent ? "#6366F1" : "#94A3B8"}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="shadow-sm"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {stroke.label || idx + 1}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* 2. Completed User Strokes */}
        {completedStrokes.map((stroke) => (
          <path
            key={stroke.strokeId}
            d={pointsToSvgPath(stroke.points)}
            fill="none"
            stroke={selectedColor}
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#crayon-glow)"
            className="transition-all duration-200"
          />
        ))}

        {/* 3. Currently Drawing Active Stroke */}
        {currentPoints.length > 0 && (
          <path
            d={pointsToSvgPath(currentPoints)}
            fill="none"
            stroke={selectedColor}
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#crayon-glow)"
          />
        )}

        {/* 4. Animated Pulsing Guide Star on Active Stroke Start */}
        {guideStarPos && !isItemCompleted && (
          <g
            transform={`translate(${guideStarPos.x}, ${guideStarPos.y})`}
            className="animate-bounce pointer-events-none"
          >
            <circle r="18" fill="#FBBF24" opacity="0.3" className="animate-ping" />
            <circle r="12" fill="#F59E0B" />
            <polygon
              points="0,-8 2.5,-2.5 8,-2.5 3.5,1.5 5.5,7 0,3.5 -5.5,7 -3.5,1.5 -8,-2.5 -2.5,-2.5"
              fill="#FFFFFF"
            />
          </g>
        )}
      </svg>

      {/* Joyful Completion Animation Badge (Auto-advancing) */}
      {isItemCompleted && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl z-20 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300 pointer-events-none">
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-400 rounded-3xl flex items-center justify-center shadow-xl mb-3 animate-bounce border-4 border-white">
            <Sparkles className="w-10 h-10 text-white fill-white" />
          </div>
          <h3 className="text-3xl font-black text-indigo-950 mb-1 animate-pulse">
            {getTranslation("games.tracing.wellDone", {}, language)} 🎉
          </h3>
          <p className="text-base font-extrabold text-indigo-800">
            {getTranslation("games.tracing.successTraced", { title: itemTitle }, language)}
          </p>
        </div>
      )}
    </div>
  );
};
