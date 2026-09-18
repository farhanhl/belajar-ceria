import React from "react";

export const AVATAR_LIST = [
  { id: "girl-1", label: { id: "Gadis Hijab", en: "Hijab Girl" }, bg: "bg-pink-100", border: "border-pink-400" },
  { id: "boy-1", label: { id: "Laki-laki Hebat", en: "Super Boy" }, bg: "bg-sky-100", border: "border-sky-400" },
  { id: "girl-2", label: { id: "Gadis Kuncir", en: "Ponytail Girl" }, bg: "bg-purple-100", border: "border-purple-400" },
  { id: "boy-2", label: { id: "Anak Bertopi", en: "Cap Boy" }, bg: "bg-emerald-100", border: "border-emerald-400" },
  { id: "girl-3", label: { id: "Gadis Kacamata", en: "Glasses Girl" }, bg: "bg-rose-100", border: "border-rose-400" },
  { id: "boy-3", label: { id: "Jagoan Bandana", en: "Bandana Boy" }, bg: "bg-blue-100", border: "border-blue-400" },
  { id: "girl-4", label: { id: "Putri Bunga", en: "Flower Girl" }, bg: "bg-amber-100", border: "border-amber-400" },
  { id: "boy-4", label: { id: "Kapten Cilik", en: "Little Captain" }, bg: "bg-cyan-100", border: "border-cyan-400" },
  { id: "star-1", label: { id: "Bintang Juara", en: "Star Champion" }, bg: "bg-yellow-100", border: "border-yellow-400" },
  { id: "cat-1", label: { id: "Kucing Lucu", en: "Cute Cat" }, bg: "bg-orange-100", border: "border-orange-400" },
  { id: "rabbit-1", label: { id: "Kelinci Imut", en: "Sweet Bunny" }, bg: "bg-pink-100", border: "border-pink-400" },
  { id: "bear-1", label: { id: "Beruang Cokelat", en: "Brown Bear" }, bg: "bg-amber-100", border: "border-amber-400" },
  { id: "panda-1", label: { id: "Panda Gembul", en: "Chubby Panda" }, bg: "bg-slate-100", border: "border-slate-400" },
  { id: "lion-1", label: { id: "Singa Cilik", en: "Little Lion" }, bg: "bg-orange-100", border: "border-orange-400" },
  { id: "frog-1", label: { id: "Katak Riang", en: "Happy Frog" }, bg: "bg-emerald-100", border: "border-emerald-400" },
  { id: "fox-1", label: { id: "Rubah Pintar", en: "Clever Fox" }, bg: "bg-orange-100", border: "border-orange-400" },
  { id: "dino-1", label: { id: "Dino Hijau", en: "Green Dino" }, bg: "bg-teal-100", border: "border-teal-400" },
  { id: "chick-1", label: { id: "Ayam Cilik", en: "Little Chick" }, bg: "bg-yellow-100", border: "border-yellow-400" },
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
            <circle cx="22" cy="40" r="10" fill="#92400E" />
            <circle cx="78" cy="40" r="10" fill="#92400E" />
            <circle cx="50" cy="58" r="28" fill="#FFEDD5" />
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
            <path d="M28,40 Q50,20 72,40 L84,42 L72,48 L28,48 Z" fill="#059669" />
            <circle cx="50" cy="58" r="28" fill="#FFEDD5" />
            <ellipse cx="40" cy="56" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="56" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="54" r="1.5" fill="#FFFFFF" />
            <circle cx="61" cy="54" r="1.5" fill="#FFFFFF" />
            <path d="M44,68 Q50,74 56,68" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );
      case "girl-3":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FFE4E6" />
            {/* Bob Hair */}
            <path d="M22,50 C22,25 35,18 50,18 C65,18 78,25 78,50 C78,65 72,70 68,70 C64,70 64,55 50,55 C36,55 36,70 32,70 C28,70 22,65 22,50 Z" fill="#E11D48" />
            <circle cx="50" cy="56" r="26" fill="#FFEDD5" />
            {/* Glasses */}
            <circle cx="40" cy="53" r="8" fill="none" stroke="#BE123C" strokeWidth="2.5" />
            <circle cx="60" cy="53" r="8" fill="none" stroke="#BE123C" strokeWidth="2.5" />
            <line x1="48" y1="53" x2="52" y2="53" stroke="#BE123C" strokeWidth="2.5" />
            <ellipse cx="40" cy="53" rx="3" ry="4" fill="#1E293B" />
            <ellipse cx="60" cy="53" rx="3" ry="4" fill="#1E293B" />
            <circle cx="41" cy="51" r="1.2" fill="#FFFFFF" />
            <circle cx="61" cy="51" r="1.2" fill="#FFFFFF" />
            <path d="M45,67 Q50,72 55,67" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="33" cy="63" r="3.5" fill="#FDA4AF" opacity="0.7" />
            <circle cx="67" cy="63" r="3.5" fill="#FDA4AF" opacity="0.7" />
          </svg>
        );
      case "boy-3":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#DBEAFE" />
            {/* Hair */}
            <circle cx="50" cy="42" r="32" fill="#1E293B" />
            {/* Face */}
            <circle cx="50" cy="58" r="27" fill="#FFEDD5" />
            {/* Headband / Bandana */}
            <path d="M22,46 Q50,42 78,46 L77,53 Q50,49 23,53 Z" fill="#2563EB" />
            <circle cx="75" cy="50" r="4" fill="#1D4ED8" />
            {/* Eyes */}
            <ellipse cx="40" cy="58" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="58" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="56" r="1.5" fill="#FFFFFF" />
            <circle cx="61" cy="56" r="1.5" fill="#FFFFFF" />
            {/* Smile */}
            <path d="M43,69 Q50,76 57,69" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="65" r="4" fill="#93C5FD" opacity="0.6" />
            <circle cx="66" cy="65" r="4" fill="#93C5FD" opacity="0.6" />
          </svg>
        );
      case "girl-4":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FEF3C7" />
            {/* Long Hair */}
            <path d="M20,52 C20,25 35,16 50,16 C65,16 80,25 80,52 C80,75 75,85 75,85 L25,85 C25,85 20,75 20,52 Z" fill="#451A03" />
            <circle cx="50" cy="54" r="26" fill="#FFEDD5" />
            {/* Bangs */}
            <path d="M27,42 Q50,28 73,42 Q50,36 27,42" fill="#451A03" />
            {/* Flower Pin */}
            <circle cx="72" cy="36" r="6" fill="#FBBF24" />
            <circle cx="72" cy="36" r="2.5" fill="#FFFFFF" />
            {/* Eyes */}
            <ellipse cx="40" cy="52" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="52" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="50" r="1.5" fill="#FFFFFF" />
            <circle cx="61" cy="50" r="1.5" fill="#FFFFFF" />
            <path d="M44,64 Q50,70 56,64" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="60" r="3.5" fill="#FDA4AF" opacity="0.7" />
            <circle cx="66" cy="60" r="3.5" fill="#FDA4AF" opacity="0.7" />
          </svg>
        );
      case "boy-4":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#CFFAFE" />
            {/* Hair */}
            <circle cx="50" cy="46" r="30" fill="#78350F" />
            <circle cx="50" cy="58" r="27" fill="#FFEDD5" />
            {/* Captain Hat */}
            <path d="M22,38 C22,24 35,20 50,20 C65,20 78,24 78,38 Z" fill="#1E3A8A" />
            <path d="M18,38 Q50,44 82,38 L84,43 Q50,50 16,43 Z" fill="#0F172A" />
            <circle cx="50" cy="30" r="4" fill="#F59E0B" />
            {/* Eyes */}
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
              points="50,18 60,37 80,40 65,54 69,75 50,64 31,75 35,54 20,40 40,37"
              fill="#FBBF24"
            />
            <circle cx="43" cy="46" r="3.5" fill="#1E293B" />
            <circle cx="57" cy="46" r="3.5" fill="#1E293B" />
            <circle cx="44" cy="44.5" r="1.2" fill="#FFFFFF" />
            <circle cx="58" cy="44.5" r="1.2" fill="#FFFFFF" />
            <path d="M45,55 Q50,60 55,55" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="36" cy="52" r="3" fill="#F472B6" opacity="0.6" />
            <circle cx="64" cy="52" r="3" fill="#F472B6" opacity="0.6" />
          </svg>
        );
      case "cat-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FED7AA" />
            <polygon points="24,24 40,40 20,46" fill="#F97316" />
            <polygon points="26,28 37,39 24,43" fill="#FDA4AF" />
            <polygon points="76,24 60,40 80,46" fill="#F97316" />
            <polygon points="74,28 63,39 76,43" fill="#FDA4AF" />
            <circle cx="50" cy="55" r="30" fill="#FB923C" />
            <ellipse cx="40" cy="52" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="52" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="50" r="1.2" fill="#FFFFFF" />
            <circle cx="61" cy="50" r="1.2" fill="#FFFFFF" />
            <polygon points="50,60 46,56 54,56" fill="#E11D48" />
            <path d="M46,62 Q50,66 54,62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Whiskers */}
            <line x1="28" y1="56" x2="18" y2="54" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="62" x2="18" y2="64" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="72" y1="56" x2="82" y2="54" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="72" y1="62" x2="82" y2="64" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "rabbit-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FCE7F3" />
            {/* Ears */}
            <ellipse cx="36" cy="28" rx="8" ry="18" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
            <ellipse cx="36" cy="28" rx="4.5" ry="13" fill="#FDA4AF" />
            <ellipse cx="64" cy="28" rx="8" ry="18" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
            <ellipse cx="64" cy="28" rx="4.5" ry="13" fill="#FDA4AF" />
            {/* Face */}
            <circle cx="50" cy="60" r="28" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1" />
            {/* Eyes */}
            <ellipse cx="40" cy="55" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="60" cy="55" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="41" cy="53" r="1.5" fill="#FFFFFF" />
            <circle cx="61" cy="53" r="1.5" fill="#FFFFFF" />
            {/* Nose & Mouth */}
            <polygon points="50,64 46,60 54,60" fill="#F43F5E" />
            <path d="M46,65 Q50,69 54,65" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Blush */}
            <circle cx="32" cy="62" r="4" fill="#FDA4AF" opacity="0.7" />
            <circle cx="68" cy="62" r="4" fill="#FDA4AF" opacity="0.7" />
            {/* Whiskers */}
            <line x1="28" y1="58" x2="18" y2="57" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="72" y1="58" x2="82" y2="57" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "bear-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FEF3C7" />
            {/* Ears */}
            <circle cx="28" cy="30" r="12" fill="#B45309" />
            <circle cx="28" cy="30" r="6" fill="#FDE68A" />
            <circle cx="72" cy="30" r="12" fill="#B45309" />
            <circle cx="72" cy="30" r="6" fill="#FDE68A" />
            {/* Head */}
            <circle cx="50" cy="56" r="30" fill="#D97706" />
            {/* Snout */}
            <ellipse cx="50" cy="64" rx="14" ry="10" fill="#FEF3C7" />
            {/* Nose */}
            <ellipse cx="50" cy="60" rx="4.5" ry="3" fill="#1E293B" />
            <path d="M46,66 Q50,70 54,66" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Eyes */}
            <circle cx="39" cy="50" r="3.5" fill="#1E293B" />
            <circle cx="61" cy="50" r="3.5" fill="#1E293B" />
            <circle cx="40" cy="48.5" r="1.2" fill="#FFFFFF" />
            <circle cx="62" cy="48.5" r="1.2" fill="#FFFFFF" />
          </svg>
        );
      case "panda-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#F1F5F9" />
            {/* Ears */}
            <circle cx="26" cy="30" r="12" fill="#1E293B" />
            <circle cx="74" cy="30" r="12" fill="#1E293B" />
            {/* Head */}
            <circle cx="50" cy="56" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            {/* Eye Patches */}
            <ellipse cx="38" cy="53" rx="8" ry="10" transform="rotate(-15 38 53)" fill="#1E293B" />
            <ellipse cx="62" cy="53" rx="8" ry="10" transform="rotate(15 62 53)" fill="#1E293B" />
            {/* Eyes */}
            <circle cx="38" cy="52" r="3" fill="#FFFFFF" />
            <circle cx="62" cy="52" r="3" fill="#FFFFFF" />
            <circle cx="39" cy="52" r="1.5" fill="#0F172A" />
            <circle cx="63" cy="52" r="1.5" fill="#0F172A" />
            {/* Nose & Mouth */}
            <polygon points="50,64 46,60 54,60" fill="#1E293B" />
            <path d="M46,67 Q50,71 54,67" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Blush */}
            <circle cx="28" cy="62" r="4" fill="#FDA4AF" opacity="0.6" />
            <circle cx="72" cy="62" r="4" fill="#FDA4AF" opacity="0.6" />
          </svg>
        );
      case "lion-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FFEDD5" />
            {/* Mane */}
            <circle cx="50" cy="52" r="36" fill="#EA580C" />
            {/* Ears */}
            <circle cx="28" cy="30" r="9" fill="#F59E0B" />
            <circle cx="72" cy="30" r="9" fill="#F59E0B" />
            {/* Face */}
            <circle cx="50" cy="54" r="26" fill="#FBBF24" />
            {/* Muzzle */}
            <ellipse cx="50" cy="62" rx="10" ry="7" fill="#FEF3C7" />
            <polygon points="50,59 46,56 54,56" fill="#9A3412" />
            <path d="M46,63 Q50,67 54,63" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Eyes */}
            <ellipse cx="41" cy="48" rx="3.5" ry="4.5" fill="#1E293B" />
            <ellipse cx="59" cy="48" rx="3.5" ry="4.5" fill="#1E293B" />
            <circle cx="42" cy="47" r="1.5" fill="#FFFFFF" />
            <circle cx="60" cy="47" r="1.5" fill="#FFFFFF" />
            {/* Whiskers */}
            <circle cx="34" cy="58" r="3" fill="#FDBA74" opacity="0.7" />
            <circle cx="66" cy="58" r="3" fill="#FDBA74" opacity="0.7" />
          </svg>
        );
      case "frog-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#D1FAE5" />
            {/* Big Top Eyes */}
            <circle cx="34" cy="34" r="14" fill="#22C55E" />
            <circle cx="66" cy="34" r="14" fill="#22C55E" />
            <circle cx="34" cy="34" r="9" fill="#FFFFFF" />
            <circle cx="66" cy="34" r="9" fill="#FFFFFF" />
            <circle cx="34" cy="34" r="5" fill="#0F172A" />
            <circle cx="66" cy="34" r="5" fill="#0F172A" />
            <circle cx="36" cy="32" r="1.8" fill="#FFFFFF" />
            <circle cx="68" cy="32" r="1.8" fill="#FFFFFF" />
            {/* Face */}
            <ellipse cx="50" cy="58" rx="34" ry="26" fill="#4ADE80" />
            {/* Mouth */}
            <path d="M30,62 Q50,78 70,62" stroke="#166534" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Rosy Cheeks */}
            <circle cx="28" cy="58" r="5" fill="#F472B6" opacity="0.7" />
            <circle cx="72" cy="58" r="5" fill="#F472B6" opacity="0.7" />
          </svg>
        );
      case "fox-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FFEDD5" />
            {/* Ears */}
            <polygon points="20,18 42,36 18,48" fill="#EA580C" />
            <polygon points="22,22 38,36 22,42" fill="#1E293B" />
            <polygon points="80,18 58,36 82,48" fill="#EA580C" />
            <polygon points="78,22 62,36 78,42" fill="#1E293B" />
            {/* Face */}
            <circle cx="50" cy="54" r="28" fill="#F97316" />
            {/* White Cheeks */}
            <path d="M24,54 Q38,46 50,60 Q62,46 76,54 Q65,78 50,80 Q35,78 24,54 Z" fill="#FFFFFF" />
            {/* Eyes */}
            <ellipse cx="38" cy="48" rx="3.5" ry="5" fill="#1E293B" />
            <ellipse cx="62" cy="48" rx="3.5" ry="5" fill="#1E293B" />
            <circle cx="39" cy="46" r="1.2" fill="#FFFFFF" />
            <circle cx="63" cy="46" r="1.2" fill="#FFFFFF" />
            {/* Nose */}
            <circle cx="50" cy="65" r="3.5" fill="#0F172A" />
            <path d="M46,70 Q50,73 54,70" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case "dino-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#CCFBF1" />
            {/* Spikes */}
            <polygon points="26,20 32,32 20,30" fill="#F59E0B" />
            <polygon points="40,14 46,26 34,24" fill="#F59E0B" />
            <polygon points="56,12 62,24 50,22" fill="#F59E0B" />
            {/* Dino Head */}
            <circle cx="50" cy="54" r="29" fill="#14B8A6" />
            {/* Cheerful Eye */}
            <circle cx="42" cy="48" r="8" fill="#FFFFFF" />
            <circle cx="43" cy="48" r="4.5" fill="#0F172A" />
            <circle cx="45" cy="46" r="1.8" fill="#FFFFFF" />
            {/* Cute Smile with Tooth */}
            <path d="M38,62 Q52,72 66,58" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" fill="none" />
            <polygon points="48,64 52,64 50,68" fill="#FFFFFF" />
            {/* Blush */}
            <circle cx="34" cy="58" r="4" fill="#FDA4AF" opacity="0.8" />
            <circle cx="62" cy="52" r="3" fill="#2DD4BF" />
          </svg>
        );
      case "chick-1":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FEF9C3" />
            {/* Tuft */}
            <path d="M50,20 Q48,12 44,14 Q48,18 50,22" stroke="#EAB308" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Head */}
            <circle cx="50" cy="54" r="30" fill="#FACC15" />
            {/* Eyes */}
            <ellipse cx="38" cy="48" rx="4" ry="5.5" fill="#1E293B" />
            <ellipse cx="62" cy="48" rx="4" ry="5.5" fill="#1E293B" />
            <circle cx="39" cy="46" r="1.8" fill="#FFFFFF" />
            <circle cx="63" cy="46" r="1.8" fill="#FFFFFF" />
            {/* Beak */}
            <polygon points="50,58 43,53 57,53" fill="#EA580C" />
            {/* Blush */}
            <circle cx="30" cy="56" r="4.5" fill="#FB7185" opacity="0.6" />
            <circle cx="70" cy="56" r="4.5" fill="#FB7185" opacity="0.6" />
          </svg>
        );
      case "girl-1":
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#FBCFE8" />
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
