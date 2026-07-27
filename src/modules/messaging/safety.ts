export type SafetyResult =
  | { ok: true }
  | { ok: false; reason: string };

const blockedPatterns: { pattern: RegExp; reason: string }[] = [
  {
    pattern:
      /\b(date me|dating|boyfriend|girlfriend|romance|romantic|flirt|hook ?up|netflix and chill|send nudes|nude|sexy|sex|nsfw|onlyfans)\b/i,
    reason:
      "Go Solo messaging is for supportive, non-romantic conversation. Romantic or explicit requests aren’t allowed.",
  },
  {
    pattern:
      /\b(i love you|crush on you|be mine|marry me|make out|come over tonight alone for fun)\b/i,
    reason:
      "Please keep messages friendship- and support-focused — not romantic or flirtatious.",
  },
  {
    pattern:
      /\b(kill yourself|kys|hate you|idiot|stupid bitch|slur)\b/i,
    reason:
      "That language doesn’t fit our supportive space. Try rephrasing with care.",
  },
  {
    pattern: /\b(whats your address|where do you live exactly|send your location now)\b/i,
    reason:
      "For safety, avoid pressing for private location details in chat. Use public meetup tools instead.",
  },
];

export function checkMessageSafety(body: string): SafetyResult {
  const trimmed = body.trim();
  if (!trimmed) {
    return { ok: false, reason: "Write a short message before sending." };
  }
  if (trimmed.length > 500) {
    return {
      ok: false,
      reason: "Keep messages under 500 characters so conversations stay light.",
    };
  }

  for (const rule of blockedPatterns) {
    if (rule.pattern.test(trimmed)) {
      return { ok: false, reason: rule.reason };
    }
  }

  return { ok: true };
}
