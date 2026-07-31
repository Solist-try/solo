import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthProvider as AuthProviderId,
  AuthUser,
  OnboardingProfile,
  ProfileUpdate,
} from "./types";
import { AuthContext } from "./authContextInstance";
import {
  defaultProfileDetails,
  hashPassword,
  readAccounts,
  readSession,
  toPublicUser,
  writeAccounts,
  writeSession,
} from "./storage";

function delay(ms = 420) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createId() {
  return `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setReady(true);
  }, []);

  const persistUser = useCallback((next: AuthUser | null) => {
    setUser(next);
    writeSession(next);
  }, []);

  const signUpWithEmail = useCallback(
    async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      await delay();
      const normalized = email.trim().toLowerCase();
      const accounts = readAccounts();

      if (accounts.some((account) => account.email === normalized)) {
        throw new Error("An account with this email already exists.");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      const account = {
        id: createId(),
        email: normalized,
        name: name.trim() || normalized.split("@")[0],
        provider: "email" as const,
        onboardingComplete: false,
        onboarding: null,
        createdAt: new Date().toISOString(),
        passwordHash: hashPassword(password),
        ...defaultProfileDetails(),
      };

      writeAccounts([...accounts, account]);
      const publicUser = toPublicUser(account);
      persistUser(publicUser);
      return publicUser;
    },
    [persistUser],
  );

  const signInWithEmail = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      await delay();
      const normalized = email.trim().toLowerCase();
      const accounts = readAccounts();
      const account = accounts.find((entry) => entry.email === normalized);

      if (!account || account.passwordHash !== hashPassword(password)) {
        throw new Error("Email or password is incorrect.");
      }

      const publicUser = toPublicUser(account);
      persistUser(publicUser);
      return publicUser;
    },
    [persistUser],
  );

  const signInWithSocial = useCallback(
    async (provider: Exclude<AuthProviderId, "email">) => {
      await delay(520);
      const accounts = readAccounts();
      const email =
        provider === "google" ? "you@gmail.com" : "you@icloud.com";
      const existing = accounts.find(
        (account) => account.email === email && account.provider === provider,
      );

      if (existing) {
        const publicUser = toPublicUser(existing);
        persistUser(publicUser);
        return publicUser;
      }

      const account = {
        id: createId(),
        email,
        name: provider === "google" ? "Go Solo Member" : "Solo Traveler",
        provider,
        onboardingComplete: false,
        onboarding: null,
        createdAt: new Date().toISOString(),
        passwordHash: null,
        ...defaultProfileDetails(),
      };

      writeAccounts([...accounts, account]);
      const publicUser = toPublicUser(account);
      persistUser(publicUser);
      return publicUser;
    },
    [persistUser],
  );

  const completeOnboarding = useCallback(
    async (profile: OnboardingProfile) => {
      await delay(280);
      if (!user) throw new Error("You need to be signed in.");

      const accounts = readAccounts();
      const index = accounts.findIndex((account) => account.id === user.id);
      if (index === -1) throw new Error("Account not found.");

      const updated = {
        ...accounts[index],
        onboardingComplete: true,
        onboarding: profile,
        preferences:
          accounts[index].preferences?.length
            ? accounts[index].preferences
            : profile.interests.slice(0, 3),
      };
      const nextAccounts = [...accounts];
      nextAccounts[index] = updated;
      writeAccounts(nextAccounts);

      const publicUser = toPublicUser(updated);
      persistUser(publicUser);
      return publicUser;
    },
    [persistUser, user],
  );

  const updateProfile = useCallback(
    async (patch: ProfileUpdate) => {
      await delay(220);
      if (!user) throw new Error("You need to be signed in.");

      const accounts = readAccounts();
      const index = accounts.findIndex((account) => account.id === user.id);
      if (index === -1) throw new Error("Account not found.");

      const updated = {
        ...accounts[index],
        ...patch,
        name: patch.name?.trim() || accounts[index].name,
      };
      const nextAccounts = [...accounts];
      nextAccounts[index] = updated;
      writeAccounts(nextAccounts);

      const publicUser = toPublicUser(updated);
      persistUser(publicUser);
      return publicUser;
    },
    [persistUser, user],
  );

  const signOut = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const value = useMemo(
    () => ({
      user,
      ready,
      signUpWithEmail,
      signInWithEmail,
      signInWithSocial,
      completeOnboarding,
      updateProfile,
      signOut,
    }),
    [
      user,
      ready,
      signUpWithEmail,
      signInWithEmail,
      signInWithSocial,
      completeOnboarding,
      updateProfile,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
