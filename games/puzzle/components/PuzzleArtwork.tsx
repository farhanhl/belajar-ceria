import React from "react";
import { PuzzleArtworkId } from "../types";

interface PuzzleArtworkProps {
  artworkId: PuzzleArtworkId;
  className?: string;
  style?: React.CSSProperties;
}

export function PuzzleArtwork({ artworkId, className = "", style }: PuzzleArtworkProps) {
  switch (artworkId) {
    case "elephant":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Sky & Hills */}
          <rect width="400" height="400" fill="#BAE6FD" />
          {/* Rainbow */}
          <path d="M 40 250 A 160 160 0 0 1 360 250" stroke="#FDA4AF" strokeWidth="18" fill="none" />
          <path d="M 58 250 A 142 142 0 0 1 342 250" stroke="#FDE047" strokeWidth="18" fill="none" />
          <path d="M 76 250 A 124 124 0 0 1 324 250" stroke="#86EFAC" strokeWidth="18" fill="none" />
          {/* Sun */}
          <circle cx="330" cy="70" r="38" fill="#FBBF24" />
          <circle cx="330" cy="70" r="32" fill="#FCD34D" />
          <circle cx="320" cy="65" r="4" fill="#78350F" />
          <circle cx="340" cy="65" r="4" fill="#78350F" />
          <path d="M 322 76 Q 330 84 338 76" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Cloud */}
          <ellipse cx="90" cy="80" rx="35" ry="22" fill="#FFFFFF" />
          <circle cx="70" cy="70" r="22" fill="#FFFFFF" />
          <circle cx="110" cy="75" r="20" fill="#FFFFFF" />
          {/* Hills */}
          <circle cx="100" cy="480" r="260" fill="#86EFAC" />
          <circle cx="320" cy="500" r="280" fill="#4ADE80" />
          <rect y="320" width="400" height="80" fill="#22C55E" />
          {/* Elephant Character */}
          <ellipse cx="200" cy="245" rx="75" ry="65" fill="#38BDF8" />
          <circle cx="140" cy="195" r="50" fill="#38BDF8" />
          {/* Ear */}
          <ellipse cx="180" cy="190" rx="28" ry="38" fill="#7DD3FC" />
          <ellipse cx="180" cy="190" rx="18" ry="26" fill="#F472B6" />
          {/* Legs */}
          <rect x="150" y="270" width="24" height="60" rx="12" fill="#0284C7" />
          <rect x="220" y="270" width="24" height="60" rx="12" fill="#0284C7" />
          <rect x="175" y="275" width="24" height="60" rx="12" fill="#38BDF8" />
          <rect x="245" y="275" width="24" height="60" rx="12" fill="#38BDF8" />
          {/* Trunk */}
          <path
            d="M 120 210 Q 80 220 85 170 Q 95 160 105 175"
            stroke="#38BDF8"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          {/* Face Details */}
          <circle cx="125" cy="185" r="6" fill="#0F172A" />
          <circle cx="123" cy="183" r="2" fill="#FFFFFF" />
          <ellipse cx="138" cy="205" rx="8" ry="5" fill="#FB7185" />
          {/* Tail */}
          <path d="M 275 240 Q 295 250 290 270" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Butterfly */}
          <circle cx="95" cy="135" r="4" fill="#F59E0B" />
          <ellipse cx="88" cy="130" rx="9" ry="6" fill="#F43F5E" transform="rotate(-30 88 130)" />
          <ellipse cx="102" cy="130" rx="9" ry="6" fill="#F43F5E" transform="rotate(30 102 130)" />
          <ellipse cx="90" cy="140" rx="7" ry="5" fill="#FB923C" transform="rotate(30 90 140)" />
          <ellipse cx="100" cy="140" rx="7" ry="5" fill="#FB923C" transform="rotate(-30 100 140)" />
          {/* Flowers */}
          <circle cx="60" cy="350" r="10" fill="#F43F5E" />
          <circle cx="60" cy="350" r="4" fill="#FEF08A" />
          <circle cx="340" cy="345" r="10" fill="#A855F7" />
          <circle cx="340" cy="345" r="4" fill="#FEF08A" />
        </svg>
      );

    case "cat":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cozy Room Background */}
          <rect width="400" height="400" fill="#FEF3C7" />
          <rect y="290" width="400" height="110" fill="#FED7AA" />
          {/* Carpet */}
          <ellipse cx="200" cy="345" rx="170" ry="45" fill="#F87171" />
          <ellipse cx="200" cy="345" rx="150" ry="35" fill="#EF4444" />
          {/* Wallpaper Stars */}
          <circle cx="60" cy="60" r="12" fill="#FDE68A" />
          <circle cx="340" cy="80" r="14" fill="#FDE68A" />
          <circle cx="180" cy="50" r="10" fill="#FDE68A" />
          <circle cx="310" cy="180" r="8" fill="#FDE68A" />
          {/* Window */}
          <rect x="40" y="100" width="90" height="110" rx="10" fill="#93C5FD" stroke="#FDBA74" strokeWidth="8" />
          <line x1="85" y1="100" x2="85" y2="210" stroke="#FDBA74" strokeWidth="6" />
          <line x1="40" y1="155" x2="130" y2="155" stroke="#FDBA74" strokeWidth="6" />
          {/* Cat Body */}
          <ellipse cx="200" cy="250" rx="65" ry="70" fill="#FB923C" />
          {/* Tail */}
          <path d="M 260 270 C 320 280 340 220 310 190" stroke="#FB923C" strokeWidth="18" strokeLinecap="round" fill="none" />
          {/* Head */}
          <circle cx="200" cy="160" r="55" fill="#FB923C" />
          {/* Ears */}
          <polygon points="155,135 170,75 195,120" fill="#F97316" />
          <polygon points="163,128 174,88 190,118" fill="#FDA4AF" />
          <polygon points="245,135 230,75 205,120" fill="#F97316" />
          <polygon points="237,128 226,88 210,118" fill="#FDA4AF" />
          {/* Stripes */}
          <path d="M 190 115 L 200 130 L 210 115" stroke="#EA580C" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Eyes */}
          <ellipse cx="180" cy="160" rx="8" ry="12" fill="#0F172A" />
          <circle cx="178" cy="156" r="3" fill="#FFFFFF" />
          <ellipse cx="220" cy="160" rx="8" ry="12" fill="#0F172A" />
          <circle cx="218" cy="156" r="3" fill="#FFFFFF" />
          {/* Nose & Mouth */}
          <polygon points="200,175 194,168 206,168" fill="#FB7185" />
          <path d="M 194 175 Q 185 185 178 178" stroke="#7C2D12" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 206 175 Q 215 185 222 178" stroke="#7C2D12" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="165" y1="172" x2="125" y2="168" stroke="#7C2D12" strokeWidth="2.5" />
          <line x1="165" y1="178" x2="125" y2="182" stroke="#7C2D12" strokeWidth="2.5" />
          <line x1="235" y1="172" x2="275" y2="168" stroke="#7C2D12" strokeWidth="2.5" />
          <line x1="235" y1="178" x2="275" y2="182" stroke="#7C2D12" strokeWidth="2.5" />
          {/* Cheeks */}
          <circle cx="165" cy="175" r="9" fill="#FDA4AF" opacity="0.8" />
          <circle cx="235" cy="175" r="9" fill="#FDA4AF" opacity="0.8" />
          {/* Paws */}
          <ellipse cx="175" cy="315" rx="18" ry="12" fill="#FFF7ED" />
          <ellipse cx="225" cy="315" rx="18" ry="12" fill="#FFF7ED" />
          {/* Yarn Ball */}
          <circle cx="295" cy="335" r="25" fill="#3B82F6" />
          <path d="M 280 325 Q 300 345 315 325" stroke="#60A5FA" strokeWidth="3" fill="none" />
          <path d="M 275 340 Q 295 315 310 345" stroke="#93C5FD" strokeWidth="3" fill="none" />
          <path d="M 315 345 Q 340 360 360 350" stroke="#3B82F6" strokeWidth="3" fill="none" />
        </svg>
      );

    case "rabbit":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Nature Background */}
          <rect width="400" height="400" fill="#E0F2FE" />
          <circle cx="80" cy="60" r="30" fill="#FEF08A" />
          {/* Grassy field */}
          <ellipse cx="200" cy="420" rx="260" ry="140" fill="#86EFAC" />
          <rect y="310" width="400" height="90" fill="#4ADE80" />
          {/* Bunny Ears */}
          <ellipse cx="160" cy="110" rx="18" ry="60" fill="#FFFFFF" transform="rotate(-10 160 110)" />
          <ellipse cx="160" cy="110" rx="10" ry="45" fill="#FBCFE8" transform="rotate(-10 160 110)" />
          <ellipse cx="240" cy="110" rx="18" ry="60" fill="#FFFFFF" transform="rotate(10 240 110)" />
          <ellipse cx="240" cy="110" rx="10" ry="45" fill="#FBCFE8" transform="rotate(10 240 110)" />
          {/* Bunny Body */}
          <ellipse cx="200" cy="270" rx="65" ry="60" fill="#FFFFFF" />
          {/* Bunny Head */}
          <circle cx="200" cy="180" r="55" fill="#FFFFFF" />
          {/* Face */}
          <circle cx="180" cy="175" r="7" fill="#1E293B" />
          <circle cx="178" cy="172" r="2.5" fill="#FFFFFF" />
          <circle cx="220" cy="175" r="7" fill="#1E293B" />
          <circle cx="218" cy="172" r="2.5" fill="#FFFFFF" />
          <polygon points="200,190 193,183 207,183" fill="#F472B6" />
          <path d="M 193 192 Q 185 200 178 195" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 207 192 Q 215 200 222 195" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="165" cy="190" r="10" fill="#FBCFE8" opacity="0.9" />
          <circle cx="235" cy="190" r="10" fill="#FBCFE8" opacity="0.9" />
          {/* Big Carrot Held */}
          <g transform="rotate(-25 210 260)">
            <polygon points="200,230 170,300 220,300" fill="#F97316" />
            <ellipse cx="195" cy="300" rx="25" ry="8" fill="#FB923C" />
            <path d="M 195 305 Q 185 335 170 340" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 195 305 Q 200 340 205 345" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 195 305 Q 215 335 225 335" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
          {/* Paws */}
          <ellipse cx="160" cy="250" rx="16" ry="12" fill="#F1F5F9" />
          <ellipse cx="240" cy="250" rx="16" ry="12" fill="#F1F5F9" />
          <ellipse cx="160" cy="325" rx="22" ry="14" fill="#F8FAFC" />
          <ellipse cx="240" cy="325" rx="22" ry="14" fill="#F8FAFC" />
          {/* Mushroom in Grass */}
          <path d="M 60 340 Q 75 305 90 340 Z" fill="#EF4444" />
          <circle cx="75" cy="325" r="3" fill="#FFFFFF" />
          <circle cx="83" cy="333" r="2.5" fill="#FFFFFF" />
          <rect x="70" y="340" width="10" height="18" rx="4" fill="#FDE047" />
        </svg>
      );

    case "lion":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Safari Savannah Background */}
          <rect width="400" height="400" fill="#FEF08A" />
          <circle cx="340" cy="90" r="45" fill="#FBBF24" opacity="0.6" />
          <path d="M 0 320 Q 200 280 400 320 L 400 400 L 0 400 Z" fill="#FDE047" />
          <rect y="330" width="400" height="70" fill="#EAB308" />
          {/* Fluffy Mane */}
          <circle cx="200" cy="180" r="95" fill="#D97706" />
          <circle cx="200" cy="180" r="85" fill="#F59E0B" />
          {/* Lion Ears */}
          <circle cx="130" cy="115" r="22" fill="#FBBF24" />
          <circle cx="130" cy="115" r="12" fill="#B45309" />
          <circle cx="270" cy="115" r="22" fill="#FBBF24" />
          <circle cx="270" cy="115" r="12" fill="#B45309" />
          {/* Lion Body */}
          <ellipse cx="200" cy="285" rx="60" ry="50" fill="#FCD34D" />
          {/* Lion Head */}
          <circle cx="200" cy="180" r="62" fill="#FDE047" />
          {/* Face */}
          <ellipse cx="180" cy="170" rx="7" ry="10" fill="#1C1917" />
          <circle cx="178" cy="167" r="2.5" fill="#FFFFFF" />
          <ellipse cx="220" cy="170" rx="7" ry="10" fill="#1C1917" />
          <circle cx="218" cy="167" r="2.5" fill="#FFFFFF" />
          {/* Snout */}
          <ellipse cx="200" cy="195" rx="22" ry="16" fill="#FEF9C3" />
          <polygon points="200,192 190,182 210,182" fill="#78350F" />
          <path d="M 193 194 Q 185 204 178 198" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 207 194 Q 215 204 222 198" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="160" cy="188" r="9" fill="#FCA5A5" opacity="0.8" />
          <circle cx="240" cy="188" r="9" fill="#FCA5A5" opacity="0.8" />
          {/* Legs & Paws */}
          <rect x="160" y="295" width="26" height="45" rx="12" fill="#FCD34D" />
          <rect x="214" y="295" width="26" height="45" rx="12" fill="#FCD34D" />
          <ellipse cx="173" cy="335" rx="15" ry="10" fill="#F59E0B" />
          <ellipse cx="227" cy="335" rx="15" ry="10" fill="#F59E0B" />
          {/* Tropical Leaves */}
          <path d="M 0 160 Q 60 180 30 240 Q 10 200 0 160" fill="#22C55E" />
          <path d="M 370 200 Q 330 230 350 280 Q 390 250 370 200" fill="#16A34A" />
        </svg>
      );

    case "airplane":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* High Sky & Clouds */}
          <rect width="400" height="400" fill="#38BDF8" />
          {/* Sun */}
          <circle cx="70" cy="80" r="40" fill="#FBBF24" />
          <circle cx="70" cy="80" r="32" fill="#FDE047" />
          {/* Giant Fluffy Clouds */}
          <ellipse cx="320" cy="90" rx="55" ry="30" fill="#FFFFFF" opacity="0.9" />
          <circle cx="290" cy="80" r="30" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="100" cy="340" rx="70" ry="35" fill="#FFFFFF" opacity="0.9" />
          <circle cx="150" cy="330" r="35" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="330" cy="330" rx="60" ry="30" fill="#FFFFFF" opacity="0.9" />
          {/* Airplane Fuselage */}
          <ellipse cx="200" cy="200" rx="110" ry="40" fill="#EF4444" transform="rotate(-15 200 200)" />
          {/* Belly */}
          <path d="M 100 230 Q 200 260 300 205 L 290 220 Q 190 270 100 230 Z" fill="#FFFFFF" />
          {/* Wings */}
          <polygon points="170,165 225,80 255,90 210,180" fill="#DC2626" />
          <polygon points="150,225 180,310 205,300 190,215" fill="#B91C1C" />
          {/* Tail Fin */}
          <polygon points="90,175 60,105 95,115 125,170" fill="#DC2626" />
          <polygon points="70,195 50,190 60,210 85,205" fill="#B91C1C" />
          {/* Cockpit Window */}
          <path d="M 270 160 Q 295 170 300 185 L 280 180 Z" fill="#BAE6FD" stroke="#FFFFFF" strokeWidth="3" />
          {/* Passenger Windows */}
          <circle cx="240" cy="180" r="9" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="205" cy="190" r="9" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="170" cy="200" r="9" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Propeller or Nose */}
          <circle cx="308" cy="175" r="14" fill="#FBBF24" />
          {/* Cheerful Jet Stream Trail */}
          <path d="M 80 190 Q 20 200 0 220" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M 70 205 Q 30 220 0 245" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      );

    case "firetruck":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* City / Road Scene */}
          <rect width="400" height="400" fill="#93C5FD" />
          <rect y="290" width="400" height="110" fill="#475569" />
          {/* Road Marks */}
          <line x1="20" y1="350" x2="90" y2="350" stroke="#FDE047" strokeWidth="8" strokeDasharray="25 15" />
          <line x1="130" y1="350" x2="270" y2="350" stroke="#FDE047" strokeWidth="8" strokeDasharray="25 15" />
          <line x1="310" y1="350" x2="390" y2="350" stroke="#FDE047" strokeWidth="8" strokeDasharray="25 15" />
          {/* Buildings in background */}
          <rect x="20" y="140" width="60" height="150" fill="#CBD5E1" />
          <rect x="90" y="100" width="70" height="190" fill="#94A3B8" />
          <rect x="310" y="120" width="70" height="170" fill="#CBD5E1" />
          {/* Fire Engine Body */}
          <rect x="70" y="180" width="240" height="110" rx="16" fill="#EF4444" />
          {/* Cabin front */}
          <rect x="230" y="180" width="80" height="110" rx="16" fill="#DC2626" />
          {/* Cabin Windshield */}
          <rect x="245" y="195" width="55" height="45" rx="8" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="3" />
          {/* Side Ladder */}
          <rect x="85" y="150" width="130" height="18" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
          <line x1="110" y1="150" x2="110" y2="168" stroke="#64748B" strokeWidth="3" />
          <line x1="135" y1="150" x2="135" y2="168" stroke="#64748B" strokeWidth="3" />
          <line x1="160" y1="150" x2="160" y2="168" stroke="#64748B" strokeWidth="3" />
          <line x1="185" y1="150" x2="185" y2="168" stroke="#64748B" strokeWidth="3" />
          {/* Siren */}
          <rect x="270" y="162" width="20" height="18" rx="6" fill="#3B82F6" />
          <circle cx="280" cy="155" r="8" fill="#60A5FA" />
          {/* Water Hose Compartment */}
          <circle cx="140" cy="235" r="26" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="4" />
          <circle cx="140" cy="235" r="16" fill="#FBBF24" />
          {/* Headlights */}
          <circle cx="305" cy="255" r="10" fill="#FEF08A" stroke="#F59E0B" strokeWidth="2" />
          {/* Big Wheels */}
          <circle cx="120" cy="290" r="32" fill="#1E293B" />
          <circle cx="120" cy="290" r="16" fill="#E2E8F0" />
          <circle cx="260" cy="290" r="32" fill="#1E293B" />
          <circle cx="260" cy="290" r="16" fill="#E2E8F0" />
          {/* Water Drops */}
          <circle cx="345" cy="190" r="8" fill="#38BDF8" />
          <circle cx="365" cy="175" r="6" fill="#38BDF8" />
          <circle cx="360" cy="205" r="5" fill="#38BDF8" />
        </svg>
      );

    case "train":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Countryside Mountains */}
          <rect width="400" height="400" fill="#BAE6FD" />
          <polygon points="40,240 130,100 220,240" fill="#93C5FD" />
          <polygon points="180,240 280,80 380,240" fill="#60A5FA" />
          <circle cx="70" cy="70" r="35" fill="#FDE047" />
          {/* Grass & Tracks */}
          <rect y="230" width="400" height="170" fill="#86EFAC" />
          <rect y="295" width="400" height="20" fill="#78350F" />
          <line x1="0" y1="290" x2="400" y2="290" stroke="#94A3B8" strokeWidth="6" />
          <line x1="0" y1="315" x2="400" y2="315" stroke="#94A3B8" strokeWidth="6" />
          {/* Train Locomotive */}
          <rect x="80" y="190" width="130" height="90" rx="14" fill="#3B82F6" />
          {/* Cabin */}
          <rect x="180" y="150" width="80" height="130" rx="12" fill="#2563EB" />
          <rect x="195" y="165" width="50" height="40" rx="8" fill="#FEF08A" stroke="#FFFFFF" strokeWidth="3" />
          {/* Chimney */}
          <polygon points="105,190 95,145 135,145 125,190" fill="#EF4444" />
          <ellipse cx="115" cy="145" rx="20" ry="6" fill="#DC2626" />
          {/* Puffy Smoke Clouds */}
          <circle cx="115" cy="115" r="16" fill="#FFFFFF" opacity="0.9" />
          <circle cx="95" cy="85" r="22" fill="#FFFFFF" opacity="0.8" />
          <circle cx="70" cy="55" r="26" fill="#FFFFFF" opacity="0.7" />
          {/* Front Cowcatcher / Bumper */}
          <polygon points="80,250 40,280 80,280" fill="#F59E0B" />
          {/* Wheels */}
          <circle cx="110" cy="280" r="22" fill="#EF4444" stroke="#DC2626" strokeWidth="4" />
          <circle cx="110" cy="280" r="8" fill="#FEF08A" />
          <circle cx="160" cy="280" r="22" fill="#EF4444" stroke="#DC2626" strokeWidth="4" />
          <circle cx="160" cy="280" r="8" fill="#FEF08A" />
          <circle cx="225" cy="275" r="28" fill="#EF4444" stroke="#DC2626" strokeWidth="5" />
          <circle cx="225" cy="275" r="10" fill="#FEF08A" />
          {/* Connecting Rod */}
          <line x1="110" y1="280" x2="225" y2="275" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case "boat":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ocean & Sky Scene */}
          <rect width="400" height="400" fill="#E0F2FE" />
          {/* Sun & Birds */}
          <circle cx="330" cy="70" r="35" fill="#FBBF24" />
          <path d="M 80 80 Q 95 65 110 80 Q 125 65 140 80" stroke="#0369A1" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 180 95 Q 192 82 205 95 Q 218 82 230 95" stroke="#0369A1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Sea Waves */}
          <rect y="240" width="400" height="160" fill="#0284C7" />
          <ellipse cx="100" cy="245" rx="60" ry="15" fill="#38BDF8" />
          <ellipse cx="220" cy="240" rx="70" ry="16" fill="#38BDF8" />
          <ellipse cx="340" cy="245" rx="60" ry="15" fill="#38BDF8" />
          {/* Friendly Dolphin */}
          <path
            d="M 60 270 Q 75 210 120 220 Q 100 240 70 280 Z"
            fill="#0369A1"
          />
          <circle cx="105" cy="225" r="2.5" fill="#FFFFFF" />
          {/* Sailboat Hull */}
          <polygon points="140,240 170,290 290,290 320,240" fill="#D97706" />
          <rect x="150" y="240" width="160" height="14" fill="#F59E0B" />
          {/* Mast */}
          <rect x="220" y="110" width="8" height="135" fill="#78350F" />
          {/* Big Front Sail */}
          <polygon points="230,115 315,225 230,225" fill="#EF4444" />
          <polygon points="230,150 285,225 230,225" fill="#F87171" />
          {/* Back Sail */}
          <polygon points="215,130 145,225 215,225" fill="#FFFFFF" />
          <polygon points="215,160 170,225 215,225" fill="#E2E8F0" />
          {/* Little Flag on Top */}
          <polygon points="228,110 250,118 228,126" fill="#FBBF24" />
          {/* Floating Buoy */}
          <circle cx="345" cy="290" r="16" fill="#EF4444" />
          <rect x="333" y="286" width="24" height="8" fill="#FFFFFF" />
        </svg>
      );

    default:
      return null;
  }
}
