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
  const { soundEnabled, volume } = useSettingsStore();

  const handlePick = (avatarId: string) => {
    if (soundEnabled) {
      soundFx.playClick(volume);
    }
    onSelect(avatarId);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 max-h-[340px] sm:max-h-none overflow-y-auto p-1">
      {AVATAR_LIST.map((av) => {
        const isSelected = selectedAvatar === av.id;
        return (
          <button
            type="button"
            key={av.id}
            title={av.label}
            onClick={() => handlePick(av.id)}
            className={`group relative p-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
              isSelected
                ? `${av.bg} border-4 ${av.border} scale-105 shadow-md ring-2 ring-amber-300`
                : "bg-white/90 border-2 border-slate-200 hover:scale-105 hover:bg-slate-50 opacity-85 hover:opacity-100"
            }`}
          >
            <ChildAvatar avatarId={av.id} size={52} />
            <span className="text-[11px] font-bold text-slate-600 truncate w-full text-center mt-1 group-hover:text-slate-900">
              {av.label}
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
