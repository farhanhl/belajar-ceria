"use client";

import React, { useEffect, useState } from "react";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const hydrateProfiles = useProfileStore((s) => s.hydrate);
  const hydrateSettings = useSettingsStore((s) => s.hydrate);

  useEffect(() => {
    hydrateProfiles();
    hydrateSettings();
    setMounted(true);
  }, [hydrateProfiles, hydrateSettings]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-amber-600 rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-amber-900">Mempersiapkan Belajar Ceria...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
