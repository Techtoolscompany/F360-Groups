export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: number;
  type: 'text' | 'image' | 'file' | 'announcement';
  readBy: string[];
}

export interface ChatGroup {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private';
  members: string[];
  admins: string[];
  createdAt: number;
  lastMessage?: Message;
  isSmallGroup?: boolean;
}

export interface DirectMessage {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}