import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth";
import {
  ChatThread,
  ConversationList,
  conversationsSeed,
  messagesSeed,
  type ChatMessage,
} from "../../modules/messaging";
import { GuidelinesReminder, useSafety } from "../../modules/safety";
import styles from "./Messages.module.css";

function storageKey(userId: string) {
  return `go-solo.messages.${userId}`;
}

function readExtraMessages(userId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeExtraMessages(userId: string, messages: ChatMessage[]) {
  localStorage.setItem(storageKey(userId), JSON.stringify(messages));
}

export function Messages() {
  const { user } = useAuth();
  const { isBlocked } = useSafety();
  const [activeId, setActiveId] = useState(conversationsSeed[0]?.id ?? "");
  const [extraMessages, setExtraMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!user) return;
    setExtraMessages(readExtraMessages(user.id));
  }, [user]);

  const conversations = useMemo(() => {
    return conversationsSeed
      .filter((conversation) => !isBlocked(conversation.participantId))
      .map((conversation) => {
        const latest = [...messagesSeed, ...extraMessages]
          .filter((message) => message.conversationId === conversation.id)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )[0];
        if (!latest) return conversation;
        return {
          ...conversation,
          preview: latest.body,
          updatedAt: latest.createdAt,
        };
      });
  }, [extraMessages, isBlocked]);

  useEffect(() => {
    if (conversations.length === 0) return;
    if (!conversations.some((conversation) => conversation.id === activeId)) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId]);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ??
    conversations[0];

  const messages = useMemo(() => {
    if (!activeConversation) return [];
    return [...messagesSeed, ...extraMessages]
      .filter((message) => message.conversationId === activeConversation.id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [activeConversation, extraMessages]);

  if (!user) return null;

  return (
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Messages</h1>
        <p>
          Lightweight, supportive chats with fellow solo members — friendship
          and practical care only, never romance.
        </p>
      </header>

      <GuidelinesReminder compact />

      {conversations.length === 0 || !activeConversation ? (
        <p className={styles.emptyState}>
          No open conversations. Blocked members are hidden here — manage them
          in Safety.
        </p>
      ) : (
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Conversations</h2>
            <ConversationList
              conversations={conversations}
              activeId={activeConversation.id}
              onSelect={setActiveId}
            />
          </aside>

          <ChatThread
            conversation={activeConversation}
            messages={messages}
            onSend={(body) => {
              const next: ChatMessage = {
                id: `local-${Date.now()}`,
                conversationId: activeConversation.id,
                senderId: user.id,
                senderName: user.name,
                body,
                createdAt: new Date().toISOString(),
                mine: true,
              };
              setExtraMessages((current) => {
                const updated = [...current, next];
                writeExtraMessages(user.id, updated);
                return updated;
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
