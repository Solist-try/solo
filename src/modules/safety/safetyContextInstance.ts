import { createContext } from "react";
import type {
  BlockedUser,
  ModerationContext,
  ModerationResult,
  ReportInput,
  SafetyReport,
} from "./types";

export type SafetyContextValue = {
  blockedUsers: BlockedUser[];
  reports: SafetyReport[];
  moderate: (body: string, context?: ModerationContext) => ModerationResult;
  isBlocked: (userId: string) => boolean;
  blockUser: (user: { id: string; name: string }) => void;
  unblockUser: (userId: string) => void;
  submitReport: (input: ReportInput) => SafetyReport;
};

export const SafetyContext = createContext<SafetyContextValue | null>(null);
