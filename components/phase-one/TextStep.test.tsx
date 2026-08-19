import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TextStep from "./TextStep";

function setup(value = "") {
  const onChange = vi.fn();
  const onSubmit = vi.fn();
  const onBack = vi.fn();
  render(
    <TextStep
      value={value}
      onChange={onChange}
      placeholder="Introduce Yourself"
      onBack={onBack}
      onSubmit={onSubmit}
    />,
  );
  return { onChange, onSubmit, onBack };
}

describe("TextStep", () => {
  it("hides the proceed button when the input is empty", () => {
    setup("");
    expect(screen.queryByText("PROCEED")).not.toBeInTheDocument();
  });

  it("hides the proceed button for text containing digits", () => {
    setup("Ada99");
    expect(screen.queryByText("PROCEED")).not.toBeInTheDocument();
  });

  it("shows the proceed button for valid letters-only text", () => {
    setup("Ada Lovelace");
    expect(screen.getByText("PROCEED")).toBeInTheDocument();
  });

  it("allows hyphens and apostrophes in valid text", () => {
    setup("Mary-Jane O'Brien");
    expect(screen.getByText("PROCEED")).toBeInTheDocument();
  });

  it("calls onSubmit when Enter is pressed with valid text", async () => {
    const user = userEvent.setup();
    const { onSubmit } = setup("Ada");
    const input = screen.getByPlaceholderText("Introduce Yourself");
    await user.type(input, "{Enter}");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not call onSubmit when Enter is pressed with invalid text", async () => {
    const user = userEvent.setup();
    const { onSubmit } = setup("Ada99");
    const input = screen.getByPlaceholderText("Introduce Yourself");
    await user.type(input, "{Enter}");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onBack when the back button is clicked", async () => {
    const user = userEvent.setup();
    const { onBack } = setup("");
    await user.click(screen.getByText("BACK"));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
