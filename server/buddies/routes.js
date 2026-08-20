import { createBuddyStore } from "./store.js";

const store = createBuddyStore();

function parseList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function registerBuddyRoutes(app) {
  app.get("/buddies/recommendations", (req, res) => {
    const recommendations = store.recommendations({
      interests: parseList(req.query.interests),
      availability: req.query.availability,
      activity: req.query.activity,
      userId: req.query.userId || "you",
    });
    res.json({ recommendations });
  });

  app.post("/buddies/request", (req, res) => {
    const { fromUserId, toUserId } = req.body || {};
    if (!fromUserId || !toUserId) {
      res.status(400).json({ error: "fromUserId and toUserId are required" });
      return;
    }
    const request = store.createRequest(fromUserId, toUserId);
    res.status(201).json({ request });
  });

  app.post("/buddies/accept", (req, res) => {
    const { fromUserId, toUserId, requestId, currentUserId } = req.body || {};
    if (!requestId && (!fromUserId || !toUserId)) {
      res.status(400).json({
        error: "requestId or fromUserId/toUserId are required",
      });
      return;
    }
    const result = store.acceptRequest({
      fromUserId,
      toUserId,
      requestId,
      currentUserId: currentUserId || "you",
    });
    res.json(result);
  });

  app.get("/buddies/matches", (req, res) => {
    const matches = store.getMatches(req.query.userId || "you");
    res.json({ matches });
  });
}
