import type {
  SameCheckIn,
  SameCheckInInput,
  SameGoal,
  SameGoalInput,
  SamePartner,
  SamePartnerCandidate,
  SamePrompt,
} from "./types";
import {
  createSameCheckIn,
  createSameGoal,
  getPartnerCandidates,
  getSameCheckIns,
  getSameGoals,
  getSamePartners,
  getSamePrompts,
  queueGentlePrompts,
  requestSamePartner,
} from "./store";
import { matchSamePartners } from "./matching";

const API_BASE = "/same";

async function tryFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      ...init,
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchSameGoals(userId?: string): Promise<SameGoal[]> {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
  const remote = await tryFetch<{ goals: SameGoal[] }>(`/goals${query}`);
  if (remote?.goals) return remote.goals;
  return userId ? getSameGoals(userId) : getSameGoals();
}

export async function postSameGoal(
  input: SameGoalInput,
  userId = "you",
  userName = "You",
): Promise<SameGoal> {
  const remote = await tryFetch<{ goal: SameGoal }>("/goal", {
    method: "POST",
    body: JSON.stringify({ ...input, userId, userName }),
  });
  if (remote?.goal) {
    try {
      createSameGoal(input, userId, userName);
    } catch {
      // remote ok
    }
    return remote.goal;
  }
  return createSameGoal(input, userId, userName);
}

export async function postSamePartnerRequest(payload: {
  fromUserId: string;
  toUserId: string;
  goalId?: string;
}): Promise<{ partner: SamePartner }> {
  const remote = await tryFetch<{
    partner: SamePartner;
    request?: unknown;
  }>("/partner/request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (remote?.partner) {
    try {
      requestSamePartner(
        payload.fromUserId,
        payload.toUserId,
        payload.goalId,
      );
    } catch {
      // remote ok
    }
    return { partner: remote.partner };
  }
  const result = requestSamePartner(
    payload.fromUserId,
    payload.toUserId,
    payload.goalId,
  );
  return { partner: result.partner };
}

export async function postSameCheckIn(
  input: SameCheckInInput,
  userId = "you",
): Promise<SameCheckIn> {
  const remote = await tryFetch<{ checkIn: SameCheckIn }>("/checkin", {
    method: "POST",
    body: JSON.stringify({ ...input, userId }),
  });
  if (remote?.checkIn) {
    try {
      createSameCheckIn(input, userId);
    } catch {
      // remote ok
    }
    return remote.checkIn;
  }
  return createSameCheckIn(input, userId);
}

export async function loadSameDashboard(userId = "you"): Promise<{
  goals: SameGoal[];
  allGoals: SameGoal[];
  partners: SamePartner[];
  checkIns: SameCheckIn[];
  candidates: SamePartnerCandidate[];
  prompts: SamePrompt[];
}> {
  const allGoals = await fetchSameGoals();
  const goals = allGoals.filter((goal) => goal.userId === userId);
  const partners = getSamePartners(userId);
  const checkIns = getSameCheckIns();
  const partnerIds = partners.flatMap((item) => [item.userId, item.partnerId]);
  const myGoalsForMatch =
    goals.length > 0
      ? goals
      : [
          {
            id: "temp-you",
            userId,
            userName: "You",
            title: "Looking for support",
            description: "Open to a gentle accountability partner.",
            frequency: "flexible" as const,
            category: "habits" as const,
          },
        ];
  const candidates = matchSamePartners(
    myGoalsForMatch,
    allGoals.filter((goal) => goal.userId !== userId),
    { excludeUserIds: [userId, ...partnerIds] },
  );
  const prompts =
    getSamePrompts().length > 0
      ? getSamePrompts()
      : queueGentlePrompts(userId);

  return {
    goals,
    allGoals,
    partners,
    checkIns,
    candidates: candidates.length ? candidates : getPartnerCandidates(userId),
    prompts,
  };
}

export { getSamePartners, getSameCheckIns, queueGentlePrompts };
