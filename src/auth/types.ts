export type AuthProvider = "email" | "google" | "apple";

export type OnboardingProfile = {
  goals: string[];
  challenges: string[];
  interests: string[];
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  provider: AuthProvider;
  onboardingComplete: boolean;
  onboarding: OnboardingProfile | null;
  createdAt: string;
};

export type StoredAccount = AuthUser & {
  passwordHash: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  ready: boolean;
};
