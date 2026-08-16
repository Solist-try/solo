import type { BuddyPreferences, BuddyProfile } from "./types";
import { buddyCatalog } from "./data";

function overlapScore(a: string[], b: string[]) {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b);
  const hits = a.filter((item) => setB.has(item)).length;
  return hits / Math.max(a.length, b.length);
}

/** Rank buddies by goals, interests, availability, and connection mode. */
export function matchBuddies(preferences: BuddyPreferences): BuddyProfile[] {
  return buddyCatalog
    .map((buddy) => {
      const sharedGoals = buddy.goals.filter((goal) =>
        preferences.goals.includes(goal),
      );
      const goalScore = overlapScore(preferences.goals, buddy.goals);
      const interestScore = overlapScore(preferences.interests, buddy.interests);
      const availabilityScore = overlapScore(
        preferences.availability,
        buddy.availability,
      );
      const modeScore =
        buddy.connectionMode === preferences.connectionMode ? 1 : 0.55;

      const compatibility = Math.round(
        (goalScore * 0.4 +
          interestScore * 0.25 +
          availabilityScore * 0.2 +
          modeScore * 0.15) *
          100,
      );

      return {
        ...buddy,
        sharedGoals,
        compatibility,
      };
    })
    .sort((a, b) => b.compatibility - a.compatibility);
}
