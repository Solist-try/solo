import { Avatar, Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import type { BuddyProfile } from "../types";
import styles from "./BuddyMatchCard.module.css";

export function BuddyMatchCard({
  buddy,
  onConnect,
  onMessage,
  ctaLabel = "Request buddy",
}: {
  buddy: BuddyProfile;
  onConnect: (buddy: BuddyProfile) => void;
  onMessage?: (buddy: BuddyProfile) => void;
  ctaLabel?: string;
}) {
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
      <div className={styles.top}>
        <div className={styles.identity}>
          <Avatar name={buddy.name} />
          <div className={styles.copy}>
            <h3 style={{ fontFamily: brand.typography.heading }}>
              {buddy.name}
            </h3>
            <p style={{ fontFamily: brand.typography.body }}>{buddy.bio}</p>
          </div>
        </div>
        <span className={styles.score}>{buddy.matchScore}% match</span>
      </div>

      <p className={styles.mode}>
        {buddy.location} · {buddy.availability}
      </p>

      <div className={styles.meta}>
        {buddy.interests.slice(0, 4).map((interest) => (
          <span key={interest} className={styles.chip}>
            {interest}
          </span>
        ))}
      </div>

      <div className={styles.meta}>
        {buddy.preferredActivities.map((activity) => (
          <span key={activity} className={styles.chip}>
            {activity}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <Button type="button" onClick={() => onConnect(buddy)}>
          {ctaLabel}
        </Button>
        {onMessage ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => onMessage(buddy)}
          >
            Open chat
          </Button>
        ) : null}
      </div>
    </article>
  );
}

/** Soft beige profile card alias for Find a Buddy */
export const BuddyProfileCard = BuddyMatchCard;
