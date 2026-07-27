import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Avatar, Button } from "../../components/ui";
import type { ChatMessage, Conversation } from "./data";
import { MessageBubble } from "./MessageBubble";
import { checkMessageSafety } from "./safety";
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
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, conversation.id]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = checkMessageSafety(draft);
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
        <div>
          <h2>{conversation.title}</h2>
          <p>{conversation.supportiveNote}</p>
        </div>
      </header>

      <div className={styles.safetyBanner} role="note">
        Supportive, non-romantic space. Flirty, explicit, or unsafe requests are
        filtered before send.
      </div>

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
          onChange={(event) => {
            setDraft(event.target.value);
            if (error) setError(null);
          }}
          placeholder="Share support, tips, or a gentle check-in…"
        />
        <Button type="submit" size="sm">
          Send
        </Button>
      </form>
    </section>
  );
}
