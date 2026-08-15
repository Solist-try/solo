import type { ButtonHTMLAttributes } from "react";
import { colors, radius } from "../../styles/brand-tokens";
import styles from "./Toggle.module.css";

export type ToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

export function Toggle({
  checked,
  label,
  onChange,
  className = "",
  style,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`${styles.toggle} ${checked ? styles.on : ""} ${className}`.trim()}
      onClick={() => onChange(!checked)}
      style={{
        borderRadius: radius.pill,
        background: checked ? colors.sage : colors.mistDeep,
        ...style,
      }}
      {...props}
    >
      <span className={styles.thumb} />
    </button>
  );
}
