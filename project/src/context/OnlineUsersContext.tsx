import React, { createContext, useContext, useState, useEffect } from 'react';

export interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen: Date;
  status: 'online' | 'away' | 'offline';
}

interface OnlineUsersContextType {
  onlineUsers: OnlineUser[];
  setUserStatus: (userId: string, status: OnlineUser['status']) => void;
}

const OnlineUsersContext = createContext<OnlineUsersContextType | undefined>(undefined);

export function OnlineUsersProvider({ children }: { children: React.ReactNode }) {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([
    {
      id: '1',
      name: 'Cynthia Cox',
      avatar: 'https://ui-avatars.com/api/?name=Cynthia+Cox',
      lastSeen: new Date(),
      status: 'online'
    },
    {
      id: '2',
      name: 'Danny Quinn',
      avatar: 'https://ui-avatars.com/api/?name=Danny+Quinn',
      lastSeen: new Date(),
      status: 'online'
    },
    {
      id: '3',
      name: 'Morgan Smith',
      avatar: 'https://ui-avatars.com/api/?name=Morgan+Smith',
      lastSeen: new Date(Date.now() - 1000 * 60 * 5),
      status: 'away'
    },
    {
      id: '4',
      name: 'Stanley Burton',
      avatar: 'https://ui-avatars.com/api/?name=Stanley+Burton',
      lastSeen: new Date(),
      status: 'online'
    }
  ]);

  const setUserStatus = (userId: string, status: OnlineUser['status']) => {
    setOnlineUsers(users => 
      users.map(user => 
        user.id === userId 
          ? { ...user, status, lastSeen: new Date() }
          : user
      )
    );
  };

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, setUserStatus }}>
      {children}
    </OnlineUsersContext.Provider>
  );
}

export function useOnlineUsers() {
  const context = useContext(OnlineUsersContext);
  if (context === undefined) {
    throw new Error('useOnlineUsers must be used within an OnlineUsersProvider');
  }
  return context;
}