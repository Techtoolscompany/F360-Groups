import React from 'react';
import { useOnlineUsers } from '../../context/OnlineUsersContext';
import OnlineUsersList from '../users/OnlineUsersList';

function ChatSidebar() {
  const { onlineUsers } = useOnlineUsers();

  return (
    <aside className="w-72 bg-[#1e2128] border-l border-[#2a2f38] p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-white">Online Users</h2>
        <OnlineUsersList users={onlineUsers} />
      </div>
    </aside>
  );
}

export default ChatSidebar;