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
    >
      {src ? <img src={src} alt="" /> : <span>{initials(name)}</span>}
    </div>
  );
}
