import { createContext, useContext } from "react";

export const A11yContext = createContext(null);

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used within <A11yProvider>");
  return ctx;
}

export const STORAGE_KEY = "a11y_prefs_v1";
export const TEXT_STEPS = ["", "a11y--text-lg", "a11y--text-xl", "a11y--text-2xl"];

export const defaultState = {
  textStep: 0,
  highContrast: false,
  underlineLinks: false,
  grayscale: false,
  hideImages: false,
  dyslexic: false,
};
