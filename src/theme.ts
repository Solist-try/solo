/**
 * Go Solo design theme — re-exports canonical brand tokens.
 * Prefer importing from `src/styles/brand-tokens` directly.
 */

export {
  brand,
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
  Brand,
  BrandTokens,
  BrandColor,
  ButtonBrandVariant,
} from "./styles/brand-tokens";

import brand from "./styles/brand-tokens";

/** @deprecated Prefer `brand` from `src/styles/brand-tokens` */
export const theme = brand;

export default brand;
