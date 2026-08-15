import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth";
import styles from "./GuidelinesReminder.module.css";

const DISMISS_KEY = "go-solo.guidelines.dismissed";

export function GuidelinesReminder({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    const key = `${DISMISS_KEY}.${user.id}`;
    setVisible(localStorage.getItem(key) !== "1");
  }, [user]);

  if (!visible) return null;

  return (
    <aside
      className={`${styles.banner} ${compact ? styles.compact : ""}`}
      role="note"
    >
      <div>
        <p className={styles.kicker}>Community guidelines</p>
        <p>
          Keep Go Solo supportive and non-romantic. Report or block anytime —
          kindness is the default here.
        </p>
      </div>
      <div className={styles.actions}>
        <Link to="/safety" className={styles.link}>
          Read guidelines
        </Link>
        <button
          type="button"
          className={styles.dismiss}
          onClick={() => {
            if (user) {
              localStorage.setItem(`${DISMISS_KEY}.${user.id}`, "1");
            }
            setVisible(false);
          }}
        >
          Got it
        </button>
      </div>
    </aside>
  );
}
