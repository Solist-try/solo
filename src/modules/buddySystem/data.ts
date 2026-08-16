import type {
  BuddyGoal,
  BuddyInterest,
  BuddyAvailability,
  BuddyConnectionMode,
  BuddyProfile,
  BuddyMatch,
  BuddyPreferences,
} from "./types";

export const BUDDY_GOALS: BuddyGoal[] = [
  "eat out alone",
  "first solo trip",
  "declutter home",
  "build evening routines",
  "budget for one",
  "travel with less stress",
];

export const BUDDY_INTERESTS: BuddyInterest[] = [
  "Solo Living",
  "Emotional Support",
  "Practical Tips",
  "Travel",
  "Money & Housing",
  "Safety",
];

export const BUDDY_AVAILABILITY: BuddyAvailability[] = [
  "weekdays",
  "weekends",
  "evenings",
  "flexible",
];

export const defaultBuddyPreferences: BuddyPreferences = {
  goals: ["eat out alone", "build evening routines"],
  interests: ["Solo Living", "Emotional Support"],
  availability: ["evenings", "flexible"],
  connectionMode: "light",
};

export const buddyCatalog: BuddyProfile[] = [
  {
    id: "buddy-mira",
    name: "Mira Chen",
    bio: "Soft check-ins and steady solo-travel practice. Non-romantic, autonomy-first.",
    goals: ["first solo trip", "travel with less stress", "eat out alone"],
    interests: ["Travel", "Solo Living", "Safety"],
    availability: ["weekends", "flexible"],
    connectionMode: "light",
    compatibility: 0,
    sharedGoals: [],
  },
  {
    id: "buddy-jordan",
    name: "Jordan Hale",
    bio: "Evening routines and emotional care — quiet accountability without pressure.",
    goals: ["build evening routines", "declutter home", "eat out alone"],
    interests: ["Emotional Support", "Practical Tips", "Solo Living"],
    availability: ["evenings", "weekdays"],
    connectionMode: "active",
    compatibility: 0,
    sharedGoals: [],
  },
  {
    id: "buddy-ava",
    name: "Ava Ruiz",
    bio: "Budget calm and home systems for living alone with more ease.",
    goals: ["budget for one", "declutter home", "build evening routines"],
    interests: ["Money & Housing", "Practical Tips", "Solo Living"],
    availability: ["weekdays", "flexible"],
    connectionMode: "light",
    compatibility: 0,
    sharedGoals: [],
  },
  {
    id: "buddy-sam",
    name: "Sam Okonkwo",
    bio: "First-trip planning and digital safety notes for solo travelers.",
    goals: ["first solo trip", "travel with less stress", "budget for one"],
    interests: ["Travel", "Safety", "Money & Housing"],
    availability: ["weekends", "evenings"],
    connectionMode: "active",
    compatibility: 0,
    sharedGoals: [],
  },
];

export function createDefaultMilestones(goals: BuddyGoal[]) {
  const base = goals.slice(0, 3).map((goal, index) => ({
    id: `ms-${index + 1}`,
    label: `Progress on “${goal}”`,
    done: index === 0,
    shared: true,
  }));

  return [
    ...base,
    {
      id: "ms-checkin",
      label: "Complete a supportive check-in",
      done: false,
      shared: true,
    },
  ];
}

export function createMatch(buddy: BuddyProfile): BuddyMatch {
  return {
    buddy,
    conversationId: `buddy-chat-${buddy.id}`,
    optedIn: true,
    milestones: createDefaultMilestones(buddy.sharedGoals.length
      ? buddy.sharedGoals
      : buddy.goals),
  };
}

export type { BuddyConnectionMode };
