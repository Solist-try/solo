const profiles = [
  {
    userId: "buddy-mira",
    name: "Mira Chen",
    location: "Lisbon · remote-friendly",
    interests: ["Travel", "Solo Living", "Safety"],
    preferredActivities: ["travel", "walking", "meals"],
    availability: "weekends",
    matchScore: 0,
    bio: "Soft check-ins and calm travel days.",
  },
  {
    userId: "buddy-jordan",
    name: "Jordan Hale",
    location: "Berlin · evenings",
    interests: ["Walking", "Co-working", "Emotional Support"],
    preferredActivities: ["walking", "co-working", "shared interests"],
    availability: "evenings",
    matchScore: 0,
    bio: "Evening walks and co-working quiet hours.",
  },
  {
    userId: "buddy-ava",
    name: "Ava Ruiz",
    location: "Mexico City · hybrid",
    interests: ["Meals", "Practical Tips", "Solo Living"],
    preferredActivities: ["meals", "shared interests"],
    availability: "weekdays",
    matchScore: 0,
    bio: "Meal swaps and practical solo-living systems.",
  },
  {
    userId: "buddy-sam",
    name: "Sam Okonkwo",
    location: "Lagos · short trips",
    interests: ["Travel", "Safety", "Money & Housing"],
    preferredActivities: ["travel", "meals"],
    availability: "short-term",
    matchScore: 0,
    bio: "Short-term travel buddies and digital safety notes.",
  },
  {
    userId: "buddy-lee",
    name: "Lee Park",
    location: "Seoul · long-term",
    interests: ["Co-working", "Walking", "Practical Tips"],
    preferredActivities: ["co-working", "walking"],
    availability: "long-term",
    matchScore: 0,
    bio: "Long-term co-working rhythm and weekend walking loops.",
  },
];

function overlap(a = [], b = []) {
  const setB = new Set(b.map((item) => String(item).toLowerCase()));
  return a.filter((item) => setB.has(String(item).toLowerCase())).length;
}

function scoreBuddyProfile(profile, filters = {}) {
  const interests = filters.interests || [];
  const interestHits = overlap(interests, profile.interests || []);
  const interestScore =
    interests.length === 0
      ? 0.5
      : interestHits / Math.max(interests.length, profile.interests.length || 1);

  const availabilityScore =
    !filters.availability ||
    filters.availability === "any" ||
    filters.availability === "flexible" ||
    profile.availability === "flexible" ||
    profile.availability === filters.availability
      ? 1
      : 0.35;

  const activity = filters.activity;
  const activityScore =
    !activity ||
    activity === "any" ||
    (profile.preferredActivities || []).includes(activity)
      ? 1
      : 0.25;

  return Math.round(
    (interestScore * 0.5 + availabilityScore * 0.25 + activityScore * 0.25) *
      100,
  );
}

function recommendBuddies({
  profiles: list = profiles,
  interests,
  availability,
  activity,
  excludeUserIds = [],
} = {}) {
  const excluded = new Set(excludeUserIds);
  return list
    .filter((profile) => !excluded.has(profile.userId))
    .map((profile) => ({
      ...profile,
      matchScore: scoreBuddyProfile(profile, {
        interests,
        availability,
        activity,
      }),
    }))
    .filter((profile) => {
      if (
        (!interests || interests.length === 0) &&
        !availability &&
        !activity
      ) {
        return true;
      }
      return profile.matchScore >= 35;
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

function createBuddyStore(seed = {}) {
  let requests = [...(seed.requests || [])];
  let matches = [...(seed.matches || [])];

  return {
    getProfiles() {
      return profiles.map((profile) => ({ ...profile }));
    },
    getRequests() {
      return requests.map((request) => ({ ...request }));
    },
    getMatches(userId) {
      const all = matches.map((match) => ({ ...match }));
      if (!userId) return all;
      return all.filter(
        (match) => match.userId === userId || match.buddyId === userId,
      );
    },
    recommendations(filters = {}) {
      return recommendBuddies({
        profiles,
        interests: filters.interests,
        availability: filters.availability,
        activity: filters.activity,
        excludeUserIds: [
          filters.userId || "you",
          ...matches.flatMap((match) => [match.userId, match.buddyId]),
        ],
      });
    },
    createRequest(fromUserId, toUserId) {
      const existing = requests.find(
        (request) =>
          request.fromUserId === fromUserId &&
          request.toUserId === toUserId &&
          request.status === "pending",
      );
      if (existing) return existing;
      const request = {
        id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        fromUserId,
        toUserId,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      requests = [request, ...requests];
      return request;
    },
    acceptRequest({ fromUserId, toUserId, requestId, currentUserId = "you" }) {
      let request = null;
      if (requestId) {
        request = requests.find((item) => item.id === requestId) || null;
      } else {
        request =
          requests.find(
            (item) =>
              item.fromUserId === fromUserId &&
              item.toUserId === toUserId &&
              item.status === "pending",
          ) || null;
      }

      if (request) {
        request = { ...request, status: "accepted" };
        requests = requests.map((item) =>
          item.id === request.id ? request : item,
        );
      }

      const buddyId =
        toUserId === currentUserId ? fromUserId : toUserId || fromUserId;
      const existing = matches.find(
        (match) =>
          (match.userId === currentUserId && match.buddyId === buddyId) ||
          (match.userId === buddyId && match.buddyId === currentUserId),
      );
      if (existing) {
        return { request, match: existing };
      }

      const match = {
        id: `match-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userId: currentUserId,
        buddyId,
        createdAt: new Date().toISOString(),
      };
      matches = [match, ...matches];
      return { request, match };
    },
  };
}

export {
  profiles,
  createBuddyStore,
  recommendBuddies,
  scoreBuddyProfile,
};
