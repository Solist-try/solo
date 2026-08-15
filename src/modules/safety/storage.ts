import type { BlockedUser, SafetyReport } from "./types";

function blockedKey(userId: string) {
  return `go-solo.blocked.${userId}`;
}

function reportsKey(userId: string) {
  return `go-solo.reports.${userId}`;
}

export function readBlockedUsers(userId: string): BlockedUser[] {
  try {
    const raw = localStorage.getItem(blockedKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BlockedUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeBlockedUsers(userId: string, users: BlockedUser[]) {
  localStorage.setItem(blockedKey(userId), JSON.stringify(users));
}

export function readReports(userId: string): SafetyReport[] {
  try {
    const raw = localStorage.getItem(reportsKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SafetyReport[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeReports(userId: string, reports: SafetyReport[]) {
  localStorage.setItem(reportsKey(userId), JSON.stringify(reports));
}
