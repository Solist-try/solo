import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttons as brandButtons, radius } from "../../styles/brand-tokens";
import styles from "./Button.module.css";

/** Brand button variants + retained utility variants */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "subtle"
  | "soft"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  style,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const brand =
    variant === "primary" || variant === "secondary" || variant === "subtle"
      ? brandButtons[variant]
      : null;

  return (
    <button
      type={type}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        borderRadius: radius.md,
        ["--brand-btn-bg" as string]: brand?.background,
        ["--brand-btn-fg" as string]: brand?.color,
        ["--brand-btn-hover" as string]: brand?.hover,
        ...style,
      }}
      data-brand-button={brand ? variant : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
