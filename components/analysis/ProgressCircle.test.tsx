import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressCircle } from "./ProgressCircle";

describe("ProgressCircle", () => {
  it("renders the percentage rounded to two decimal places", () => {
    render(<ProgressCircle percentage={73.4} />);
    expect(screen.getByText("73.40")).toBeInTheDocument();
  });

  it("draws a full ring for 100%", () => {
    const { container } = render(
      <ProgressCircle percentage={100} size={200} strokeWidth={10} />,
    );
    const radius = (200 - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const filledCircle = container.querySelectorAll("circle")[1];
    const [filled] = filledCircle
      .getAttribute("stroke-dasharray")!
      .split(" ")
      .map(Number);
    expect(filled).toBeCloseTo(circumference, 5);
  });

  it("draws no fill for 0%", () => {
    const { container } = render(<ProgressCircle percentage={0} size={200} strokeWidth={10} />);
    const filledCircle = container.querySelectorAll("circle")[1];
    const [filled] = filledCircle
      .getAttribute("stroke-dasharray")!
      .split(" ")
      .map(Number);
    expect(filled).toBe(0);
  });
});
