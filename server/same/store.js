const goalsSeed = [
  {
    id: "goal-mira-routine",
    userId: "u-mira",
    userName: "Mira Chen",
    title: "Evening wind-down",
    description: "Ten quiet minutes before screens go off.",
    frequency: "daily",
    category: "routines",
    createdAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "goal-jordan-habit",
    userId: "u-jordan",
    userName: "Jordan Hale",
    title: "Morning stretch",
    description: "A short stretch before coffee — no perfection required.",
    frequency: "daily",
    category: "habits",
    createdAt: "2026-08-02T10:00:00.000Z",
  },
  {
    id: "goal-ava-learn",
    userId: "u-ava",
    userName: "Ava Ruiz",
    title: "Language practice",
    description: "Fifteen minutes of phrases twice a week.",
    frequency: "weekly",
    category: "learning",
    createdAt: "2026-08-03T10:00:00.000Z",
  },
  {
    id: "goal-sam-fitness",
    userId: "u-sam",
    userName: "Sam Okonkwo",
    title: "Neighborhood walk",
    description: "One gentle walk loop on weekends.",
    frequency: "weekly",
    category: "fitness",
    createdAt: "2026-08-04T10:00:00.000Z",
  },
  {
    id: "goal-lee-creative",
    userId: "u-lee",
    userName: "Lee Park",
    title: "Sketch pages",
    description: "Fill one page when energy allows.",
    frequency: "flexible",
    category: "creative work",
    createdAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "goal-sofia-routine",
    userId: "u-sofia",
    userName: "Sofia L.",
    title: "Morning tea ritual",
    description: "Sit with tea before opening messages.",
    frequency: "daily",
    category: "routines",
    createdAt: "2026-08-06T10:00:00.000Z",
  },
];

function normalize(value = "") {
  return String(value).trim().toLowerCase();
}

function scoreSamePartner(myGoal, theirGoal) {
  if (myGoal.userId === theirGoal.userId) return 0;
  if (normalize(myGoal.category) !== normalize(theirGoal.category)) return 0;
  let score = 60;
  if (myGoal.frequency === theirGoal.frequency) score += 30;
  else if (
    myGoal.frequency === "flexible" ||
    theirGoal.frequency === "flexible"
  ) {
    score += 18;
  } else {
    score += 8;
  }
  return Math.min(98, score);
}

function createSameStore(seed = {}) {
  let goals = [...(seed.goals || goalsSeed)];
  let partners = [...(seed.partners || [])];
  let requests = [...(seed.requests || [])];
  let checkIns = [...(seed.checkIns || [])];
  let prompts = [...(seed.prompts || [])];

  return {
    getGoals(userId) {
      const all = goals.map((goal) => ({ ...goal }));
      if (!userId) return all;
      return all.filter((goal) => goal.userId === userId);
    },
    createGoal(input) {
      const goal = {
        id: `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userId: input.userId || "you",
        userName: input.userName || "You",
        title: input.title,
        description: input.description,
        frequency: input.frequency,
        category: input.category,
        createdAt: new Date().toISOString(),
      };
      goals = [goal, ...goals];
      return goal;
    },
    requestPartner({ fromUserId, toUserId, goalId }) {
      const request = {
        id: `preq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        fromUserId,
        toUserId,
        goalId,
        status: "accepted",
        createdAt: new Date().toISOString(),
      };
      requests = [request, ...requests];

      const theirGoal = goals.find((goal) => goal.userId === toUserId);
      const partner = {
        userId: fromUserId,
        partnerId: toUserId,
        partnerName: theirGoal?.userName || "Partner",
        createdAt: request.createdAt,
        sharedCategory: theirGoal?.category,
        sharedFrequency: theirGoal?.frequency,
      };
      const exists = partners.find(
        (item) =>
          (item.userId === fromUserId && item.partnerId === toUserId) ||
          (item.userId === toUserId && item.partnerId === fromUserId),
      );
      if (!exists) partners = [partner, ...partners];
      return { request, partner: exists || partner };
    },
    createCheckIn(input) {
      const checkIn = {
        id: `check-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        goalId: input.goalId,
        userId: input.userId || "you",
        timestamp: new Date().toISOString(),
        status: input.status,
        note: input.note,
      };
      checkIns = [checkIn, ...checkIns];

      const goal = goals.find((item) => item.id === input.goalId);
      if (goal) {
        prompts = [
          {
            id: `prompt-${Date.now()}`,
            goalId: goal.id,
            message: `Thanks for checking in on “${goal.title}”. Rest is welcome too.`,
            createdAt: checkIn.timestamp,
          },
          ...prompts,
        ];
      }
      return checkIn;
    },
    getPartners(userId) {
      return partners.filter(
        (item) => item.userId === userId || item.partnerId === userId,
      );
    },
    getCheckIns(goalId) {
      const all = checkIns.map((item) => ({ ...item }));
      if (!goalId) return all;
      return all.filter((item) => item.goalId === goalId);
    },
    getPrompts() {
      return prompts.map((item) => ({ ...item }));
    },
    matchPartners(userId = "you") {
      const mine = goals.filter((goal) => goal.userId === userId);
      const others = goals.filter((goal) => goal.userId !== userId);
      const partnerIds = new Set(
        partners.flatMap((item) => [item.userId, item.partnerId]),
      );
      const myGoals =
        mine.length > 0
          ? mine
          : [
              {
                id: "temp",
                userId,
                category: "habits",
                frequency: "flexible",
              },
            ];
      const candidates = [];
      for (const myGoal of myGoals) {
        for (const theirs of others) {
          if (partnerIds.has(theirs.userId)) continue;
          const score = scoreSamePartner(myGoal, theirs);
          if (score < 55) continue;
          candidates.push({
            userId: theirs.userId,
            name: theirs.userName || "Member",
            goal: theirs,
            matchScore: score,
            sharedCategory: myGoal.category,
            sharedFrequency:
              myGoal.frequency === theirs.frequency ? myGoal.frequency : null,
          });
        }
      }
      return candidates.sort((a, b) => b.matchScore - a.matchScore);
    },
  };
}

export { createSameStore, scoreSamePartner, goalsSeed };
