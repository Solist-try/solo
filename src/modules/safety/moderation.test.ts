import { describe, expect, it } from "vitest";
import { moderateContent } from "./moderation";

describe("moderateContent", () => {
  it("allows supportive messages", () => {
    const result = moderateContent(
      "Hope your evening feels a little softer tonight.",
      "message",
    );
    expect(result.ok).toBe(true);
  });

  it("blocks romantic language", () => {
    const result = moderateContent("want to go on a dating date with me?", "message");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("non_romantic");
    }
  });

  it("blocks empty content", () => {
    const result = moderateContent("   ", "comment");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("empty");
    }
  });

  it("blocks overly long posts", () => {
    const result = moderateContent("a".repeat(2001), "post");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("too_long");
    }
  });
});
