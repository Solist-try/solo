import { brand } from "../../../styles/brand-tokens";
import { SKILL_CATEGORIES } from "../data";
import type { SkillName, SkillUrgency } from "../types";
import styles from "./SkillCard.module.css";

export function SkillCard({
  skillName,
  description,
  kind,
  userName,
  availability,
  location,
  urgency,
  onSelect,
  actionLabel,
  onAction,
}: {
  skillName: SkillName;
  description: string;
  kind?: "offer" | "request" | "category";
  userName?: string;
  availability?: string;
  location?: string;
  urgency?: SkillUrgency;
  onSelect?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const meta = SKILL_CATEGORIES.find((item) => item.id === skillName);

  return (
    <article
      className={`${styles.card} ${styles.summer}`}
      style={{
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
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
      <h3 style={{ fontFamily: brand.typography.heading }}>{skillName}</h3>
      <p style={{ fontFamily: brand.typography.body }}>{description}</p>
      <div className={styles.meta}>
        {kind && kind !== "category" ? (
          <span className={styles.tag}>{kind}</span>
        ) : null}
        {userName ? <span className={styles.tag}>{userName}</span> : null}
        {location ? <span className={styles.tag}>{location}</span> : null}
        {availability ? <span className={styles.tag}>{availability}</span> : null}
        {urgency ? <span className={styles.tag}>urgency · {urgency}</span> : null}
      </div>
      {onAction && actionLabel ? (
        <button
          type="button"
          className={styles.action}
          onClick={(event) => {
            event.stopPropagation();
            onAction();
          }}
          style={{
            borderRadius: brand.radius.md,
            background: brand.colors.softSummerBlue,
            color: brand.colors.charcoal,
            fontFamily: brand.typography.body,
          }}
        >
          {actionLabel}
        </button>
      ) : null}
    </article>
  );
}
