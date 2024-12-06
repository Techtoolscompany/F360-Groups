import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MediaInput from '../shared/MediaInput';
import PostMedia from '../posts/PostMedia';
import PostReactions from '../posts/PostReactions';
import { Message } from '../../types/chat';

function MessagePage() {
  const { userId } = useParams();
  const currentUserId = 'currentUser';

  // Initialize messages with conversation specific to the selected user
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg1',
      content: 'Looking forward to Sunday service!',
      senderId: userId,
      senderName: userId === 'Pastor John' ? 'Pastor John' : 'Sarah Wilson',
      senderAvatar: `https://ui-avatars.com/api/?name=${userId?.replace('-', '+')}`,
      timestamp: Date.now() - 3600000,
      type: 'text',
      readBy: [userId || ''],
      reactions: []
    }
  ].filter(msg => msg.senderId === userId || msg.senderId === currentUserId));

  const handleSendMessage = (content: string, media?: any[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: currentUserId,
      senderName: 'Current User',
      senderAvatar: 'https://ui-avatars.com/api/?name=Current+User',
      timestamp: Date.now(),
      type: 'text',
      readBy: [currentUserId],
      reactions: [],
      media
    };
    setMessages([...messages, newMessage]);
  };

  const handleReaction = (messageId: string, reaction: { type: string; userId: string }) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.userId === reaction.userId);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.filter(r => r.userId !== reaction.userId)
          };
        }
        return {
          ...msg,
          reactions: [...msg.reactions, reaction]
        };
      }
      return msg;
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className="flex space-x-3 group">
            <img
              src={message.senderAvatar}
              alt={message.senderName}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-white">{message.senderName}</span>
                <span className="text-sm text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-300 mt-1">{message.content}</p>
              {message.media && <PostMedia media={message.media} />}
              
              <div className="flex items-center space-x-4 mt-2">
                <PostReactions
                  reactions={message.reactions}
                  onReact={(type) => handleReaction(message.id, { type, userId: currentUserId })}
                  onRemoveReaction={() => handleReaction(message.id, { type: '', userId: currentUserId })}
                  currentUserReaction={message.reactions.find(r => r.userId === currentUserId)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#2a2f38] bg-[#1e2128]">
        <MediaInput
          onSubmit={handleSendMessage}
          placeholder={`Message ${userId?.replace('-', ' ')}`}
          buttonText="Send"
        />
      </div>
    </div>
  );
}

export default MessagePage;