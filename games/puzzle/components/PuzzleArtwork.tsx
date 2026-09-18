import React from "react";
import { PuzzleArtworkId } from "../types";

interface PuzzleArtworkProps {
  artworkId: PuzzleArtworkId;
  className?: string;
  style?: React.CSSProperties;
}

export function PuzzleArtwork({ artworkId, className = "", style }: PuzzleArtworkProps) {
  switch (artworkId) {
    case "muslimah_quran":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cozy Pastel Room Background */}
          <rect width="400" height="400" fill="#FCE7F3" />
          {/* Wall arch pattern */}
          <path d="M 50 300 L 50 140 Q 200 40 350 140 L 350 300 Z" fill="#FDF2F8" />
          
          {/* Hanging Crescent & Star Lantern */}
          <line x1="100" y1="0" x2="100" y2="70" stroke="#FBBF24" strokeWidth="2.5" />
          <polygon points="100,70 112,85 108,110 92,110 88,85" fill="#F59E0B" />
          <circle cx="100" cy="95" r="7" fill="#FEF08A" />
          <line x1="300" y1="0" x2="300" y2="90" stroke="#FBBF24" strokeWidth="2.5" />
          <polygon points="300,90 310,102 306,122 294,122 290,102" fill="#F59E0B" />
          <circle cx="300" cy="110" r="6" fill="#FEF08A" />

          {/* Sparkles */}
          <polygon points="70,120 72,126 78,128 72,130 70,136 68,130 62,128 68,126" fill="#FDE047" />
          <polygon points="330,130 332,135 337,137 332,139 330,144 328,139 323,137 328,135" fill="#FDE047" />

          {/* Plush Floor Rug */}
          <ellipse cx="200" cy="340" rx="170" ry="50" fill="#F472B6" />
          <ellipse cx="200" cy="340" rx="150" ry="40" fill="#EC4899" />
          <ellipse cx="200" cy="340" rx="130" ry="32" fill="#FDF2F8" />

          {/* Plush Cushion */}
          <ellipse cx="200" cy="315" rx="85" ry="30" fill="#6EE7B7" />

          {/* Dress / Body */}
          <path d="M 150 250 L 130 320 L 270 320 L 250 250 Z" fill="#E879F9" />
          <ellipse cx="200" cy="320" rx="70" ry="12" fill="#D946EF" />

          {/* Hijab Drape over Shoulders */}
          <path d="M 140 180 C 130 240 150 270 200 270 C 250 270 270 240 260 180 Z" fill="#FB7185" />
          <path d="M 150 180 C 145 230 160 255 200 255 C 240 255 255 230 250 180 Z" fill="#F43F5E" />

          {/* Head & Face */}
          {/* Hijab Base Circle */}
          <circle cx="200" cy="165" r="58" fill="#FB7185" />
          {/* Inner Hijab Fold */}
          <ellipse cx="200" cy="162" rx="42" ry="46" fill="#FECDD3" />
          {/* Face */}
          <ellipse cx="200" cy="168" rx="36" ry="38" fill="#FED7AA" />

          {/* Flower Brooch on Hijab */}
          <circle cx="160" cy="130" r="10" fill="#FEF08A" />
          <circle cx="160" cy="130" r="5" fill="#F59E0B" />

          {/* Sparkly Eyes */}
          <ellipse cx="185" cy="165" rx="6" ry="8" fill="#78350F" />
          <circle cx="183" cy="163" r="2.5" fill="#FFFFFF" />
          <ellipse cx="215" cy="165" rx="6" ry="8" fill="#78350F" />
          <circle cx="213" cy="163" r="2.5" fill="#FFFFFF" />

          {/* Eyelashes */}
          <path d="M 178 158 Q 185 154 192 158" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 208 158 Q 215 154 222 158" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Rosy Cheeks */}
          <circle cx="175" cy="178" r="8" fill="#FB7185" opacity="0.6" />
          <circle cx="225" cy="178" r="8" fill="#FB7185" opacity="0.6" />

          {/* Smile */}
          <path d="M 193 182 Q 200 190 207 182" stroke="#B91C1C" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Rehal (Wooden Bookstand) */}
          <polygon points="160,330 200,285 240,330" fill="#78350F" />
          <polygon points="170,330 200,295 230,330" fill="#92400E" />

          {/* Open Quran / Book */}
          <polygon points="150,280 200,292 200,265 150,255" fill="#10B981" />
          <polygon points="250,280 200,292 200,265 250,255" fill="#10B981" />
          <polygon points="153,277 197,288 197,267 153,258" fill="#ECFDF5" />
          <polygon points="247,277 203,288 203,267 247,258" fill="#ECFDF5" />
          {/* Text lines */}
          <line x1="160" y1="266" x2="190" y2="274" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="160" y1="273" x2="188" y2="280" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="210" y1="274" x2="240" y2="266" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="212" y1="280" x2="240" y2="273" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          {/* Golden Ribbon */}
          <path d="M 200 270 Q 205 300 215 315" stroke="#FBBF24" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Hands Holding Book */}
          <circle cx="160" cy="275" r="9" fill="#FED7AA" />
          <circle cx="240" cy="275" r="9" fill="#FED7AA" />
        </svg>
      );

    case "muslimah_mosque":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sky with soft gradient */}
          <rect width="400" height="400" fill="#E0E7FF" />
          {/* Clouds */}
          <circle cx="60" cy="80" r="30" fill="#FFFFFF" />
          <circle cx="95" cy="70" r="35" fill="#FFFFFF" />
          <circle cx="130" cy="80" r="25" fill="#FFFFFF" />

          {/* Mosque Architecture Background */}
          {/* Minaret on Left */}
          <rect x="70" y="110" width="22" height="150" fill="#FFFFFF" />
          <rect x="66" y="140" width="30" height="8" rx="3" fill="#818CF8" />
          <rect x="66" y="190" width="30" height="8" rx="3" fill="#818CF8" />
          <polygon points="68,110 81,70 94,110" fill="#FBBF24" />
          <circle cx="81" cy="65" r="3" fill="#FDE047" />

          {/* Mosque Main Body */}
          <rect x="110" y="150" width="180" height="120" fill="#F8FAFC" rx="4" />
          {/* Mosque Arched Windows */}
          <path d="M 130 200 A 12 12 0 0 1 154 200 L 154 240 L 130 240 Z" fill="#818CF8" />
          <path d="M 188 185 A 12 12 0 0 1 212 185 L 212 240 L 188 240 Z" fill="#6366F1" />
          <path d="M 246 200 A 12 12 0 0 1 270 200 L 270 240 L 246 240 Z" fill="#818CF8" />

          {/* Mosque Grand Golden Dome */}
          <path d="M 130 150 C 130 80 200 65 200 65 C 200 65 270 80 270 150 Z" fill="#FBBF24" />
          <path d="M 150 150 C 150 95 200 85 200 85 C 200 85 250 95 250 150 Z" fill="#FCD34D" />
          {/* Dome Crescent Finial */}
          <circle cx="200" cy="55" r="8" fill="#FDE047" />
          <circle cx="202" cy="53" r="6" fill="#E0E7FF" />

          {/* Minaret on Right */}
          <rect x="300" y="110" width="22" height="150" fill="#FFFFFF" />
          <rect x="296" y="140" width="30" height="8" rx="3" fill="#818CF8" />
          <rect x="296" y="190" width="30" height="8" rx="3" fill="#818CF8" />
          <polygon points="298,110 311,70 324,110" fill="#FBBF24" />
          <circle cx="311" cy="65" r="3" fill="#FDE047" />

          {/* Green Grass Ground */}
          <rect y="260" width="400" height="140" fill="#4ADE80" />
          <ellipse cx="200" cy="270" rx="220" ry="25" fill="#22C55E" />

          {/* Stone Pathway */}
          <polygon points="175,270 225,270 260,400 140,400" fill="#CBD5E1" />
          <polygon points="180,270 220,270 250,400 150,400" fill="#E2E8F0" />

          {/* Muslimah Girl Character */}
          {/* Body / Gamis Dress */}
          <path d="M 210 240 L 180 370 L 260 370 L 235 240 Z" fill="#2DD4BF" />
          <ellipse cx="220" cy="370" rx="40" ry="10" fill="#0D9488" />

          {/* Shoes */}
          <ellipse cx="205" cy="378" rx="14" ry="7" fill="#A855F7" />
          <ellipse cx="235" cy="378" rx="14" ry="7" fill="#A855F7" />

          {/* Hijab Shawl over Shoulders */}
          <path d="M 180 190 C 170 240 190 260 220 260 C 250 260 270 240 260 190 Z" fill="#A855F7" />

          {/* Head & Hijab */}
          <circle cx="220" cy="170" r="48" fill="#A855F7" />
          <ellipse cx="220" cy="168" rx="35" ry="38" fill="#E9D5FF" />
          <ellipse cx="220" cy="172" rx="30" ry="32" fill="#FED7AA" />

          {/* Daisy Flower Pin */}
          <circle cx="190" cy="140" r="8" fill="#FFFFFF" />
          <circle cx="190" cy="140" r="4" fill="#FBBF24" />

          {/* Eyes & Smile */}
          <circle cx="208" cy="168" r="4.5" fill="#78350F" />
          <circle cx="206" cy="166" r="1.5" fill="#FFFFFF" />
          <circle cx="232" cy="168" r="4.5" fill="#78350F" />
          <circle cx="230" cy="166" r="1.5" fill="#FFFFFF" />
          <circle cx="200" cy="178" r="6" fill="#F472B6" opacity="0.6" />
          <circle cx="240" cy="178" r="6" fill="#F472B6" opacity="0.6" />
          <path d="M 214 182 Q 220 188 226 182" stroke="#B91C1C" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Waving Right Hand */}
          <path d="M 245 230 Q 280 200 275 165" stroke="#2DD4BF" strokeWidth="16" strokeLinecap="round" fill="none" />
          <circle cx="275" cy="160" r="8" fill="#FED7AA" />

          {/* Left Hand Holding Little Bag */}
          <path d="M 195 230 Q 175 250 170 270" stroke="#2DD4BF" strokeWidth="16" strokeLinecap="round" fill="none" />
          <circle cx="170" cy="275" r="8" fill="#FED7AA" />
          {/* Cute Little Prayer Bag */}
          <rect x="160" y="280" width="22" height="26" rx="6" fill="#F43F5E" />
          <path d="M 165 280 Q 171 270 177 280" stroke="#FB7185" strokeWidth="3" fill="none" />
          <circle cx="171" cy="293" r="4" fill="#FEF08A" />
        </svg>
      );

    case "muslimah_garden":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sunny Sky & Rainbow */}
          <rect width="400" height="400" fill="#BAE6FD" />
          <path d="M 30 250 A 170 170 0 0 1 370 250" stroke="#FDA4AF" strokeWidth="10" fill="none" />
          <path d="M 40 250 A 160 160 0 0 1 360 250" stroke="#FEF08A" strokeWidth="10" fill="none" />
          <path d="M 50 250 A 150 150 0 0 1 350 250" stroke="#86EFAC" strokeWidth="10" fill="none" />

          {/* Sun */}
          <circle cx="330" cy="70" r="32" fill="#FBBF24" />
          <circle cx="330" cy="70" r="26" fill="#FDE047" />

          {/* Garden Hills */}
          <circle cx="100" cy="460" r="220" fill="#86EFAC" />
          <circle cx="320" cy="470" r="220" fill="#4ADE80" />
          <rect y="290" width="400" height="110" fill="#22C55E" />

          {/* Garden Flowers */}
          {/* Red Tulip */}
          <path d="M 60 350 Q 60 300 65 270" stroke="#15803D" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="65" cy="265" rx="14" ry="18" fill="#F43F5E" />
          <polygon points="53,260 65,275 77,260" fill="#E11D48" />

          {/* Yellow Flower */}
          <path d="M 110 360 Q 115 320 110 285" stroke="#15803D" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="110" cy="285" r="16" fill="#FACC15" />
          <circle cx="110" cy="285" r="7" fill="#78350F" />

          {/* Purple Flower */}
          <path d="M 330 360 Q 325 310 335 275" stroke="#15803D" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="335" cy="275" r="16" fill="#A855F7" />
          <circle cx="335" cy="275" r="7" fill="#FEF08A" />

          {/* Butterfly */}
          <circle cx="80" cy="180" r="4" fill="#F59E0B" />
          <ellipse cx="72" cy="175" rx="10" ry="7" fill="#EC4899" transform="rotate(-30 72 175)" />
          <ellipse cx="88" cy="175" rx="10" ry="7" fill="#EC4899" transform="rotate(30 88 175)" />

          {/* Muslimah Girl in Garden */}
          {/* Dress */}
          <path d="M 210 230 L 180 350 L 265 350 L 240 230 Z" fill="#FDE047" />
          <ellipse cx="222" cy="350" rx="42" ry="10" fill="#EAB308" />

          {/* Shoes */}
          <ellipse cx="205" cy="358" rx="12" ry="6" fill="#FB7185" />
          <ellipse cx="235" cy="358" rx="12" ry="6" fill="#FB7185" />

          {/* Mint Hijab Shawl */}
          <path d="M 180 180 C 170 230 190 250 220 250 C 250 250 270 230 260 180 Z" fill="#10B981" />

          {/* Head & Hijab */}
          <circle cx="220" cy="160" r="48" fill="#34D399" />
          <ellipse cx="220" cy="158" rx="35" ry="38" fill="#A7F3D0" />
          <ellipse cx="220" cy="162" rx="30" ry="32" fill="#FED7AA" />

          {/* Ribbon on Hijab */}
          <path d="M 180 140 Q 220 125 260 140" stroke="#F43F5E" strokeWidth="6" fill="none" />
          <circle cx="245" cy="135" r="6" fill="#F43F5E" />

          {/* Eyes & Smile */}
          <circle cx="208" cy="158" r="4.5" fill="#78350F" />
          <circle cx="206" cy="156" r="1.5" fill="#FFFFFF" />
          <circle cx="232" cy="158" r="4.5" fill="#78350F" />
          <circle cx="230" cy="156" r="1.5" fill="#FFFFFF" />
          <circle cx="200" cy="168" r="6" fill="#F472B6" opacity="0.6" />
          <circle cx="240" cy="168" r="6" fill="#F472B6" opacity="0.6" />
          <path d="M 214 172 Q 220 178 226 172" stroke="#B91C1C" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Arm holding Watering Can */}
          <path d="M 195 220 Q 160 230 150 250" stroke="#FDE047" strokeWidth="14" strokeLinecap="round" fill="none" />
          <circle cx="145" cy="255" r="7" fill="#FED7AA" />

          {/* Watering Can */}
          <rect x="110" y="245" width="35" height="30" rx="6" fill="#EF4444" />
          <path d="M 110 250 L 85 235" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
          <circle cx="82" cy="233" r="5" fill="#B91C1C" />
          <path d="M 140 245 Q 155 255 140 270" stroke="#DC2626" strokeWidth="4" fill="none" />

          {/* Water Droplets */}
          <circle cx="75" cy="245" r="3" fill="#38BDF8" />
          <circle cx="70" cy="260" r="3" fill="#38BDF8" />
          <circle cx="65" cy="275" r="3.5" fill="#38BDF8" />
          <circle cx="80" cy="270" r="3" fill="#38BDF8" />
        </svg>
      );

    case "muslimah_sharing":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Warm Joyful Background */}
          <rect width="400" height="400" fill="#FEF3C7" />
          <rect y="290" width="400" height="110" fill="#FED7AA" />

          {/* Festive Pennant Flags */}
          <polygon points="30,0 60,0 45,35" fill="#F43F5E" />
          <polygon points="70,0 100,0 85,35" fill="#3B82F6" />
          <polygon points="110,0 140,0 125,35" fill="#10B981" />
          <polygon points="150,0 180,0 165,35" fill="#F59E0B" />
          <polygon points="190,0 220,0 205,35" fill="#8B5CF6" />
          <polygon points="230,0 260,0 245,35" fill="#EC4899" />
          <polygon points="270,0 300,0 285,35" fill="#06B6D4" />
          <polygon points="310,0 340,0 325,35" fill="#84CC16" />
          <polygon points="350,0 380,0 365,35" fill="#F97316" />
          <line x1="0" y1="0" x2="400" y2="0" stroke="#F59E0B" strokeWidth="4" />

          {/* Floating Hearts & Sparkles */}
          <path d="M 80 120 C 80 110 70 105 60 115 C 50 105 40 110 40 120 C 40 135 60 145 60 145 C 60 145 80 135 80 120 Z" fill="#FB7185" />
          <path d="M 340 110 C 340 102 332 98 325 106 C 318 98 310 102 310 110 C 310 122 325 130 325 130 C 325 130 340 122 340 110 Z" fill="#F472B6" />
          <polygon points="90,180 92,185 97,187 92,189 90,194 88,189 83,187 88,185" fill="#FBBF24" />
          <polygon points="320,170 322,175 327,177 322,179 320,184 318,179 313,177 318,175" fill="#FBBF24" />

          {/* Muslimah Girl Character */}
          {/* Dress */}
          <path d="M 190 220 L 155 350 L 245 350 L 215 220 Z" fill="#F472B6" />
          <ellipse cx="200" cy="350" rx="45" ry="10" fill="#EC4899" />

          {/* Shoes */}
          <ellipse cx="185" cy="358" rx="12" ry="6" fill="#F97316" />
          <ellipse cx="215" cy="358" rx="12" ry="6" fill="#F97316" />

          {/* Peach Hijab Shawl */}
          <path d="M 160 170 C 150 220 170 245 200 245 C 230 245 250 220 240 170 Z" fill="#FB923C" />

          {/* Head & Hijab */}
          <circle cx="200" cy="150" r="48" fill="#F97316" />
          <ellipse cx="200" cy="148" rx="35" ry="38" fill="#FFEDD5" />
          <ellipse cx="200" cy="152" rx="30" ry="32" fill="#FED7AA" />

          {/* Star Brooch */}
          <polygon points="170,125 172,130 177,131 173,134 174,139 170,136 166,139 167,134 163,131 168,130" fill="#FDE047" />

          {/* Eyes & Sweet Smile */}
          <circle cx="188" cy="148" r="4.5" fill="#78350F" />
          <circle cx="186" cy="146" r="1.5" fill="#FFFFFF" />
          <circle cx="212" cy="148" r="4.5" fill="#78350F" />
          <circle cx="210" cy="146" r="1.5" fill="#FFFFFF" />
          <circle cx="180" cy="158" r="6" fill="#FB7185" opacity="0.6" />
          <circle cx="220" cy="158" r="6" fill="#FB7185" opacity="0.6" />
          <path d="M 194 162 Q 200 170 206 162" stroke="#B91C1C" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Arms Holding Gift Plate */}
          <path d="M 170 205 Q 150 240 175 255" stroke="#F472B6" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M 230 205 Q 250 240 225 255" stroke="#F472B6" strokeWidth="14" strokeLinecap="round" fill="none" />
          <circle cx="175" cy="255" r="7" fill="#FED7AA" />
          <circle cx="225" cy="255" r="7" fill="#FED7AA" />

          {/* Gift Box with Ribbon */}
          <rect x="235" y="270" width="55" height="50" rx="8" fill="#8B5CF6" />
          <rect x="230" y="265" width="65" height="12" rx="4" fill="#A78BFA" />
          <rect x="258" y="265" width="10" height="55" fill="#FBBF24" />
          {/* Gift Ribbon Bow */}
          <circle cx="255" cy="260" r="7" fill="#FDE047" />
          <circle cx="270" cy="260" r="7" fill="#FDE047" />

          {/* Tray of Cupcakes in Hand */}
          <ellipse cx="200" cy="260" rx="38" ry="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          {/* Cupcakes */}
          <circle cx="185" cy="252" r="9" fill="#EC4899" />
          <circle cx="185" cy="245" r="3" fill="#EF4444" />
          <circle cx="215" cy="252" r="9" fill="#38BDF8" />
          <circle cx="215" cy="245" r="3" fill="#F59E0B" />
        </svg>
      );

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

          {/* Elephant Tail */}
          <path d="M 275 240 Q 295 250 290 270" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* Elephant Legs (Back) */}
          <rect x="150" y="270" width="24" height="60" rx="12" fill="#0284C7" />
          <rect x="220" y="270" width="24" height="60" rx="12" fill="#0284C7" />

          {/* Elephant Body */}
          <ellipse cx="200" cy="245" rx="75" ry="65" fill="#38BDF8" />

          {/* Elephant Legs (Front) */}
          <rect x="175" y="275" width="24" height="60" rx="12" fill="#38BDF8" />
          <rect x="245" y="275" width="24" height="60" rx="12" fill="#38BDF8" />

          {/* Elephant Head */}
          <circle cx="140" cy="195" r="50" fill="#38BDF8" />

          {/* Elephant Trunk (Curling gracefully outward and upward) */}
          <path
            d="M 115 205 C 75 210 65 245 80 265 C 90 275 105 270 105 255 C 105 245 95 245 90 250"
            stroke="#38BDF8"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />

          {/* Face Details */}
          <circle cx="125" cy="180" r="6" fill="#0F172A" />
          <circle cx="123" cy="178" r="2" fill="#FFFFFF" />
          <ellipse cx="132" cy="202" rx="8" ry="5" fill="#FB7185" />

          {/* Ear */}
          <ellipse cx="180" cy="190" rx="28" ry="38" fill="#7DD3FC" />
          <ellipse cx="180" cy="190" rx="18" ry="26" fill="#F472B6" />

          {/* Butterfly Playing Near Trunk */}
          <circle cx="65" cy="205" r="4" fill="#F59E0B" />
          <ellipse cx="58" cy="200" rx="9" ry="6" fill="#F43F5E" transform="rotate(-30 58 200)" />
          <ellipse cx="72" cy="200" rx="9" ry="6" fill="#F43F5E" transform="rotate(30 72 200)" />
          <ellipse cx="60" cy="210" rx="7" ry="5" fill="#FB923C" transform="rotate(30 60 210)" />
          <ellipse cx="70" cy="210" rx="7" ry="5" fill="#FB923C" transform="rotate(-30 70 210)" />

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

    case "panda":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Bamboo Garden */}
          <rect width="400" height="400" fill="#D1FAE5" />
          {/* Sun */}
          <circle cx="80" cy="70" r="32" fill="#FEF08A" />
          {/* Bamboo Stalks in Background */}
          <rect x="40" y="0" width="16" height="400" rx="4" fill="#6EE7B7" />
          <line x1="38" y1="90" x2="58" y2="90" stroke="#059669" strokeWidth="3" />
          <line x1="38" y1="180" x2="58" y2="180" stroke="#059669" strokeWidth="3" />
          <line x1="38" y1="270" x2="58" y2="270" stroke="#059669" strokeWidth="3" />
          <path d="M 56 90 Q 90 70 110 85" stroke="#10B981" strokeWidth="8" strokeLinecap="round" fill="none" />
          
          <rect x="340" y="0" width="18" height="400" rx="4" fill="#6EE7B7" />
          <line x1="338" y1="110" x2="360" y2="110" stroke="#059669" strokeWidth="3" />
          <line x1="338" y1="210" x2="360" y2="210" stroke="#059669" strokeWidth="3" />
          <path d="M 340 110 Q 300 95 280 115" stroke="#10B981" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* Green Grass Mound */}
          <ellipse cx="200" cy="420" rx="230" ry="120" fill="#34D399" />
          <ellipse cx="200" cy="420" rx="200" ry="90" fill="#10B981" />

          {/* Panda Ears */}
          <circle cx="135" cy="145" r="28" fill="#1E293B" />
          <circle cx="265" cy="145" r="28" fill="#1E293B" />
          <circle cx="135" cy="145" r="14" fill="#475569" />
          <circle cx="265" cy="145" r="14" fill="#475569" />

          {/* Panda Body */}
          <ellipse cx="200" cy="275" rx="90" ry="80" fill="#F8FAFC" />
          <rect x="130" y="270" width="140" height="45" fill="#1E293B" rx="10" />

          {/* Panda Feet */}
          <ellipse cx="135" cy="335" rx="32" ry="24" fill="#1E293B" />
          <ellipse cx="265" cy="335" rx="32" ry="24" fill="#1E293B" />
          <circle cx="135" cy="335" r="12" fill="#FB7185" />
          <circle cx="265" cy="335" r="12" fill="#FB7185" />

          {/* Panda Head */}
          <ellipse cx="200" cy="195" rx="80" ry="70" fill="#FFFFFF" />

          {/* Eye Patches */}
          <ellipse cx="160" cy="185" rx="22" ry="18" fill="#1E293B" transform="rotate(-15 160 185)" />
          <ellipse cx="240" cy="185" rx="22" ry="18" fill="#1E293B" transform="rotate(15 240 185)" />
          {/* Eyes */}
          <circle cx="162" cy="185" r="8" fill="#FFFFFF" />
          <circle cx="164" cy="185" r="4" fill="#0F172A" />
          <circle cx="238" cy="185" r="8" fill="#FFFFFF" />
          <circle cx="236" cy="185" r="4" fill="#0F172A" />

          {/* Cheeks */}
          <circle cx="140" cy="215" r="12" fill="#F472B6" opacity="0.6" />
          <circle cx="260" cy="215" r="12" fill="#F472B6" opacity="0.6" />

          {/* Nose & Mouth */}
          <ellipse cx="200" cy="208" rx="10" ry="7" fill="#1E293B" />
          <path d="M 194 218 Q 200 226 206 218" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* Bamboo in Hands */}
          <rect x="175" y="190" width="12" height="150" rx="4" fill="#22C55E" transform="rotate(-25 175 190)" />
          <ellipse cx="145" cy="200" rx="18" ry="7" fill="#15803D" transform="rotate(-45 145 200)" />
          <ellipse cx="170" cy="170" rx="18" ry="7" fill="#15803D" transform="rotate(15 170 170)" />

          {/* Panda Arms Holding Bamboo */}
          <ellipse cx="145" cy="265" rx="22" ry="32" fill="#1E293B" transform="rotate(30 145 265)" />
          <ellipse cx="245" cy="265" rx="22" ry="32" fill="#1E293B" transform="rotate(-30 245 265)" />
        </svg>
      );

    case "dinosaur":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Prehistoric Sky */}
          <rect width="400" height="400" fill="#BAE6FD" />
          {/* Friendly Volcano & Smoke */}
          <polygon points="270,140 370,300 200,300" fill="#9A3412" />
          <polygon points="265,140 285,140 295,170 255,170" fill="#F97316" />
          <circle cx="275" cy="115" r="14" fill="#E2E8F0" opacity="0.8" />
          <circle cx="285" cy="90" r="18" fill="#E2E8F0" opacity="0.7" />
          <circle cx="305" cy="65" r="22" fill="#E2E8F0" opacity="0.6" />

          {/* Hills */}
          <circle cx="80" cy="460" r="240" fill="#86EFAC" />
          <circle cx="330" cy="480" r="240" fill="#4ADE80" />
          <rect y="310" width="400" height="90" fill="#22C55E" />

          {/* Dino Back Spikes */}
          <polygon points="100,250 112,225 125,248" fill="#F59E0B" />
          <polygon points="125,235 140,210 152,235" fill="#F59E0B" />
          <polygon points="152,220 168,190 180,220" fill="#F59E0B" />
          <polygon points="178,198 194,168 206,198" fill="#F59E0B" />
          <polygon points="202,170 216,142 225,170" fill="#F59E0B" />

          {/* Dino Tail */}
          <path d="M 125 285 Q 40 315 35 245 Q 70 255 115 265 Z" fill="#84CC16" />

          {/* Dino Back Legs */}
          <rect x="130" y="295" width="24" height="48" rx="12" fill="#65A30D" />
          <rect x="185" y="295" width="24" height="48" rx="12" fill="#65A30D" />

          {/* Dino Body */}
          <ellipse cx="175" cy="275" rx="75" ry="55" fill="#84CC16" />

          {/* Dino Smooth Elegant Neck */}
          <path
            d="M 195 280 C 238 268 248 215 248 145 L 210 145 C 205 205 185 245 142 275 Z"
            fill="#84CC16"
          />

          {/* Dino Yellow Belly */}
          <ellipse cx="165" cy="285" rx="46" ry="34" fill="#FEF08A" />

          {/* Dino Front Legs */}
          <rect x="145" y="300" width="24" height="48" rx="12" fill="#84CC16" />
          <rect x="200" y="300" width="24" height="48" rx="12" fill="#84CC16" />

          {/* Dino Head Base */}
          <circle cx="235" cy="140" r="38" fill="#84CC16" />

          {/* Dino Snout & Cute Mouth */}
          <ellipse cx="260" cy="150" rx="26" ry="20" fill="#84CC16" />
          <path d="M 250 158 Q 268 170 282 154" stroke="#3F6212" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="272" cy="142" r="3" fill="#3F6212" />

          {/* Big Sparkly Eye */}
          <circle cx="230" cy="128" r="12" fill="#FFFFFF" />
          <circle cx="233" cy="128" r="6" fill="#0F172A" />
          <circle cx="231" cy="126" r="2.5" fill="#FFFFFF" />

          {/* Rosy Cheek */}
          <circle cx="240" cy="155" r="9" fill="#FB7185" opacity="0.7" />

          {/* Dino Body Spots */}
          <circle cx="130" cy="265" r="7" fill="#65A30D" />
          <circle cx="150" cy="250" r="6" fill="#65A30D" />
          <circle cx="180" cy="245" r="6" fill="#65A30D" />

          {/* Palm Tree */}
          <path d="M 350 330 Q 365 240 340 180" stroke="#78350F" strokeWidth="12" strokeLinecap="round" fill="none" />
          <ellipse cx="320" cy="170" rx="30" ry="12" fill="#15803D" transform="rotate(-30 320 170)" />
          <ellipse cx="365" cy="170" rx="30" ry="12" fill="#15803D" transform="rotate(30 365 170)" />
          <ellipse cx="340" cy="155" rx="30" ry="12" fill="#16A34A" />
        </svg>
      );

    case "rocket":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep Galaxy Background */}
          <rect width="400" height="400" fill="#1E1B4B" />
          {/* Nebula Glow */}
          <circle cx="100" cy="120" r="80" fill="#4338CA" opacity="0.4" />
          <circle cx="300" cy="280" r="100" fill="#701A75" opacity="0.4" />

          {/* Twinkling Stars */}
          <circle cx="60" cy="60" r="3" fill="#FDE047" />
          <circle cx="160" cy="40" r="4" fill="#FFFFFF" />
          <circle cx="340" cy="70" r="3" fill="#FDE047" />
          <circle cx="70" cy="220" r="2.5" fill="#FFFFFF" />
          <circle cx="360" cy="210" r="3.5" fill="#FDE047" />
          <circle cx="120" cy="340" r="4" fill="#FDE047" />
          <circle cx="280" cy="350" r="3" fill="#FFFFFF" />

          {/* Ringed Planet */}
          <ellipse cx="70" cy="140" rx="40" ry="12" fill="none" stroke="#F472B6" strokeWidth="6" transform="rotate(-20 70 140)" />
          <circle cx="70" cy="140" r="24" fill="#EC4899" />
          <ellipse cx="70" cy="140" rx="40" ry="12" fill="none" stroke="#FBCFE8" strokeWidth="3" transform="rotate(-20 70 140)" />

          {/* Crescent Moon */}
          <path d="M 330 60 A 28 28 0 1 0 355 110 A 34 34 0 1 1 330 60 Z" fill="#FDE047" />

          {/* Entire Rocket with Thruster Flames attached */}
          <g transform="rotate(40 220 180)">
            {/* Rocket Thruster Flames - Attached directly to rocket nozzle */}
            <polygon points="185,232 235,232 210,335" fill="#EF4444" />
            <polygon points="192,232 228,232 210,305" fill="#F97316" />
            <polygon points="198,232 222,232 210,275" fill="#FDE047" />
            <polygon points="204,232 216,232 210,255" fill="#FFFFFF" />

            {/* Exhaust Nozzle Ring */}
            <polygon points="195,226 225,226 222,236 198,236" fill="#475569" />

            {/* Left & Right Wings */}
            <polygon points="170,180 140,230 180,220" fill="#DC2626" />
            <polygon points="250,180 280,230 240,220" fill="#DC2626" />
            <polygon points="205,180 215,230 205,230" fill="#B91C1C" />

            {/* Main Fuselage */}
            <ellipse cx="210" cy="160" rx="38" ry="75" fill="#F8FAFC" />
            {/* Red Cone Nose */}
            <path d="M 178 120 Q 210 50 242 120 Z" fill="#EF4444" />

            {/* Porthole Window */}
            <circle cx="210" cy="150" r="20" fill="#0284C7" stroke="#94A3B8" strokeWidth="5" />
            <circle cx="210" cy="150" r="15" fill="#38BDF8" />
            {/* Cute Cat Alien inside */}
            <circle cx="210" cy="152" r="9" fill="#FBBF24" />
            <circle cx="207" cy="150" r="2" fill="#0F172A" />
            <circle cx="213" cy="150" r="2" fill="#0F172A" />
            <polygon points="203,144 206,140 208,145" fill="#F59E0B" />
            <polygon points="212,145 214,140 217,144" fill="#F59E0B" />

            {/* Stripes */}
            <rect x="176" y="195" width="68" height="10" fill="#3B82F6" />
          </g>

          {/* Floating Stardust Sparkles */}
          <polygon points="310,170 314,178 322,182 314,186 310,194 306,186 298,182 306,178" fill="#FDE047" />
          <polygon points="120,80 123,86 129,89 123,92 120,98 117,92 111,89 117,86" fill="#FFFFFF" />
        </svg>
      );

    case "astronaut":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep Space Background */}
          <rect width="400" height="400" fill="#0F172A" />

          {/* Distant Earth */}
          <circle cx="330" cy="80" r="40" fill="#0284C7" />
          <ellipse cx="325" cy="75" rx="20" ry="14" fill="#22C55E" />
          <ellipse cx="345" cy="95" rx="16" ry="10" fill="#22C55E" />
          <path d="M 300 70 Q 330 65 360 85" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.6" />

          {/* Stars */}
          <circle cx="40" cy="50" r="3" fill="#FEF08A" />
          <circle cx="160" cy="70" r="2" fill="#FFFFFF" />
          <circle cx="80" cy="160" r="3" fill="#FEF08A" />
          <circle cx="270" cy="180" r="2.5" fill="#FFFFFF" />

          {/* Moon Surface with Craters */}
          <ellipse cx="200" cy="460" rx="280" ry="160" fill="#94A3B8" />
          <ellipse cx="200" cy="460" rx="250" ry="140" fill="#CBD5E1" />
          <ellipse cx="90" cy="350" rx="25" ry="10" fill="#94A3B8" />
          <ellipse cx="310" cy="360" rx="35" ry="14" fill="#94A3B8" />
          <ellipse cx="200" cy="380" rx="20" ry="8" fill="#94A3B8" />

          {/* Flagpole on Moon */}
          <line x1="80" y1="230" x2="80" y2="340" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
          <polygon points="82,230 140,248 82,266" fill="#EC4899" />
          <circle cx="105" cy="248" r="6" fill="#FDE047" />

          {/* Child Astronaut Backpack */}
          <rect x="150" y="160" width="100" height="90" rx="18" fill="#64748B" />

          {/* Spacesuit Body */}
          <ellipse cx="200" cy="240" rx="55" ry="50" fill="#F8FAFC" />
          <rect x="175" y="215" width="50" height="35" rx="8" fill="#3B82F6" />
          <circle cx="190" cy="232" r="4" fill="#EF4444" />
          <circle cx="210" cy="232" r="4" fill="#22C55E" />

          {/* Legs & Boots */}
          <rect x="160" y="275" width="28" height="45" rx="12" fill="#F8FAFC" />
          <rect x="212" y="275" width="28" height="45" rx="12" fill="#F8FAFC" />
          <ellipse cx="174" cy="320" rx="18" ry="10" fill="#0284C7" />
          <ellipse cx="226" cy="320" rx="18" ry="10" fill="#0284C7" />

          {/* Helmet */}
          <circle cx="200" cy="140" r="52" fill="#F8FAFC" />
          {/* Visor */}
          <ellipse cx="200" cy="140" rx="40" ry="32" fill="#0284C7" />
          <ellipse cx="200" cy="140" rx="36" ry="28" fill="#38BDF8" />
          {/* Visor Reflection / Smiling Face */}
          <circle cx="190" cy="135" r="4" fill="#0F172A" />
          <circle cx="210" cy="135" r="4" fill="#0F172A" />
          <path d="M 193 146 Q 200 154 207 146" stroke="#0F172A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="185" cy="128" rx="8" ry="4" fill="#FFFFFF" opacity="0.8" transform="rotate(-20 185 128)" />

          {/* Waving Arm */}
          <path d="M 245 210 Q 285 180 280 145" stroke="#F8FAFC" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="280" cy="140" r="14" fill="#0284C7" />
          {/* Other Arm */}
          <path d="M 155 210 Q 130 230 120 260" stroke="#F8FAFC" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="118" cy="265" r="14" fill="#0284C7" />
        </svg>
      );

    case "submarine":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Undersea Scene */}
          <rect width="400" height="400" fill="#0284C7" />
          {/* Sunbeams */}
          <polygon points="60,0 120,0 180,400 100,400" fill="#38BDF8" opacity="0.2" />
          <polygon points="220,0 280,0 360,400 280,400" fill="#38BDF8" opacity="0.2" />

          {/* Sandy Seabed */}
          <ellipse cx="200" cy="430" rx="260" ry="90" fill="#FDE047" />
          <ellipse cx="200" cy="430" rx="230" ry="70" fill="#EAB308" />

          {/* Seaweed */}
          <path d="M 50 370 Q 30 300 60 250 Q 40 200 60 160" stroke="#10B981" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 75 370 Q 95 310 70 260 Q 90 220 80 180" stroke="#059669" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 350 370 Q 370 300 340 240 Q 360 190 345 150" stroke="#10B981" strokeWidth="12" strokeLinecap="round" fill="none" />

          {/* Starfish */}
          <polygon points="120,350 124,358 132,360 126,366 128,374 120,370 112,374 114,366 108,360 116,358" fill="#F43F5E" />

          {/* Submarine Propeller */}
          <rect x="75" y="195" width="18" height="30" rx="4" fill="#CA8A04" />
          <ellipse cx="70" cy="195" rx="8" ry="18" fill="#A16207" />
          <ellipse cx="70" cy="225" rx="8" ry="18" fill="#A16207" />

          {/* Submarine Periscope */}
          <rect x="210" y="90" width="16" height="50" fill="#CA8A04" />
          <rect x="210" y="80" width="36" height="16" rx="6" fill="#EAB308" />
          <circle cx="240" cy="88" r="6" fill="#67E8F9" />

          {/* Submarine Conning Tower */}
          <path d="M 180 140 L 250 140 L 260 170 L 170 170 Z" fill="#EAB308" />

          {/* Submarine Hull */}
          <ellipse cx="220" cy="210" rx="130" ry="65" fill="#FACC15" />
          <path d="M 95 210 Q 220 280 345 210" stroke="#EAB308" strokeWidth="6" fill="none" />

          {/* Porthole Windows */}
          <circle cx="160" cy="205" r="22" fill="#EAB308" />
          <circle cx="160" cy="205" r="16" fill="#67E8F9" />
          <circle cx="220" cy="205" r="22" fill="#EAB308" />
          <circle cx="220" cy="205" r="16" fill="#67E8F9" />
          <circle cx="280" cy="205" r="22" fill="#EAB308" />
          <circle cx="280" cy="205" r="16" fill="#67E8F9" />

          {/* Cute Little Swimming Fish */}
          <path d="M 330 110 Q 360 95 380 110 L 390 100 L 390 120 L 380 110 Q 360 125 330 110 Z" fill="#FB923C" />
          <circle cx="340" cy="108" r="2" fill="#0F172A" />

          {/* Air Bubbles */}
          <circle cx="90" cy="160" r="8" fill="#BAE6FD" opacity="0.8" />
          <circle cx="105" cy="130" r="12" fill="#BAE6FD" opacity="0.8" />
          <circle cx="115" cy="90" r="16" fill="#BAE6FD" opacity="0.8" />
        </svg>
      );

    case "helicopter":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sunset Sky */}
          <rect width="400" height="400" fill="#FEF08A" />
          <rect y="220" width="400" height="180" fill="#FDBA74" />

          {/* Fluffy Sunset Clouds */}
          <ellipse cx="80" cy="120" rx="50" ry="25" fill="#FFFFFF" opacity="0.9" />
          <circle cx="60" cy="110" r="25" fill="#FFFFFF" opacity="0.9" />
          <circle cx="100" cy="110" r="20" fill="#FFFFFF" opacity="0.9" />

          <ellipse cx="320" cy="290" rx="70" ry="30" fill="#FED7AA" opacity="0.9" />
          <circle cx="350" cy="275" r="30" fill="#FED7AA" opacity="0.9" />

          {/* Distant Birds */}
          <path d="M 280 80 Q 290 70 300 80 Q 310 70 320 80" stroke="#9A3412" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 330 100 Q 338 92 346 100 Q 354 92 362 100" stroke="#9A3412" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Main Rotor Mast & Blade */}
          <rect x="185" y="105" width="12" height="35" fill="#475569" />
          <ellipse cx="191" cy="105" rx="140" ry="8" fill="#64748B" />
          <circle cx="191" cy="105" r="10" fill="#1E293B" />
          {/* Rotor Spin Lines */}
          <line x1="45" y1="105" x2="335" y2="105" stroke="#94A3B8" strokeWidth="2" strokeDasharray="8,8" />

          {/* Helicopter Tail Boom */}
          <polygon points="120,200 40,180 40,195 120,215" fill="#EA580C" />
          {/* Tail Fin */}
          <polygon points="40,180 25,140 45,140 50,185" fill="#DC2626" />
          {/* Tail Rotor */}
          <circle cx="35" cy="155" r="5" fill="#1E293B" />
          <line x1="35" y1="130" x2="35" y2="180" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />

          {/* Main Cabin Body */}
          <ellipse cx="205" cy="205" rx="85" ry="65" fill="#FB923C" />
          <ellipse cx="205" cy="205" rx="80" ry="60" fill="#F97316" />

          {/* Big Cockpit Windshield */}
          <path d="M 205 155 Q 275 160 280 215 L 205 215 Z" fill="#E0F2FE" />
          <circle cx="235" cy="185" r="14" fill="#FBBF24" />
          <circle cx="238" cy="183" r="3" fill="#0F172A" />
          {/* Pilot Smile */}
          <path d="M 235 190 Q 240 195 245 190" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Cabin Stripe & Door */}
          <rect x="140" y="215" width="135" height="12" fill="#DC2626" />
          <rect x="150" y="170" width="40" height="40" rx="8" fill="#FED7AA" stroke="#EA580C" strokeWidth="4" />

          {/* Landing Skids Struts */}
          <line x1="165" y1="265" x2="155" y2="295" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <line x1="245" y1="265" x2="235" y2="295" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          {/* Landing Skid */}
          <rect x="120" y="295" width="150" height="8" rx="4" fill="#334155" />
          <path d="M 270 295 Q 285 295 285 280" stroke="#334155" strokeWidth="8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "sunflower":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue Sunny Sky */}
          <rect width="400" height="400" fill="#BAE6FD" />
          {/* Rainbow in Background */}
          <path d="M 20 260 A 180 180 0 0 1 380 260" stroke="#FECDD3" strokeWidth="12" fill="none" />
          <path d="M 32 260 A 168 168 0 0 1 368 260" stroke="#FEF08A" strokeWidth="12" fill="none" />
          <path d="M 44 260 A 156 156 0 0 1 356 260" stroke="#BBF7D0" strokeWidth="12" fill="none" />

          {/* Rolling Green Hills */}
          <circle cx="100" cy="460" r="200" fill="#4ADE80" />
          <circle cx="300" cy="470" r="200" fill="#22C55E" />

          {/* Sturdy Stem */}
          <path d="M 200 370 Q 190 280 200 220" stroke="#16A34A" strokeWidth="20" strokeLinecap="round" fill="none" />

          {/* Big Green Leaves */}
          <path d="M 195 290 Q 120 270 100 320 Q 160 340 195 290 Z" fill="#22C55E" />
          <path d="M 205 270 Q 280 250 300 300 Q 240 320 205 270 Z" fill="#22C55E" />

          {/* Cute Ladybug on Leaf */}
          <ellipse cx="130" cy="300" rx="12" ry="9" fill="#EF4444" />
          <circle cx="120" cy="300" r="6" fill="#0F172A" />
          <circle cx="132" cy="296" r="2" fill="#0F172A" />
          <circle cx="132" cy="304" r="2" fill="#0F172A" />

          {/* Sunflower Petals (Circular layout) */}
          <g transform="translate(200 170)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-80"
                rx="24"
                ry="48"
                fill="#FACC15"
                stroke="#EAB308"
                strokeWidth="2"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>

          {/* Sunflower Center Seed Face */}
          <circle cx="200" cy="170" r="65" fill="#78350F" />
          <circle cx="200" cy="170" r="58" fill="#92400E" />

          {/* Cute Smiling Face */}
          <circle cx="180" cy="155" r="8" fill="#FEF08A" />
          <circle cx="180" cy="155" r="5" fill="#0F172A" />
          <circle cx="220" cy="155" r="8" fill="#FEF08A" />
          <circle cx="220" cy="155" r="5" fill="#0F172A" />

          <circle cx="165" cy="175" r="10" fill="#F472B6" opacity="0.8" />
          <circle cx="235" cy="175" r="10" fill="#F472B6" opacity="0.8" />

          <path d="M 185 178 Q 200 195 215 178" stroke="#FEF08A" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Friendly Honeybee */}
          <ellipse cx="320" cy="90" rx="16" ry="12" fill="#F59E0B" />
          <ellipse cx="320" cy="90" rx="5" ry="12" fill="#1E293B" />
          <ellipse cx="312" cy="78" rx="8" ry="12" fill="#E0F2FE" opacity="0.8" transform="rotate(-30 312 78)" />
          <ellipse cx="328" cy="78" rx="8" ry="12" fill="#E0F2FE" opacity="0.8" transform="rotate(30 328 78)" />
          <circle cx="333" cy="88" r="2" fill="#0F172A" />
        </svg>
      );

    case "rainbow_castle":
      return (
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full select-none ${className}`}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dreamy Sky */}
          <rect width="400" height="400" fill="#E0E7FF" />

          {/* Grand Rainbow */}
          <path d="M -20 340 A 220 220 0 0 1 420 340" stroke="#F43F5E" strokeWidth="12" fill="none" />
          <path d="M -8 340 A 208 208 0 0 1 408 340" stroke="#FB923C" strokeWidth="12" fill="none" />
          <path d="M 4 340 A 196 196 0 0 1 396 340" stroke="#FACC15" strokeWidth="12" fill="none" />
          <path d="M 16 340 A 184 184 0 0 1 384 340" stroke="#4ADE80" strokeWidth="12" fill="none" />
          <path d="M 28 340 A 172 172 0 0 1 372 340" stroke="#38BDF8" strokeWidth="12" fill="none" />
          <path d="M 40 340 A 160 160 0 0 1 360 340" stroke="#A855F7" strokeWidth="12" fill="none" />

          {/* Magic Sparkles */}
          <polygon points="60,60 63,68 71,71 63,74 60,82 57,74 49,71 57,68" fill="#FDE047" />
          <polygon points="340,80 343,88 351,91 343,94 340,102 337,94 329,91 337,88" fill="#FDE047" />
          <polygon points="120,40 122,46 128,48 122,50 120,56 118,50 112,48 118,46" fill="#F472B6" />

          {/* Fluffy Foundation Clouds */}
          <ellipse cx="200" cy="360" rx="190" ry="60" fill="#FFFFFF" />
          <circle cx="100" cy="340" r="50" fill="#FFFFFF" />
          <circle cx="200" cy="330" r="55" fill="#FFFFFF" />
          <circle cx="300" cy="340" r="50" fill="#FFFFFF" />

          {/* Castle Base */}
          <rect x="130" y="210" width="140" height="110" fill="#F472B6" rx="6" />

          {/* Left Tower */}
          <rect x="90" y="160" width="50" height="150" fill="#C084FC" rx="4" />
          <polygon points="80,160 115,90 150,160" fill="#FBBF24" />
          <polygon points="113,90 135,98 113,106" fill="#EF4444" />
          <rect x="105" y="190" width="20" height="30" rx="10" fill="#FFFFFF" />

          {/* Right Tower */}
          <rect x="260" y="160" width="50" height="150" fill="#C084FC" rx="4" />
          <polygon points="250,160 285,90 320,160" fill="#FBBF24" />
          <polygon points="283,90 305,98 283,106" fill="#EF4444" />
          <rect x="275" y="190" width="20" height="30" rx="10" fill="#FFFFFF" />

          {/* Center Main Tower */}
          <rect x="165" y="140" width="70" height="90" fill="#E879F9" rx="4" />
          <polygon points="155,140 200,60 245,140" fill="#F59E0B" />
          <polygon points="198,60 225,70 198,80" fill="#3B82F6" />
          <circle cx="200" cy="170" r="14" fill="#FFFFFF" />
          <circle cx="200" cy="170" r="10" fill="#38BDF8" />

          {/* Castle Gate */}
          <path d="M 170 320 L 170 260 Q 200 235 230 260 L 230 320 Z" fill="#78350F" />
          <circle cx="185" cy="285" r="4" fill="#FDE047" />
          <circle cx="215" cy="285" r="4" fill="#FDE047" />

          {/* Castle Battlements / Crenellations */}
          <rect x="135" y="200" width="16" height="12" fill="#F472B6" />
          <rect x="160" y="200" width="16" height="12" fill="#F472B6" />
          <rect x="224" y="200" width="16" height="12" fill="#F472B6" />
          <rect x="249" y="200" width="16" height="12" fill="#F472B6" />
        </svg>
      );

    default:
      return null;
  }
}
