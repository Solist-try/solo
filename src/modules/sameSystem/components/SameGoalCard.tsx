import { brand } from "../../../styles/brand-tokens";
import type { SameGoal, SamePartner } from "../types";
import styles from "./SameGoalCard.module.css";

export function SameGoalCard({ goal }: { goal: SameGoal }) {
  return (
    <article
      className={styles.card}
      style={{
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        boxShadow: brand.shadows.soft,
      }}
    >
      <h3 style={{ fontFamily: brand.typography.heading }}>{goal.title}</h3>
      <p style={{ fontFamily: brand.typography.body }}>{goal.description}</p>
      <div className={styles.meta}>
        <span>{goal.category}</span>
        <span>{goal.frequency}</span>
      </div>
    </article>
  );
}

export function SamePartnerCard({ partner }: { partner: SamePartner }) {
  return (
    <article
      className={styles.partner}
      style={{
        gap: brand.spacing[8],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        boxShadow: brand.shadows.soft,
      }}
    >
      <h3 style={{ fontFamily: brand.typography.heading }}>
        {partner.partnerName ?? partner.partnerId}
      </h3>
      <p>
        Partner since {new Date(partner.createdAt).toLocaleDateString()}
        {partner.sharedCategory ? ` · ${partner.sharedCategory}` : ""}
      </p>
    </article>
  );
}
