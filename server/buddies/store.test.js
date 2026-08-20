import { describe, expect, it } from "vitest";
import { createBuddyStore, recommendBuddies } from "./store.js";

describe("buddy store", () => {
  it("ranks recommendations by shared interests and availability", () => {
    const recommendations = recommendBuddies({
      profiles: createBuddyStore().getProfiles(),
      interests: ["Travel", "Walking"],
      availability: "weekends",
      activity: "meals",
    });

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].matchScore).toBeGreaterThanOrEqual(
      recommendations.at(-1).matchScore,
    );
  });

  it("creates requests and accepted matches", () => {
    const store = createBuddyStore();
    const request = store.createRequest("you", "buddy-mira");
    expect(request.status).toBe("pending");

    const { match } = store.acceptRequest({
      fromUserId: "you",
      toUserId: "buddy-mira",
      currentUserId: "you",
    });

    expect(match.userId).toBe("you");
    expect(match.buddyId).toBe("buddy-mira");
    expect(store.getMatches("you")).toHaveLength(1);
  });
});
