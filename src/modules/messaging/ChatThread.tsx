import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Avatar, Button } from "../../components/ui";
import {
  BlockUserButton,
  ReportButton,
  useSafety,
} from "../safety";
import type { ChatMessage, Conversation } from "./data";
import { MessageBubble } from "./MessageBubble";
import styles from "./ChatThread.module.css";

export function ChatThread({
  conversation,
  messages,
  onSend,
}: {
  conversation: Conversation;
  messages: ChatMessage[];
  onSend: (body: string) => void;
}) {
  const { moderate, isBlocked } = useSafety();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const blocked = isBlocked(conversation.participantId);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, conversation.id]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (blocked) {
      setError("You’ve blocked this member. Unblock them to send messages.");
      return;
    }
    const result = moderate(draft, "message");
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    onSend(draft.trim());
    setDraft("");
    setError(null);
  };

  return (
    <section className={styles.thread} aria-label={`Chat with ${conversation.title}`}>
      <header className={styles.header}>
        <Avatar name={conversation.participantName} />
        <div className={styles.headerText}>
          <h2>{conversation.title}</h2>
          <p>{conversation.supportiveNote}</p>
        </div>
        <div className={styles.headerActions}>
          <ReportButton
            targetType="user"
            targetId={conversation.participantId}
            targetLabel={conversation.participantName}
          />
          <BlockUserButton
            userId={conversation.participantId}
            userName={conversation.participantName}
          />
        </div>
      </header>

      <div className={styles.safetyBanner} role="note">
        Supportive, non-romantic space. Content is moderated before send. Report
        or block anytime.
      </div>

      {blocked ? (
        <div className={styles.blockedNotice}>
          You blocked {conversation.participantName}. Their messages stay hidden
          until you unblock.
        </div>
      ) : null}

      <div className={styles.messages} ref={listRef}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <form className={styles.composer} onSubmit={submit}>
        {error ? <p className={styles.error}>{error}</p> : null}
        <label className="sr-only" htmlFor={inputId}>
          Message
        </label>
        <textarea
          id={inputId}
          rows={2}
          value={draft}
          disabled={blocked}
          onChange={(event) => {
            setDraft(event.target.value);
            if (error) setError(null);
          }}
          placeholder="Share support, tips, or a gentle check-in…"
        />
        <Button type="submit" size="sm" disabled={blocked}>
          Send
        </Button>
      </form>
    </section>
  );
}
