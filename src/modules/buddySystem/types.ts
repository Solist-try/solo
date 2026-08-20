/** Core Buddy System models */

export type BuddyInterest =
  | "Travel"
  | "Co-working"
  | "Walking"
  | "Meals"
  | "Solo Living"
  | "Emotional Support"
  | "Practical Tips"
  | "Safety"
  | "Money & Housing";

export type BuddyActivity =
  | "travel"
  | "co-working"
  | "walking"
  | "meals"
  | "shared interests";

export type BuddyAvailabilityWindow =
  | "weekdays"
  | "weekends"
  | "evenings"
  | "flexible"
  | "short-term"
  | "long-term";

/** @deprecated alias — prefer BuddyAvailabilityWindow */
export type BuddyAvailability = BuddyAvailabilityWindow;

export type BuddyRequestStatus = "pending" | "accepted" | "declined";

export type BuddyProfile = {
  userId: string;
  name: string;
  bio: string;
  interests: BuddyInterest[];
  availability: BuddyAvailabilityWindow;
  preferredActivities: BuddyActivity[];
  location: string;
  matchScore: number;
};

export type BuddyRequest = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: BuddyRequestStatus;
  createdAt: string;
};

export type BuddyMatch = {
  id?: string;
  userId: string;
  buddyId: string;
  createdAt: string;
};

export type BuddyFilters = {
  interests: BuddyInterest[];
  availability: BuddyAvailabilityWindow | "any";
  activity: BuddyActivity | "any";
};

export type BuddyRecommendationQuery = Partial<BuddyFilters> & {
  userId?: string;
};

/** Legacy preference shape still used by preferences form */
export type BuddyGoal =
  | "eat out alone"
  | "first solo trip"
  | "declutter home"
  | "build evening routines"
  | "budget for one"
  | "travel with less stress";

export type BuddyConnectionMode = "light" | "active";

export type BuddyPreferences = {
  goals: BuddyGoal[];
  interests: BuddyInterest[];
  availability: BuddyAvailabilityWindow[];
  connectionMode: BuddyConnectionMode;
  preferredActivities: BuddyActivity[];
  location: string;
};

export type BuddyMilestone = {
  id: string;
  label: string;
  done: boolean;
  shared: boolean;
};

/** Active connection session for chat / progress UI */
export type ActiveBuddyConnection = {
  buddy: BuddyProfile;
  conversationId: string;
  optedIn: boolean;
  milestones: BuddyMilestone[];
};

/** Profile → Connections list item */
export type BuddyConnectionSummary = {
  match: BuddyMatch;
  buddyId: string;
  name: string;
  location: string;
  preferredActivities: BuddyActivity[];
  createdAt: string;
};
