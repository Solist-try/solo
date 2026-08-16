import { Link } from "react-router-dom";
import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import styles from "./BuddySafetyNotice.module.css";

export function BuddySafetyNotice({
  onOptOut,
  optedIn,
}: {
  onOptOut: () => void;
  optedIn: boolean;
}) {
  return (
    <aside
      className={styles.notice}
      aria-label="Buddy safety notice"
      style={{
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        boxShadow: brand.shadows.soft,
      }}
    >
      <h3 style={{ fontFamily: brand.typography.heading }}>
        Safety & autonomy
      </h3>
      <p>
        Buddy System is for supportive, non-romantic connection. You can leave
        anytime — your space stays yours.
      </p>
      <ul>
        <li>Keep chats practical and kind; no flirting or pressure.</li>
        <li>Report or block from chat if something feels off.</li>
        <li>Opt out with one click — no explanation required.</li>
      </ul>
      <div className={styles.actions}>
        {optedIn ? (
          <Button type="button" variant="secondary" onClick={onOptOut}>
            Opt out of Buddy System
          </Button>
        ) : (
          <p>You’ve opted out. Update preferences anytime to return.</p>
        )}
        <Link
          to="/safety"
          style={{
            color: brand.colors.sageDeep,
            fontFamily: brand.typography.body,
            fontWeight: 600,
          }}
        >
          Open Safety center →
        </Link>
      </div>
    </aside>
  );
}
