import type { CSSProperties, HTMLAttributes } from "react";
import { colors, radius, shadows } from "../../styles/brand-tokens";
import styles from "./SoftCurve.module.css";

export type SoftCurveTone =
  | "cream"
  | "peach"
  | "gold"
  | "taupe"
  | "blue"
  | "rose"
  | "sage"
  | "mist"
  | "clay";

export type SoftCurveProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "wave" | "blob" | "arc" | "pill";
  tone?: SoftCurveTone;
  flip?: boolean;
};

const toneFill: Record<SoftCurveTone, string> = {
  cream: colors.white,
  mist: colors.mist,
  sage: colors.sage,
  clay: colors.clay,
  peach: colors.sageSoft,
  gold: colors.mistSoft,
  taupe: colors.clay,
  blue: colors.blueSoft,
  rose: colors.roseSoft,
};

/**
 * Soft curved motif used as section dividers and decorative anchors.
 * Fills resolve from `brand-tokens.ts`.
 */
export function SoftCurve({
  variant = "wave",
  tone = "cream",
  flip = false,
  className = "",
  style,
  ...props
}: SoftCurveProps) {
  const toneStyle = {
    ...style,
    ["--soft-curve-fill" as string]: toneFill[tone],
    borderRadius: variant === "pill" ? radius.pill : undefined,
    boxShadow: variant === "blob" ? shadows.soft : undefined,
  } as CSSProperties;

  if (variant === "wave") {
    return (
      <div
        className={[
          styles.wave,
          styles[`tone-${tone}`],
          flip ? styles.flip : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={toneStyle}
        aria-hidden="true"
        {...props}
      >
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
          <path d="M0,56 C220,96 420,8 720,40 C980,68 1220,88 1440,28 L1440,96 L0,96 Z" />
        </svg>
      </div>
    );
  }

  if (variant === "arc") {
    return (
      <div
        className={[styles.arc, styles[`tone-${tone}`], className]
          .filter(Boolean)
          .join(" ")}
        style={toneStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }

  if (variant === "pill") {
    return (
      <div
        className={[styles.pill, styles[`tone-${tone}`], className]
          .filter(Boolean)
          .join(" ")}
        style={toneStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }

  return (
    <div
      className={[styles.blob, styles[`tone-${tone}`], className]
        .filter(Boolean)
        .join(" ")}
      style={toneStyle}
      aria-hidden="true"
      {...props}
    />
  );
}
