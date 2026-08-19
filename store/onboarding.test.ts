import { beforeEach, describe, expect, it } from "vitest";
import { useOnboardingStore } from "./onboarding";

describe("useOnboardingStore", () => {
  beforeEach(() => {
    useOnboardingStore.setState({ name: "", location: "" });
  });

  it("starts with empty name and location", () => {
    const { name, location } = useOnboardingStore.getState();
    expect(name).toBe("");
    expect(location).toBe("");
  });

  it("updates name independently of location", () => {
    useOnboardingStore.getState().setName("Ada");
    const { name, location } = useOnboardingStore.getState();
    expect(name).toBe("Ada");
    expect(location).toBe("");
  });

  it("updates location independently of name", () => {
    useOnboardingStore.getState().setLocation("London");
    const { name, location } = useOnboardingStore.getState();
    expect(name).toBe("");
    expect(location).toBe("London");
  });
});
