import type { Conversation } from "./data";
import styles from "./ConversationList.module.css";

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className={styles.list} aria-label="Conversations">
      {conversations.map((conversation) => {
        const active = conversation.id === activeId;
        const updated = new Date(conversation.updatedAt).toLocaleString(
          undefined,
          { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" },
        );
        return (
          <li key={conversation.id}>
            <button
              type="button"
              className={`${styles.item} ${active ? styles.active : ""}`}
              onClick={() => onSelect(conversation.id)}
              aria-current={active ? "true" : undefined}
            >
              <div className={styles.top}>
                <strong>{conversation.title}</strong>
                <time dateTime={conversation.updatedAt}>{updated}</time>
              </div>
              <p className={styles.topic}>{conversation.topic}</p>
              <p className={styles.preview}>{conversation.preview}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
