import type {
  BuddyFilters,
  BuddyPreferences,
  BuddyProfile,
  BuddyRecommendationQuery,
} from "./types";
import { buddyProfilesSeed } from "./data";

function asList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function overlapScore(a: string[], b: string[]) {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b.map((item) => item.toLowerCase()));
  const hits = a.filter((item) => setB.has(item.toLowerCase())).length;
  return hits / Math.max(a.length, b.length);
}

export function scoreBuddyProfile(
  buddy: BuddyProfile,
  query: {
    interests?: string[];
    availability?: string;
    activity?: string;
  },
): number {
  const interestScore = overlapScore(
    query.interests ?? [],
    buddy.interests,
  );
  const availabilityScore =
    !query.availability ||
    query.availability === "any" ||
    query.availability === buddy.availability ||
    buddy.availability === "flexible"
      ? 1
      : 0.35;
  const activityScore =
    !query.activity ||
    query.activity === "any" ||
    buddy.preferredActivities.includes(
      query.activity as BuddyProfile["preferredActivities"][number],
    )
      ? 1
      : overlapScore(asList(query.activity), buddy.preferredActivities);

  return Math.round(
    (interestScore * 0.5 + availabilityScore * 0.25 + activityScore * 0.25) *
      100,
  );
}

/** Rank buddies by shared interests + availability (+ optional activity). */
export function recommendBuddies(
  profiles: BuddyProfile[],
  query: BuddyRecommendationQuery = {},
  excludeUserId?: string,
): BuddyProfile[] {
  const interests = asList(query.interests as string[] | string | undefined);
  const availability =
    query.availability && query.availability !== "any"
      ? query.availability
      : undefined;
  const activity =
    query.activity && query.activity !== "any" ? query.activity : undefined;

  return profiles
    .filter((buddy) => buddy.userId !== excludeUserId)
    .map((buddy) => ({
      ...buddy,
      matchScore: scoreBuddyProfile(buddy, {
        interests,
        availability,
        activity,
      }),
    }))
    .filter((buddy) => {
      if (interests.length === 0 && !availability && !activity) return true;
      return buddy.matchScore >= 35;
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function filtersFromPreferences(
  preferences: BuddyPreferences,
): BuddyFilters {
  return {
    interests: preferences.interests,
    availability: preferences.availability[0] ?? "any",
    activity: preferences.preferredActivities[0] ?? "any",
  };
}

/** Legacy helper used by older UI paths */
export function matchBuddies(preferences: BuddyPreferences): BuddyProfile[] {
  return recommendBuddies(buddyProfilesSeed, {
    interests: preferences.interests,
    availability: preferences.availability[0],
    activity: preferences.preferredActivities[0],
  });
}
