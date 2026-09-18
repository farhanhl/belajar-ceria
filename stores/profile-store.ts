import { create } from "zustand";
import { ChildProfile } from "@/types/profile";
import { GameResult } from "@/types/game";
import {
  getProfiles,
  getActiveProfile,
  createProfile as createProfileStorage,
  setActiveProfile as setActiveProfileStorage,
  recordGameResult as recordGameResultStorage,
  deleteProfile as deleteProfileStorage,
} from "@/lib/storage/profile-storage";
import { isStorageAvailable } from "@/lib/storage/storage";

interface ProfileState {
  profiles: ChildProfile[];
  activeProfile: ChildProfile | null;
  isHydrated: boolean;
  hydrate: () => void;
  createProfile: (name: string, avatar?: string) => ChildProfile;
  selectProfile: (profileId: string) => boolean;
  recordResult: (result: GameResult) => boolean;
  deleteProfile: (profileId: string) => boolean;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  activeProfile: null,
  isHydrated: false,

  hydrate: () => {
    if (!isStorageAvailable()) {
      set({ isHydrated: true });
      return;
    }
    const profiles = getProfiles();
    const activeProfile = getActiveProfile();
    set({ profiles, activeProfile, isHydrated: true });
  },

  createProfile: (name: string, avatar: string = "girl-1") => {
    const newProfile = createProfileStorage(name, avatar);
    const profiles = getProfiles();
    set({ profiles, activeProfile: newProfile });
    return newProfile;
  },

  selectProfile: (profileId: string) => {
    const success = setActiveProfileStorage(profileId);
    if (success) {
      const activeProfile = getActiveProfile();
      set({ activeProfile });
    }
    return success;
  },

  recordResult: (result: GameResult) => {
    const success = recordGameResultStorage(result);
    if (success) {
      const profiles = getProfiles();
      const activeProfile = getActiveProfile();
      set({ profiles, activeProfile });
    }
    return success;
  },

  deleteProfile: (profileId: string) => {
    const success = deleteProfileStorage(profileId);
    if (success) {
      const profiles = getProfiles();
      const activeProfile = getActiveProfile();
      set({ profiles, activeProfile });
    }
    return success;
  },
}));
