export type ChecklistItem = {
  id: string;
  label: string;
  done?: boolean;
};

export type Habit = {
  id: string;
  label: string;
  /** 7 booleans, Mon–Sun */
  week: boolean[];
};

export type QuickTip = {
  id: string;
  title: string;
  body: string;
  tone: "calm" | "practical" | "warm";
};

export type Mood = "steady" | "low" | "bright" | "restless" | "tender";

export const morningRoutine: ChecklistItem[] = [
  { id: "m1", label: "Open a curtain or soft light" },
  { id: "m2", label: "Drink water before coffee or tea" },
  { id: "m3", label: "Make the bed — even roughly" },
  { id: "m4", label: "Three quiet breaths at the window" },
  { id: "m5", label: "Choose one priority for the day" },
];

export const eveningRoutine: ChecklistItem[] = [
  { id: "e1", label: "Clear a small surface (desk or sink)" },
  { id: "e2", label: "Prep tomorrow’s bag or outfit" },
  { id: "e3", label: "Dim lights an hour before sleep" },
  { id: "e4", label: "Write one line: what went okay" },
  { id: "e5", label: "Phone on charge outside the bed" },
];

export const practicalTasks: ChecklistItem[] = [
  { id: "t1", label: "Check pantry staples and note two missing items" },
  { id: "t2", label: "Take out trash / recycling" },
  { id: "t3", label: "Wipe bathroom sink and mirror" },
  { id: "t4", label: "Confirm rent or bill due dates this week" },
  { id: "t5", label: "Text one person a low-pressure check-in" },
  { id: "t6", label: "Charge devices and set keys by the door" },
];

export const starterHabits: Habit[] = [
  {
    id: "h1",
    label: "Morning stretch (2 min)",
    week: [true, true, false, true, false, false, false],
  },
  {
    id: "h2",
    label: "Eat one real meal seated",
    week: [true, false, true, true, true, false, false],
  },
  {
    id: "h3",
    label: "Outside air / short walk",
    week: [false, true, true, false, true, false, false],
  },
  {
    id: "h4",
    label: "Evening wind-down cue",
    week: [true, true, true, false, false, false, false],
  },
];

export const quickTips: QuickTip[] = [
  {
    id: "tip1",
    title: "Shrink the ask",
    body: "When energy is low, pick a five-minute version of the task. Momentum beats perfection in a solo home.",
    tone: "practical",
  },
  {
    id: "tip2",
    title: "Name the quiet",
    body: "Say it gently: “It’s quiet tonight.” Naming the feeling often softens it without needing a fix.",
    tone: "calm",
  },
  {
    id: "tip3",
    title: "One warm light",
    body: "A single lamp can change how a room holds you. Bright overheads are optional after dusk.",
    tone: "warm",
  },
  {
    id: "tip4",
    title: "Leave a trail for tomorrow",
    body: "Set out breakfast tools or your water bottle before bed. Future-you will feel less alone starting out.",
    tone: "practical",
  },
];

export const moodOptions: { id: Mood; label: string; hint: string }[] = [
  { id: "steady", label: "Steady", hint: "Grounded enough" },
  { id: "bright", label: "Bright", hint: "Open and light" },
  { id: "tender", label: "Tender", hint: "Soft, needs care" },
  { id: "restless", label: "Restless", hint: "Buzzing energy" },
  { id: "low", label: "Low", hint: "Heavy or flat" },
];

export const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
