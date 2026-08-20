import type {
  SameCheckIn,
  SameCheckInInput,
  SameGoal,
  SameGoalInput,
  SamePartner,
  SamePartnerRequest,
  SamePrompt,
} from "./types";
import {
  sameCheckInsSeed,
  sameGoalsSeed,
  samePartnersSeed,
} from "./data";
import { buildCheckInPrompt, matchSamePartners } from "./matching";

const GOALS_KEY = "gosolo.same.goals.v1";
const PARTNERS_KEY = "gosolo.same.partners.v1";
const REQUESTS_KEY = "gosolo.same.partnerRequests.v1";
const CHECKINS_KEY = "gosolo.same.checkins.v1";
const PROMPTS_KEY = "gosolo.same.prompts.v1";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function ensureGoals(): SameGoal[] {
  const stored = readJson<SameGoal[] | null>(GOALS_KEY, null);
  if (stored) return stored;
  writeJson(GOALS_KEY, sameGoalsSeed);
  return [...sameGoalsSeed];
}

function ensureCheckIns(): SameCheckIn[] {
  const stored = readJson<SameCheckIn[] | null>(CHECKINS_KEY, null);
  if (stored) return stored;
  writeJson(CHECKINS_KEY, sameCheckInsSeed);
  return [...sameCheckInsSeed];
}

export function getSameGoals(userId?: string): SameGoal[] {
  const all = ensureGoals().map((goal) => ({ ...goal }));
  if (!userId) return all;
  return all.filter((goal) => goal.userId === userId);
}

export function getSamePartners(userId = "you"): SamePartner[] {
  const partners = readJson<SamePartner[]>(PARTNERS_KEY, samePartnersSeed);
  return partners.filter(
    (item) => item.userId === userId || item.partnerId === userId,
  );
}

export function getSameCheckIns(goalId?: string): SameCheckIn[] {
  const all = ensureCheckIns().map((item) => ({ ...item }));
  if (!goalId) return all;
  return all.filter((item) => item.goalId === goalId);
}

export function getSamePrompts(): SamePrompt[] {
  return readJson<SamePrompt[]>(PROMPTS_KEY, []);
}

export function createSameGoal(
  input: SameGoalInput,
  userId = "you",
  userName = "You",
): SameGoal {
  const goal: SameGoal = {
    id: `goal-${Date.now()}`,
    userId,
    userName,
    title: input.title,
    description: input.description,
    frequency: input.frequency,
    category: input.category,
    createdAt: new Date().toISOString(),
  };
  writeJson(GOALS_KEY, [goal, ...ensureGoals()]);
  return goal;
}

export function requestSamePartner(
  fromUserId: string,
  toUserId: string,
  goalId?: string,
): { request: SamePartnerRequest; partner: SamePartner } {
  const requests = readJson<SamePartnerRequest[]>(REQUESTS_KEY, []);
  const request: SamePartnerRequest = {
    id: `preq-${Date.now()}`,
    fromUserId,
    toUserId,
    goalId,
    status: "accepted",
    createdAt: new Date().toISOString(),
  };
  writeJson(REQUESTS_KEY, [request, ...requests]);

  const goals = ensureGoals();
  const theirGoal = goals.find((goal) => goal.userId === toUserId);
  const partner: SamePartner = {
    userId: fromUserId,
    partnerId: toUserId,
    partnerName: theirGoal?.userName ?? "Partner",
    createdAt: request.createdAt,
    sharedCategory: theirGoal?.category,
    sharedFrequency: theirGoal?.frequency,
  };
  const partners = readJson<SamePartner[]>(PARTNERS_KEY, []);
  const exists = partners.find(
    (item) =>
      (item.userId === fromUserId && item.partnerId === toUserId) ||
      (item.userId === toUserId && item.partnerId === fromUserId),
  );
  if (!exists) {
    writeJson(PARTNERS_KEY, [partner, ...partners]);
  }
  return { request, partner: exists ?? partner };
}

export function createSameCheckIn(
  input: SameCheckInInput,
  userId = "you",
): SameCheckIn {
  const checkIn: SameCheckIn = {
    id: `check-${Date.now()}`,
    goalId: input.goalId,
    userId,
    timestamp: new Date().toISOString(),
    status: input.status,
    note: input.note,
  };
  writeJson(CHECKINS_KEY, [checkIn, ...ensureCheckIns()]);
  return checkIn;
}

export function queueGentlePrompts(userId = "you"): SamePrompt[] {
  const myGoals = getSameGoals(userId);
  const prompts = myGoals.map((goal) => ({
    id: `prompt-${goal.id}-${Date.now()}`,
    goalId: goal.id,
    message: buildCheckInPrompt(goal),
    createdAt: new Date().toISOString(),
  }));
  writeJson(PROMPTS_KEY, prompts);
  return prompts;
}

export function getPartnerCandidates(userId = "you") {
  const myGoals = getSameGoals(userId);
  const partnerIds = getSamePartners(userId).flatMap((item) => [
    item.userId,
    item.partnerId,
  ]);
  const otherGoals = ensureGoals().filter((goal) => goal.userId !== userId);
  return matchSamePartners(myGoals.length ? myGoals : ensureGoals().filter((g) => g.userId === "you"), otherGoals, {
    excludeUserIds: [userId, ...partnerIds],
  });
}
