export type SafetyResult =
  | { ok: true }
  | { ok: false; reason: string; code?: string };

export { checkMessageSafety, moderateContent } from "../safety/moderation";
