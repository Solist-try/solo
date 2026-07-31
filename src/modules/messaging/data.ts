export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  body: string;
  createdAt: string;
  mine?: boolean;
};

export type Conversation = {
  id: string;
  title: string;
  topic: string;
  participantName: string;
  participantId: string;
  preview: string;
  updatedAt: string;
  supportiveNote: string;
};

export const conversationsSeed: Conversation[] = [
  {
    id: "c-mira",
    title: "Mira Chen",
    topic: "Solo Living",
    participantName: "Mira Chen",
    participantId: "u-mira",
    preview: "The warm light tip really helped my first week.",
    updatedAt: "2026-07-27T08:12:00",
    supportiveNote: "Supportive check-ins about settling into solo living.",
  },
  {
    id: "c-jordan",
    title: "Jordan Hale",
    topic: "Emotional Support",
    participantName: "Jordan Hale",
    participantId: "u-jordan",
    preview: "Happy to swap quiet-night rituals anytime.",
    updatedAt: "2026-07-26T21:40:00",
    supportiveNote: "Gentle conversation for heavier evenings — no pressure.",
  },
  {
    id: "c-sam",
    title: "Sam Okonkwo",
    topic: "Practical Tips",
    participantName: "Sam Okonkwo",
    participantId: "u-sam",
    preview: "I can send that grocery rhythm worksheet.",
    updatedAt: "2026-07-26T16:05:00",
    supportiveNote: "Practical, budget-minded support between members.",
  },
];

export const messagesSeed: ChatMessage[] = [
  {
    id: "m1",
    conversationId: "c-mira",
    senderId: "u-mira",
    senderName: "Mira Chen",
    body: "Hey — thanks for the note on my studio post. The first week was quieter than I expected.",
    createdAt: "2026-07-27T07:58:00",
  },
  {
    id: "m2",
    conversationId: "c-mira",
    senderId: "me",
    senderName: "You",
    body: "That makes sense. I kept one warm lamp on and took a short evening walk. Tiny things, but they softened the quiet.",
    createdAt: "2026-07-27T08:04:00",
    mine: true,
  },
  {
    id: "m3",
    conversationId: "c-mira",
    senderId: "u-mira",
    senderName: "Mira Chen",
    body: "The warm light tip really helped my first week. Going to try the walk tonight.",
    createdAt: "2026-07-27T08:12:00",
  },
  {
    id: "m4",
    conversationId: "c-jordan",
    senderId: "u-jordan",
    senderName: "Jordan Hale",
    body: "Appreciate you joining the quiet nights discussion. No need to reply fast — just glad you’re here.",
    createdAt: "2026-07-26T21:20:00",
  },
  {
    id: "m5",
    conversationId: "c-jordan",
    senderId: "me",
    senderName: "You",
    body: "Thanks. Some evenings feel heavier than others. Writing three lines has been a kind bar for me.",
    createdAt: "2026-07-26T21:31:00",
    mine: true,
  },
  {
    id: "m6",
    conversationId: "c-jordan",
    senderId: "u-jordan",
    senderName: "Jordan Hale",
    body: "Happy to swap quiet-night rituals anytime. Tea + one playlist is my go-to.",
    createdAt: "2026-07-26T21:40:00",
  },
  {
    id: "m7",
    conversationId: "c-sam",
    senderId: "u-sam",
    senderName: "Sam Okonkwo",
    body: "If you want, I can send that grocery rhythm worksheet — two shops + one market top-up.",
    createdAt: "2026-07-26T15:50:00",
  },
  {
    id: "m8",
    conversationId: "c-sam",
    senderId: "me",
    senderName: "You",
    body: "Yes please. I’ve been doing too many convenience runs.",
    createdAt: "2026-07-26T15:58:00",
    mine: true,
  },
  {
    id: "m9",
    conversationId: "c-sam",
    senderId: "u-sam",
    senderName: "Sam Okonkwo",
    body: "I can send that grocery rhythm worksheet. Freezing half the veg batch is the underrated move.",
    createdAt: "2026-07-26T16:05:00",
  },
];
