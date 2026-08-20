import { describe, expect, it } from "vitest";
import { recommendBuddies, scoreBuddyProfile } from "./matching";
import { buddyProfilesSeed } from "./data";
import type { BuddyProfile } from "./types";

describe("buddy matching", () => {
  it("scores shared interests and availability highly", () => {
    const profile: BuddyProfile = {
      userId: "u1",
      name: "Test",
      location: "Lisbon",
      interests: ["Travel", "Walking"],
      preferredActivities: ["meals", "walking"],
      availability: "weekends",
      matchScore: 0,
      bio: "Test bio",
    };

    const score = scoreBuddyProfile(profile, {
      interests: ["Travel", "Meals"],
      availability: "weekends",
      activity: "meals",
    });

    expect(score).toBeGreaterThanOrEqual(50);
  });

  it("returns ranked recommendations with matchScore", () => {
    const results = recommendBuddies(buddyProfilesSeed, {
      interests: ["Travel", "Walking"],
      availability: "flexible",
      activity: "meals",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].matchScore).toBeGreaterThanOrEqual(
      results[results.length - 1].matchScore,
    );
    expect(results.every((item) => item.matchScore >= 35)).toBe(true);
  });
});
