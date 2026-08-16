import { brand } from "../../../styles/brand-tokens";
import type { SkillBadge } from "../types";
import styles from "./SkillBadgeDisplay.module.css";

export function SkillBadgeDisplay({ badges }: { badges: SkillBadge[] }) {
  return (
    <div className={styles.grid} style={{ gap: brand.spacing[12] }}>
      {badges.map((badge) => (
        <article
          key={badge.id}
          className={`${styles.badge}${badge.earned ? ` ${styles.earned}` : ""}`}
          style={{
            gap: brand.spacing[8],
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            boxShadow: brand.shadows.soft,
          }}
        >
          <span className={badge.earned ? styles.status : styles.locked}>
            {badge.earned ? "Earned" : "In progress"}
            {typeof badge.count === "number" ? ` · ${badge.count}` : ""}
          </span>
          <h3 style={{ fontFamily: brand.typography.heading }}>{badge.label}</h3>
          <p style={{ fontFamily: brand.typography.body }}>{badge.description}</p>
        </article>
      ))}
    </div>
  );
}
