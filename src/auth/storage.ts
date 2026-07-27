import type { AuthUser, StoredAccount } from "./types";

const ACCOUNTS_KEY = "go-solo.accounts";
const SESSION_KEY = "go-solo.session";

export function hashPassword(password: string): string {
  // Lightweight client-side fingerprint for demo persistence only.
  let hash = 0;
  for (let i = 0; i < password.length; i += 1) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return `gs_${password.length}_${hash.toString(16)}`;
}

export function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function readSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function writeSession(user: AuthUser | null) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function toPublicUser(account: StoredAccount): AuthUser {
  const { passwordHash: _passwordHash, ...user } = account;
  return user;
}
