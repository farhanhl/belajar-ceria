import React from "react";

export type TeacherExpression = "idle" | "happy" | "encouraging" | "thinking" | "celebrating";

interface TeacherAvatarProps {
  expression?: TeacherExpression;
  className?: string;
  size?: number;
}

export function TeacherAvatar({
  expression = "idle",
  className = "",
  size = 120,
}: TeacherAvatarProps) {
  // Pastel color palette for Ibu Guru
  // Hijab: soft sky blue / lavender-tinted hijab (#74C0FC & #4DABF7)
  // Skin: Warm fair tone (#FFE8D6)
  // Eyes, smile, and expression tweaks

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full drop-shadow-md"
        fill="none"
      >
        {/* Glow / Backdrop Circle */}
        <circle cx="70" cy="70" r="66" fill="#E7F5FF" stroke="#A5D8FF" strokeWidth="3" />

        {/* Hijab Back (Covers head & shoulders) */}
        <path
          d="M32,70 C32,36 48,22 70,22 C92,22 108,36 108,70 C108,98 122,126 122,126 L18,126 C18,126 32,98 32,70 Z"
          fill="#4DABF7"
        />

        {/* Hijab Inner drape shadow */}
        <path
          d="M38,70 C38,42 50,30 70,30 C90,30 102,42 102,70 C102,96 112,120 112,120 L28,120 C28,120 38,96 38,70 Z"
          fill="#339AF0"
        />

        {/* Face Shape */}
        <ellipse cx="70" cy="68" rx="28" ry="32" fill="#FFE8D6" />

        {/* Inner Bonnet / Underscarf (Ciput) */}
        <path
          d="M48,46 Q70,40 92,46 Q70,36 48,46 Z"
          fill="#FCC419"
        />

        {/* Cheeks (Blush) */}
        <circle cx="52" cy="74" r="5" fill="#FFA8A8" opacity={expression === "happy" || expression === "celebrating" ? "0.8" : "0.5"} />
        <circle cx="88" cy="74" r="5" fill="#FFA8A8" opacity={expression === "happy" || expression === "celebrating" ? "0.8" : "0.5"} />

        {/* Eyes according to expression */}
        {expression === "happy" || expression === "celebrating" ? (
          // Happy curved squint eyes ^^
          <>
            <path d="M52,66 Q58,58 64,66" stroke="#212529" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M76,66 Q82,58 88,66" stroke="#212529" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : expression === "thinking" ? (
          // Thinking glance eyes (looking up-right)
          <>
            <ellipse cx="58" cy="62" rx="4.5" ry="6" fill="#212529" />
            <circle cx="60" cy="60" r="2" fill="#FFFFFF" />
            <ellipse cx="82" cy="62" rx="4.5" ry="6" fill="#212529" />
            <circle cx="84" cy="60" r="2" fill="#FFFFFF" />
            {/* Eyebrows */}
            <path d="M52,54 Q58,52 64,56" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M76,54 Q82,50 88,52" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : expression === "encouraging" ? (
          // Encouraging big sparkling warm eyes
          <>
            <ellipse cx="58" cy="64" rx="5" ry="6.5" fill="#212529" />
            <circle cx="56" cy="62" r="2" fill="#FFFFFF" />
            <circle cx="60" cy="66" r="1.2" fill="#FFFFFF" />
            <ellipse cx="82" cy="64" rx="5" ry="6.5" fill="#212529" />
            <circle cx="80" cy="62" r="2" fill="#FFFFFF" />
            <circle cx="84" cy="66" r="1.2" fill="#FFFFFF" />
            {/* Soft eyebrows */}
            <path d="M52,54 Q58,50 64,54" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M76,54 Q82,50 88,54" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          // Idle / Friendly smile eyes
          <>
            <ellipse cx="58" cy="64" rx="4.5" ry="6" fill="#212529" />
            <circle cx="59.5" cy="62" r="1.8" fill="#FFFFFF" />
            <ellipse cx="82" cy="64" rx="4.5" ry="6" fill="#212529" />
            <circle cx="83.5" cy="62" r="1.8" fill="#FFFFFF" />
            {/* Soft eyebrows */}
            <path d="M53,54 Q58,50 63,54" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M77,54 Q82,50 87,54" stroke="#495057" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* Cute Small Nose */}
        <circle cx="70" cy="70" r="1.5" fill="#E59966" />

        {/* Mouth according to expression */}
        {expression === "happy" || expression === "celebrating" ? (
          // Wide open cheerful smile with tongue
          <g>
            <path d="M60,78 Q70,92 80,78 Z" fill="#E03131" />
            <path d="M64,83 Q70,88 76,83" fill="#FF8787" />
          </g>
        ) : expression === "thinking" ? (
          // Small thoughtful 'o' / smile
          <path d="M66,80 Q70,82 74,80" stroke="#E03131" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : (
          // Gentle warm curved smile
          <path d="M62,78 Q70,86 78,78" stroke="#E03131" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        )}

        {/* Hijab Front Frame (Neatly wrapping face) */}
        <path
          d="M42,50 C40,78 44,92 70,98 C96,92 100,78 98,50 C98,36 84,30 70,30 C56,30 42,36 42,50 Z"
          stroke="#4DABF7"
          strokeWidth="4"
          fill="none"
        />

        {/* Hijab Pin / Flower Brooch */}
        <circle cx="70" cy="100" r="5" fill="#FAB005" />
        <circle cx="70" cy="100" r="2.5" fill="#FFFFFF" />

        {/* Celebrating Sparkles */}
        {expression === "celebrating" && (
          <>
            <polygon points="25,25 28,33 36,36 28,39 25,47 22,39 14,36 22,33" fill="#FCC419" />
            <polygon points="115,25 118,33 126,36 118,39 115,47 112,39 104,36 112,33" fill="#FCC419" />
          </>
        )}
      </svg>
    </div>
  );
}
