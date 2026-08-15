import type { InputHTMLAttributes } from "react";
import { colors, radius, typography } from "../../styles/brand-tokens";
import styles from "./TextField.module.css";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function TextField({
  label,
  hint,
  id,
  className = "",
  style,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className={`${styles.field} ${className}`.trim()} htmlFor={fieldId}>
      <span
        className={styles.label}
        style={{ fontFamily: typography.fontBody, color: colors.charcoal }}
      >
        {label}
      </span>
      <input
        id={fieldId}
        className={styles.input}
        style={{ borderRadius: radius.md, ...style }}
        {...props}
      />
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </label>
  );
}
