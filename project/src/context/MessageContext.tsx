import React, { createContext, useContext, useState } from 'react';
import { Message } from '../types/chat';

interface MessageContextType {
  messages: Record<string, Message[]>;
  addMessage: (conversationId: string, content: string, senderId: string, media?: any[]) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  addReaction: (conversationId: string, messageId: string, reaction: { type: string; userId: string }) => void;
  removeReaction: (conversationId: string, messageId: string, userId: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'pastor-john': [
      {
        id: 'msg1',
        content: 'Looking forward to Sunday service!',
        senderId: 'pastor-john',
        senderName: 'Pastor John',
        senderAvatar: 'https://ui-avatars.com/api/?name=Pastor+John',
        timestamp: Date.now() - 3600000,
        type: 'text',
        readBy: ['pastor-john'],
        reactions: []
      }
    ]
  });

  const addMessage = (conversationId: string, content: string, senderId: string, media?: any[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId,
      senderName: senderId === 'current-user' ? 'Current User' : conversationId.replace('-', ' '),
      senderAvatar: `https://ui-avatars.com/api/?name=${senderId === 'current-user' ? 'Current+User' : conversationId.replace('-', '+')}`,
      timestamp: Date.now(),
      type: 'text',
      readBy: [senderId],
      reactions: [],
      media
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));
  };

  const deleteMessage = (conversationId: string, messageId: string) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: prev[conversationId].filter(msg => msg.id !== messageId)
    }));
  };

  const addReaction = (conversationId: string, messageId: string, reaction: { type: string; userId: string }) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: prev[conversationId].map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: [...msg.reactions, { ...reaction, timestamp: Date.now() }]
            }
          : msg
      )
    }));
  };

  const removeReaction = (conversationId: string, messageId: string, userId: string) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: prev[conversationId].map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: msg.reactions.filter(r => r.userId !== userId)
            }
          : msg
      )
    }));
  };

  return (
    <MessageContext.Provider value={{
      messages,
      addMessage,
      deleteMessage,
      addReaction,
      removeReaction
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}