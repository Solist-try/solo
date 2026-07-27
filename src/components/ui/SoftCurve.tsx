import type { HTMLAttributes } from "react";
import styles from "./SoftCurve.module.css";

export type SoftCurveProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "wave" | "blob" | "arc" | "pill";
  tone?: "cream" | "peach" | "gold" | "taupe";
  flip?: boolean;
};

/**
 * Soft curved motif used as section dividers and decorative anchors.
 */
export function SoftCurve({
  variant = "wave",
  tone = "cream",
  flip = false,
  className = "",
  ...props
}: SoftCurveProps) {
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
      aria-hidden="true"
      {...props}
    />
  );
}
