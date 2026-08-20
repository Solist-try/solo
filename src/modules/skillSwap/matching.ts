import type {
  SkillOffer,
  SkillRequest,
  SkillSwapMatchView,
} from "./types";

function normalize(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function locationsOverlap(a?: string, b?: string): boolean {
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return true;
  if (left === "anywhere" || right === "anywhere" || left === "remote" || right === "remote") {
    return true;
  }
  return left.includes(right) || right.includes(left);
}

function availabilityOverlap(
  offerAvailability: string,
  requestAvailability?: string,
): boolean {
  if (!requestAvailability) return true;
  const left = normalize(offerAvailability);
  const right = normalize(requestAvailability);
  if (left === "flexible" || right === "flexible") return true;
  return left === right || left.includes(right) || right.includes(left);
}

export function scoreSkillPair(
  offer: SkillOffer,
  request: SkillRequest,
): number {
  if (normalize(offer.skillName) !== normalize(request.skillName)) return 0;
  if (offer.userId === request.userId) return 0;

  let score = 55;
  if (locationsOverlap(offer.location, request.location)) score += 25;
  if (availabilityOverlap(offer.availability, request.availability)) score += 15;
  if (request.urgency === "high") score += 5;
  else if (request.urgency === "medium") score += 2;

  return Math.min(98, score);
}

/** Match offers and requests by skillName + location + availability */
export function findSkillSwapMatches(
  offers: SkillOffer[],
  requests: SkillRequest[],
  options: { minScore?: number } = {},
): SkillSwapMatchView[] {
  const minScore = options.minScore ?? 55;
  const views: SkillSwapMatchView[] = [];

  for (const offer of offers) {
    for (const request of requests) {
      const score = scoreSkillPair(offer, request);
      if (score < minScore) continue;
      views.push({
        match: {
          offerId: offer.id,
          requestId: request.id,
          status: "suggested",
          score,
        },
        offer,
        request,
        score,
      });
    }
  }

  return views.sort((a, b) => b.score - a.score);
}
