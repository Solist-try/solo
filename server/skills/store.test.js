import { describe, expect, it } from "vitest";
import { createSkillStore, scoreSkillPair } from "./store.js";

describe("skill store", () => {
  it("scores skillName + location + availability pairs", () => {
    const store = createSkillStore();
    const offer = store.getOffers().find((item) => item.id === "offer-1");
    const request = store.getRequests().find((item) => item.id === "req-1");
    expect(scoreSkillPair(offer, request)).toBeGreaterThanOrEqual(80);
  });

  it("creates offers, requests, and notified matches", () => {
    const store = createSkillStore();
    const offer = store.createOffer({
      skillName: "Cooking",
      description: "One-pan meals",
      availability: "evenings",
      location: "Lisbon",
      userId: "you",
      userName: "You",
    });
    const request = store.createRequest({
      skillName: "Cooking",
      description: "Need weeknight help",
      urgency: "high",
      location: "Lisbon",
      availability: "evenings",
      userId: "u-friend",
      userName: "Friend",
    });
    const { match, notification } = store.createMatch({
      offerId: offer.id,
      requestId: request.id,
    });
    expect(match.status).toBe("accepted");
    expect(notification.offerUserId).toBe("you");
    expect(notification.requestUserId).toBe("u-friend");
    expect(store.getNotifications()).toHaveLength(1);
  });
});
