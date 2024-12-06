import React, { useState } from 'react';
import { DirectMessage } from '../../types/chat';
import { useNavigate } from 'react-router-dom';
import UserSearch from '../users/UserSearch';

interface DirectMessageListProps {
  messages: DirectMessage[];
  onSelectChat: (dmId: string) => void;
  selectedChatId?: string;
  currentUserId: string;
}

function DirectMessageList({ messages, onSelectChat, selectedChatId, currentUserId }: DirectMessageListProps) {
  const [showUserSearch, setShowUserSearch] = useState(false);
  const navigate = useNavigate();

  // Group messages by conversation
  const conversations = messages.reduce((acc, message) => {
    const otherParticipant = message.participants.find(id => id !== currentUserId);
    if (!acc[otherParticipant!]) {
      acc[otherParticipant!] = {
        id: message.id,
        participant: otherParticipant!,
        lastMessage: message.lastMessage,
        unreadCount: message.unreadCount
      };
    }
    return acc;
  }, {} as Record<string, {
    id: string;
    participant: string;
    lastMessage?: DirectMessage['lastMessage'];
    unreadCount: number;
  }>);

  return (
    <div className="space-y-4">
      {/* New Message Button */}
      <button
        onClick={() => setShowUserSearch(true)}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>New Message</span>
      </button>

      {/* User Search Modal */}
      {showUserSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md">
            <div className="relative">
              <button
                onClick={() => setShowUserSearch(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <UserSearch onClose={() => setShowUserSearch(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="space-y-2">
        {Object.values(conversations).map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => navigate(`/messages/${conversation.participant}`)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
              selectedChatId === conversation.id ? 'bg-[#2a2f38]' : 'hover:bg-[#2a2f38]'
            }`}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${conversation.participant}`}
              alt={conversation.participant}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 text-left">
              <h3 className="font-medium text-white">{conversation.participant}</h3>
              {conversation.lastMessage && (
                <p className="text-sm text-gray-400 truncate">{conversation.lastMessage.content}</p>
              )}
            </div>
            {conversation.unreadCount > 0 && (
              <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {conversation.unreadCount}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DirectMessageList;