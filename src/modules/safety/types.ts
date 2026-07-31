export type ModerationContext = "message" | "comment" | "post";

export type ModerationResult =
  | { ok: true }
  | { ok: false; reason: string; code: string };

export type ReportTargetType = "post" | "comment" | "message" | "user";

export type ReportReason =
  | "Harassment or hostility"
  | "Romantic or sexual content"
  | "Spam or scams"
  | "Privacy or safety risk"
  | "Other guideline issue";

export type SafetyReport = {
  id: string;
  targetType: ReportTargetType;
  targetId: string;
  targetLabel: string;
  reason: ReportReason;
  details: string;
  createdAt: string;
};

export type BlockedUser = {
  id: string;
  name: string;
  blockedAt: string;
};

export type ReportInput = {
  targetType: ReportTargetType;
  targetId: string;
  targetLabel: string;
  reason: ReportReason;
  details?: string;
};
