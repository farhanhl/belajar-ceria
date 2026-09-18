import React from "react";
import { AVATAR_LIST, ChildAvatar } from "./ChildAvatar";
import { Check } from "lucide-react";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";

interface AvatarPickerProps {
  selectedAvatar: string;
  onSelect: (avatarId: string) => void;
}

export function AvatarPicker({ selectedAvatar, onSelect }: AvatarPickerProps) {
  const { soundEnabled, volume, language } = useSettingsStore();

  const handlePick = (avatarId: string) => {
    if (soundEnabled) {
      soundFx.playClick(volume);
    }
    onSelect(avatarId);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2.5 sm:gap-3 w-full p-1">
      {AVATAR_LIST.map((av) => {
        const isSelected = selectedAvatar === av.id;
        const labelText = typeof av.label === "object" ? (av.label[language] || av.label.id) : av.label;
        return (
          <button
            type="button"
            key={av.id}
            title={labelText}
            onClick={() => handlePick(av.id)}
            className={`group relative p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer w-full ${
              isSelected
                ? `${av.bg} border-4 ${av.border} scale-105 shadow-md ring-2 ring-amber-300`
                : "bg-white/90 border-2 border-slate-200 hover:scale-105 hover:bg-slate-50 opacity-85 hover:opacity-100"
            }`}
          >
            <ChildAvatar avatarId={av.id} size={48} />
            <span className="text-[11px] font-bold text-slate-700 truncate w-full text-center mt-1 group-hover:text-slate-950">
              {labelText}
            </span>
            {isSelected && (
              <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
