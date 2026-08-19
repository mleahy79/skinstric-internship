import { beforeEach, describe, expect, it } from "vitest";
import { useAnalysisStore, type PhaseTwoResult } from "./analysis";

const mockResult: PhaseTwoResult = {
  success: true,
  message: "ok",
  data: {
    race: { asian: 80, white: 20 },
    age: { "20-29": 70, "30-39": 30 },
    gender: { female: 60, male: 40 },
  },
};

describe("useAnalysisStore", () => {
  beforeEach(() => {
    useAnalysisStore.setState({
      image: null,
      demographics: null,
      activeLabels: {},
      edits: {},
      confirmed: false,
    });
  });

  it("setResult stores the image and demographics, resetting overrides", () => {
    useAnalysisStore.getState().selectLabel("race", "asian");
    useAnalysisStore.getState().confirm();

    useAnalysisStore.getState().setResult("data:image/png;base64,abc", mockResult);

    const state = useAnalysisStore.getState();
    expect(state.image).toBe("data:image/png;base64,abc");
    expect(state.demographics).toEqual(mockResult);
    expect(state.activeLabels).toEqual({});
    expect(state.confirmed).toBe(false);
  });

  it("selectLabel sets the active label per category without touching others", () => {
    useAnalysisStore.getState().selectLabel("race", "white");
    useAnalysisStore.getState().selectLabel("gender", "female");

    expect(useAnalysisStore.getState().activeLabels).toEqual({
      race: "white",
      gender: "female",
    });
  });

  it("setEditValue records an override for a specific category/label", () => {
    useAnalysisStore.getState().setEditValue("age", "20-29", 55);

    expect(useAnalysisStore.getState().edits).toEqual({
      age: { "20-29": 55 },
    });
  });

  it("confirm flips confirmed to true", () => {
    expect(useAnalysisStore.getState().confirmed).toBe(false);
    useAnalysisStore.getState().confirm();
    expect(useAnalysisStore.getState().confirmed).toBe(true);
  });

  it("resetOverrides clears labels, edits, and confirmation but keeps the result", () => {
    useAnalysisStore.getState().setResult("img", mockResult);
    useAnalysisStore.getState().selectLabel("race", "asian");
    useAnalysisStore.getState().setEditValue("race", "asian", 90);
    useAnalysisStore.getState().confirm();

    useAnalysisStore.getState().resetOverrides();

    const state = useAnalysisStore.getState();
    expect(state.activeLabels).toEqual({});
    expect(state.edits).toEqual({});
    expect(state.confirmed).toBe(false);
    expect(state.demographics).toEqual(mockResult);
  });
});
