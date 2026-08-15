import { colors, radius } from "../../styles/brand-tokens";
import styles from "./Avatar.module.css";

export type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  src?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ name, size = "md", src }: AvatarProps) {
  return (
    <div
      className={`${styles.avatar} ${styles[size]}`}
      aria-hidden={src ? undefined : true}
      title={name}
      style={{
        borderRadius: radius.md,
        background: colors.sageSoft,
        color: colors.charcoal,
      }}
    >
      {src ? <img src={src} alt="" /> : <span>{initials(name)}</span>}
    </div>
  );
}
