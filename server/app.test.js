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
