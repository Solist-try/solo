/** Core Skill Swap models */

export type SkillName =
  | "Languages"
  | "Photography"
  | "Cooking"
  | "Tech help"
  | "Local guidance";

export type SkillAvailability =
  | "weekdays"
  | "weekends"
  | "evenings"
  | "flexible";

export type SkillUrgency = "low" | "medium" | "high";

export type SkillSwapMatchStatus =
  | "suggested"
  | "pending"
  | "accepted"
  | "declined"
  | "completed";

export type SkillOffer = {
  id: string;
  userId: string;
  userName?: string;
  skillName: SkillName;
  description: string;
  availability: SkillAvailability;
  location: string;
};

export type SkillRequest = {
  id: string;
  userId: string;
  userName?: string;
  skillName: SkillName;
  description: string;
  urgency: SkillUrgency;
  /** Optional — used when matching against offer location/availability */
  location?: string;
  availability?: SkillAvailability;
};

export type SkillSwapMatch = {
  id?: string;
  offerId: string;
  requestId: string;
  status: SkillSwapMatchStatus;
  createdAt?: string;
  score?: number;
  notification?: SkillMatchNotification;
};

export type SkillMatchNotification = {
  id: string;
  offerUserId: string;
  requestUserId: string;
  message: string;
  createdAt: string;
  read: boolean;
};

/** Enriched match for UI */
export type SkillSwapMatchView = {
  match: SkillSwapMatch;
  offer: SkillOffer;
  request: SkillRequest;
  score: number;
};

export type SkillOfferInput = {
  skillName: SkillName;
  description: string;
  availability: SkillAvailability;
  location: string;
};

export type SkillRequestInput = {
  skillName: SkillName;
  description: string;
  urgency: SkillUrgency;
  location?: string;
  availability?: SkillAvailability;
};

/** Legacy aliases kept for badges / scheduler UI */
export type SkillCategory = SkillName;
export type SkillSessionMode = "virtual" | "chat";
export type SkillListingKind = "offer" | "request";

export type SkillListing = {
  id: string;
  kind: SkillListingKind;
  category: SkillCategory;
  title: string;
  summary: string;
  ownerId: string;
  ownerName: string;
  availability: string;
  location?: string;
  urgency?: SkillUrgency;
};

export type SkillMatch = {
  id: string;
  offer: SkillListing;
  request: SkillListing;
  score: number;
};

export type SkillSession = {
  id: string;
  matchId: string;
  mode: SkillSessionMode;
  when: string;
  notes: string;
  status: "scheduled" | "completed";
};

export type SkillBadge = {
  id: string;
  label: string;
  description: string;
  earned: boolean;
  count?: number;
};
