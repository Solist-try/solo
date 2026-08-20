import type {
  SkillBadge,
  SkillName,
  SkillOffer,
  SkillRequest,
  SkillSwapMatchView,
} from "./types";
import { findSkillSwapMatches } from "./matching";

export const SKILL_NAMES: SkillName[] = [
  "Languages",
  "Photography",
  "Cooking",
  "Tech help",
  "Local guidance",
];

/** Soft summer category meta for cards */
export const SKILL_CATEGORIES: {
  id: SkillName;
  label: SkillName;
  icon: string;
  blurb: string;
}[] = [
  {
    id: "Languages",
    label: "Languages",
    icon: "Lang",
    blurb: "Practice phrases and calm conversation swaps.",
  },
  {
    id: "Photography",
    label: "Photography",
    icon: "Photo",
    blurb: "Light tips for capturing solo days gently.",
  },
  {
    id: "Cooking",
    label: "Cooking",
    icon: "Cook",
    blurb: "Simple meals for one without the overwhelm.",
  },
  {
    id: "Tech help",
    label: "Tech help",
    icon: "Tech",
    blurb: "Phone, laptop, and travel-app confidence.",
  },
  {
    id: "Local guidance",
    label: "Local guidance",
    icon: "Local",
    blurb: "Neighborhood walks and low-key orientation.",
  },
];

export const skillOffersSeed: SkillOffer[] = [
  {
    id: "offer-1",
    userId: "u-mira",
    userName: "Mira Chen",
    skillName: "Cooking",
    description:
      "Three low-mess weeknight recipes and a shopping rhythm for a small kitchen.",
    availability: "evenings",
    location: "Lisbon",
  },
  {
    id: "offer-2",
    userId: "u-sam",
    userName: "Sam Okonkwo",
    skillName: "Tech help",
    description:
      "Calm walkthrough of travel apps, offline maps, and phone lock-down basics.",
    availability: "weekends",
    location: "Lagos",
  },
  {
    id: "offer-3",
    userId: "u-ava",
    userName: "Ava Ruiz",
    skillName: "Photography",
    description:
      "Soft light tips for capturing markets and quiet streets without gear stress.",
    availability: "flexible",
    location: "Mexico City",
  },
  {
    id: "offer-4",
    userId: "u-lee",
    userName: "Lee Park",
    skillName: "Languages",
    description:
      "Gentle conversation practice for travel phrases — no judgment, short sessions.",
    availability: "weekdays",
    location: "Seoul",
  },
  {
    id: "offer-5",
    userId: "u-noah",
    userName: "Noah P.",
    skillName: "Local guidance",
    description:
      "Neighborhood orientation walks and café recommendations for arriving solo.",
    availability: "flexible",
    location: "Chiang Mai",
  },
];

export const skillRequestsSeed: SkillRequest[] = [
  {
    id: "req-1",
    userId: "u-jordan",
    userName: "Jordan Hale",
    skillName: "Cooking",
    description: "Looking for a 30-minute intro to cooking for one.",
    urgency: "medium",
    location: "Lisbon",
    availability: "evenings",
  },
  {
    id: "req-2",
    userId: "u-alex",
    userName: "Alex Rivera",
    skillName: "Local guidance",
    description: "Need a calm first-day map of a new neighborhood.",
    urgency: "high",
    location: "Chiang Mai",
    availability: "flexible",
  },
  {
    id: "req-3",
    userId: "u-sofia",
    userName: "Sofia L.",
    skillName: "Photography",
    description: "Want help framing market photos on a phone camera.",
    urgency: "low",
    location: "Mexico City",
    availability: "weekends",
  },
  {
    id: "req-4",
    userId: "u-amir",
    userName: "Amir N.",
    skillName: "Languages",
    description: "Practice basic greetings before a short trip.",
    urgency: "medium",
    location: "Seoul",
    availability: "weekdays",
  },
  {
    id: "req-5",
    userId: "u-elena",
    userName: "Elena S.",
    skillName: "Tech help",
    description: "Need help setting offline maps before travel.",
    urgency: "high",
    location: "Lagos",
    availability: "weekends",
  },
];

export const skillBadgesSeed: SkillBadge[] = [
  {
    id: "badge-first",
    label: "First swap",
    description: "Completed your first supportive skill swap.",
    earned: true,
    count: 1,
  },
  {
    id: "badge-helper",
    label: "Steady helper",
    description: "Offered practical help three times.",
    earned: true,
    count: 3,
  },
  {
    id: "badge-learner",
    label: "Curious learner",
    description: "Requested and completed two learning sessions.",
    earned: false,
    count: 1,
  },
  {
    id: "badge-boundary",
    label: "Boundary keeper",
    description: "Kept swaps clear, timed, and non-romantic.",
    earned: true,
  },
];

/** @deprecated prefer skillOffersSeed / skillRequestsSeed */
export const skillListingsSeed = [
  ...skillOffersSeed.map((offer) => ({
    id: offer.id,
    kind: "offer" as const,
    category: offer.skillName,
    title: offer.skillName,
    summary: offer.description,
    ownerId: offer.userId,
    ownerName: offer.userName ?? "Member",
    availability: offer.availability,
    location: offer.location,
  })),
  ...skillRequestsSeed.map((request) => ({
    id: request.id,
    kind: "request" as const,
    category: request.skillName,
    title: request.skillName,
    summary: request.description,
    ownerId: request.userId,
    ownerName: request.userName ?? "Member",
    availability: request.availability ?? "flexible",
    location: request.location,
    urgency: request.urgency,
  })),
];

/** @deprecated use findSkillSwapMatches */
export function findSkillMatches(): SkillSwapMatchView[] {
  return findSkillSwapMatches(skillOffersSeed, skillRequestsSeed);
}
