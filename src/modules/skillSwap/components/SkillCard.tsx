import { brand } from "../../../styles/brand-tokens";
import { SKILL_CATEGORIES } from "../data";
import type { SkillCategory } from "../types";
import styles from "./SkillCard.module.css";

export function SkillCard({
  category,
  title,
  summary,
  kind,
  ownerName,
  availability,
  onSelect,
}: {
  category: SkillCategory;
  title: string;
  summary: string;
  kind?: "offer" | "request" | "category";
  ownerName?: string;
  availability?: string;
  onSelect?: () => void;
}) {
  const meta = SKILL_CATEGORIES.find((item) => item.id === category);

  return (
    <article
      className={styles.card}
      style={{
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
        cursor: onSelect ? "pointer" : undefined,
      }}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <span
        className={styles.icon}
        aria-hidden="true"
        style={{
          fontFamily: brand.typography.body,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
          color: brand.colors.charcoal,
        }}
      >
        {meta?.icon ?? "Skill"}
      </span>
      <h3 style={{ fontFamily: brand.typography.heading }}>{title}</h3>
      <p style={{ fontFamily: brand.typography.body }}>{summary}</p>
      <div className={styles.meta}>
        <span className={styles.tag}>{category}</span>
        {kind && kind !== "category" ? (
          <span className={styles.tag}>{kind}</span>
        ) : null}
        {ownerName ? <span className={styles.tag}>{ownerName}</span> : null}
        {availability ? <span className={styles.tag}>{availability}</span> : null}
      </div>
    </article>
  );
}
