import { create } from "zustand";

export type ConfidenceScores = Record<string, number>;

export interface DemographicsData {
  race: ConfidenceScores;
  age: ConfidenceScores;
  gender: ConfidenceScores;
}

export interface PhaseTwoResult {
  success: boolean;
  message: string;
  data: DemographicsData;
}

/** Which label is currently selected/displayed, per category. */
export type DemographicsSelection = Partial<Record<keyof DemographicsData, string>>;

/** User-edited confidence values (0-100), keyed by category then label. */
export type DemographicsEdits = Partial<
  Record<keyof DemographicsData, Record<string, number>>
>;

interface AnalysisState {
  image: string | null;
  demographics: PhaseTwoResult | null;
  activeLabels: DemographicsSelection;
  edits: DemographicsEdits;
  confirmed: boolean;
  setResult: (image: string, demographics: PhaseTwoResult) => void;
  selectLabel: (category: keyof DemographicsData, label: string) => void;
  setEditValue: (
    category: keyof DemographicsData,
    label: string,
    value: number,
  ) => void;
  confirm: () => void;
  resetOverrides: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  image: null,
  demographics: null,
  activeLabels: {},
  edits: {},
  confirmed: false,
  setResult: (image, demographics) =>
    set({ image, demographics, activeLabels: {}, edits: {}, confirmed: false }),
  selectLabel: (category, label) =>
    set((state) => ({
      activeLabels: { ...state.activeLabels, [category]: label },
    })),
  setEditValue: (category, label, value) =>
    set((state) => ({
      edits: {
        ...state.edits,
        [category]: { ...state.edits[category], [label]: value },
      },
    })),
  confirm: () => set({ confirmed: true }),
  resetOverrides: () => set({ activeLabels: {}, edits: {}, confirmed: false }),
}));
