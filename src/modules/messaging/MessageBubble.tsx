import styles from "./MessageBubble.module.css";
import type { ChatMessage } from "./data";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const mine = Boolean(message.mine);
  const time = new Date(message.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className={`${styles.row} ${mine ? styles.mine : styles.theirs}`}>
      <div className={styles.bubble}>
        {!mine ? <p className={styles.author}>{message.senderName}</p> : null}
        <p className={styles.body}>{message.body}</p>
        <time className={styles.time} dateTime={message.createdAt}>
          {time}
        </time>
      </div>
    </div>
  );
}
