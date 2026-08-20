import type {
  SameGoal,
  SamePartnerCandidate,
} from "./types";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function scoreSamePartner(
  myGoal: SameGoal,
  theirGoal: SameGoal,
): number {
  if (myGoal.userId === theirGoal.userId) return 0;
  if (normalize(myGoal.category) !== normalize(theirGoal.category)) return 0;

  let score = 60;
  if (myGoal.frequency === theirGoal.frequency) score += 30;
  else if (
    myGoal.frequency === "flexible" ||
    theirGoal.frequency === "flexible"
  ) {
    score += 18;
  } else {
    score += 8;
  }
  return Math.min(98, score);
}

/** Match partners based on goal category + frequency */
export function matchSamePartners(
  myGoals: SameGoal[],
  otherGoals: SameGoal[],
  options: { minScore?: number; excludeUserIds?: string[] } = {},
): SamePartnerCandidate[] {
  const minScore = options.minScore ?? 55;
  const excluded = new Set(options.excludeUserIds ?? []);
  const candidates = new Map<string, SamePartnerCandidate>();

  for (const mine of myGoals) {
    for (const theirs of otherGoals) {
      if (excluded.has(theirs.userId)) continue;
      const score = scoreSamePartner(mine, theirs);
      if (score < minScore) continue;

      const existing = candidates.get(theirs.userId);
      if (existing && existing.matchScore >= score) continue;

      candidates.set(theirs.userId, {
        userId: theirs.userId,
        name: theirs.userName ?? "Member",
        goal: theirs,
        matchScore: score,
        sharedCategory: mine.category,
        sharedFrequency:
          mine.frequency === theirs.frequency ? mine.frequency : null,
      });
    }
  }

  return [...candidates.values()].sort((a, b) => b.matchScore - a.matchScore);
}

export function buildCheckInPrompt(goal: SameGoal): string {
  const soft = {
    daily: "Just a gentle nudge",
    weekly: "Whenever this week feels right",
    flexible: "No rush — only if it feels supportive",
  } as const;

  return `${soft[goal.frequency]} for “${goal.title}”. A tiny check-in is enough.`;
}
