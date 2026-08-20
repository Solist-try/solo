import type {
  SameCheckIn,
  SameFrequency,
  SameGoal,
  SameGoalCategory,
  SamePartner,
} from "./types";

export const SAME_CATEGORIES: {
  id: SameGoalCategory;
  label: string;
  blurb: string;
}[] = [
  {
    id: "routines",
    label: "Routines",
    blurb: "Soft morning or evening anchors that keep the day kind.",
  },
  {
    id: "habits",
    label: "Habits",
    blurb: "Small repeats — water, stretch, tidy — without pressure.",
  },
  {
    id: "learning",
    label: "Learning",
    blurb: "Languages, courses, or quiet reading streaks.",
  },
  {
    id: "fitness",
    label: "Fitness",
    blurb: "Walks, movement, and body care at your pace.",
  },
  {
    id: "creative work",
    label: "Creative work",
    blurb: "Writing, making, and gentle creative practice.",
  },
];

export const SAME_FREQUENCIES: SameFrequency[] = [
  "daily",
  "weekly",
  "flexible",
];

export const sameGoalsSeed: SameGoal[] = [
  {
    id: "goal-mira-routine",
    userId: "u-mira",
    userName: "Mira Chen",
    title: "Evening wind-down",
    description: "Ten quiet minutes before screens go off.",
    frequency: "daily",
    category: "routines",
    createdAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "goal-jordan-habit",
    userId: "u-jordan",
    userName: "Jordan Hale",
    title: "Morning stretch",
    description: "A short stretch before coffee — no perfection required.",
    frequency: "daily",
    category: "habits",
    createdAt: "2026-08-02T10:00:00.000Z",
  },
  {
    id: "goal-ava-learn",
    userId: "u-ava",
    userName: "Ava Ruiz",
    title: "Language practice",
    description: "Fifteen minutes of phrases twice a week.",
    frequency: "weekly",
    category: "learning",
    createdAt: "2026-08-03T10:00:00.000Z",
  },
  {
    id: "goal-sam-fitness",
    userId: "u-sam",
    userName: "Sam Okonkwo",
    title: "Neighborhood walk",
    description: "One gentle walk loop on weekends.",
    frequency: "weekly",
    category: "fitness",
    createdAt: "2026-08-04T10:00:00.000Z",
  },
  {
    id: "goal-lee-creative",
    userId: "u-lee",
    userName: "Lee Park",
    title: "Sketch pages",
    description: "Fill one page when energy allows.",
    frequency: "flexible",
    category: "creative work",
    createdAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "goal-sofia-routine",
    userId: "u-sofia",
    userName: "Sofia L.",
    title: "Morning tea ritual",
    description: "Sit with tea before opening messages.",
    frequency: "daily",
    category: "routines",
    createdAt: "2026-08-06T10:00:00.000Z",
  },
];

export const samePartnersSeed: SamePartner[] = [];

export const sameCheckInsSeed: SameCheckIn[] = [
  {
    id: "check-1",
    goalId: "goal-mira-routine",
    userId: "u-mira",
    timestamp: "2026-08-18T21:00:00.000Z",
    status: "done",
    note: "Phone stayed in the kitchen.",
  },
  {
    id: "check-2",
    goalId: "goal-mira-routine",
    userId: "u-mira",
    timestamp: "2026-08-19T21:10:00.000Z",
    status: "partial",
  },
];

export function progressPercent(
  checkIns: SameCheckIn[],
  goalId: string,
  windowSize = 7,
): number {
  const relevant = checkIns
    .filter((item) => item.goalId === goalId)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, windowSize);
  if (relevant.length === 0) return 0;
  const score = relevant.reduce((sum, item) => {
    if (item.status === "done") return sum + 1;
    if (item.status === "partial" || item.status === "rest") return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((score / relevant.length) * 100);
}
