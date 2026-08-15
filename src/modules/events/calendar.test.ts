import { describe, expect, it } from "vitest";
import { buildGoogleCalendarUrl, buildIcsContent } from "./calendar";
import type { SoloEvent } from "./data";

const sampleEvent: SoloEvent = {
  id: "ev-test",
  title: "Quiet nights discussion",
  type: "discussion",
  description: "A gentle community circle.",
  host: "Jordan Hale",
  start: "2026-08-05T19:00:00.000Z",
  end: "2026-08-05T20:00:00.000Z",
  location: "Community lounge (virtual)",
  isVirtual: true,
  capacity: 30,
  baseRsvps: 10,
};

describe("events calendar helpers", () => {
  it("builds a Google Calendar template URL", () => {
    const url = buildGoogleCalendarUrl(sampleEvent);
    expect(url).toContain("https://calendar.google.com/calendar/render?");
    expect(url).toContain("text=Quiet+nights+discussion");
    expect(url).toContain("action=TEMPLATE");
  });

  it("builds valid ICS content", () => {
    const ics = buildIcsContent(sampleEvent);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("SUMMARY:Quiet nights discussion");
    expect(ics).toContain("UID:ev-test@gosolo.app");
    expect(ics).toContain("END:VCALENDAR");
  });
});
