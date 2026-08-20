const offersSeed = [
  {
    id: "offer-1",
    userId: "u-mira",
    userName: "Mira Chen",
    skillName: "Cooking",
    description:
      "Three low-mess weeknight recipes and a shopping rhythm for a small kitchen.",
    availability: "evenings",
    location: "Lisbon",
  },
  {
    id: "offer-2",
    userId: "u-sam",
    userName: "Sam Okonkwo",
    skillName: "Tech help",
    description:
      "Calm walkthrough of travel apps, offline maps, and phone lock-down basics.",
    availability: "weekends",
    location: "Lagos",
  },
  {
    id: "offer-3",
    userId: "u-ava",
    userName: "Ava Ruiz",
    skillName: "Photography",
    description:
      "Soft light tips for capturing markets and quiet streets without gear stress.",
    availability: "flexible",
    location: "Mexico City",
  },
  {
    id: "offer-4",
    userId: "u-lee",
    userName: "Lee Park",
    skillName: "Languages",
    description:
      "Gentle conversation practice for travel phrases — no judgment, short sessions.",
    availability: "weekdays",
    location: "Seoul",
  },
  {
    id: "offer-5",
    userId: "u-noah",
    userName: "Noah P.",
    skillName: "Local guidance",
    description:
      "Neighborhood orientation walks and café recommendations for arriving solo.",
    availability: "flexible",
    location: "Chiang Mai",
  },
];

const requestsSeed = [
  {
    id: "req-1",
    userId: "u-jordan",
    userName: "Jordan Hale",
    skillName: "Cooking",
    description: "Looking for a 30-minute intro to cooking for one.",
    urgency: "medium",
    location: "Lisbon",
    availability: "evenings",
  },
  {
    id: "req-2",
    userId: "u-alex",
    userName: "Alex Rivera",
    skillName: "Local guidance",
    description: "Need a calm first-day map of a new neighborhood.",
    urgency: "high",
    location: "Chiang Mai",
    availability: "flexible",
  },
  {
    id: "req-3",
    userId: "u-sofia",
    userName: "Sofia L.",
    skillName: "Photography",
    description: "Want help framing market photos on a phone camera.",
    urgency: "low",
    location: "Mexico City",
    availability: "weekends",
  },
  {
    id: "req-4",
    userId: "u-amir",
    userName: "Amir N.",
    skillName: "Languages",
    description: "Practice basic greetings before a short trip.",
    urgency: "medium",
    location: "Seoul",
    availability: "weekdays",
  },
  {
    id: "req-5",
    userId: "u-elena",
    userName: "Elena S.",
    skillName: "Tech help",
    description: "Need help setting offline maps before travel.",
    urgency: "high",
    location: "Lagos",
    availability: "weekends",
  },
];

function normalize(value = "") {
  return String(value).trim().toLowerCase();
}

function locationsOverlap(a, b) {
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return true;
  if (
    left === "anywhere" ||
    right === "anywhere" ||
    left === "remote" ||
    right === "remote"
  ) {
    return true;
  }
  return left.includes(right) || right.includes(left);
}

function availabilityOverlap(offerAvailability, requestAvailability) {
  if (!requestAvailability) return true;
  const left = normalize(offerAvailability);
  const right = normalize(requestAvailability);
  if (left === "flexible" || right === "flexible") return true;
  return left === right || left.includes(right) || right.includes(left);
}

function scoreSkillPair(offer, request) {
  if (normalize(offer.skillName) !== normalize(request.skillName)) return 0;
  if (offer.userId === request.userId) return 0;
  let score = 55;
  if (locationsOverlap(offer.location, request.location)) score += 25;
  if (availabilityOverlap(offer.availability, request.availability)) score += 15;
  if (request.urgency === "high") score += 5;
  else if (request.urgency === "medium") score += 2;
  return Math.min(98, score);
}

function createSkillStore(seed = {}) {
  let offers = [...(seed.offers || offersSeed)];
  let requests = [...(seed.requests || requestsSeed)];
  let matches = [...(seed.matches || [])];
  let notifications = [...(seed.notifications || [])];

  return {
    getOffers() {
      return offers.map((offer) => ({ ...offer }));
    },
    getRequests() {
      return requests.map((request) => ({ ...request }));
    },
    getMatches() {
      return matches.map((match) => ({ ...match }));
    },
    getNotifications() {
      return notifications.map((notice) => ({ ...notice }));
    },
    createOffer(input) {
      const offer = {
        id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userId: input.userId || "you",
        userName: input.userName || "You",
        skillName: input.skillName,
        description: input.description,
        availability: input.availability,
        location: input.location,
      };
      offers = [offer, ...offers];
      return offer;
    },
    createRequest(input) {
      const request = {
        id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userId: input.userId || "you",
        userName: input.userName || "You",
        skillName: input.skillName,
        description: input.description,
        urgency: input.urgency || "medium",
        location: input.location,
        availability: input.availability,
      };
      requests = [request, ...requests];
      return request;
    },
    createMatch({ offerId, requestId, status = "accepted" }) {
      const offer = offers.find((item) => item.id === offerId);
      const request = requests.find((item) => item.id === requestId);
      if (!offer || !request) {
        return { error: "Offer and request are required", status: 400 };
      }

      const existing = matches.find(
        (item) => item.offerId === offerId && item.requestId === requestId,
      );
      if (existing) {
        return { match: existing, notification: null };
      }

      const match = {
        id: `match-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        offerId,
        requestId,
        status,
        createdAt: new Date().toISOString(),
        score: scoreSkillPair(offer, request),
      };
      matches = [match, ...matches];

      const notification = {
        id: `notice-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        offerUserId: offer.userId,
        requestUserId: request.userId,
        message: `Skill swap matched for ${offer.skillName}: ${offer.userName || "Offerer"} ↔ ${request.userName || "Requester"}.`,
        createdAt: match.createdAt,
        read: false,
      };
      notifications = [notification, ...notifications];

      return { match: { ...match, notification }, notification };
    },
    suggestedMatches() {
      const views = [];
      for (const offer of offers) {
        for (const request of requests) {
          const score = scoreSkillPair(offer, request);
          if (score < 55) continue;
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
    },
  };
}

export { createSkillStore, scoreSkillPair, offersSeed, requestsSeed };
