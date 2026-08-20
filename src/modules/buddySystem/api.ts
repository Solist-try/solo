import type {
  BuddyMatch,
  BuddyProfile,
  BuddyRequest,
} from "./types";
import {
  acceptBuddyByUserId,
  createBuddyRequest,
  getActiveBuddyConnections,
  getBuddyMatches,
  getLocalRecommendations,
} from "./store";

const API_BASE = "/buddies";

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

export async function fetchBuddyRecommendations(filters: {
  interests?: string[];
  availability?: string;
  activity?: string;
}): Promise<BuddyProfile[]> {
  const params = new URLSearchParams();
  if (filters.interests?.length) {
    params.set("interests", filters.interests.join(","));
  }
  if (filters.availability) params.set("availability", filters.availability);
  if (filters.activity) params.set("activity", filters.activity);

  const query = params.toString();
  const remote = await tryFetch<{ recommendations: BuddyProfile[] }>(
    `/recommendations${query ? `?${query}` : ""}`,
  );
  if (remote?.recommendations) return remote.recommendations;
  return getLocalRecommendations(filters);
}

export async function sendBuddyRequest(
  toUserId: string,
  fromUserId = "you",
): Promise<BuddyRequest> {
  const remote = await tryFetch<{ request: BuddyRequest }>("/request", {
    method: "POST",
    body: JSON.stringify({ fromUserId, toUserId }),
  });
  if (remote?.request) return remote.request;
  return createBuddyRequest(fromUserId, toUserId);
}

export async function acceptBuddyRequest(payload: {
  fromUserId: string;
  toUserId: string;
  requestId?: string;
}): Promise<BuddyMatch> {
  const remote = await tryFetch<{ match: BuddyMatch }>("/accept", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (remote?.match) return remote.match;
  return acceptBuddyByUserId(payload.fromUserId, payload.toUserId);
}

export async function fetchBuddyMatches(
  userId = "you",
): Promise<BuddyMatch[]> {
  const remote = await tryFetch<{ matches: BuddyMatch[] }>(
    `/matches?userId=${encodeURIComponent(userId)}`,
  );
  if (remote?.matches) return remote.matches;
  return getBuddyMatches().filter(
    (match) => match.userId === userId || match.buddyId === userId,
  );
}

export { getActiveBuddyConnections };
