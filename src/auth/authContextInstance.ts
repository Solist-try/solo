import { createContext } from "react";
import type {
  AuthProvider as AuthProviderId,
  AuthUser,
  OnboardingProfile,
  ProfileUpdate,
} from "./types";

export type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signUpWithEmail: (input: {
    name: string;
    email: string;
    password: string;
  }) => Promise<AuthUser>;
  signInWithEmail: (input: {
    email: string;
    password: string;
  }) => Promise<AuthUser>;
  signInWithSocial: (
    provider: Exclude<AuthProviderId, "email">,
  ) => Promise<AuthUser>;
  completeOnboarding: (profile: OnboardingProfile) => Promise<AuthUser>;
  updateProfile: (patch: ProfileUpdate) => Promise<AuthUser>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
