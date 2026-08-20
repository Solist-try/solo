import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "./app.js";

describe("GET /health", () => {
  it("responds with ok true", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

describe("GET /api/data", () => {
  it("responds with sample data payload", async () => {
    const res = await request(app).get("/api/data");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual([1, 2, 3]);
    expect(Array.isArray(res.body.features)).toBe(true);
    expect(res.body.features.length).toBeGreaterThan(0);
  });
});

describe("GET /", () => {
  it("serves an HTML user interface instead of a JSON welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toContain("Go Solo");
    expect(res.text).toContain("Go solo, not alone.");
    expect(res.text).toContain('id="view-community"');
    expect(res.text).not.toContain('"message":"Welcome to Solo"');
  });
});

describe("Buddy System API", () => {
  it("GET /buddies/recommendations returns ranked profiles", async () => {
    const res = await request(app).get(
      "/buddies/recommendations?interests=Travel,Walking&availability=weekends&activity=meals",
    );
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.recommendations)).toBe(true);
    expect(res.body.recommendations.length).toBeGreaterThan(0);
    expect(res.body.recommendations[0]).toHaveProperty("matchScore");
    expect(res.body.recommendations[0]).toHaveProperty("userId");
  });

  it("POST /buddies/request and /buddies/accept create a match", async () => {
    const requestRes = await request(app)
      .post("/buddies/request")
      .send({ fromUserId: "you", toUserId: "buddy-mira" });
    expect(requestRes.statusCode).toBe(201);
    expect(requestRes.body.request.status).toBe("pending");

    const acceptRes = await request(app)
      .post("/buddies/accept")
      .send({ fromUserId: "you", toUserId: "buddy-mira", currentUserId: "you" });
    expect(acceptRes.statusCode).toBe(200);
    expect(acceptRes.body.match.buddyId).toBe("buddy-mira");

    const matchesRes = await request(app).get("/buddies/matches?userId=you");
    expect(matchesRes.statusCode).toBe(200);
    expect(
      matchesRes.body.matches.some((match) => match.buddyId === "buddy-mira"),
    ).toBe(true);
  });
});

describe("Skill Swap API", () => {
  it("GET /skills/offers and /skills/requests return listings", async () => {
    const offers = await request(app).get("/skills/offers");
    expect(offers.statusCode).toBe(200);
    expect(offers.body.offers.length).toBeGreaterThan(0);
    expect(offers.body.offers[0]).toHaveProperty("skillName");

    const requestsRes = await request(app).get("/skills/requests");
    expect(requestsRes.statusCode).toBe(200);
    expect(requestsRes.body.requests.length).toBeGreaterThan(0);
    expect(requestsRes.body.requests[0]).toHaveProperty("urgency");
  });

  it("POST offer, request, and match notifies both users", async () => {
    const offerRes = await request(app).post("/skills/offer").send({
      skillName: "Cooking",
      description: "One-pan dinners",
      availability: "evenings",
      location: "Lisbon",
      userId: "api-you",
      userName: "API You",
    });
    expect(offerRes.statusCode).toBe(201);

    const requestRes = await request(app).post("/skills/request").send({
      skillName: "Cooking",
      description: "Need weeknight help",
      urgency: "high",
      location: "Lisbon",
      availability: "evenings",
      userId: "api-friend",
      userName: "API Friend",
    });
    expect(requestRes.statusCode).toBe(201);

    const matchRes = await request(app).post("/skills/match").send({
      offerId: offerRes.body.offer.id,
      requestId: requestRes.body.request.id,
    });
    expect(matchRes.statusCode).toBe(201);
    expect(matchRes.body.match.status).toBe("accepted");
    expect(matchRes.body.notification.offerUserId).toBe("api-you");
    expect(matchRes.body.notification.requestUserId).toBe("api-friend");
  });
});

describe("SAME API", () => {
  it("POST /same/goal and GET /same/goals", async () => {
    const createRes = await request(app).post("/same/goal").send({
      title: "Read 10 pages",
      description: "Soft reading habit",
      frequency: "daily",
      category: "learning",
      userId: "same-you",
      userName: "SAME You",
    });
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.goal.title).toBe("Read 10 pages");

    const listRes = await request(app).get("/same/goals?userId=same-you");
    expect(listRes.statusCode).toBe(200);
    expect(
      listRes.body.goals.some((goal) => goal.title === "Read 10 pages"),
    ).toBe(true);
  });

  it("POST partner request and check-in", async () => {
    const partnerRes = await request(app).post("/same/partner/request").send({
      fromUserId: "same-you",
      toUserId: "u-ava",
    });
    expect(partnerRes.statusCode).toBe(201);
    expect(partnerRes.body.partner.partnerId).toBe("u-ava");

    const goalRes = await request(app).post("/same/goal").send({
      title: "Stretch",
      description: "Morning stretch",
      frequency: "daily",
      category: "habits",
      userId: "same-you",
    });
    const checkRes = await request(app).post("/same/checkin").send({
      goalId: goalRes.body.goal.id,
      userId: "same-you",
      status: "done",
      note: "Felt good",
    });
    expect(checkRes.statusCode).toBe(201);
    expect(checkRes.body.checkIn.status).toBe("done");
  });
});

describe("GET /styles.css and /app.js", () => {
  it("serves the UI assets", async () => {
    const css = await request(app).get("/styles.css");
    expect(css.statusCode).toBe(200);
    expect(css.headers["content-type"]).toMatch(/css/);

    const js = await request(app).get("/app.js");
    expect(js.statusCode).toBe(200);
    expect(js.text).toContain("showView");
  });
});
