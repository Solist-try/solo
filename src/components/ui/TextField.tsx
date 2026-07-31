import type { InputHTMLAttributes } from "react";
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
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className={`${styles.field} ${className}`.trim()} htmlFor={fieldId}>
      <span className={styles.label}>{label}</span>
      <input id={fieldId} className={styles.input} {...props} />
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </label>
  );
}
