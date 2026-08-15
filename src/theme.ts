/**
 * Go Solo design theme — warm, calm brand tokens.
 * CSS mirrors these values in `src/styles/tokens.css`.
 */

export const colors = {
  softGold: "#E7CFA9",
  warmTaupe: "#C7B8AE",
  mistGrey: "#E9E6E3",
  deepCharcoal: "#3A3A3C",
  softSummerBlue: "#8FA6B8",
  accentRose: "#D9A5A0",

  /** Derived neutrals from mist → charcoal */
  white: "#FFFCFA",
  mistSoft: "#F4F1EE",
  mistDeep: "#DDD8D3",
  taupeMuted: "#A89990",
  charcoalSoft: "#5C5C5E",
  charcoalMuted: "#6E6E70",

  roseSoft: "#F3E4E1",
  roseDeep: "#C48984",
  goldSoft: "#F4E9D8",
  goldDeep: "#C9B08A",
  blueSoft: "#E4EBF0",
  blueDeep: "#6F8799",

  danger: "#B54A3A",
  dangerSoft: "#F3E2DF",
  success: "#5A7A62",
  successSoft: "#E3EDE6",
} as const;

export const typography = {
  fontDisplay: '"Source Serif 4", "Iowan Old Style", "Palatino Linotype", Georgia, serif',
  fontBody: '"Nunito", "Segoe UI", system-ui, sans-serif',
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    md: "1.0625rem",
    lg: "1.125rem",
    xl: "1.35rem",
    "2xl": "clamp(1.5rem, 2.2vw, 1.85rem)",
    "3xl": "clamp(1.9rem, 3.4vw, 2.5rem)",
    "4xl": "clamp(2.35rem, 5vw, 3.25rem)",
    hero: "clamp(2.75rem, 7vw, 5rem)",
  },
  leading: {
    none: 1,
    tight: 1.12,
    snug: 1.3,
    normal: 1.55,
    relaxed: 1.7,
  },
  tracking: {
    display: "-0.02em",
    tight: "-0.012em",
    normal: "0",
    wide: "0.04em",
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

/** Spacing system — 4px base */
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "2rem",
  8: "2.5rem",
  9: "3rem",
  10: "4rem",
  11: "5rem",
  12: "6.5rem",
} as const;

/** Curved corners — primary interactive radius lives in 10–14px */
export const radius = {
  xs: "8px",
  sm: "10px",
  md: "12px",
  lg: "14px",
  xl: "14px",
  "2xl": "16px",
  pill: "999px",
  blob: "42% 58% 55% 45% / 48% 42% 58% 52%",
} as const;

export const motion = {
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeSoft: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeSpring: "cubic-bezier(0.34, 1.3, 0.64, 1)",
  durationFast: "160ms",
  durationMed: "320ms",
  durationSlow: "700ms",
} as const;

export const shadows = {
  xs: "0 2px 8px rgba(58, 58, 60, 0.05)",
  soft: "0 10px 28px rgba(58, 58, 60, 0.07)",
  lift: "0 18px 44px rgba(58, 58, 60, 0.1)",
  glow: "0 10px 30px rgba(217, 165, 160, 0.28)",
} as const;

export const layout = {
  container: "72rem",
  containerNarrow: "40rem",
  navHeight: "4.25rem",
  bottomNavHeight: "5.15rem",
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  motion,
  shadows,
  layout,
} as const;

export type Theme = typeof theme;
export type BrandColor = keyof typeof colors;

export default theme;
