import React from "react";

export const AVATAR_LIST = [
  { id: "girl-1", label: "Gadis Ceria", bg: "bg-pink-100", border: "border-pink-400" },
  { id: "boy-1", label: "Laki-laki Hebat", bg: "bg-blue-100", border: "border-blue-400" },
  { id: "girl-2", label: "Gadis Pintar", bg: "bg-purple-100", border: "border-purple-400" },
  { id: "boy-2", label: "Laki-laki Cerdas", bg: "bg-emerald-100", border: "border-emerald-400" },
  { id: "star-1", label: "Bintang Juara", bg: "bg-yellow-100", border: "border-yellow-400" },
  { id: "cat-1", label: "Kucing Lucu", bg: "bg-orange-100", border: "border-orange-400" },
];

interface ChildAvatarProps {
  avatarId?: string;
  className?: string;
  size?: number;
}

export function ChildAvatar({ avatarId = "girl-1", className = "", size = 64 }: ChildAvatarProps) {
  const renderAvatarContent = () => {
    switch (avatarId) {
      case "boy-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#BAE6FD" />
            <path d="M25,40 Q50,15 75,40" fill="#78350F" />
            <circle cx="50" cy="58" r="28" fill="#FFEDD5" />
            <ellipse cx="40" cy="54" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="54" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="52" r="1.5" fill="#FFFFFF" />
            <circle cx="61" cy="52" r="1.5" fill="#FFFFFF" />
            <path d="M44,66 Q50,72 56,66" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="62" r="4" fill="#FCA5A5" opacity="0.6" />
            <circle cx="66" cy="62" r="4" fill="#FCA5A5" opacity="0.6" />
          </svg>
        );
      case "girl-2":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#E9D5FF" />
            {/* Pigtails */}
            <circle cx="22" cy="40" r="10" fill="#92400E" />
            <circle cx="78" cy="40" r="10" fill="#92400E" />
            <circle cx="50" cy="58" r="28" fill="#FFEDD5" />
            {/* Bangs */}
            <path d="M28,45 Q50,26 72,45" fill="#92400E" />
            <ellipse cx="40" cy="54" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="54" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="52" r="1.5" fill="#FFFFFF" />
            <circle cx="61" cy="52" r="1.5" fill="#FFFFFF" />
            <path d="M44,66 Q50,72 56,66" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="62" r="4" fill="#F472B6" opacity="0.6" />
            <circle cx="66" cy="62" r="4" fill="#F472B6" opacity="0.6" />
          </svg>
        );
      case "boy-2":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#A7F3D0" />
            {/* Cap */}
            <path d="M28,40 Q50,20 72,40 L84,42 L72,48 L28,48 Z" fill="#059669" />
            <circle cx="50" cy="58" r="28" fill="#FFEDD5" />
            <ellipse cx="40" cy="56" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="56" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="54" r="1.5" fill="#FFFFFF" />
            <circle cx="61" cy="54" r="1.5" fill="#FFFFFF" />
            <path d="M44,68 Q50,74 56,68" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );
      case "star-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FEF08A" />
            <polygon
              points="50,20 59,38 78,40 63,54 68,74 50,62 32,74 37,54 22,40 41,38"
              fill="#FBBF24"
            />
            <circle cx="43" cy="46" r="3" fill="#1E293B" />
            <circle cx="57" cy="46" r="3" fill="#1E293B" />
            <path d="M45,54 Q50,58 55,54" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case "cat-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FED7AA" />
            <polygon points="26,26 40,40 22,48" fill="#F97316" />
            <polygon points="74,26 60,40 78,48" fill="#F97316" />
            <circle cx="50" cy="55" r="30" fill="#FB923C" />
            <ellipse cx="40" cy="52" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="52" rx="3.5" ry="5" fill="#1E293B" />
            <polygon points="50,60 46,56 54,56" fill="#E11D48" />
            <path d="M46,62 Q50,66 54,62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "girl-1":
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FBCFE8" />
            {/* Hijab / Hair */}
            <path
              d="M26,50 C26,28 36,20 50,20 C64,20 74,28 74,50 C74,70 82,88 82,88 L18,88 C18,88 26,70 26,50 Z"
              fill="#EC4899"
            />
            <ellipse cx="50" cy="52" rx="20" ry="22" fill="#FFEDD5" />
            <ellipse cx="42" cy="50" rx="3" ry="4" fill="#1E293B" />
            <ellipse cx="58" cy="50" rx="3" ry="4" fill="#1E293B" />
            <circle cx="43" cy="48" r="1.2" fill="#FFFFFF" />
            <circle cx="59" cy="48" r="1.2" fill="#FFFFFF" />
            <path d="M45,58 Q50,64 55,58" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="36" cy="55" r="3" fill="#FDA4AF" />
            <circle cx="64" cy="55" r="3" fill="#FDA4AF" />
          </svg>
        );
    }
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full overflow-hidden inline-flex items-center justify-center shrink-0 select-none shadow-sm ${className}`}
    >
      {renderAvatarContent()}
    </div>
  );
}
