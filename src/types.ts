export enum Screen {
  ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  DASHBOARD = "DASHBOARD",
  THUMBNAIL_GEN = "THUMBNAIL_GEN",
  CAPTION_GEN = "CAPTION_GEN",
  SCRIPT_GEN = "SCRIPT_GEN",
  PLANNER = "PLANNER",
  ANALYTICS = "ANALYTICS",
  NOTIFICATIONS = "NOTIFICATIONS",
  PROFILE = "PROFILE",
  PREMIUM = "PREMIUM",
}

export interface SavedProject {
  id: string;
  type: "caption" | "script" | "thumbnail";
  title: string;
  topic: string;
  date: string;
  platform?: string;
  isFavorite: boolean;
  content: any; // Structures match the API response objects
}

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  platform: "youtube" | "instagram" | "tiktok" | "newsletter";
  type: "thumbnail" | "caption" | "script" | "custom";
}

export interface AppNotification {
  id: string;
  text: string;
  type: "tip" | "alert" | "reminder";
  tag: string;
  time: string;
  read: boolean;
}

export interface CreatorGoal {
  niche: string;
  targetPlatform: string;
  weeklyPosts: number;
}
