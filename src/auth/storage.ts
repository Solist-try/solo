import type {
  AuthUser,
  ProfileDetails,
  SavedPost,
  StoredAccount,
  ToolkitItem,
} from "./types";

const ACCOUNTS_KEY = "go-solo.accounts";
const SESSION_KEY = "go-solo.session";

export const defaultSavedPosts: SavedPost[] = [
  {
    id: "saved-1",
    title: "First week in a studio — what actually helped",
    author: "Mira Chen",
    tag: "Solo Living",
  },
  {
    id: "saved-2",
    title: "When solo nights feel heavy",
    author: "Jordan Hale",
    tag: "Emotional Support",
  },
  {
    id: "saved-3",
    title: "Grocery rhythm that cut my weekly spend",
    author: "Sam Okonkwo",
    tag: "Money-Saving Hacks",
  },
];

export const defaultToolkitItems: ToolkitItem[] = [
  { id: "tk-1", label: "Morning routine", kind: "routine" },
  { id: "tk-2", label: "Evening wind-down", kind: "routine" },
  { id: "tk-3", label: "Outside air / short walk", kind: "habit" },
  { id: "tk-4", label: "Confirm rent or bill due dates", kind: "task" },
  { id: "tk-5", label: "Shrink the ask", kind: "tip" },
];

export function defaultProfileDetails(
  interests: string[] = [],
): ProfileDetails {
  return {
    bio: "I plan short solo stretches to reset — usually near water, always with a good bakery stop.",
    homeBase: "Portland, OR",
    preferences: interests.slice(0, 3),
    savedPosts: defaultSavedPosts,
    toolkitItems: defaultToolkitItems,
    rsvpEventIds: [],
  };
}

export function normalizeUser<T extends Partial<AuthUser> & Pick<AuthUser, "id" | "email" | "name" | "provider" | "onboardingComplete" | "onboarding" | "createdAt">>(
  user: T,
): AuthUser {
  const defaults = defaultProfileDetails(user.onboarding?.interests ?? []);
  return {
    ...defaults,
    ...user,
    bio: user.bio ?? defaults.bio,
    homeBase: user.homeBase ?? defaults.homeBase,
    preferences: user.preferences ?? defaults.preferences,
    savedPosts: user.savedPosts ?? defaults.savedPosts,
    toolkitItems: user.toolkitItems ?? defaults.toolkitItems,
    rsvpEventIds: user.rsvpEventIds ?? defaults.rsvpEventIds,
  };
}

export function hashPassword(password: string): string {
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
    return Array.isArray(parsed)
      ? parsed.map((account) => ({
          ...normalizeUser(account),
          passwordHash: account.passwordHash ?? null,
        }))
      : [];
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
    return normalizeUser(JSON.parse(raw) as AuthUser);
  } catch {
    return null;
  }
}

export function writeSession(user: AuthUser | null) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(normalizeUser(user)));
}

export function toPublicUser(account: StoredAccount): AuthUser {
  const { passwordHash: _passwordHash, ...user } = account;
  return normalizeUser(user);
}
