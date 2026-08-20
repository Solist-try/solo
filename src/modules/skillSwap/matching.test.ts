import { describe, expect, it } from "vitest";
import { findSkillSwapMatches, scoreSkillPair } from "./matching";
import { skillOffersSeed, skillRequestsSeed } from "./data";

describe("skill swap matching", () => {
  it("scores matching skillName + location + availability", () => {
    const offer = skillOffersSeed.find((item) => item.id === "offer-1")!;
    const request = skillRequestsSeed.find((item) => item.id === "req-1")!;
    expect(scoreSkillPair(offer, request)).toBeGreaterThanOrEqual(80);
  });

  it("returns ranked matches across seeds", () => {
    const matches = findSkillSwapMatches(skillOffersSeed, skillRequestsSeed);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].score).toBeGreaterThanOrEqual(
      matches[matches.length - 1].score,
    );
    expect(matches[0].offer.skillName).toBe(matches[0].request.skillName);
  });
});
