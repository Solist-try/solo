import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import type { BuddyProfile } from "../types";
import styles from "./MatchConfirmationModal.module.css";

export function MatchConfirmationModal({
  buddy,
  open,
  onClose,
  onOpenChat,
}: {
  buddy: BuddyProfile | null;
  open: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}) {
  if (!open || !buddy) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="buddy-match-title"
        onClick={(event) => event.stopPropagation()}
        style={{
          borderRadius: brand.radius.lg,
          background: brand.colors.mist,
          boxShadow: brand.shadows.card,
          padding: brand.spacing[32],
          gap: brand.spacing[20],
        }}
      >
        <p className={styles.kicker} style={{ color: brand.colors.clay }}>
          You’re matched
        </p>
        <h2
          id="buddy-match-title"
          style={{
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
            margin: 0,
          }}
        >
          {buddy.name} is now your buddy
        </h2>
        <p
          style={{
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
            margin: 0,
            lineHeight: brand.typography.leading.relaxed,
          }}
        >
          Shared interests around {buddy.interests.slice(0, 2).join(" and ")}.
          Start with a calm hello — chat is optional and always yours to pace.
        </p>
        <div className={styles.actions} style={{ gap: brand.spacing[12] }}>
          <Button type="button" onClick={onOpenChat}>
            Open chat
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Keep browsing
          </Button>
        </div>
      </div>
    </div>
  );
}
