/** SAME — Support–Accountability–Mutual–Engagement */

export type SameGoalCategory =
  | "routines"
  | "habits"
  | "learning"
  | "fitness"
  | "creative work";

export type SameFrequency = "daily" | "weekly" | "flexible";

export type SameCheckInStatus = "done" | "partial" | "skipped" | "rest";

export type SamePartnerRequestStatus =
  | "pending"
  | "accepted"
  | "declined";

export type SameGoal = {
  id: string;
  userId: string;
  userName?: string;
  title: string;
  description: string;
  frequency: SameFrequency;
  category: SameGoalCategory;
  createdAt?: string;
};

export type SamePartner = {
  userId: string;
  partnerId: string;
  partnerName?: string;
  createdAt: string;
  sharedCategory?: SameGoalCategory;
  sharedFrequency?: SameFrequency;
};

export type SameCheckIn = {
  id?: string;
  goalId: string;
  userId: string;
  timestamp: string;
  status: SameCheckInStatus;
  note?: string;
};

export type SamePartnerRequest = {
  id: string;
  fromUserId: string;
  toUserId: string;
  goalId?: string;
  status: SamePartnerRequestStatus;
  createdAt: string;
};

export type SamePartnerCandidate = {
  userId: string;
  name: string;
  goal: SameGoal;
  matchScore: number;
  sharedCategory: SameGoalCategory;
  sharedFrequency: SameFrequency | null;
};

export type SameGoalInput = {
  title: string;
  description: string;
  frequency: SameFrequency;
  category: SameGoalCategory;
};

export type SameCheckInInput = {
  goalId: string;
  status: SameCheckInStatus;
  note?: string;
};

export type SamePrompt = {
  id: string;
  goalId: string;
  message: string;
  createdAt: string;
};
