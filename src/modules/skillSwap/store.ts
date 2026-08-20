import type {
  SkillMatchNotification,
  SkillOffer,
  SkillOfferInput,
  SkillRequest,
  SkillRequestInput,
  SkillSwapMatch,
  SkillSwapMatchView,
} from "./types";
import { skillOffersSeed, skillRequestsSeed } from "./data";
import { findSkillSwapMatches, scoreSkillPair } from "./matching";

const OFFERS_KEY = "gosolo.skills.offers.v1";
const REQUESTS_KEY = "gosolo.skills.requests.v1";
const MATCHES_KEY = "gosolo.skills.matches.v1";
const NOTICES_KEY = "gosolo.skills.notifications.v1";

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

function seededOffers(): SkillOffer[] {
  const stored = readJson<SkillOffer[] | null>(OFFERS_KEY, null);
  if (stored) return stored;
  writeJson(OFFERS_KEY, skillOffersSeed);
  return [...skillOffersSeed];
}

function seededRequests(): SkillRequest[] {
  const stored = readJson<SkillRequest[] | null>(REQUESTS_KEY, null);
  if (stored) return stored;
  writeJson(REQUESTS_KEY, skillRequestsSeed);
  return [...skillRequestsSeed];
}

export function getSkillOffers(): SkillOffer[] {
  return seededOffers().map((offer) => ({ ...offer }));
}

export function getSkillRequests(): SkillRequest[] {
  return seededRequests().map((request) => ({ ...request }));
}

export function getSkillMatches(): SkillSwapMatch[] {
  return readJson<SkillSwapMatch[]>(MATCHES_KEY, []);
}

export function getSkillNotifications(): SkillMatchNotification[] {
  return readJson<SkillMatchNotification[]>(NOTICES_KEY, []);
}

export function createSkillOffer(
  input: SkillOfferInput,
  userId = "you",
  userName = "You",
): SkillOffer {
  const offer: SkillOffer = {
    id: `offer-${Date.now()}`,
    userId,
    userName,
    skillName: input.skillName,
    description: input.description,
    availability: input.availability,
    location: input.location,
  };
  writeJson(OFFERS_KEY, [offer, ...getSkillOffers()]);
  return offer;
}

export function createSkillRequest(
  input: SkillRequestInput,
  userId = "you",
  userName = "You",
): SkillRequest {
  const request: SkillRequest = {
    id: `req-${Date.now()}`,
    userId,
    userName,
    skillName: input.skillName,
    description: input.description,
    urgency: input.urgency,
    location: input.location,
    availability: input.availability,
  };
  writeJson(REQUESTS_KEY, [request, ...getSkillRequests()]);
  return request;
}

function notifyMatch(
  offer: SkillOffer,
  request: SkillRequest,
  match: SkillSwapMatch,
): SkillMatchNotification {
  const notification: SkillMatchNotification = {
    id: `notice-${Date.now()}`,
    offerUserId: offer.userId,
    requestUserId: request.userId,
    message: `Skill swap matched for ${offer.skillName}: ${offer.userName ?? "Offerer"} ↔ ${request.userName ?? "Requester"}.`,
    createdAt: match.createdAt ?? new Date().toISOString(),
    read: false,
  };
  writeJson(NOTICES_KEY, [notification, ...getSkillNotifications()]);
  return notification;
}

export function createSkillMatch(
  offerId: string,
  requestId: string,
  status: SkillSwapMatch["status"] = "accepted",
): { match: SkillSwapMatch; notification: SkillMatchNotification | null } {
  const offer = getSkillOffers().find((item) => item.id === offerId);
  const request = getSkillRequests().find((item) => item.id === requestId);
  if (!offer || !request) {
    throw new Error("Offer and request are required to create a match.");
  }

  const existing = getSkillMatches().find(
    (item) => item.offerId === offerId && item.requestId === requestId,
  );
  if (existing) {
    return { match: existing, notification: null };
  }

  const match: SkillSwapMatch = {
    id: `match-${Date.now()}`,
    offerId,
    requestId,
    status,
    createdAt: new Date().toISOString(),
    score: scoreSkillPair(offer, request),
  };
  writeJson(MATCHES_KEY, [match, ...getSkillMatches()]);
  const notification = notifyMatch(offer, request, match);
  return {
    match: { ...match, notification },
    notification,
  };
}

export function getSuggestedMatches(): SkillSwapMatchView[] {
  return findSkillSwapMatches(getSkillOffers(), getSkillRequests());
}

export function getAcceptedMatchViews(): SkillSwapMatchView[] {
  const offers = getSkillOffers();
  const requests = getSkillRequests();
  return getSkillMatches()
    .filter((match) => match.status === "accepted" || match.status === "completed")
    .map((match) => {
      const offer = offers.find((item) => item.id === match.offerId);
      const request = requests.find((item) => item.id === match.requestId);
      if (!offer || !request) return null;
      return {
        match,
        offer,
        request,
        score: match.score ?? scoreSkillPair(offer, request),
      };
    })
    .filter((item): item is SkillSwapMatchView => Boolean(item));
}
