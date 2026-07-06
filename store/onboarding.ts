import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  name: string;
  location: string;
  setName: (name: string) => void;
  setLocation: (location: string) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      name: "",
      location: "",
      setName: (name) => set({ name }),
      setLocation: (location) => set({ location }),
    }),
    { name: "skinstric-onboarding" },
  ),
);
