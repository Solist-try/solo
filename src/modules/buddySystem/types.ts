export type BuddyGoal =
  | "eat out alone"
  | "first solo trip"
  | "declutter home"
  | "build evening routines"
  | "budget for one"
  | "travel with less stress";

export type BuddyInterest =
  | "Solo Living"
  | "Emotional Support"
  | "Practical Tips"
  | "Travel"
  | "Money & Housing"
  | "Safety";

export type BuddyAvailability =
  | "weekdays"
  | "weekends"
  | "evenings"
  | "flexible";

export type BuddyConnectionMode = "light" | "active";

export type BuddyPreferences = {
  goals: BuddyGoal[];
  interests: BuddyInterest[];
  availability: BuddyAvailability[];
  connectionMode: BuddyConnectionMode;
};

export type BuddyProfile = {
  id: string;
  name: string;
  bio: string;
  goals: BuddyGoal[];
  interests: BuddyInterest[];
  availability: BuddyAvailability[];
  connectionMode: BuddyConnectionMode;
  compatibility: number;
  sharedGoals: BuddyGoal[];
};

export type BuddyMilestone = {
  id: string;
  label: string;
  done: boolean;
  shared: boolean;
};

export type BuddyMatch = {
  buddy: BuddyProfile;
  conversationId: string;
  optedIn: boolean;
  milestones: BuddyMilestone[];
};
