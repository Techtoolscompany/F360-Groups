import React, { useState, useEffect } from 'react';
import DirectMessageList from '../chat/DirectMessageList';
import { DirectMessage, Message } from '../../types/chat';
import { useSidebar } from '../../context/SidebarContext';
import MediaInput from '../shared/MediaInput';
import PostMedia from '../posts/PostMedia';
import PostReactions from '../posts/PostReactions';

function Messages() {
  const [selectedDmId, setSelectedDmId] = useState<string | null>(null);
  const { setIsCollapsed } = useSidebar();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg1',
      content: 'Looking forward to Sunday service!',
      senderId: 'Pastor John',
      senderName: 'Pastor John',
      senderAvatar: 'https://ui-avatars.com/api/?name=Pastor+John',
      timestamp: Date.now() - 3600000,
      type: 'text',
      readBy: ['Pastor John'],
      reactions: []
    },
    {
      id: 'msg2',
      content: 'Great meeting today!',
      senderId: 'Sarah Wilson',
      senderName: 'Sarah Wilson',
      senderAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson',
      timestamp: Date.now() - 7200000,
      type: 'text',
      readBy: ['currentUser', 'Sarah Wilson'],
      reactions: []
    }
  ]);
  const currentUserId = 'currentUser'; // This should come from auth context

  useEffect(() => {
    setIsCollapsed(!!selectedDmId);
  }, [selectedDmId, setIsCollapsed]);

  const directMessages: DirectMessage[] = [
    {
      id: '1',
      participants: ['currentUser', 'Pastor John'],
      unreadCount: 2,
      lastMessage: {
        id: 'msg1',
        content: 'Looking forward to Sunday service!',
        senderId: 'Pastor John',
        senderName: 'Pastor John',
        senderAvatar: 'https://ui-avatars.com/api/?name=Pastor+John',
        timestamp: Date.now() - 3600000,
        type: 'text',
        readBy: ['Pastor John']
      }
    },
    {
      id: '2',
      participants: ['currentUser', 'Sarah Wilson'],
      unreadCount: 0,
      lastMessage: {
        id: 'msg2',
        content: 'Great meeting today!',
        senderId: 'Sarah Wilson',
        senderName: 'Sarah Wilson',
        senderAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson',
        timestamp: Date.now() - 7200000,
        type: 'text',
        readBy: ['currentUser', 'Sarah Wilson']
      }
    }
  ];

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

  const selectedDm = directMessages.find(dm => dm.id === selectedDmId);

  return (
    <div className="h-full flex flex-col">
      {!selectedDm ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white">Messages</h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <DirectMessageList
              messages={directMessages}
              onSelectChat={setSelectedDmId}
              selectedChatId={selectedDmId}
              currentUserId={currentUserId}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#2a2f38]">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedDmId(null)}
                className="p-2 hover:bg-[#2a2f38] rounded-lg"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {selectedDm.participants.find(id => id !== currentUserId)}
                </h2>
              </div>
            </div>
          </div>

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
              placeholder={`Message ${selectedDm.participants.find(id => id !== currentUserId)}`}
              buttonText="Send"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;