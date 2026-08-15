export const EVENT_TYPES = [
  "meetup",
  "workshop",
  "discussion",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export type SoloEvent = {
  id: string;
  title: string;
  type: EventType;
  description: string;
  host: string;
  /** ISO start datetime */
  start: string;
  /** ISO end datetime */
  end: string;
  location: string;
  isVirtual: boolean;
  capacity: number;
  baseRsvps: number;
};

export const eventTypeLabels: Record<EventType, string> = {
  meetup: "Virtual meetup",
  workshop: "Workshop",
  discussion: "Community discussion",
};

export const eventsCatalog: SoloEvent[] = [
  {
    id: "ev-pack-circle",
    title: "Packing circle for first solo trips",
    type: "meetup",
    description:
      "Trim your bag list together — bring what you are unsure about and leave with a lighter plan.",
    host: "Ava Ruiz",
    start: "2026-07-29T18:30:00",
    end: "2026-07-29T19:30:00",
    location: "Zoom · link after RSVP",
    isVirtual: true,
    capacity: 24,
    baseRsvps: 11,
  },
  {
    id: "ev-budget-workshop",
    title: "Solo budget workshop: stretch week math",
    type: "workshop",
    description:
      "A calm walkthrough of lodging, meals, and one joy purchase — worksheets included.",
    host: "Sam Okonkwo",
    start: "2026-08-02T11:00:00",
    end: "2026-08-02T12:15:00",
    location: "Google Meet · link after RSVP",
    isVirtual: true,
    capacity: 40,
    baseRsvps: 22,
  },
  {
    id: "ev-quiet-nights",
    title: "Quiet nights discussion circle",
    type: "discussion",
    description:
      "Share what helps when evenings feel heavy — no fixing required, just supportive company.",
    host: "Jordan Hale",
    start: "2026-08-05T19:00:00",
    end: "2026-08-05T20:00:00",
    location: "Community lounge (virtual)",
    isVirtual: true,
    capacity: 30,
    baseRsvps: 18,
  },
  {
    id: "ev-safety-lab",
    title: "Digital safety lab for solo travelers",
    type: "workshop",
    description:
      "Check-in rituals, sharing location wisely, and locking down accounts before you go.",
    host: "Mira Chen",
    start: "2026-08-08T10:00:00",
    end: "2026-08-08T11:00:00",
    location: "Zoom · link after RSVP",
    isVirtual: true,
    capacity: 35,
    baseRsvps: 14,
  },
  {
    id: "ev-morning-meetup",
    title: "Sunday stretch meetup",
    type: "meetup",
    description:
      "A short guided stretch and intention-setting for the week ahead — cameras optional.",
    host: "Alex Rivera",
    start: "2026-08-09T09:00:00",
    end: "2026-08-09T09:40:00",
    location: "Zoom · link after RSVP",
    isVirtual: true,
    capacity: 50,
    baseRsvps: 27,
  },
  {
    id: "ev-housing-chat",
    title: "Housing & leases community discussion",
    type: "discussion",
    description:
      "Swap red-flag stories, deposit tips, and questions about living alone for the first time.",
    host: "Go Solo Guides",
    start: "2026-08-12T17:30:00",
    end: "2026-08-12T18:30:00",
    location: "Community lounge (virtual)",
    isVirtual: true,
    capacity: 45,
    baseRsvps: 19,
  },
];

export function formatEventWhen(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const date = start.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const startTime = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const endTime = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${startTime} – ${endTime}`;
}
