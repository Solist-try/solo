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

describe("GET /", () => {
  it("serves the HTML landing page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toContain("Go Solo");
    expect(res.text).toContain("Go solo, not alone.");
  });
});

describe("GET /styles.css", () => {
  it("serves the stylesheet", async () => {
    const res = await request(app).get("/styles.css");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/css/);
    expect(res.text).toContain("--font-display");
  });
});
