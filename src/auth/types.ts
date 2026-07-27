export type AuthProvider = "email" | "google" | "apple";

export type OnboardingProfile = {
  goals: string[];
  challenges: string[];
  interests: string[];
};

export type SavedPost = {
  id: string;
  title: string;
  author: string;
  tag: string;
};

export type ToolkitItem = {
  id: string;
  label: string;
  kind: "routine" | "habit" | "task" | "tip";
};

export type ProfileDetails = {
  bio: string;
  homeBase: string;
  preferences: string[];
  savedPosts: SavedPost[];
  toolkitItems: ToolkitItem[];
  rsvpEventIds: string[];
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  provider: AuthProvider;
  onboardingComplete: boolean;
  onboarding: OnboardingProfile | null;
  createdAt: string;
} & ProfileDetails;

export type StoredAccount = AuthUser & {
  passwordHash: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  ready: boolean;
};

export type ProfileUpdate = Partial<
  Pick<
    AuthUser,
    | "name"
    | "bio"
    | "homeBase"
    | "preferences"
    | "savedPosts"
    | "toolkitItems"
    | "rsvpEventIds"
  >
>;
