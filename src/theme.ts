/**
 * Go Solo design theme — re-exports canonical brand tokens.
 * Prefer importing from `src/styles/brand-tokens` directly.
 */

export {
  brandTokens,
  colors,
  heroGradient,
  typography,
  spacing,
  spacingSteps,
  radius,
  shadows,
  motion,
  interaction,
  buttons,
  layout,
} from "./styles/brand-tokens";

export type {
  BrandTokens,
  BrandColor,
  ButtonBrandVariant,
} from "./styles/brand-tokens";

import brandTokens from "./styles/brand-tokens";

/** @deprecated Prefer `brandTokens` from `src/styles/brand-tokens` */
export const theme = brandTokens;

export default brandTokens;
