import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "../../auth";
import { moderateContent } from "./moderation";
import { SafetyContext } from "./safetyContextInstance";
import {
  readBlockedUsers,
  readReports,
  writeBlockedUsers,
  writeReports,
} from "./storage";
import type {
  BlockedUser,
  ModerationContext,
  ReportInput,
  SafetyReport,
} from "./types";

export function SafetyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [reports, setReports] = useState<SafetyReport[]>([]);

  useEffect(() => {
    if (!user) {
      setBlockedUsers([]);
      setReports([]);
      return;
    }
    setBlockedUsers(readBlockedUsers(user.id));
    setReports(readReports(user.id));
  }, [user]);

  const moderate = useCallback(
    (body: string, context: ModerationContext = "message") =>
      moderateContent(body, context),
    [],
  );

  const isBlocked = useCallback(
    (userId: string) => blockedUsers.some((entry) => entry.id === userId),
    [blockedUsers],
  );

  const blockUser = useCallback(
    (target: { id: string; name: string }) => {
      if (!user) return;
      setBlockedUsers((current) => {
        if (current.some((entry) => entry.id === target.id)) return current;
        const next = [
          {
            id: target.id,
            name: target.name,
            blockedAt: new Date().toISOString(),
          },
          ...current,
        ];
        writeBlockedUsers(user.id, next);
        return next;
      });
    },
    [user],
  );

  const unblockUser = useCallback(
    (userId: string) => {
      if (!user) return;
      setBlockedUsers((current) => {
        const next = current.filter((entry) => entry.id !== userId);
        writeBlockedUsers(user.id, next);
        return next;
      });
    },
    [user],
  );

  const submitReport = useCallback(
    (input: ReportInput) => {
      if (!user) {
        throw new Error("Sign in to submit a report.");
      }
      const report: SafetyReport = {
        id: `report-${Date.now()}`,
        targetType: input.targetType,
        targetId: input.targetId,
        targetLabel: input.targetLabel,
        reason: input.reason,
        details: input.details?.trim() ?? "",
        createdAt: new Date().toISOString(),
      };
      setReports((current) => {
        const next = [report, ...current].slice(0, 50);
        writeReports(user.id, next);
        return next;
      });
      return report;
    },
    [user],
  );

  const value = useMemo(
    () => ({
      blockedUsers,
      reports,
      moderate,
      isBlocked,
      blockUser,
      unblockUser,
      submitReport,
    }),
    [
      blockedUsers,
      reports,
      moderate,
      isBlocked,
      blockUser,
      unblockUser,
      submitReport,
    ],
  );

  return (
    <SafetyContext.Provider value={value}>{children}</SafetyContext.Provider>
  );
}
