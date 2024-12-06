import React, { useState } from 'react';
import { Message } from '../../types/chat';

interface ChatRoomProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isAdmin?: boolean;
  isAnnouncement?: boolean;
}

function ChatRoom({ messages, onSendMessage, isAdmin, isAnnouncement }: ChatRoomProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'announcement' ? 'bg-blue-500 bg-opacity-10 p-3 rounded-lg' : ''
            }`}
          >
            <img
              src={message.senderAvatar}
              alt={message.senderName}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{message.senderName}</span>
                <span className="text-xs text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-300">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-[#2a2f38]">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isAnnouncement ? "Send announcement to all users..." : "Type a message..."}
            className="flex-1 bg-[#2a2f38] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {isAdmin && !isAnnouncement && (
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Announce
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatRoom;