import React from 'react';
import { OnlineUser } from '../../context/OnlineUsersContext';

interface OnlineUsersListProps {
  users: OnlineUser[];
}

function OnlineUsersList({ users }: OnlineUsersListProps) {
  return (
    <div className="space-y-3">
      {users.map(user => (
        <div key={user.id} className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div 
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1e2128] ${
                user.status === 'online' 
                  ? 'bg-green-500' 
                  : user.status === 'away'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
              }`}
            />
          </div>
          <div>
            <span className="text-gray-300">{user.name}</span>
            {user.status !== 'online' && (
              <p className="text-xs text-gray-400">
                {user.status === 'away' ? 'Away' : 'Offline'}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OnlineUsersList;