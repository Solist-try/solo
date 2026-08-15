import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { brand } from "../styles/brand-tokens";
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

const brandVariants = {
  primary: brand.buttons.primary,
  secondary: brand.buttons.secondary,
  subtle: brand.buttons.subtle,
} as const;

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
  const brandVariant =
    variant === "primary" || variant === "secondary" || variant === "subtle"
      ? brandVariants[variant]
      : null;

  const sizePadding: Record<ButtonSize, string> = {
    sm: `${brand.spacing[8]} ${brand.spacing[12]}`,
    md: `${brand.spacing[12]} ${brand.spacing[20]}`,
    lg: `${brand.spacing[12]} ${brand.spacing[32]}`,
  };

  const buttonStyle = {
    borderRadius: brand.radius.md,
    boxShadow: brand.shadows.xs,
    fontFamily: brand.typography.body,
    padding: sizePadding[size],
    ["--brand-btn-bg" as string]: brandVariant?.background,
    ["--brand-btn-fg" as string]: brandVariant?.color,
    ["--brand-btn-hover" as string]:
      brandVariant?.hover ?? brand.colors.button.hoverTint,
    ["--btn-radius" as string]: brand.radius.md,
    ["--btn-shadow" as string]: brand.shadows.xs,
    ["--btn-shadow-hover" as string]: brand.shadows.soft,
    ["--btn-space-8" as string]: brand.spacing[8],
    ["--btn-space-12" as string]: brand.spacing[12],
    ["--btn-space-20" as string]: brand.spacing[20],
    ["--btn-space-32" as string]: brand.spacing[32],
    ...style,
  } as CSSProperties;

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
      style={buttonStyle}
      data-brand-button={brandVariant ? variant : undefined}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
