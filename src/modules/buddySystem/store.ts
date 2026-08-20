import type {
  BuddyConnectionSummary,
  BuddyMatch,
  BuddyPreferences,
  BuddyProfile,
  BuddyRequest,
  BuddyRequestStatus,
} from "./types";
import { buddyProfilesSeed } from "./data";
import { recommendBuddies } from "./matching";

const MATCHES_KEY = "gosolo.buddy.matches.v1";
const REQUESTS_KEY = "gosolo.buddy.requests.v1";
const PREFS_KEY = "gosolo.buddy.preferences.v1";

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

export function getBuddyProfiles(): BuddyProfile[] {
  return buddyProfilesSeed.map((profile) => ({ ...profile }));
}

export function getBuddyPreferences(): BuddyPreferences | null {
  return readJson<BuddyPreferences | null>(PREFS_KEY, null);
}

export function saveBuddyPreferences(preferences: BuddyPreferences) {
  writeJson(PREFS_KEY, preferences);
}

export function getBuddyRequests(): BuddyRequest[] {
  return readJson<BuddyRequest[]>(REQUESTS_KEY, []);
}

export function getBuddyMatches(): BuddyMatch[] {
  return readJson<BuddyMatch[]>(MATCHES_KEY, []);
}

export function getActiveBuddyConnections(
  currentUserId = "you",
): BuddyConnectionSummary[] {
  const profiles = getBuddyProfiles();
  return getBuddyMatches()
    .filter(
      (match) =>
        match.userId === currentUserId || match.buddyId === currentUserId,
    )
    .map((match) => {
      const buddyId =
        match.userId === currentUserId ? match.buddyId : match.userId;
      const profile = profiles.find((item) => item.userId === buddyId);
      return {
        match,
        buddyId,
        name: profile?.name ?? "Buddy",
        location: profile?.location ?? "Unknown",
        preferredActivities: profile?.preferredActivities ?? [],
        createdAt: match.createdAt,
      };
    });
}

export function createBuddyRequest(
  fromUserId: string,
  toUserId: string,
): BuddyRequest {
  const requests = getBuddyRequests();
  const existing = requests.find(
    (request) =>
      request.fromUserId === fromUserId &&
      request.toUserId === toUserId &&
      request.status === "pending",
  );
  if (existing) return existing;

  const request: BuddyRequest = {
    id: `req-${Date.now()}`,
    fromUserId,
    toUserId,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  writeJson(REQUESTS_KEY, [request, ...requests]);
  return request;
}

export function updateBuddyRequestStatus(
  requestId: string,
  status: BuddyRequestStatus,
  currentUserId = "you",
): { request: BuddyRequest | null; match: BuddyMatch | null } {
  const requests = getBuddyRequests();
  const index = requests.findIndex((request) => request.id === requestId);
  if (index < 0) return { request: null, match: null };

  const updated: BuddyRequest = { ...requests[index], status };
  const nextRequests = [...requests];
  nextRequests[index] = updated;
  writeJson(REQUESTS_KEY, nextRequests);

  if (status !== "accepted") {
    return { request: updated, match: null };
  }

  const buddyId =
    updated.fromUserId === currentUserId
      ? updated.toUserId
      : updated.fromUserId;
  const match = createBuddyMatch(currentUserId, buddyId);
  return { request: updated, match };
}

export function acceptBuddyByUserId(
  fromUserId: string,
  toUserId: string,
  currentUserId = "you",
): BuddyMatch {
  const requests = getBuddyRequests();
  const pending = requests.find(
    (request) =>
      request.fromUserId === fromUserId &&
      request.toUserId === toUserId &&
      request.status === "pending",
  );

  if (pending) {
    const result = updateBuddyRequestStatus(
      pending.id,
      "accepted",
      currentUserId,
    );
    if (result.match) return result.match;
  }

  const buddyId = toUserId === currentUserId ? fromUserId : toUserId;
  return createBuddyMatch(currentUserId, buddyId);
}

export function createBuddyMatch(userId: string, buddyId: string): BuddyMatch {
  const matches = getBuddyMatches();
  const exists = matches.find(
    (match) =>
      (match.userId === userId && match.buddyId === buddyId) ||
      (match.userId === buddyId && match.buddyId === userId),
  );
  if (exists) return exists;

  const match: BuddyMatch = {
    id: `match-${Date.now()}`,
    userId,
    buddyId,
    createdAt: new Date().toISOString(),
  };
  writeJson(MATCHES_KEY, [match, ...matches]);
  return match;
}

export function getLocalRecommendations(filters: {
  interests?: string[];
  availability?: string;
  activity?: string;
  currentUserId?: string;
}): BuddyProfile[] {
  const preferences = getBuddyPreferences();
  const matchedIds = new Set(
    getBuddyMatches().flatMap((match) => [match.userId, match.buddyId]),
  );
  const currentUserId = filters.currentUserId ?? "you";

  return recommendBuddies(
    getBuddyProfiles().filter(
      (profile) =>
        profile.userId !== currentUserId && !matchedIds.has(profile.userId),
    ),
    {
      interests: (filters.interests?.length
        ? filters.interests
        : preferences?.interests) as BuddyProfile["interests"] | undefined,
      availability:
        (filters.availability as BuddyProfile["availability"] | undefined) ||
        preferences?.availability?.[0],
      activity:
        (filters.activity as BuddyProfile["preferredActivities"][number] | undefined) ||
        preferences?.preferredActivities?.[0],
    },
    currentUserId,
  );
}
