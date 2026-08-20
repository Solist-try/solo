import { describe, expect, it } from "vitest";
import { createSameStore, scoreSamePartner } from "./store.js";

describe("SAME store", () => {
  it("scores partners by category and frequency", () => {
    const store = createSameStore();
    const mira = store.getGoals().find((g) => g.id === "goal-mira-routine");
    const sofia = store.getGoals().find((g) => g.id === "goal-sofia-routine");
    expect(scoreSamePartner(mira, sofia)).toBeGreaterThanOrEqual(85);
  });

  it("creates goals, partners, and check-ins", () => {
    const store = createSameStore();
    const goal = store.createGoal({
      title: "Read 10 pages",
      description: "Soft reading habit",
      frequency: "daily",
      category: "learning",
      userId: "you",
      userName: "You",
    });
    expect(goal.title).toBe("Read 10 pages");

    const { partner } = store.requestPartner({
      fromUserId: "you",
      toUserId: "u-ava",
      goalId: goal.id,
    });
    expect(partner.partnerId).toBe("u-ava");

    const checkIn = store.createCheckIn({
      goalId: goal.id,
      userId: "you",
      status: "done",
      note: "Felt calm",
    });
    expect(checkIn.status).toBe("done");
    expect(store.getCheckIns(goal.id)).toHaveLength(1);
  });
});
