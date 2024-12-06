import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelLayout from '../shared/ChannelLayout';
import { Message } from '../../types/chat';

interface ChannelInfo {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: Date;
  topic?: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  type: 'important' | 'general';
}

const channelData: Record<string, ChannelInfo> = {
  'general': {
    id: 'general',
    name: 'General',
    description: 'General discussions and updates for all church members',
    memberCount: 245,
    createdAt: new Date('2024-01-01'),
    topic: 'Community discussions and updates 🙏',
    coverImage: 'https://picsum.photos/seed/general/1200/400',
    author: {
      name: 'Pastor John',
      avatar: 'https://ui-avatars.com/api/?name=Pastor+John'
    },
    type: 'important'
  },
  'worship': {
    id: 'worship',
    name: 'Worship',
    description: 'Coordination and discussions for the worship team',
    memberCount: 42,
    createdAt: new Date('2024-01-15'),
    topic: 'Planning and organizing worship services 🎵',
    coverImage: 'https://picsum.photos/seed/worship/1200/400',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson'
    },
    type: 'general'
  },
  'youth': {
    id: 'youth',
    name: 'Youth',
    description: 'Youth ministry discussions and event planning',
    memberCount: 78,
    createdAt: new Date('2024-01-10'),
    topic: 'Engaging and empowering young believers 🌟',
    coverImage: 'https://picsum.photos/seed/youth/1200/400',
    author: {
      name: 'Youth Ministry Team',
      avatar: 'https://ui-avatars.com/api/?name=Youth+Ministry'
    },
    type: 'general'
  },
  'prayer-requests': {
    id: 'prayer-requests',
    name: 'Prayer Requests',
    description: 'Share and respond to prayer requests',
    memberCount: 156,
    createdAt: new Date('2024-01-05'),
    topic: 'Supporting each other through prayer 🙏',
    coverImage: 'https://picsum.photos/seed/prayer/1200/400',
    author: {
      name: 'Prayer Team',
      avatar: 'https://ui-avatars.com/api/?name=Prayer+Team'
    },
    type: 'important'
  },
  'bible-study': {
    id: 'bible-study',
    name: 'Bible Study',
    description: 'Weekly Bible study discussions and resources',
    memberCount: 134,
    createdAt: new Date('2024-01-20'),
    topic: 'Growing together in God\'s Word 📖',
    coverImage: 'https://picsum.photos/seed/bible/1200/400',
    author: {
      name: 'Pastor Sarah',
      avatar: 'https://ui-avatars.com/api/?name=Pastor+Sarah'
    },
    type: 'general'
  }
};

function Channel() {
  const { channelId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUserId = 'current-user'; // This should come from auth context

  const channelInfo = channelId ? channelData[channelId] : null;

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

  const handleRemoveReaction = (messageId: string, userId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId
        ? {
            ...msg,
            reactions: msg.reactions.filter(r => r.userId !== userId)
          }
        : msg
    ));
  };

  if (!channelInfo) {
    return <div>Channel not found</div>;
  }

  const headerContent = (
    <div className={`bg-[#1e2128] rounded-xl overflow-hidden mb-6 ${
      channelInfo.type === 'important' ? 'border-l-4 border-blue-500' : ''
    }`}>
      {channelInfo.coverImage && (
        <img 
          src={channelInfo.coverImage} 
          alt={channelInfo.name}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">#{channelInfo.name}</h2>
          {channelInfo.type === 'important' && (
            <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
              Important
            </span>
          )}
        </div>
        <p className="text-gray-300 mb-6">{channelInfo.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <img 
              src={channelInfo.author.avatar}
              alt={channelInfo.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{channelInfo.author.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {channelInfo.memberCount} members
            </span>
            <span>Created {channelInfo.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ChannelLayout
      channelId={channelId || ''}
      messages={messages}
      onSendMessage={handleSendMessage}
      onReact={handleReaction}
      onRemoveReaction={handleRemoveReaction}
      currentUserId={currentUserId}
      headerContent={headerContent}
    />
  );
}

export default Channel;