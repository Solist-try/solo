import { Link } from "react-router-dom";
import {
  COMMUNITY_GUIDELINES,
  ReportButton,
  useSafety,
} from "../modules/safety";

export function Safety() {
  const { blockedUsers, unblockUser } = useSafety();

  return (
    <div className="container safety-page">
      <header className="safety-header">
        <h1>Safety & Guidelines</h1>
        <p>
          Clear community standards, a simple report path, and your blocked
          members — tools to keep Go Solo supportive and non-romantic.
        </p>
      </header>

      <section className="safety-section" aria-labelledby="guidelines-heading">
        <h2 id="guidelines-heading">Community guidelines</h2>
        <p className="safety-section__lede">
          These keep the space kind, practical, and free of romantic pressure.
        </p>
        <ol className="safety-guidelines">
          {COMMUNITY_GUIDELINES.map((item, index) => (
            <li
              key={item.title}
              className="safety-guideline"
              style={{ animationDelay: `${0.04 + index * 0.05}s` }}
            >
              <span className="safety-guideline__index" aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="safety-section" aria-labelledby="report-heading">
        <h2 id="report-heading">Report something</h2>
        <div className="safety-report-card">
          <p>
            If a post, message, or member crosses a line, submit a report. You
            never owe a long explanation — a reason is enough.
          </p>
          <ReportButton
            targetType="post"
            targetId="safety-center-general"
            targetLabel="General community concern"
          />
        </div>
      </section>

      <section className="safety-section" aria-labelledby="blocked-heading">
        <h2 id="blocked-heading">Blocked members</h2>
        <p className="safety-section__lede">
          People you’ve blocked won’t appear in your feed or message list.
        </p>
        {blockedUsers.length === 0 ? (
          <p className="safety-empty">
            You haven’t blocked anyone. You can block from posts or chats when
            needed.
          </p>
        ) : (
          <ul className="safety-blocked">
            {blockedUsers.map((person) => (
              <li key={person.id} className="safety-blocked__item">
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
                <button
                  type="button"
                  className="safety-unblock"
                  onClick={() => unblockUser(person.id)}
                >
                  Unblock
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="safety-footer">
        Need another path? Visit <Link to="/messages">Messages</Link> or{" "}
        <Link to="/community">Community</Link> — report and block controls are
        also on each card and chat.
      </p>
    </div>
  );
}

export default Safety;
