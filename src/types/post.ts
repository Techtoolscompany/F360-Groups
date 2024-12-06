export interface PostReaction {
  type: 'like' | 'love' | 'pray' | 'amen';
  userId: string;
  timestamp: number;
}

export interface PostComment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: number;
  reactions: PostReaction[];
  replies: PostComment[];
  parentId?: string;
}

export interface PostMedia {
  type: 'image' | 'video' | 'link';
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  media?: PostMedia[];
  timestamp: number;
  reactions: PostReaction[];
  comments: PostComment[];
  shareCount: number;
  isEdited?: boolean;
  editedTimestamp?: number;
}