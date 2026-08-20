import { describe, expect, it } from "vitest";
import { matchSamePartners, scoreSamePartner } from "./matching";
import { sameGoalsSeed } from "./data";

describe("SAME partner matching", () => {
  it("scores shared category and frequency", () => {
    const mira = sameGoalsSeed.find((g) => g.id === "goal-mira-routine")!;
    const sofia = sameGoalsSeed.find((g) => g.id === "goal-sofia-routine")!;
    expect(scoreSamePartner(mira, sofia)).toBeGreaterThanOrEqual(85);
  });

  it("returns ranked candidates", () => {
    const mine = [sameGoalsSeed[0]];
    const others = sameGoalsSeed.slice(1);
    const matches = matchSamePartners(mine, others);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].matchScore).toBeGreaterThanOrEqual(
      matches[matches.length - 1].matchScore,
    );
  });
});
