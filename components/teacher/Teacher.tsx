"use client";

import React, { useEffect, useState, useRef } from "react";
import { TeacherAvatar, TeacherExpression } from "./TeacherAvatar";
import { Volume2, VolumeX } from "lucide-react";
import { ttsService } from "@/lib/tts/tts";
import { useSettingsStore } from "@/stores/settings-store";
import { motion, AnimatePresence } from "motion/react";
import { soundFx } from "@/lib/audio/sound-fx";

interface TeacherProps {
  expression?: TeacherExpression;
  message: string;
  subMessage?: string;
  showSpeaker?: boolean;
  autoSpeak?: boolean;
  size?: number;
  className?: string;
  onSpeechEnd?: () => void;
}

export function Teacher({
  expression = "idle",
  message,
  subMessage,
  showSpeaker = true,
  autoSpeak = true,
  size = 85,
  className = "",
  onSpeechEnd,
}: TeacherProps) {
  const { language, soundEnabled, autoTts, volume } = useSettingsStore();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const lastMessageRef = useRef<string>("");

  const handleSpeak = () => {
    if (!message) return;
    if (soundEnabled) {
      soundFx.playClick(volume);
    }
    setIsSpeaking(true);
    ttsService.speak({
      text: message + (subMessage ? ` ${subMessage}` : ""),
      language,
      volume,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        if (onSpeechEnd) onSpeechEnd();
      },
      onError: () => setIsSpeaking(false),
    });
  };

  // Auto-speak when message changes if enabled
  useEffect(() => {
    if (autoTts && autoSpeak && message && lastMessageRef.current !== message) {
      lastMessageRef.current = message;
      // Slight delay to allow UI to mount smoothly
      const timer = setTimeout(() => {
        handleSpeak();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [message, autoTts, autoSpeak, language]);

  return (
    <div className={`flex flex-row items-center gap-3 sm:gap-4 w-full ${className}`}>
      {/* Teacher Character Avatar */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1,
          y: isSpeaking ? [0, -4, 0] : 0,
        }}
        transition={{
          repeat: isSpeaking ? Infinity : 0,
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="shrink-0 cursor-pointer"
        onClick={handleSpeak}
        title="Klik Ibu Guru untuk mendengar suara"
      >
        <TeacherAvatar
          expression={isSpeaking ? (expression === "idle" ? "happy" : expression) : expression}
          size={size}
        />
      </motion.div>

      {/* Speech Bubble */}
      <div className="relative flex-1 w-full bg-white border-3 sm:border-4 border-amber-300 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 shadow-md sm:shadow-lg text-left">
        {/* Pointer arrow for bubble */}
        <div className="block absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 sm:border-t-8 border-t-transparent border-b-6 sm:border-b-8 border-b-transparent border-r-[10px] sm:border-r-[14px] border-r-amber-300" />
        <div className="block absolute -left-1.5 sm:-left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-5 sm:border-t-6 border-t-transparent border-b-5 sm:border-b-6 border-b-transparent border-r-[8px] sm:border-r-[11px] border-r-white z-10" />

        <div className="flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1 flex-1">
            <p className="text-xs sm:text-base md:text-lg font-extrabold text-amber-900 leading-snug tracking-wide">
              {message}
            </p>
            {subMessage && (
              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-amber-700">
                {subMessage}
              </p>
            )}
          </div>

          {/* Speaker Button */}
          {showSpeaker && (
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSpeak}
              className={`shrink-0 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow transition-all flex items-center justify-center cursor-pointer ${
                isSpeaking
                  ? "bg-amber-500 text-white animate-pulse"
                  : "bg-amber-100 hover:bg-amber-200 text-amber-800"
              }`}
              title="Ulangi Suara"
              aria-label="Ulangi Suara"
            >
              <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isSpeaking ? "animate-bounce" : ""}`} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
