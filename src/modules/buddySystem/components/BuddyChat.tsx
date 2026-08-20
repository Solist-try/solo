import { brand } from "../../../styles/brand-tokens";
import type { ActiveBuddyConnection } from "../types";
import styles from "./BuddyChat.module.css";

/** Placeholder chat entry — full messaging can plug in later */
export function BuddyChat({
  match,
  onClose,
}: {
  match: ActiveBuddyConnection | null;
  onClose?: () => void;
}) {
  if (!match) {
    return (
      <div
        className={styles.empty}
        style={{
          borderRadius: brand.radius.lg,
          background: brand.colors.mist,
          boxShadow: brand.shadows.soft,
          padding: brand.spacing[32],
        }}
      >
        <strong style={{ fontFamily: brand.typography.heading }}>
          Buddy chat
        </strong>
        <p style={{ fontFamily: brand.typography.body }}>
          Accept a match to open a calm chat placeholder.
        </p>
      </div>
    );
  }

  return (
    <div
      className={styles.wrap}
      style={{
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
        padding: brand.spacing[20],
        display: "grid",
        gap: brand.spacing[12],
      }}
    >
      <div>
        <strong style={{ fontFamily: brand.typography.heading }}>
          Chat with {match.buddy.name}
        </strong>
        <p
          style={{
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
            margin: `${brand.spacing[8]} 0 0`,
          }}
        >
          Placeholder thread — messaging arrives next. Conversation id:{" "}
          {match.conversationId}
        </p>
      </div>
      <div
        style={{
          borderRadius: brand.radius.md,
          background: "rgba(232, 220, 208, 0.55)",
          padding: brand.spacing[20],
          color: brand.colors.charcoalSoft,
          fontFamily: brand.typography.body,
          lineHeight: 1.55,
        }}
      >
        Say hello when you’re ready. Keep it light, non-romantic, and paced for
        both of you.
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          style={{
            width: "fit-content",
            minHeight: "2.4rem",
            padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
            borderRadius: brand.radius.md,
            border: "1px solid rgba(199, 184, 174, 0.5)",
            background: brand.colors.white,
            color: brand.colors.charcoal,
            fontFamily: brand.typography.body,
            cursor: "pointer",
          }}
        >
          Close chat
        </button>
      ) : null}
    </div>
  );
}
