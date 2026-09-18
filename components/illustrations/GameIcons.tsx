import React from "react";

interface IconProps {
  name: string;
  className?: string;
}

export function GameIcon({ name, className = "w-16 h-16" }: IconProps) {
  switch (name) {
    // Animals
    case "cat":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="55" r="35" fill="#FFA94D" />
          <polygon points="25,25 40,40 20,48" fill="#FFA94D" />
          <polygon points="28,29 38,40 25,46" fill="#FF8787" />
          <polygon points="75,25 60,40 80,48" fill="#FFA94D" />
          <polygon points="72,29 62,40 75,46" fill="#FF8787" />
          <ellipse cx="38" cy="52" rx="4" ry="6" fill="#212529" />
          <ellipse cx="62" cy="52" rx="4" ry="6" fill="#212529" />
          <circle cx="39" cy="50" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="50" r="1.5" fill="#FFFFFF" />
          <polygon points="50,60 46,56 54,56" fill="#E64980" />
          <path d="M46,62 Q50,66 54,62" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="58" x2="35" y2="60" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="65" x2="35" y2="64" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="58" x2="65" y2="60" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="65" x2="65" y2="64" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "dog":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="55" r="35" fill="#E59966" />
          <ellipse cx="20" cy="45" rx="8" ry="18" fill="#8C5027" transform="rotate(-15 20 45)" />
          <ellipse cx="80" cy="45" rx="8" ry="18" fill="#8C5027" transform="rotate(15 80 45)" />
          <ellipse cx="38" cy="52" rx="4" ry="6" fill="#212529" />
          <ellipse cx="62" cy="52" rx="4" ry="6" fill="#212529" />
          <circle cx="39" cy="50" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="50" r="1.5" fill="#FFFFFF" />
          <ellipse cx="50" cy="62" rx="7" ry="5" fill="#212529" />
          <path d="M45,68 Q50,74 55,68" stroke="#212529" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M47,70 Q50,78 53,70" fill="#FF8787" />
        </svg>
      );
    case "rabbit":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="35" cy="25" rx="8" ry="22" fill="#F1F3F5" stroke="#CED4DA" strokeWidth="2" />
          <ellipse cx="35" cy="25" rx="4" ry="15" fill="#FFC9C9" />
          <ellipse cx="65" cy="25" rx="8" ry="22" fill="#F1F3F5" stroke="#CED4DA" strokeWidth="2" />
          <ellipse cx="65" cy="25" rx="4" ry="15" fill="#FFC9C9" />
          <circle cx="50" cy="60" r="32" fill="#F8F9FA" stroke="#CED4DA" strokeWidth="2" />
          <ellipse cx="38" cy="56" rx="4" ry="6" fill="#212529" />
          <ellipse cx="62" cy="56" rx="4" ry="6" fill="#212529" />
          <circle cx="39" cy="54" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="54" r="1.5" fill="#FFFFFF" />
          <polygon points="50,64 47,61 53,61" fill="#FF8787" />
          <path d="M46,66 Q50,70 54,66" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="30" cy="65" rx="5" ry="3" fill="#FFD8A8" opacity="0.6" />
          <ellipse cx="70" cy="65" rx="5" ry="3" fill="#FFD8A8" opacity="0.6" />
        </svg>
      );
    case "fish":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="48" cy="50" rx="34" ry="24" fill="#38D9A9" />
          <polygon points="80,50 96,30 96,70" fill="#20C997" />
          <path d="M30,30 Q45,20 60,30" fill="#20C997" />
          <circle cx="30" cy="46" r="6" fill="#FFFFFF" />
          <circle cx="30" cy="46" r="3.5" fill="#212529" />
          <circle cx="31" cy="44.5" r="1" fill="#FFFFFF" />
          <path d="M18,52 Q22,56 26,52" stroke="#212529" strokeWidth="2" strokeLinecap="round" />
          <path d="M45,40 Q55,50 45,60" stroke="#12B886" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M55,42 Q65,50 55,58" stroke="#12B886" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "lion":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="42" fill="#F76707" />
          <circle cx="50" cy="52" r="28" fill="#FCC419" />
          <circle cx="30" cy="30" r="7" fill="#F76707" />
          <circle cx="70" cy="30" r="7" fill="#F76707" />
          <ellipse cx="40" cy="48" rx="3.5" ry="5" fill="#212529" />
          <ellipse cx="60" cy="48" rx="3.5" ry="5" fill="#212529" />
          <polygon points="50,56 46,52 54,52" fill="#7950F2" />
          <path d="M45,60 Q50,65 55,60" stroke="#212529" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "elephant":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="25" cy="45" r="16" fill="#90A4AE" />
          <circle cx="75" cy="45" r="16" fill="#90A4AE" />
          <ellipse cx="50" cy="52" rx="30" ry="26" fill="#B0BEC5" />
          <ellipse cx="38" cy="46" rx="3.5" ry="5" fill="#212529" />
          <ellipse cx="62" cy="46" rx="3.5" ry="5" fill="#212529" />
          <path d="M46,55 Q50,75 58,72 Q64,70 60,62" stroke="#78909C" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "bear":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="28" cy="30" r="12" fill="#8D6E63" />
          <circle cx="28" cy="30" r="6" fill="#D7CCC8" />
          <circle cx="72" cy="30" r="12" fill="#8D6E63" />
          <circle cx="72" cy="30" r="6" fill="#D7CCC8" />
          <circle cx="50" cy="55" r="32" fill="#A1887F" />
          <ellipse cx="50" cy="62" rx="14" ry="10" fill="#D7CCC8" />
          <ellipse cx="40" cy="48" rx="3.5" ry="5" fill="#212529" />
          <ellipse cx="60" cy="48" rx="3.5" ry="5" fill="#212529" />
          <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#3E2723" />
          <path d="M47,64 Q50,68 53,64" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "frog":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="32" cy="36" r="12" fill="#69DB7C" />
          <circle cx="68" cy="36" r="12" fill="#69DB7C" />
          <circle cx="32" cy="36" r="6" fill="#FFFFFF" />
          <circle cx="68" cy="36" r="6" fill="#FFFFFF" />
          <circle cx="33" cy="36" r="3.5" fill="#212529" />
          <circle cx="69" cy="36" r="3.5" fill="#212529" />
          <ellipse cx="50" cy="58" rx="34" ry="24" fill="#8CE99A" />
          <path d="M36,60 Q50,72 64,60" stroke="#2B8A3E" strokeWidth="3" strokeLinecap="round" fill="none" />
          <ellipse cx="30" cy="58" rx="5" ry="3" fill="#FFC9C9" />
          <ellipse cx="70" cy="58" rx="5" ry="3" fill="#FFC9C9" />
        </svg>
      );

    // Fruits
    case "apple":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M50,30 Q53,15 62,18" stroke="#66A80F" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="60" cy="22" rx="7" ry="4" fill="#8CE99A" transform="rotate(20 60 22)" />
          <circle cx="40" cy="58" r="28" fill="#FF6B6B" />
          <circle cx="60" cy="58" r="28" fill="#FA5252" />
          <ellipse cx="35" cy="46" rx="6" ry="12" fill="#FFA8A8" opacity="0.6" transform="rotate(-25 35 46)" />
        </svg>
      );
    case "banana":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M22,78 Q30,22 82,24 Q50,45 36,84 Z" fill="#FFE066" stroke="#FAB005" strokeWidth="2" />
          <circle cx="82" cy="24" r="3" fill="#82C91E" />
          <circle cx="22" cy="78" r="3" fill="#E67700" />
        </svg>
      );
    case "orange":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="54" r="34" fill="#FD7E14" />
          <path d="M50,22 L50,15" stroke="#5C940D" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="58" cy="18" rx="7" ry="4" fill="#74B816" transform="rotate(15 58 18)" />
          <circle cx="40" cy="42" r="2" fill="#FFA94D" />
          <circle cx="62" cy="45" r="2" fill="#FFA94D" />
          <circle cx="50" cy="65" r="2" fill="#FFA94D" />
        </svg>
      );
    case "strawberry":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M50,88 Q20,55 30,36 Q40,28 50,34 Q60,28 70,36 Q80,55 50,88 Z" fill="#F03E3E" />
          <polygon points="50,30 42,20 50,24 58,20" fill="#51CF66" />
          <circle cx="42" cy="45" r="2" fill="#FFE066" />
          <circle cx="58" cy="45" r="2" fill="#FFE066" />
          <circle cx="50" cy="56" r="2" fill="#FFE066" />
          <circle cx="38" cy="64" r="2" fill="#FFE066" />
          <circle cx="62" cy="64" r="2" fill="#FFE066" />
          <circle cx="50" cy="75" r="1.8" fill="#FFE066" />
        </svg>
      );
    case "grape":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M50,22 Q52,12 60,14" stroke="#82C91E" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="60" cy="20" rx="8" ry="4" fill="#69DB7C" transform="rotate(-15 60 20)" />
          {/* Top row */}
          <circle cx="38" cy="38" r="11" fill="#9775FA" />
          <circle cx="62" cy="38" r="11" fill="#845EF7" />
          <circle cx="50" cy="36" r="11" fill="#7950F2" />
          {/* Middle row */}
          <circle cx="42" cy="54" r="11" fill="#845EF7" />
          <circle cx="58" cy="54" r="11" fill="#7048E8" />
          {/* Bottom */}
          <circle cx="50" cy="70" r="10" fill="#5F3DC4" />
        </svg>
      );
    case "watermelon":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M15,45 Q50,95 85,45 Z" fill="#40C057" />
          <path d="M20,45 Q50,88 80,45 Z" fill="#F8F9FA" />
          <path d="M24,45 Q50,83 76,45 Z" fill="#FF6B6B" />
          <ellipse cx="40" cy="54" rx="2" ry="3.5" fill="#212529" />
          <ellipse cx="60" cy="54" rx="2" ry="3.5" fill="#212529" />
          <ellipse cx="50" cy="65" rx="2" ry="3.5" fill="#212529" />
        </svg>
      );

    // Vehicles
    case "car":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M15,62 L22,46 Q26,35 40,35 L64,35 Q74,35 78,46 L86,62 Z" fill="#4DABF7" />
          <rect x="10" y="58" width="80" height="20" rx="6" fill="#339AF0" />
          <circle cx="30" cy="78" r="10" fill="#343A40" />
          <circle cx="30" cy="78" r="4" fill="#ADB5BD" />
          <circle cx="70" cy="78" r="10" fill="#343A40" />
          <circle cx="70" cy="78" r="4" fill="#ADB5BD" />
          <polygon points="26,46 45,46 45,38 38,38" fill="#E7F5FF" />
          <polygon points="52,46 74,46 66,38 52,38" fill="#E7F5FF" />
          <circle cx="86" cy="64" r="3" fill="#FFE066" />
          <circle cx="14" cy="64" r="3" fill="#FF8787" />
        </svg>
      );
    case "bus":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="15" y="28" width="70" height="46" rx="8" fill="#FCC419" />
          <rect x="22" y="34" width="16" height="14" rx="2" fill="#E7F5FF" />
          <rect x="42" y="34" width="16" height="14" rx="2" fill="#E7F5FF" />
          <rect x="62" y="34" width="16" height="14" rx="2" fill="#E7F5FF" />
          <circle cx="30" cy="74" r="9" fill="#343A40" />
          <circle cx="30" cy="74" r="3.5" fill="#ADB5BD" />
          <circle cx="70" cy="74" r="9" fill="#343A40" />
          <circle cx="70" cy="74" r="3.5" fill="#ADB5BD" />
          <line x1="15" y1="58" x2="85" y2="58" stroke="#E67700" strokeWidth="3" />
        </svg>
      );
    case "bicycle":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="28" cy="65" r="16" stroke="#495057" strokeWidth="4" fill="#F8F9FA" />
          <circle cx="72" cy="65" r="16" stroke="#495057" strokeWidth="4" fill="#F8F9FA" />
          <line x1="28" y1="65" x2="48" y2="65" stroke="#FF6B6B" strokeWidth="4" />
          <line x1="48" y1="65" x2="65" y2="45" stroke="#FF6B6B" strokeWidth="4" />
          <line x1="28" y1="65" x2="42" y2="45" stroke="#FF6B6B" strokeWidth="4" />
          <line x1="42" y1="45" x2="65" y2="45" stroke="#FF6B6B" strokeWidth="4" />
          <line x1="48" y1="65" x2="38" y2="40" stroke="#FF6B6B" strokeWidth="4" />
          <line x1="34" y1="40" x2="44" y2="40" stroke="#343A40" strokeWidth="4" strokeLinecap="round" />
          <line x1="72" y1="65" x2="64" y2="35" stroke="#FF6B6B" strokeWidth="4" />
          <line x1="60" y1="35" x2="72" y2="35" stroke="#343A40" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "airplane":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M15,50 Q40,42 85,50 Q40,58 15,50 Z" fill="#74C0FC" />
          <polygon points="45,46 55,20 65,46" fill="#339AF0" />
          <polygon points="45,54 55,80 65,54" fill="#339AF0" />
          <polygon points="18,48 10,32 24,48" fill="#1C7ED6" />
          <circle cx="75" cy="50" r="3" fill="#FFFFFF" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M50,15 Q68,40 65,70 L35,70 Q32,40 50,15 Z" fill="#F03E3E" />
          <circle cx="50" cy="42" r="8" fill="#E7F5FF" stroke="#339AF0" strokeWidth="2.5" />
          <polygon points="35,55 18,72 35,70" fill="#FD7E14" />
          <polygon points="65,55 82,72 65,70" fill="#FD7E14" />
          <polygon points="42,70 50,88 58,70" fill="#FFD43B" />
        </svg>
      );
    case "train":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="20" y="32" width="55" height="42" rx="4" fill="#20C997" />
          <rect x="60" y="44" width="22" height="30" rx="4" fill="#0CA678" />
          <rect x="26" y="38" width="18" height="16" rx="2" fill="#E7F5FF" />
          <rect x="70" y="24" width="8" height="14" fill="#FAB005" />
          <circle cx="34" cy="74" r="8" fill="#343A40" />
          <circle cx="54" cy="74" r="8" fill="#343A40" />
          <circle cx="74" cy="74" r="8" fill="#343A40" />
        </svg>
      );

    // Everyday Objects
    case "ball":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="36" fill="#F8F9FA" stroke="#495057" strokeWidth="3" />
          <polygon points="50,38 60,45 56,58 44,58 40,45" fill="#212529" />
          <line x1="50" y1="38" x2="50" y2="14" stroke="#495057" strokeWidth="3" />
          <line x1="60" y1="45" x2="82" y2="35" stroke="#495057" strokeWidth="3" />
          <line x1="56" y1="58" x2="72" y2="78" stroke="#495057" strokeWidth="3" />
          <line x1="44" y1="58" x2="28" y2="78" stroke="#495057" strokeWidth="3" />
          <line x1="40" y1="45" x2="18" y2="35" stroke="#495057" strokeWidth="3" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="22" y="24" width="56" height="52" rx="4" fill="#4DABF7" />
          <rect x="26" y="28" width="52" height="44" rx="2" fill="#FFFFFF" />
          <line x1="36" y1="38" x2="68" y2="38" stroke="#74C0FC" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="48" x2="68" y2="48" stroke="#74C0FC" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="58" x2="55" y2="58" stroke="#74C0FC" strokeWidth="3" strokeLinecap="round" />
          <rect x="18" y="24" width="8" height="52" rx="3" fill="#1971C2" />
        </svg>
      );
    case "teddy":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="28" cy="30" r="10" fill="#D9480F" />
          <circle cx="72" cy="30" r="10" fill="#D9480F" />
          <circle cx="50" cy="52" r="28" fill="#F76707" />
          <ellipse cx="50" cy="58" rx="12" ry="8" fill="#FFE8CC" />
          <circle cx="40" cy="48" r="3" fill="#212529" />
          <circle cx="60" cy="48" r="3" fill="#212529" />
          <ellipse cx="50" cy="56" rx="4" ry="2.5" fill="#212529" />
          <circle cx="50" cy="65" r="4" fill="#FF8787" />
        </svg>
      );
    case "backpack":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M35,28 Q50,16 65,28" stroke="#AE3EC9" strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="25" y="28" width="50" height="52" rx="10" fill="#DA77F2" />
          <rect x="32" y="48" width="36" height="24" rx="6" fill="#F783AC" />
          <circle cx="50" cy="58" r="3" fill="#FFE066" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <polygon
            points="50,15 61,38 86,40 67,57 73,82 50,68 27,82 33,57 14,40 39,38"
            fill="#FCC419"
            stroke="#FAB005"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="48" r="2.5" fill="#212529" />
          <circle cx="56" cy="48" r="2.5" fill="#212529" />
          <path d="M46,55 Q50,59 54,55" stroke="#212529" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "balloon":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="42" rx="28" ry="34" fill="#FF6B6B" />
          <ellipse cx="38" cy="30" rx="5" ry="12" fill="#FFA8A8" opacity="0.6" transform="rotate(-25 38 30)" />
          <polygon points="50,75 46,80 54,80" fill="#FA5252" />
          <path d="M50,80 Q56,90 48,96" stroke="#868E96" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="40" fill="#FCC419" />
          <text x="50" y="58" fontSize="24" textAnchor="middle" fill="#212529" fontWeight="bold">
            ?
          </text>
        </svg>
      );
  }
}
