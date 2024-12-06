import React from 'react';
import MediaInput from './MediaInput';
import PostMedia from '../posts/PostMedia';
import PostReactions from '../posts/PostReactions';
import { Message } from '../../types/chat';
import UserProfileLink from './UserProfileLink';

interface ChannelLayoutProps {
  channelId: string;
  messages: Message[];
  onSendMessage: (content: string, media?: any[]) => void;
  onReact: (messageId: string, reaction: { type: string; userId: string }) => void;
  onRemoveReaction: (messageId: string, userId: string) => void;
  currentUserId: string;
  headerContent?: React.ReactNode;
}

function ChannelLayout({
  channelId,
  messages,
  onSendMessage,
  onReact,
  onRemoveReaction,
  currentUserId,
  headerContent
}: ChannelLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header Content */}
      {headerContent}

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto px-6 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className="flex space-x-3 group">
            <UserProfileLink
              userId={msg.senderId}
              userName={msg.senderName}
              userAvatar={msg.senderAvatar}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-300 mt-1">{msg.content}</p>
              {msg.media && <PostMedia media={msg.media} />}
              
              <div className="flex items-center space-x-4 mt-2">
                <PostReactions
                  reactions={msg.reactions}
                  onReact={(type) => onReact(msg.id, { type, userId: currentUserId })}
                  onRemoveReaction={() => onRemoveReaction(msg.id, currentUserId)}
                  currentUserReaction={msg.reactions.find(r => r.userId === currentUserId)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-[#2a2f38]">
        <MediaInput
          onSubmit={onSendMessage}
          placeholder={`Message #${channelId}`}
          buttonText="Send"
        />
      </div>
    </div>
  );
}

export default ChannelLayout;