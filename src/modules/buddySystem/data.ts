import type {
  BuddyActivity,
  BuddyAvailabilityWindow,
  BuddyInterest,
  BuddyProfile,
  BuddyPreferences,
  BuddyGoal,
  ActiveBuddyConnection,
} from "./types";

export const BUDDY_INTERESTS: BuddyInterest[] = [
  "Travel",
  "Co-working",
  "Walking",
  "Meals",
  "Solo Living",
  "Emotional Support",
  "Practical Tips",
  "Safety",
  "Money & Housing",
];

export const BUDDY_ACTIVITIES: BuddyActivity[] = [
  "travel",
  "co-working",
  "walking",
  "meals",
  "shared interests",
];

export const BUDDY_AVAILABILITY: BuddyAvailabilityWindow[] = [
  "weekdays",
  "weekends",
  "evenings",
  "flexible",
  "short-term",
  "long-term",
];

export const BUDDY_GOALS: BuddyGoal[] = [
  "eat out alone",
  "first solo trip",
  "declutter home",
  "build evening routines",
  "budget for one",
  "travel with less stress",
];

export const defaultBuddyPreferences: BuddyPreferences = {
  goals: ["first solo trip", "eat out alone"],
  interests: ["Travel", "Walking", "Meals"],
  availability: ["weekends", "flexible", "short-term"],
  connectionMode: "light",
  preferredActivities: ["travel", "walking", "meals"],
  location: "Anywhere",
};

export const buddyProfilesSeed: BuddyProfile[] = [
  {
    userId: "buddy-mira",
    name: "Mira Chen",
    bio: "Soft check-ins and calm travel days. Non-romantic, autonomy-first.",
    interests: ["Travel", "Solo Living", "Safety"],
    availability: "weekends",
    preferredActivities: ["travel", "walking", "meals"],
    location: "Lisbon · remote-friendly",
    matchScore: 0,
  },
  {
    userId: "buddy-jordan",
    name: "Jordan Hale",
    bio: "Evening walks and co-working quiet hours — supportive, no pressure.",
    interests: ["Walking", "Co-working", "Emotional Support"],
    availability: "evenings",
    preferredActivities: ["walking", "co-working", "shared interests"],
    location: "Berlin · evenings",
    matchScore: 0,
  },
  {
    userId: "buddy-ava",
    name: "Ava Ruiz",
    bio: "Meal swaps and practical solo-living systems for calmer weeks.",
    interests: ["Meals", "Practical Tips", "Solo Living"],
    availability: "weekdays",
    preferredActivities: ["meals", "shared interests"],
    location: "Mexico City · hybrid",
    matchScore: 0,
  },
  {
    userId: "buddy-sam",
    name: "Sam Okonkwo",
    bio: "Short-term travel buddies and digital safety notes for solo trips.",
    interests: ["Travel", "Safety", "Money & Housing"],
    availability: "short-term",
    preferredActivities: ["travel", "meals"],
    location: "Lagos · short trips",
    matchScore: 0,
  },
  {
    userId: "buddy-lee",
    name: "Lee Park",
    bio: "Long-term co-working rhythm and weekend walking loops.",
    interests: ["Co-working", "Walking", "Practical Tips"],
    availability: "long-term",
    preferredActivities: ["co-working", "walking"],
    location: "Seoul · long-term",
    matchScore: 0,
  },
];

/** @deprecated use buddyProfilesSeed */
export const buddyCatalog = buddyProfilesSeed;

export function createDefaultMilestones(labels: string[]) {
  const base = labels.slice(0, 3).map((label, index) => ({
    id: `ms-${index + 1}`,
    label: `Progress on “${label}”`,
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

export function createActiveConnection(
  buddy: BuddyProfile,
): ActiveBuddyConnection {
  return {
    buddy,
    conversationId: `buddy-chat-${buddy.userId}`,
    optedIn: true,
    milestones: createDefaultMilestones(
      buddy.preferredActivities.length
        ? buddy.preferredActivities
        : buddy.interests,
    ),
  };
}

/** @deprecated use createActiveConnection */
export function createMatch(buddy: BuddyProfile): ActiveBuddyConnection {
  return createActiveConnection(buddy);
}
