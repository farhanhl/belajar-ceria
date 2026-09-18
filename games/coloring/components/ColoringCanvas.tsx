"use client";

import React, { useState } from "react";
import { useColoringGameStore } from "@/stores/coloring-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { motion, AnimatePresence } from "motion/react";

interface ColoringCanvasProps {
  pictureId: string;
  overrideColors?: Record<string, string>;
  readOnly?: boolean;
  className?: string;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function ColoringCanvas({
  pictureId,
  overrideColors,
  readOnly = false,
  className = "",
}: ColoringCanvasProps) {
  const store = useColoringGameStore();
  const { soundEnabled, volume } = useSettingsStore();

  const filledColors = overrideColors ?? store.filledColors;
  const activeColorHex = store.activeColorHex;

  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  const handleRegionClick = (regionId: string, e: React.MouseEvent<SVGElement>) => {
    if (readOnly) return;

    if (soundEnabled) {
      soundFx.playPop(volume);
    }

    store.fillRegion(regionId);

    // Spawn micro sparkles at mouse position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparkle: SparkleParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: activeColorHex,
    };

    setSparkles((prev) => [...prev.slice(-6), newSparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 700);
  };

  const getFill = (regionId: string, previewFallbackColor: string = "#FFFFFF") => {
    if (filledColors[regionId]) {
      return filledColors[regionId];
    }
    // If overrideColors was passed (such as in catalog cards), use preview colors
    if (overrideColors) {
      return overrideColors[regionId] || previewFallbackColor;
    }
    // In active coloring studio mode, uncolored regions start completely white
    return "#FFFFFF";
  };

  const interactiveProps = (regionId: string, previewFallbackColor: string = "#FFFFFF") => {
    const isFilled = Boolean(filledColors[regionId]);
    return {
      fill: getFill(regionId, previewFallbackColor),
      onClick: (e: React.MouseEvent<SVGElement>) => handleRegionClick(regionId, e),
      className: readOnly
        ? ""
        : `cursor-pointer transition-all duration-200 hover:opacity-85 ${
            isFilled ? "hover:brightness-105" : "hover:fill-amber-100/60"
          }`,
    };
  };

  const renderSVG = () => {
    switch (pictureId) {
      case "muslimah_cat":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <rect width="400" height="400" {...interactiveProps("bg", "#FCE7F3")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Rug / Cushion */}
            <ellipse cx="200" cy="350" rx="160" ry="40" {...interactiveProps("cushion", "#34D399")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Flower Wall Decor */}
            <circle cx="70" cy="80" r="22" {...interactiveProps("flower", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="70" cy="80" r="10" fill="#78350F" />
            
            {/* Floating Love Heart */}
            <path
              d="M 330 90 C 330 75 315 65 300 80 C 285 65 270 75 270 90 C 270 110 300 125 300 125 C 300 125 330 110 330 90 Z"
              {...interactiveProps("heart", "#EF4444")}
              stroke="#0F172A"
              strokeWidth="4"
            />

            {/* Muslimah Girl Body / Dress */}
            <path d="M 145 220 L 120 340 L 280 340 L 255 220 Z" {...interactiveProps("dress", "#A855F7")} stroke="#0F172A" strokeWidth="4" />

            {/* Hijab Shawl */}
            <path d="M 130 160 C 120 230 150 255 200 255 C 250 255 280 230 270 160 Z" {...interactiveProps("hijab", "#F472B6")} stroke="#0F172A" strokeWidth="4" />

            {/* Hijab Head */}
            <circle cx="200" cy="150" r="54" {...interactiveProps("hijab", "#F472B6")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="200" cy="148" rx="38" ry="42" {...interactiveProps("inner_hijab", "#FECDD3")} stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="200" cy="154" rx="32" ry="34" {...interactiveProps("face", "#FED7AA")} stroke="#0F172A" strokeWidth="3" />

            {/* Eyes & Smile */}
            <circle cx="188" cy="150" r="4.5" fill="#0F172A" />
            <circle cx="186" cy="148" r="1.5" fill="#FFFFFF" />
            <circle cx="212" cy="150" r="4.5" fill="#0F172A" />
            <circle cx="210" cy="148" r="1.5" fill="#FFFFFF" />
            <path d="M 194 162 Q 200 168 206 162" stroke="#0F172A" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Arms holding Cat */}
            <path d="M 150 240 Q 170 290 200 280 Q 230 290 250 240" stroke="#0F172A" strokeWidth="4" fill="none" />

            {/* Little Cat Body */}
            <ellipse cx="200" cy="275" rx="42" ry="34" {...interactiveProps("cat_body", "#F97316")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="200" cy="285" rx="26" ry="20" {...interactiveProps("cat_belly", "#FEF08A")} stroke="#0F172A" strokeWidth="3" />
            
            {/* Cat Ears */}
            <polygon points="175,250 185,230 195,250" {...interactiveProps("cat_body", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            <polygon points="205,250 215,230 225,250" {...interactiveProps("cat_body", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            
            {/* Cat Face Details */}
            <circle cx="192" cy="262" r="3" fill="#0F172A" />
            <circle cx="208" cy="262" r="3" fill="#0F172A" />
            <polygon points="200,267 197,265 203,265" fill="#EF4444" />
            <path d="M 195 270 Q 200 274 205 270" stroke="#0F172A" strokeWidth="2" fill="none" />
            {/* Whiskers */}
            <line x1="175" y1="264" x2="188" y2="266" stroke="#0F172A" strokeWidth="2" />
            <line x1="175" y1="270" x2="188" y2="269" stroke="#0F172A" strokeWidth="2" />
            <line x1="225" y1="264" x2="212" y2="266" stroke="#0F172A" strokeWidth="2" />
            <line x1="225" y1="270" x2="212" y2="269" stroke="#0F172A" strokeWidth="2" />
          </svg>
        );

      case "muslimah_rainbow":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Sky */}
            <rect width="400" height="400" {...interactiveProps("sky", "#BAE6FD")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Rainbow Arcs */}
            <path d="M 20 280 A 180 180 0 0 1 380 280" strokeWidth="18" {...interactiveProps("rainbow_1", "#EF4444")} stroke="#0F172A" />
            <path d="M 38 280 A 162 162 0 0 1 362 280" strokeWidth="18" {...interactiveProps("rainbow_2", "#FACC15")} stroke="#0F172A" />
            <path d="M 56 280 A 144 144 0 0 1 344 280" strokeWidth="18" {...interactiveProps("rainbow_3", "#10B981")} stroke="#0F172A" />
            <path d="M 74 280 A 126 126 0 0 1 326 280" strokeWidth="18" {...interactiveProps("rainbow_4", "#3B82F6")} stroke="#0F172A" />

            {/* Fluffy Clouds */}
            <g {...interactiveProps("cloud", "#FFFFFF")}>
              <ellipse cx="60" cy="250" rx="40" ry="25" stroke="#0F172A" strokeWidth="4" />
              <circle cx="80" cy="240" r="22" stroke="#0F172A" strokeWidth="4" />
              <ellipse cx="340" cy="250" rx="40" ry="25" stroke="#0F172A" strokeWidth="4" />
              <circle cx="320" cy="240" r="22" stroke="#0F172A" strokeWidth="4" />
            </g>

            {/* Rolling Hills */}
            <circle cx="100" cy="460" r="210" {...interactiveProps("hills", "#4ADE80")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="300" cy="470" r="210" {...interactiveProps("hills", "#4ADE80")} stroke="#0F172A" strokeWidth="4" />

            {/* Muslimah Character */}
            <path d="M 195 240 L 170 370 L 250 370 L 225 240 Z" {...interactiveProps("dress", "#FDE047")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="210" cy="180" r="42" {...interactiveProps("hijab", "#A855F7")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="210" cy="182" rx="26" ry="28" {...interactiveProps("face", "#FED7AA")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="202" cy="180" r="3.5" fill="#0F172A" />
            <circle cx="218" cy="180" r="3.5" fill="#0F172A" />
            <path d="M 206 190 Q 210 194 214 190" stroke="#0F172A" strokeWidth="2.5" fill="none" />

            {/* Flowers */}
            <circle cx="80" cy="350" r="16" {...interactiveProps("flower_l", "#F472B6")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="80" cy="350" r="6" fill="#FDE047" />
            <circle cx="330" cy="350" r="16" {...interactiveProps("flower_r", "#F97316")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="330" cy="350" r="6" fill="#FDE047" />
          </svg>
        );

      case "muslimah_mosque":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Sky */}
            <rect width="400" height="400" {...interactiveProps("sky", "#E0E7FF")} stroke="#0F172A" strokeWidth="4" />
            {/* Sun */}
            <circle cx="80" cy="70" r="28" {...interactiveProps("sun", "#FBBF24")} stroke="#0F172A" strokeWidth="4" />
            {/* Cloud */}
            <ellipse cx="320" cy="80" rx="40" ry="20" {...interactiveProps("cloud", "#FFFFFF")} stroke="#0F172A" strokeWidth="4" />

            {/* Mosque Minarets */}
            <rect x="70" y="120" width="22" height="150" {...interactiveProps("minaret", "#818CF8")} stroke="#0F172A" strokeWidth="4" />
            <polygon points="68,120 81,80 94,120" {...interactiveProps("dome", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <rect x="300" y="120" width="22" height="150" {...interactiveProps("minaret", "#818CF8")} stroke="#0F172A" strokeWidth="4" />
            <polygon points="298,120 311,80 324,120" {...interactiveProps("dome", "#FACC15")} stroke="#0F172A" strokeWidth="4" />

            {/* Mosque Body */}
            <rect x="110" y="160" width="180" height="110" {...interactiveProps("mosque_body", "#FFFFFF")} stroke="#0F172A" strokeWidth="4" />
            {/* Grand Dome */}
            <path d="M 130 160 C 130 90 200 70 200 70 C 200 70 270 90 270 160 Z" {...interactiveProps("dome", "#FACC15")} stroke="#0F172A" strokeWidth="4" />

            {/* Ground & Pathway */}
            <rect y="270" width="400" height="130" {...interactiveProps("ground", "#22C55E")} stroke="#0F172A" strokeWidth="4" />
            <polygon points="175,270 225,270 260,400 140,400" {...interactiveProps("path", "#CBD5E1")} stroke="#0F172A" strokeWidth="4" />

            {/* Muslimah Girl */}
            <path d="M 210 245 L 180 375 L 260 375 L 235 245 Z" {...interactiveProps("dress", "#14B8A6")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="220" cy="180" r="44" {...interactiveProps("hijab", "#FB923C")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="220" cy="182" rx="28" ry="30" {...interactiveProps("face", "#FED7AA")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="212" cy="178" r="3.5" fill="#0F172A" />
            <circle cx="228" cy="178" r="3.5" fill="#0F172A" />
            {/* Bag */}
            <rect x="160" y="290" width="24" height="28" rx="6" {...interactiveProps("bag", "#EF4444")} stroke="#0F172A" strokeWidth="3" />
          </svg>
        );

      case "panda_bamboo":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <rect width="400" height="400" {...interactiveProps("bg", "#D1FAE5")} stroke="#0F172A" strokeWidth="4" />
            {/* Sun */}
            <circle cx="330" cy="70" r="30" {...interactiveProps("sun", "#FEF08A")} stroke="#0F172A" strokeWidth="4" />
            {/* Bamboo Stalks */}
            <rect x="50" y="0" width="20" height="400" {...interactiveProps("bamboo", "#10B981")} stroke="#0F172A" strokeWidth="4" />
            <path d="M 70 120 Q 110 100 130 115" strokeWidth="10" {...interactiveProps("leaves", "#34D399")} stroke="#0F172A" />
            {/* Grass Mound */}
            <ellipse cx="200" cy="420" rx="220" ry="110" {...interactiveProps("grass", "#22C55E")} stroke="#0F172A" strokeWidth="4" />

            {/* Panda Ears */}
            <circle cx="140" cy="150" r="26" {...interactiveProps("ears_limbs", "#334155")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="260" cy="150" r="26" {...interactiveProps("ears_limbs", "#334155")} stroke="#0F172A" strokeWidth="4" />

            {/* Panda Body & Feet */}
            <ellipse cx="200" cy="270" rx="85" ry="75" {...interactiveProps("body", "#FFFFFF")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="140" cy="335" rx="30" ry="22" {...interactiveProps("ears_limbs", "#334155")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="260" cy="335" rx="30" ry="22" {...interactiveProps("ears_limbs", "#334155")} stroke="#0F172A" strokeWidth="4" />

            {/* Panda Head */}
            <ellipse cx="200" cy="195" rx="75" ry="65" {...interactiveProps("body", "#FFFFFF")} stroke="#0F172A" strokeWidth="4" />
            {/* Eye Patches */}
            <ellipse cx="165" cy="188" rx="20" ry="16" {...interactiveProps("ears_limbs", "#334155")} stroke="#0F172A" strokeWidth="3" transform="rotate(-15 165 188)" />
            <ellipse cx="235" cy="188" rx="20" ry="16" {...interactiveProps("ears_limbs", "#334155")} stroke="#0F172A" strokeWidth="3" transform="rotate(15 235 188)" />
            <circle cx="166" cy="188" r="5" fill="#FFFFFF" />
            <circle cx="234" cy="188" r="5" fill="#FFFFFF" />
            {/* Cheeks & Nose */}
            <circle cx="145" cy="215" r="10" {...interactiveProps("cheeks", "#F472B6")} />
            <circle cx="255" cy="215" r="10" {...interactiveProps("cheeks", "#F472B6")} />
            <ellipse cx="200" cy="208" rx="10" ry="7" fill="#0F172A" />

            {/* Butterfly */}
            <ellipse cx="320" cy="180" rx="12" ry="8" {...interactiveProps("butterfly", "#F97316")} stroke="#0F172A" strokeWidth="3" />
          </svg>
        );

      case "lion_cub":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Savanna Sky */}
            <rect width="400" height="400" {...interactiveProps("bg", "#FEF3C7")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Sun */}
            <circle cx="330" cy="70" r="32" {...interactiveProps("sun", "#FBBF24")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Fluffy Cloud */}
            <g {...interactiveProps("cloud", "#FFFFFF")}>
              <ellipse cx="90" cy="80" rx="35" ry="18" stroke="#0F172A" strokeWidth="3" />
              <circle cx="110" cy="72" r="18" stroke="#0F172A" strokeWidth="3" />
            </g>

            {/* Savanna Rolling Hills */}
            <circle cx="60" cy="460" r="200" {...interactiveProps("hills", "#A3E635")} stroke="#0F172A" strokeWidth="4" />

            {/* Savanna Grassy Ground */}
            <path d="M 0 290 Q 120 280 200 295 Q 280 310 400 285 L 400 400 L 0 400 Z" {...interactiveProps("ground", "#84CC16")} stroke="#0F172A" strokeWidth="4" />

            {/* Lion Tail */}
            <path d="M 260 285 C 320 285 345 230 325 195" stroke="#0F172A" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M 260 285 C 320 285 345 230 325 195" stroke={getFill("body", "#FACC15")} strokeWidth="6" fill="none" strokeLinecap="round" />
            <ellipse cx="325" cy="190" rx="16" ry="22" transform="rotate(-20 325 190)" {...interactiveProps("tail_tuft", "#F97316")} stroke="#0F172A" strokeWidth="4" />

            {/* Left & Right Hind Feet (Sitting) */}
            <ellipse cx="125" cy="335" rx="32" ry="22" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="125" cy="335" rx="18" ry="12" {...interactiveProps("belly", "#FEF08A")} stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="275" cy="335" rx="32" ry="22" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="275" cy="335" rx="18" ry="12" {...interactiveProps("belly", "#FEF08A")} stroke="#0F172A" strokeWidth="3" />

            {/* Chubby Body */}
            <path d="M 140 230 C 130 310 145 345 200 345 C 255 345 270 310 260 230 Z" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Tummy */}
            <ellipse cx="200" cy="290" rx="38" ry="42" {...interactiveProps("belly", "#FEF08A")} stroke="#0F172A" strokeWidth="3" />

            {/* Front Paws */}
            <rect x="160" y="270" width="26" height="65" rx="13" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <line x1="168" y1="322" x2="168" y2="332" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="178" y1="322" x2="178" y2="332" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="214" y="270" width="26" height="65" rx="13" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <line x1="222" y1="322" x2="222" y2="332" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="232" y1="322" x2="232" y2="332" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

            {/* Fluffy Scalloped Lion Mane */}
            <path
              d="M 200 70 Q 230 65 245 90 Q 275 85 282 115 Q 310 130 300 160 Q 315 190 288 212 Q 290 242 260 248 Q 238 272 200 266 Q 162 272 140 248 Q 110 242 112 212 Q 85 190 100 160 Q 90 130 118 115 Q 125 85 155 90 Q 170 65 200 70 Z"
              {...interactiveProps("mane", "#F97316")}
              stroke="#0F172A"
              strokeWidth="4"
            />

            {/* Ears */}
            <circle cx="145" cy="115" r="22" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="145" cy="115" r="12" {...interactiveProps("inner_ears", "#FDBA74")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="255" cy="115" r="22" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="255" cy="115" r="12" {...interactiveProps("inner_ears", "#FDBA74")} stroke="#0F172A" strokeWidth="3" />

            {/* Head Face */}
            <circle cx="200" cy="165" r="62" {...interactiveProps("body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Cute Hair Tuft */}
            <path d="M 192 105 Q 200 95 208 105 Q 204 115 192 105 Z" fill="#F97316" stroke="#0F172A" strokeWidth="2" />

            {/* Muzzle */}
            <ellipse cx="200" cy="182" rx="30" ry="22" {...interactiveProps("belly", "#FEF08A")} stroke="#0F172A" strokeWidth="3.5" />
            
            {/* Cute Nose */}
            <path d="M 190 170 L 210 170 C 205 180 200 183 200 183 C 200 183 195 180 190 170 Z" fill="#78350F" stroke="#0F172A" strokeWidth="2" />
            
            {/* Smile */}
            <line x1="200" y1="182" x2="200" y2="188" stroke="#0F172A" strokeWidth="3" />
            <path d="M 193 188 Q 200 195 207 188" stroke="#0F172A" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Whisker dots */}
            <circle cx="182" cy="182" r="1.8" fill="#78350F" />
            <circle cx="186" cy="186" r="1.8" fill="#78350F" />
            <circle cx="218" cy="182" r="1.8" fill="#78350F" />
            <circle cx="214" cy="186" r="1.8" fill="#78350F" />

            {/* Shiny Eyes */}
            <ellipse cx="178" cy="152" rx="7.5" ry="9" fill="#0F172A" />
            <circle cx="175.5" cy="149" r="3" fill="#FFFFFF" />
            <circle cx="180.5" cy="155" r="1.5" fill="#FFFFFF" />
            <ellipse cx="222" cy="152" rx="7.5" ry="9" fill="#0F172A" />
            <circle cx="219.5" cy="149" r="3" fill="#FFFFFF" />
            <circle cx="224.5" cy="155" r="1.5" fill="#FFFFFF" />

            {/* Rosy Cheeks */}
            <ellipse cx="155" cy="172" rx="9" ry="7" {...interactiveProps("cheeks", "#F472B6")} />
            <ellipse cx="245" cy="172" rx="9" ry="7" {...interactiveProps("cheeks", "#F472B6")} />

            {/* Savanna Flower */}
            <g {...interactiveProps("flower", "#EF4444")}>
              <circle cx="70" cy="355" r="14" stroke="#0F172A" strokeWidth="3" />
              <circle cx="70" cy="355" r="6" fill="#FACC15" />
            </g>
          </svg>
        );

      case "friendly_dino":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Sky */}
            <rect width="400" height="400" {...interactiveProps("sky", "#BAE6FD")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Distant Friendly Volcano */}
            <polygon points="290,170 370,300 230,300" {...interactiveProps("volcano", "#92400E")} stroke="#0F172A" strokeWidth="4" />
            <polygon points="280,180 290,170 300,170 310,180" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
            
            {/* Smoke Puffs */}
            <circle cx="295" cy="145" r="14" {...interactiveProps("smoke", "#FFFFFF")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="310" cy="120" r="18" {...interactiveProps("smoke", "#FFFFFF")} stroke="#0F172A" strokeWidth="3" />

            {/* Fluffy Sky Cloud */}
            <g {...interactiveProps("cloud", "#FFFFFF")}>
              <ellipse cx="120" cy="70" rx="35" ry="18" stroke="#0F172A" strokeWidth="3" />
              <circle cx="140" cy="62" r="18" stroke="#0F172A" strokeWidth="3" />
            </g>

            {/* Rolling Hills */}
            <path d="M 0 320 Q 100 260 220 300 Q 310 270 400 310 L 400 400 L 0 400 Z" {...interactiveProps("hills", "#4ADE80")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Grass Ground */}
            <rect y="315" width="400" height="85" {...interactiveProps("ground", "#22C55E")} stroke="#0F172A" strokeWidth="4" />

            {/* Prehistoric Palm Tree on Left */}
            <path d="M 50 360 Q 75 270 45 180" stroke="#0F172A" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M 50 360 Q 75 270 45 180" stroke={getFill("tree_trunk", "#78350F")} strokeWidth="10" fill="none" strokeLinecap="round" />
            <ellipse cx="45" cy="165" rx="35" ry="14" transform="rotate(-30 45 165)" {...interactiveProps("tree_leaves", "#15803D")} stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="45" cy="165" rx="35" ry="14" transform="rotate(30 45 165)" {...interactiveProps("tree_leaves", "#15803D")} stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="45" cy="165" rx="38" ry="14" transform="rotate(-80 45 165)" {...interactiveProps("tree_leaves", "#15803D")} stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="45" cy="165" rx="38" ry="14" transform="rotate(80 45 165)" {...interactiveProps("tree_leaves", "#15803D")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="40" cy="175" r="5" fill="#78350F" />
            <circle cx="50" cy="175" r="5" fill="#78350F" />

            {/* Dinosaur Far Legs */}
            <rect x="105" y="280" width="24" height="60" rx="12" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />
            <rect x="210" y="280" width="24" height="60" rx="12" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />

            {/* Dino Tail */}
            <path d="M 120 280 Q 70 270 40 230 Q 55 260 90 300 Z" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />

            {/* Back Spikes along body & neck */}
            <polygon points="90,245 105,220 118,245" {...interactiveProps("dino_spikes", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            <polygon points="120,232 135,208 148,235" {...interactiveProps("dino_spikes", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            <polygon points="150,230 165,205 178,235" {...interactiveProps("dino_spikes", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            <polygon points="180,238 193,215 205,245" {...interactiveProps("dino_spikes", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            <polygon points="248,160 236,150 252,142" {...interactiveProps("dino_spikes", "#F97316")} stroke="#0F172A" strokeWidth="2.5" />
            <polygon points="245,190 233,180 249,172" {...interactiveProps("dino_spikes", "#F97316")} stroke="#0F172A" strokeWidth="2.5" />

            {/* Dino Chubby Body */}
            <ellipse cx="165" cy="275" rx="75" ry="52" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />
            
            {/* Dino Underbelly */}
            <path d="M 115 285 C 130 318 200 318 215 285 C 190 305 140 305 115 285 Z" {...interactiveProps("dino_belly", "#FEF08A")} stroke="#0F172A" strokeWidth="3" />

            {/* Dino Spots */}
            <circle cx="130" cy="265" r="9" {...interactiveProps("dino_spots", "#FACC15")} stroke="#0F172A" strokeWidth="2.5" />
            <circle cx="160" cy="255" r="12" {...interactiveProps("dino_spots", "#FACC15")} stroke="#0F172A" strokeWidth="2.5" />
            <circle cx="185" cy="270" r="8" {...interactiveProps("dino_spots", "#FACC15")} stroke="#0F172A" strokeWidth="2.5" />

            {/* Dinosaur Near Legs */}
            <rect x="125" y="285" width="26" height="65" rx="13" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="131" cy="345" r="3" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="138" cy="346" r="3" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="145" cy="345" r="3" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.5" />

            <rect x="195" y="285" width="26" height="65" rx="13" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="201" cy="345" r="3" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="208" cy="346" r="3" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="215" cy="345" r="3" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.5" />

            {/* Graceful Long Neck */}
            <path d="M 195 270 C 230 250 255 190 250 135 L 290 145 C 295 210 260 270 225 285 Z" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />

            {/* Cute Head & Crest */}
            <ellipse cx="265" cy="105" rx="12" ry="16" transform="rotate(-15 265 105)" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="275" cy="130" rx="38" ry="32" {...interactiveProps("dino_body", "#84CC16")} stroke="#0F172A" strokeWidth="4" />

            {/* Shiny Eye */}
            <ellipse cx="282" cy="120" rx="7.5" ry="9" fill="#0F172A" />
            <circle cx="279.5" cy="117" r="3" fill="#FFFFFF" />
            <circle cx="284.5" cy="123" r="1.5" fill="#FFFFFF" />

            {/* Nostril */}
            <circle cx="304" cy="128" r="2.5" fill="#0F172A" />

            {/* Happy Smile & Tongue */}
            <path d="M 285 138 Q 298 152 308 135" stroke="#0F172A" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 292 143 Q 298 150 304 142 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />

            {/* Rosy Cheek */}
            <circle cx="265" cy="138" r="8" {...interactiveProps("cheeks", "#F472B6")} />

            {/* Little Prehistoric Flower */}
            <circle cx="340" cy="355" r="12" {...interactiveProps("flower", "#EF4444")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="340" cy="355" r="5" fill="#FACC15" />
          </svg>
        );

      case "race_car":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" {...interactiveProps("sky", "#BAE6FD")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="320" cy="70" rx="40" ry="20" {...interactiveProps("cloud", "#FFFFFF")} stroke="#0F172A" strokeWidth="4" />
            <rect y="260" width="400" height="140" {...interactiveProps("road", "#64748B")} stroke="#0F172A" strokeWidth="4" />
            <line x1="0" y1="330" x2="400" y2="330" stroke="#FACC15" strokeWidth="8" strokeDasharray="25,20" />

            {/* Checkered Flag */}
            <rect x="50" y="100" width="40" height="30" {...interactiveProps("flag", "#FACC15")} stroke="#0F172A" strokeWidth="3" />
            <line x1="50" y1="100" x2="50" y2="180" stroke="#0F172A" strokeWidth="4" />

            {/* Car Body */}
            <polygon points="60,260 120,200 280,200 360,260" {...interactiveProps("car_body", "#EF4444")} stroke="#0F172A" strokeWidth="4" />
            <rect x="50" y="240" width="310" height="40" rx="10" {...interactiveProps("car_body", "#EF4444")} stroke="#0F172A" strokeWidth="4" />
            {/* Spoiler */}
            <rect x="40" y="200" width="40" height="10" rx="4" {...interactiveProps("car_spoiler", "#DC2626")} stroke="#0F172A" strokeWidth="3" />
            {/* Cockpit */}
            <polygon points="140,200 170,150 250,150 270,200" {...interactiveProps("car_cabin", "#38BDF8")} stroke="#0F172A" strokeWidth="4" />

            {/* Wheels & Rims */}
            <circle cx="120" cy="285" r="34" {...interactiveProps("wheels", "#334155")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="120" cy="285" r="18" {...interactiveProps("rims", "#FACC15")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="280" cy="285" r="34" {...interactiveProps("wheels", "#334155")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="280" cy="285" r="18" {...interactiveProps("rims", "#FACC15")} stroke="#0F172A" strokeWidth="3" />
          </svg>
        );

      case "space_rocket":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" {...interactiveProps("space", "#1E1B4B")} stroke="#0F172A" strokeWidth="4" />
            {/* Moon & Planet */}
            <circle cx="80" cy="80" r="35" {...interactiveProps("moon", "#FDE047")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="330" cy="100" r="25" {...interactiveProps("planet", "#EC4899")} stroke="#0F172A" strokeWidth="4" />
            {/* Stars */}
            <polygon points="70,180 73,188 81,191 73,194 70,202 67,194 59,191 67,188" {...interactiveProps("stars", "#FFFFFF")} stroke="#0F172A" strokeWidth="2" />
            <polygon points="320,240 323,248 331,251 323,254 320,262 317,254 309,251 317,248" {...interactiveProps("stars", "#FFFFFF")} stroke="#0F172A" strokeWidth="2" />

            {/* Thruster Flames */}
            <polygon points="175,250 225,250 200,360" {...interactiveProps("flame_outer", "#EF4444")} stroke="#0F172A" strokeWidth="4" />
            <polygon points="185,250 215,250 200,310" {...interactiveProps("flame_inner", "#FACC15")} stroke="#0F172A" strokeWidth="3" />

            {/* Rocket Wings */}
            <polygon points="140,240 165,190 165,245" {...interactiveProps("rocket_wings", "#3B82F6")} stroke="#0F172A" strokeWidth="4" />
            <polygon points="260,240 235,190 235,245" {...interactiveProps("rocket_wings", "#3B82F6")} stroke="#0F172A" strokeWidth="4" />

            {/* Fuselage & Nose */}
            <ellipse cx="200" cy="180" rx="42" ry="75" {...interactiveProps("rocket_body", "#FFFFFF")} stroke="#0F172A" strokeWidth="4" />
            <path d="M 165 140 Q 200 65 235 140 Z" {...interactiveProps("rocket_nose", "#EF4444")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="200" cy="170" r="18" {...interactiveProps("porthole", "#38BDF8")} stroke="#0F172A" strokeWidth="4" />
          </svg>
        );

      case "submarine_sea":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" {...interactiveProps("water", "#0284C7")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="200" cy="430" rx="240" ry="80" {...interactiveProps("seabed", "#FDE047")} stroke="#0F172A" strokeWidth="4" />
            <path d="M 60 370 Q 40 280 70 230" strokeWidth="12" {...interactiveProps("seaweed", "#10B981")} stroke="#0F172A" />

            {/* Submarine */}
            <rect x="190" y="110" width="20" height="50" {...interactiveProps("sub_tower", "#EAB308")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="200" cy="210" rx="120" ry="60" {...interactiveProps("sub_body", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="150" cy="210" r="18" {...interactiveProps("windows", "#38BDF8")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="200" cy="210" r="18" {...interactiveProps("windows", "#38BDF8")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="250" cy="210" r="18" {...interactiveProps("windows", "#38BDF8")} stroke="#0F172A" strokeWidth="4" />

            {/* Fish */}
            <path d="M 320 110 Q 350 95 370 110 L 380 100 L 380 120 Z" {...interactiveProps("fish", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            {/* Bubbles */}
            <circle cx="90" cy="160" r="10" {...interactiveProps("bubbles", "#FFFFFF")} stroke="#0F172A" strokeWidth="2" />
            <circle cx="105" cy="120" r="14" {...interactiveProps("bubbles", "#FFFFFF")} stroke="#0F172A" strokeWidth="2" />
          </svg>
        );

      case "sunflower_bee":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" {...interactiveProps("sky", "#BAE6FD")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="80" cy="70" r="30" {...interactiveProps("sun", "#FBBF24")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="200" cy="460" r="200" {...interactiveProps("hills", "#4ADE80")} stroke="#0F172A" strokeWidth="4" />

            {/* Stem & Leaves */}
            <path d="M 200 370 Q 190 280 200 220" strokeWidth="18" {...interactiveProps("stem_leaves", "#15803D")} stroke="#0F172A" />
            <ellipse cx="140" cy="300" rx="35" ry="18" {...interactiveProps("stem_leaves", "#15803D")} stroke="#0F172A" strokeWidth="4" />
            <ellipse cx="260" cy="280" rx="35" ry="18" {...interactiveProps("stem_leaves", "#15803D")} stroke="#0F172A" strokeWidth="4" />

            {/* Sunflower Petals */}
            <circle cx="200" cy="170" r="85" {...interactiveProps("petals", "#FACC15")} stroke="#0F172A" strokeWidth="4" />
            <circle cx="200" cy="170" r="55" {...interactiveProps("center", "#92400E")} stroke="#0F172A" strokeWidth="4" />
            {/* Cute Smile on Sunflower */}
            <circle cx="185" cy="160" r="5" fill="#0F172A" />
            <circle cx="215" cy="160" r="5" fill="#0F172A" />
            <path d="M 190 180 Q 200 192 210 180" stroke="#0F172A" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* Bee */}
            <ellipse cx="320" cy="90" rx="18" ry="14" {...interactiveProps("bee_body", "#F97316")} stroke="#0F172A" strokeWidth="3" />
            <ellipse cx="312" cy="75" rx="8" ry="12" {...interactiveProps("bee_wings", "#E0F2FE")} stroke="#0F172A" strokeWidth="2" />
            <ellipse cx="328" cy="75" rx="8" ry="12" {...interactiveProps("bee_wings", "#E0F2FE")} stroke="#0F172A" strokeWidth="2" />
          </svg>
        );

      case "mushroom_house":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" {...interactiveProps("sky", "#CCFBF1")} stroke="#0F172A" strokeWidth="4" />
            <rect y="300" width="400" height="100" {...interactiveProps("ground", "#22C55E")} stroke="#0F172A" strokeWidth="4" />

            {/* Mushroom Stem House */}
            <path d="M 140 330 L 150 180 L 250 180 L 260 330 Z" {...interactiveProps("house_stem", "#FED7AA")} stroke="#0F172A" strokeWidth="4" />
            <path d="M 180 330 L 180 270 Q 200 250 220 270 L 220 330 Z" {...interactiveProps("door", "#92400E")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="170" cy="220" r="14" {...interactiveProps("window", "#38BDF8")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="230" cy="220" r="14" {...interactiveProps("window", "#38BDF8")} stroke="#0F172A" strokeWidth="3" />

            {/* Mushroom Cap */}
            <path d="M 100 200 C 100 100 300 100 300 200 Z" {...interactiveProps("roof", "#EF4444")} stroke="#0F172A" strokeWidth="4" />
            {/* White Spots */}
            <circle cx="150" cy="160" r="14" {...interactiveProps("roof_spots", "#FFFFFF")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="200" cy="130" r="18" {...interactiveProps("roof_spots", "#FFFFFF")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="250" cy="160" r="14" {...interactiveProps("roof_spots", "#FFFFFF")} stroke="#0F172A" strokeWidth="3" />
          </svg>
        );

      case "fruit_basket":
      default:
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" {...interactiveProps("bg", "#FEF3C7")} stroke="#0F172A" strokeWidth="4" />
            <rect y="310" width="400" height="90" {...interactiveProps("table", "#FED7AA")} stroke="#0F172A" strokeWidth="4" />

            {/* Fruits behind Basket Rim */}
            {/* Big Red Apple */}
            <circle cx="160" cy="210" r="35" {...interactiveProps("apple", "#EF4444")} stroke="#0F172A" strokeWidth="4" />
            <path d="M 160 175 Q 168 155 178 165" strokeWidth="4" stroke="#0F172A" fill="none" />
            <ellipse cx="175" cy="165" rx="10" ry="5" {...interactiveProps("leaf", "#15803D")} stroke="#0F172A" strokeWidth="2" />

            {/* Yellow Orange/Peach */}
            <circle cx="235" cy="210" r="35" {...interactiveProps("orange", "#F97316")} stroke="#0F172A" strokeWidth="4" />

            {/* Banana */}
            <path d="M 180 180 Q 210 160 250 170 Q 210 200 180 180 Z" {...interactiveProps("banana", "#FACC15")} stroke="#0F172A" strokeWidth="4" />

            {/* Purple Grapes */}
            <circle cx="200" cy="220" r="12" {...interactiveProps("grapes", "#A855F7")} stroke="#0F172A" strokeWidth="3" />
            <circle cx="215" cy="235" r="12" {...interactiveProps("grapes", "#A855F7")} stroke="#0F172A" strokeWidth="3" />

            {/* Basket Body */}
            <polygon points="120,240 145,330 255,330 280,240" {...interactiveProps("basket", "#92400E")} stroke="#0F172A" strokeWidth="4" />
            <rect x="110" y="235" width="180" height="15" rx="6" {...interactiveProps("ribbon", "#F472B6")} stroke="#0F172A" strokeWidth="3" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative w-full aspect-square max-w-[420px] mx-auto rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-amber-300 ${className}`}>
      {renderSVG()}

      {/* Micro-sparkle floating particles on coloring tap */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              left: s.x - 8,
              top: s.y - 8,
              pointerEvents: "none",
            }}
            className="w-4 h-4 rounded-full shadow-lg"
          >
            <div
              className="w-full h-full rounded-full ring-2 ring-white"
              style={{ backgroundColor: s.color }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
