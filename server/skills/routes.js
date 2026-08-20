import { createSkillStore } from "./store.js";

const store = createSkillStore();

export function registerSkillRoutes(app) {
  app.get("/skills/offers", (_req, res) => {
    res.json({ offers: store.getOffers() });
  });

  app.get("/skills/requests", (_req, res) => {
    res.json({ requests: store.getRequests() });
  });

  app.post("/skills/offer", (req, res) => {
    const { skillName, description, availability, location, userId, userName } =
      req.body || {};
    if (!skillName || !description || !availability || !location) {
      res.status(400).json({
        error: "skillName, description, availability, and location are required",
      });
      return;
    }
    const offer = store.createOffer({
      skillName,
      description,
      availability,
      location,
      userId,
      userName,
    });
    res.status(201).json({ offer });
  });

  app.post("/skills/request", (req, res) => {
    const {
      skillName,
      description,
      urgency,
      location,
      availability,
      userId,
      userName,
    } = req.body || {};
    if (!skillName || !description || !urgency) {
      res.status(400).json({
        error: "skillName, description, and urgency are required",
      });
      return;
    }
    const request = store.createRequest({
      skillName,
      description,
      urgency,
      location,
      availability,
      userId,
      userName,
    });
    res.status(201).json({ request });
  });

  app.post("/skills/match", (req, res) => {
    const { offerId, requestId, status } = req.body || {};
    if (!offerId || !requestId) {
      res.status(400).json({ error: "offerId and requestId are required" });
      return;
    }
    const result = store.createMatch({ offerId, requestId, status });
    if (result.error) {
      res.status(result.status || 400).json({ error: result.error });
      return;
    }
    res.status(201).json(result);
  });
}
