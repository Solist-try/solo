import { useEffect, useMemo, useState } from "react";
import { ChatThread, type ChatMessage } from "../../messaging";
import { brand } from "../../../styles/brand-tokens";
import type { BuddyMatch } from "../types";
import styles from "./BuddyChat.module.css";

function seedMessages(match: BuddyMatch): ChatMessage[] {
  return [
    {
      id: `${match.conversationId}-1`,
      conversationId: match.conversationId,
      senderId: match.buddy.id,
      senderName: match.buddy.name,
      body: `Hi — happy to be a ${
        match.buddy.connectionMode === "light" ? "light" : "active"
      } buddy for your solo goals. No pressure, just support.`,
      createdAt: new Date().toISOString(),
      mine: false,
    },
  ];
}

export function BuddyChat({ match }: { match: BuddyMatch | null }) {
  const conversation = useMemo(() => {
    if (!match) return null;
    return {
      id: match.conversationId,
      participantId: match.buddy.id,
      participantName: match.buddy.name,
      title: match.buddy.name,
      topic: "Buddy System",
      preview: "Supportive buddy chat",
      updatedAt: "Just now",
      supportiveNote:
        "Buddy System chat — moderated, non-romantic, opt out anytime.",
    };
  }, [match]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setMessages(match ? seedMessages(match) : []);
  }, [match]);

  if (!match || !conversation) {
    return (
      <div
        className={styles.empty}
        style={{
          borderRadius: brand.radius.lg,
          background: brand.colors.mist,
          boxShadow: brand.shadows.soft,
          padding: brand.spacing[32],
        }}
      >
        <strong style={{ fontFamily: brand.typography.heading }}>
          Buddy chat
        </strong>
        <p style={{ fontFamily: brand.typography.body }}>
          Connect with a match to open a safe, moderated chat.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap} style={{ borderRadius: brand.radius.lg }}>
      <ChatThread
        conversation={conversation}
        messages={messages}
        onSend={(body) => {
          setMessages((current) => [
            ...current,
            {
              id: `${match.conversationId}-${Date.now()}`,
              conversationId: match.conversationId,
              senderId: "you",
              senderName: "You",
              body,
              createdAt: new Date().toISOString(),
              mine: true,
            },
          ]);
        }}
      />
    </div>
  );
}
