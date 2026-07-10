import { create } from "zustand";

interface AnalysisState {
  image: string | null;
  demographics: unknown | null;
  setResult: (image: string, demographics: unknown) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  image: null,
  demographics: null,
  setResult: (image, demographics) => set({ image, demographics }),
}));
