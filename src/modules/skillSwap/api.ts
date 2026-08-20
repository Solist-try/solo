import type {
  SkillOffer,
  SkillOfferInput,
  SkillRequest,
  SkillRequestInput,
  SkillSwapMatch,
  SkillSwapMatchView,
} from "./types";
import { findSkillSwapMatches } from "./matching";
import {
  createSkillMatch,
  createSkillOffer,
  createSkillRequest,
  getAcceptedMatchViews,
  getSkillNotifications,
  getSkillOffers,
  getSkillRequests,
  getSuggestedMatches,
} from "./store";

const API_BASE = "/skills";

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

export async function fetchSkillOffers(): Promise<SkillOffer[]> {
  const remote = await tryFetch<{ offers: SkillOffer[] }>("/offers");
  if (remote?.offers) return remote.offers;
  return getSkillOffers();
}

export async function fetchSkillRequests(): Promise<SkillRequest[]> {
  const remote = await tryFetch<{ requests: SkillRequest[] }>("/requests");
  if (remote?.requests) return remote.requests;
  return getSkillRequests();
}

export async function postSkillOffer(
  input: SkillOfferInput,
  userId = "you",
  userName = "You",
): Promise<SkillOffer> {
  const remote = await tryFetch<{ offer: SkillOffer }>("/offer", {
    method: "POST",
    body: JSON.stringify({ ...input, userId, userName }),
  });
  if (remote?.offer) return remote.offer;
  return createSkillOffer(input, userId, userName);
}

export async function postSkillRequest(
  input: SkillRequestInput,
  userId = "you",
  userName = "You",
): Promise<SkillRequest> {
  const remote = await tryFetch<{ request: SkillRequest }>("/request", {
    method: "POST",
    body: JSON.stringify({ ...input, userId, userName }),
  });
  if (remote?.request) return remote.request;
  return createSkillRequest(input, userId, userName);
}

export async function postSkillMatch(payload: {
  offerId: string;
  requestId: string;
  status?: SkillSwapMatch["status"];
}): Promise<{
  match: SkillSwapMatch;
  notificationMessage?: string;
}> {
  const remote = await tryFetch<{
    match: SkillSwapMatch;
    notification?: { message: string };
  }>("/match", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (remote?.match) {
    try {
      createSkillMatch(
        payload.offerId,
        payload.requestId,
        payload.status ?? "accepted",
      );
    } catch {
      // remote already succeeded
    }
    return {
      match: remote.match,
      notificationMessage: remote.notification?.message,
    };
  }
  const result = createSkillMatch(
    payload.offerId,
    payload.requestId,
    payload.status ?? "accepted",
  );
  return {
    match: result.match,
    notificationMessage: result.notification?.message,
  };
}

export async function loadSkillHub(): Promise<{
  offers: SkillOffer[];
  requests: SkillRequest[];
  suggested: SkillSwapMatchView[];
  accepted: SkillSwapMatchView[];
}> {
  const [offers, requests] = await Promise.all([
    fetchSkillOffers(),
    fetchSkillRequests(),
  ]);
  return {
    offers,
    requests,
    suggested: findSkillSwapMatches(offers, requests),
    accepted: getAcceptedMatchViews(),
  };
}

export { getSkillNotifications, getSuggestedMatches, getAcceptedMatchViews };
