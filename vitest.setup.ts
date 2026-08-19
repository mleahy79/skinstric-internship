import "@testing-library/jest-dom/vitest";

if (!("fonts" in document)) {
  Object.defineProperty(document, "fonts", {
    value: { ready: Promise.resolve() },
  });
}
