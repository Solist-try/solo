import type {
  SkillBadge,
  SkillCategory,
  SkillListing,
  SkillMatch,
} from "./types";

export const SKILL_CATEGORIES: {
  id: SkillCategory;
  label: SkillCategory;
  icon: string;
  blurb: string;
}[] = [
  {
    id: "Cooking basics",
    label: "Cooking basics",
    icon: "Cook",
    blurb: "Simple meals for one without the overwhelm.",
  },
  {
    id: "Budgeting",
    label: "Budgeting",
    icon: "Budget",
    blurb: "Calm money systems for living alone.",
  },
  {
    id: "Home fixes",
    label: "Home fixes",
    icon: "Home",
    blurb: "Small repairs and home confidence.",
  },
  {
    id: "Emotional regulation",
    label: "Emotional regulation",
    icon: "Care",
    blurb: "Tools for steady evenings and soft resets.",
  },
  {
    id: "Digital safety",
    label: "Digital safety",
    icon: "Safe",
    blurb: "Privacy habits for solo travelers and renters.",
  },
  {
    id: "Travel planning",
    label: "Travel planning",
    icon: "Travel",
    blurb: "Gentle itineraries and packing without spiral.",
  },
];

export const skillListingsSeed: SkillListing[] = [
  {
    id: "offer-1",
    kind: "offer",
    category: "Cooking basics",
    title: "Weeknight meals for one",
    summary: "Three low-mess recipes and a shopping rhythm that fits a small kitchen.",
    ownerId: "u-mira",
    ownerName: "Mira Chen",
    availability: "Weekday evenings",
  },
  {
    id: "offer-2",
    kind: "offer",
    category: "Budgeting",
    title: "Rent buffer spreadsheet",
    summary: "A gentle walkthrough of deposits, utilities, and a safety buffer.",
    ownerId: "u-sam",
    ownerName: "Sam Okonkwo",
    availability: "Weekends",
  },
  {
    id: "offer-3",
    kind: "offer",
    category: "Digital safety",
    title: "Travel phone lock-down",
    summary: "Quick privacy checklist before a solo trip.",
    ownerId: "u-ava",
    ownerName: "Ava Ruiz",
    availability: "Flexible",
  },
  {
    id: "req-1",
    kind: "request",
    category: "Emotional regulation",
    title: "Quiet-night reset tools",
    summary: "Looking for a 20-minute practice when evenings feel heavy.",
    ownerId: "u-jordan",
    ownerName: "Jordan Hale",
    availability: "Evenings",
  },
  {
    id: "req-2",
    kind: "request",
    category: "Home fixes",
    title: "Basic tool confidence",
    summary: "Want help naming what to keep in a small solo toolkit.",
    ownerId: "u-alex",
    ownerName: "Alex Rivera",
    availability: "Weekends",
  },
  {
    id: "req-3",
    kind: "request",
    category: "Travel planning",
    title: "First solo trip outline",
    summary: "Need a calm one-bag plan for a long weekend.",
    ownerId: "u-lee",
    ownerName: "Lee Park",
    availability: "Flexible",
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

export function findSkillMatches(listings: SkillListing[]): SkillMatch[] {
  const offers = listings.filter((item) => item.kind === "offer");
  const requests = listings.filter((item) => item.kind === "request");
  const matches: SkillMatch[] = [];

  for (const offer of offers) {
    for (const request of requests) {
      if (offer.ownerId === request.ownerId) continue;
      if (offer.category !== request.category) continue;
      const score =
        offer.category === request.category
          ? 78 +
            (offer.availability
              .toLowerCase()
              .includes(request.availability.toLowerCase().split(" ")[0] ?? "")
              ? 12
              : 0)
          : 0;
      matches.push({
        id: `match-${offer.id}-${request.id}`,
        offer,
        request,
        score: Math.min(score, 98),
      });
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}
