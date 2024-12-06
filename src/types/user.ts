export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member' | 'pastor' | 'moderator';
  bio?: string;
  joinDate: Date;
  lastActive: Date;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark';
  };
  stats?: {
    posts: number;
    reactions: number;
    comments: number;
  };
  groups: string[];
}

export interface UserSettings {
  notifications: boolean;
  emailUpdates: boolean;
  theme: 'light' | 'dark';
  privacy: {
    showEmail: boolean;
    showGroups: boolean;
    showActivity: boolean;
  };
}