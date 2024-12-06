import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  lastSeen?: Date;
}

interface UserSearchProps {
  onSelectUser?: (user: User) => void;
  onClose?: () => void;
}

function UserSearch({ onSelectUser, onClose }: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock user data - replace with actual user data from your backend
  const users: User[] = [
    {
      id: 'pastor-john',
      name: 'Pastor John',
      avatar: 'https://ui-avatars.com/api/?name=Pastor+John',
      role: 'Pastor',
      lastSeen: new Date()
    },
    {
      id: 'sarah-wilson',
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson',
      role: 'Youth Minister',
      lastSeen: new Date()
    },
    {
      id: 'david-brown',
      name: 'David Brown',
      avatar: 'https://ui-avatars.com/api/?name=David+Brown',
      role: 'Member',
      lastSeen: new Date(Date.now() - 3600000)
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (user: User) => {
    if (onSelectUser) {
      onSelectUser(user);
    } else {
      navigate(`/messages/${user.id}`);
    }
    onClose?.();
  };

  return (
    <div className="bg-[#1e2128] rounded-lg p-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full bg-[#2a2f38] rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
        {filteredUsers.map(user => (
          <button
            key={user.id}
            onClick={() => handleSelectUser(user)}
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2a2f38] transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{user.name}</span>
                {user.lastSeen && (
                  <span className="text-sm text-gray-400">
                    {user.lastSeen > new Date(Date.now() - 300000)
                      ? 'Online'
                      : `Last seen ${new Date(user.lastSeen).toLocaleTimeString()}`}
                  </span>
                )}
              </div>
              {user.role && (
                <span className="text-sm text-gray-400">{user.role}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserSearch;