import { Link } from "react-router-dom";
import {
  COMMUNITY_GUIDELINES,
  GuidelinesReminder,
  useSafety,
} from "../../modules/safety";
import { Button, Card, CardBody, CardHeader } from "../../components/ui";
import styles from "./Safety.module.css";

export function Safety() {
  const { blockedUsers, reports, unblockUser } = useSafety();

  return (
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Safety center</h1>
        <p>
          Community guidelines, blocked members, and recent reports — tools to
          keep Go Solo supportive and non-romantic.
        </p>
      </header>

      <GuidelinesReminder />

      <section className={styles.section}>
        <h2>Community guidelines</h2>
        <div className={styles.guideGrid}>
          {COMMUNITY_GUIDELINES.map((item) => (
            <Card key={item.title} variant="soft" padding="md">
              <CardHeader title={item.title} />
              <CardBody>{item.body}</CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Blocked members</h2>
        {blockedUsers.length === 0 ? (
          <p className={styles.empty}>
            You haven’t blocked anyone. You can block from posts or chats when
            needed.
          </p>
        ) : (
          <ul className={styles.blockedList}>
            {blockedUsers.map((person) => (
              <li key={person.id} className={styles.blockedItem}>
                <div>
                  <strong>{person.name}</strong>
                  <span>
                    Blocked{" "}
                    {new Date(person.blockedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => unblockUser(person.id)}
                >
                  Unblock
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <h2>Your recent reports</h2>
        {reports.length === 0 ? (
          <p className={styles.empty}>No reports submitted yet.</p>
        ) : (
          <ul className={styles.reportList}>
            {reports.map((report) => (
              <li key={report.id} className={styles.reportItem}>
                <p className={styles.reportReason}>{report.reason}</p>
                <strong>{report.targetLabel}</strong>
                <span>
                  {report.targetType} ·{" "}
                  {new Date(report.createdAt).toLocaleString()}
                </span>
                {report.details ? <p>{report.details}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className={styles.footerNote}>
        Need another path? Visit <Link to="/messages">Messages</Link> or{" "}
        <Link to="/community">Community</Link> — report and block controls are
        on each card and chat.
      </p>
    </div>
  );
}
