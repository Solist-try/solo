export type SkillCategory =
  | "Cooking basics"
  | "Budgeting"
  | "Home fixes"
  | "Emotional regulation"
  | "Digital safety"
  | "Travel planning";

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

export type SkillOfferInput = {
  category: SkillCategory;
  title: string;
  summary: string;
  availability: string;
};

export type SkillRequestInput = {
  category: SkillCategory;
  title: string;
  summary: string;
  availability: string;
};
