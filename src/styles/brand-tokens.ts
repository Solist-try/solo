/**
 * Go Solo brand tokens — canonical TypeScript source of truth.
 * CSS mirrors these values in `src/styles/theme.css`.
 */

const fontStack =
  '"IBM Plex Sans", "GoSoloSans", "Helvetica Neue", Arial, system-ui, sans-serif';

/** Core brand palette */
export const colors = {
  sage: "#B7C4B2",
  mist: "#E9E6E3",
  clay: "#C7B8AE",
  charcoal: "#3A3A3C",

  /** Extended / derived */
  white: "#FFFCFA",
  softGold: "#E7CFA9",
  warmTaupe: "#C7B8AE",
  clayBeige: "#C7B8AE",
  sageGreen: "#B7C4B2",
  mistGrey: "#E9E6E3",
  deepCharcoal: "#3A3A3C",
  softSummerBlue: "#8FA6B8",
  accentRose: "#D9A5A0",

  mistSoft: "#F4F1EE",
  mistDeep: "#DDD8D3",
  taupeMuted: "#A89990",
  charcoalSoft: "#5C5C5E",
  charcoalMuted: "#6E6E70",
  sageDeep: "#65795D",
  sageSoft: "#D5DDD1",

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

/** Hero radial gradient — sage → mist → clay */
export const heroGradient = [
  `radial-gradient(ellipse 95% 85% at 8% 6%, ${colors.sage} 0%, rgba(183, 196, 178, 0.55) 28%, transparent 62%)`,
  `radial-gradient(ellipse 90% 80% at 92% 96%, ${colors.clay} 0%, rgba(199, 184, 174, 0.5) 34%, transparent 68%)`,
  `linear-gradient(155deg, ${colors.sage} 0%, ${colors.mist} 46%, ${colors.clay} 100%)`,
].join(", ");

/** Soft brand spacing — 4 · 8 · 12 · 20 · 32 */
export const spacing = {
  4: "4px",
  8: "8px",
  12: "12px",
  20: "20px",
  32: "32px",
} as const;

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

/** Soft rounded corners */
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

/** Soft shadows */
export const shadows = {
  xs: "0 2px 8px rgba(58, 58, 60, 0.05)",
  soft: "0 8px 24px rgba(58, 58, 60, 0.06)",
  lift: "0 14px 36px rgba(58, 58, 60, 0.1)",
  glow: "0 10px 28px rgba(183, 196, 178, 0.35)",
  card: "0 6px 20px rgba(58, 58, 60, 0.06), 0 1px 3px rgba(58, 58, 60, 0.04)",
} as const;

/** Heading + body typography */
export const typography = {
  fontFamily: fontStack,
  fontSerif: fontStack,
  fontSans: fontStack,
  fontDisplay: fontStack,
  fontBody: fontStack,
  fontHeading: fontStack,
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

export const motion = {
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeSoft: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeSpring: "cubic-bezier(0.34, 1.3, 0.64, 1)",
  durationFast: "160ms",
  durationMed: "320ms",
  durationSlow: "700ms",
} as const;

export const interaction = {
  focus: colors.softSummerBlue,
  focusRing: "0 0 0 3px rgba(143, 166, 184, 0.4)",
  highlight: colors.accentRose,
  highlightSoft: "rgba(217, 165, 160, 0.22)",
} as const;

export const buttons = {
  primary: {
    label: "Primary sage",
    background: colors.sage,
    color: colors.white,
    hover: colors.clay,
  },
  secondary: {
    label: "Secondary mist",
    background: colors.mist,
    color: colors.charcoal,
    hover: colors.clay,
  },
  subtle: {
    label: "Subtle cream",
    background: colors.white,
    color: colors.charcoal,
    hover: colors.clay,
  },
} as const;

export const layout = {
  container: "72rem",
  containerNarrow: "40rem",
  navHeight: "4.25rem",
  bottomNavHeight: "5.15rem",
} as const;

/** Nested brand API used by pages/components (`brand.gradients.hero`, etc.) */
export const brand = {
  colors,
  gradients: {
    hero: heroGradient,
  },
  spacing,
  spacingSteps,
  typography: {
    heading: fontStack,
    body: fontStack,
    ...typography,
  },
  radius,
  shadows,
  motion,
  interaction,
  buttons,
  layout,
} as const;

export const brandTokens = {
  ...brand,
  heroGradient,
  typography,
} as const;

export type Brand = typeof brand;
export type BrandTokens = typeof brandTokens;
export type BrandColor = keyof typeof colors;
export type ButtonBrandVariant = keyof typeof buttons;

export default brand;
