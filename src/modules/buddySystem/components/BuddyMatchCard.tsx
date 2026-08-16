import { Avatar, Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import type { BuddyProfile } from "../types";
import styles from "./BuddyMatchCard.module.css";

export function BuddyMatchCard({
  buddy,
  onConnect,
  onMessage,
}: {
  buddy: BuddyProfile;
  onConnect: (buddy: BuddyProfile) => void;
  onMessage: (buddy: BuddyProfile) => void;
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
        <span className={styles.score}>{buddy.compatibility}% match</span>
      </div>

      <div className={styles.meta}>
        {(buddy.sharedGoals.length ? buddy.sharedGoals : buddy.goals.slice(0, 3)).map(
          (goal) => (
            <span key={goal} className={styles.chip}>
              {goal}
            </span>
          ),
        )}
      </div>

      <p className={styles.mode}>
        Prefers{" "}
        {buddy.connectionMode === "light"
          ? "light connection (occasional check-ins)"
          : "active buddy (shared progress)"}
      </p>

      <div className={styles.actions}>
        <Button type="button" onClick={() => onConnect(buddy)}>
          Connect
        </Button>
        <Button type="button" variant="secondary" onClick={() => onMessage(buddy)}>
          Message
        </Button>
      </div>
    </article>
  );
}
