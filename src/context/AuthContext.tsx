import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserSettings } from '../types/user';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  userSettings: UserSettings;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    notifications: true,
    emailUpdates: true,
    theme: 'dark',
    privacy: {
      showEmail: false,
      showGroups: true,
      showActivity: true
    }
  });

  // Mock login function - replace with actual authentication
  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: UserProfile = {
      id: 'user-1',
      name: 'John Doe',
      email: email,
      avatar: `https://ui-avatars.com/api/?name=John+Doe`,
      role: 'member',
      joinDate: new Date(),
      lastActive: new Date(),
      bio: 'Active church member and volunteer',
      groups: ['general', 'worship', 'youth'],
      stats: {
        posts: 0,
        reactions: 0,
        comments: 0
      }
    };

    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateSettings = async (updates: Partial<UserSettings>) => {
    const updatedSettings = { ...userSettings, ...updates };
    setUserSettings(updatedSettings);
    localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedSettings = localStorage.getItem('userSettings');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    if (savedSettings) {
      setUserSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      userSettings,
      login,
      logout,
      updateProfile,
      updateSettings
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}