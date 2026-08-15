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

/**
 * Typography tokens — IBM Plex Sans throughout the Go Solo app.
 */
export const typography = {
  fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, system-ui, sans-serif',
  fontSerif: '"IBM Plex Sans", "Helvetica Neue", Arial, system-ui, sans-serif',
  fontSans: '"IBM Plex Sans", "Helvetica Neue", Arial, system-ui, sans-serif',
  fontDisplay: '"IBM Plex Sans", "Helvetica Neue", Arial, system-ui, sans-serif',
  fontBody: '"IBM Plex Sans", "Helvetica Neue", Arial, system-ui, sans-serif',
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

/** Brand spacing scale — 4 · 8 · 12 · 20 · 32 */
export const spacing = {
  4: "4px",
  8: "8px",
  12: "12px",
  20: "20px",
  32: "32px",
} as const;

/** Extended steps mapped onto the brand scale + page rhythm */
export const spacingSteps = {
  0: "0",
  1: spacing[4],
  2: spacing[8],
  3: spacing[12],
  4: spacing[20],
  5: spacing[32],
  6: "40px",
  7: "48px",
  8: "64px",
  9: "80px",
  10: "96px",
  11: "112px",
  12: "128px",
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
  soft: "0 8px 24px rgba(58, 58, 60, 0.06)",
  lift: "0 14px 36px rgba(58, 58, 60, 0.1)",
  glow: "0 10px 28px rgba(231, 207, 169, 0.45)",
  card: "0 6px 20px rgba(58, 58, 60, 0.06), 0 1px 3px rgba(58, 58, 60, 0.04)",
} as const;

/** Interaction — Soft Summer Blue focus, Accent Rose highlight */
export const interaction = {
  focus: colors.softSummerBlue,
  focusRing: "0 0 0 3px rgba(143, 166, 184, 0.4)",
  highlight: colors.accentRose,
  highlightSoft: "rgba(217, 165, 160, 0.22)",
} as const;

export const buttons = {
  primary: {
    label: "Primary gold",
    background: colors.softGold,
    color: colors.deepCharcoal,
  },
  secondary: {
    label: "Secondary taupe",
    background: colors.warmTaupe,
    color: colors.deepCharcoal,
  },
  subtle: {
    label: "Subtle grey",
    background: colors.mistGrey,
    color: colors.deepCharcoal,
  },
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
  spacingSteps,
  radius,
  motion,
  shadows,
  interaction,
  buttons,
  layout,
} as const;

export type Theme = typeof theme;
export type BrandColor = keyof typeof colors;
export type ButtonBrandVariant = keyof typeof buttons;

export default theme;
