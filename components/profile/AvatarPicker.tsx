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
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {AVATAR_LIST.map((av) => {
        const isSelected = selectedAvatar === av.id;
        return (
          <button
            type="button"
            key={av.id}
            onClick={() => handlePick(av.id)}
            className={`relative p-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
              isSelected
                ? `${av.bg} border-4 ${av.border} scale-105 shadow-md`
                : "bg-white/80 border-2 border-slate-200 hover:scale-100 hover:bg-slate-50 opacity-80"
            }`}
          >
            <ChildAvatar avatarId={av.id} size={56} />
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
