import { createSameStore } from "./store.js";

const store = createSameStore();

export function registerSameRoutes(app) {
  app.post("/same/goal", (req, res) => {
    const { title, description, frequency, category, userId, userName } =
      req.body || {};
    if (!title || !description || !frequency || !category) {
      res.status(400).json({
        error: "title, description, frequency, and category are required",
      });
      return;
    }
    const goal = store.createGoal({
      title,
      description,
      frequency,
      category,
      userId,
      userName,
    });
    res.status(201).json({ goal });
  });

  app.get("/same/goals", (req, res) => {
    const goals = store.getGoals(req.query.userId);
    res.json({ goals });
  });

  app.post("/same/partner/request", (req, res) => {
    const { fromUserId, toUserId, goalId } = req.body || {};
    if (!fromUserId || !toUserId) {
      res.status(400).json({ error: "fromUserId and toUserId are required" });
      return;
    }
    const result = store.requestPartner({ fromUserId, toUserId, goalId });
    res.status(201).json(result);
  });

  app.post("/same/checkin", (req, res) => {
    const { goalId, status, note, userId } = req.body || {};
    if (!goalId || !status) {
      res.status(400).json({ error: "goalId and status are required" });
      return;
    }
    const checkIn = store.createCheckIn({ goalId, status, note, userId });
    res.status(201).json({ checkIn });
  });
}
