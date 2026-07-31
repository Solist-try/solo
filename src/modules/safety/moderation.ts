import type { ModerationContext, ModerationResult } from "./types";

const rules: {
  pattern: RegExp;
  code: string;
  reason: string;
  contexts?: ModerationContext[];
}[] = [
  {
    pattern:
      /\b(date me|dating|boyfriend|girlfriend|romance|romantic|flirt|hook ?up|netflix and chill|send nudes|nude|sexy|sex|nsfw|onlyfans)\b/i,
    code: "non_romantic",
    reason:
      "Go Solo is for supportive, non-romantic conversation. Romantic or explicit content isn’t allowed.",
  },
  {
    pattern:
      /\b(i love you|crush on you|be mine|marry me|make out|come over tonight alone for fun)\b/i,
    code: "flirtation",
    reason:
      "Please keep messages friendship- and support-focused — not romantic or flirtatious.",
  },
  {
    pattern:
      /\b(kill yourself|kys|hate you|idiot|stupid bitch|you('| a)?re (dumb|worthless))\b/i,
    code: "hostility",
    reason:
      "That language doesn’t fit our supportive space. Try rephrasing with care.",
  },
  {
    pattern:
      /\b(whats your address|where do you live exactly|send your location now|ssn|social security)\b/i,
    code: "privacy",
    reason:
      "For safety, avoid pressing for private location or sensitive details here.",
  },
  {
    pattern: /\b(buy followers|crypto giveaway|wire me money|send gift cards)\b/i,
    code: "spam",
    reason: "Spam, scams, and financial solicitation aren’t allowed on Go Solo.",
    contexts: ["message", "comment", "post"],
  },
];

/**
 * Content moderation hook used before publishing posts, comments, or messages.
 */
export function moderateContent(
  body: string,
  context: ModerationContext = "message",
): ModerationResult {
  const trimmed = body.trim();

  if (!trimmed) {
    return {
      ok: false,
      code: "empty",
      reason: "Add a little substance before sending.",
    };
  }

  const max = context === "post" ? 2000 : 500;
  if (trimmed.length > max) {
    return {
      ok: false,
      code: "too_long",
      reason: `Keep this under ${max} characters so the space stays light.`,
    };
  }

  for (const rule of rules) {
    if (rule.contexts && !rule.contexts.includes(context)) continue;
    if (rule.pattern.test(trimmed)) {
      return { ok: false, code: rule.code, reason: rule.reason };
    }
  }

  return { ok: true };
}

/** @deprecated Prefer moderateContent — kept for messaging module compatibility. */
export function checkMessageSafety(body: string): ModerationResult {
  return moderateContent(body, "message");
}
