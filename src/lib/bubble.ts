import type { CSSProperties } from "react";

export const bubbleColors = [
  "#c2410c", // saffron orange — बालकाण्ड
  "#9f1239", // deep rose/crimson — अयोध्याकाण्ड
  "#0f766e", // teal — अरण्यकाण्ड
  "#4338ca", // royal indigo — किष्किन्धाकाण्ड
  "#15803d", // emerald green — सुन्दरकाण्ड
  "#7e22ce", // royal purple — लंकाकाण्ड
  "#b45309", // deep amber-gold — उत्तरकाण्ड
];

export function bubbleStyle(color: string, active: boolean): CSSProperties {
  return {
    background: `linear-gradient(135deg, ${color}ea 0%, ${color}b8 55%, ${color}d8 100%)`,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: active
      ? "1px solid rgba(255,255,255,0.85)"
      : "1px solid rgba(255,255,255,0.4)",
    boxShadow: active
      ? "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -8px 14px rgba(0,0,0,0.15), 0 6px 18px rgba(0,0,0,0.28)"
      : "inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -8px 14px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.15)",
  };
}
