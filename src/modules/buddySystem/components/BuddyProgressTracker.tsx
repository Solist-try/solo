import { brand } from "../../../styles/brand-tokens";
import type { BuddyMilestone } from "../types";
import styles from "./BuddyProgressTracker.module.css";

export function BuddyProgressTracker({
  milestones,
  buddyName,
  onToggle,
}: {
  milestones: BuddyMilestone[];
  buddyName?: string;
  onToggle: (id: string) => void;
}) {
  const done = milestones.filter((item) => item.done).length;
  const total = milestones.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section
      className={styles.tracker}
      aria-label="Shared buddy milestones"
      style={{
        gap: brand.spacing[20],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
      }}
    >
      <header className={styles.header}>
        <h3 style={{ fontFamily: brand.typography.heading }}>
          Shared milestones
        </h3>
        <p style={{ fontFamily: brand.typography.body }}>
          {buddyName
            ? `Gentle progress with ${buddyName} — mark what feels true.`
            : "Connect with a buddy to track shared milestones."}{" "}
          {total > 0 ? `${done} of ${total} complete.` : null}
        </p>
      </header>

      <div
        className={styles.bar}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label="Milestone progress"
      >
        <span style={{ width: `${percent}%` }} />
      </div>

      {milestones.length === 0 ? (
        <p className={styles.empty}>No milestones yet.</p>
      ) : (
        <ul className={styles.list}>
          {milestones.map((milestone) => (
            <li key={milestone.id} className={styles.item}>
              <label>
                <input
                  type="checkbox"
                  checked={milestone.done}
                  onChange={() => onToggle(milestone.id)}
                />
                <span>{milestone.label}</span>
              </label>
              {milestone.shared ? (
                <span className={styles.shared}>Shared</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
