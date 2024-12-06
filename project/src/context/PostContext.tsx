import React, { createContext, useContext, useState } from 'react';
import { Post, PostReaction, PostComment, PostMedia } from '../types/post';

interface PostContextType {
  posts: Post[];
  addPost: (content: string, media?: PostMedia[]) => void;
  deletePost: (postId: string) => void;
  editPost: (postId: string, content: string) => void;
  addReaction: (postId: string, reaction: Omit<PostReaction, 'timestamp'>) => void;
  removeReaction: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Omit<PostComment, 'id' | 'timestamp' | 'reactions' | 'replies'>) => void;
  deleteComment: (postId: string, commentId: string) => void;
  sharePost: (postId: string) => void;
  addCommentReaction: (postId: string, commentId: string, reaction: { type: string; userId: string }) => void;
  removeCommentReaction: (postId: string, commentId: string, userId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        id: 'pastor-john',
        name: 'Pastor John',
        avatar: 'https://ui-avatars.com/api/?name=Pastor+John'
      },
      content: 'Excited to announce our upcoming Easter service preparations! Join us this Sunday as we begin our special sermon series.',
      media: [{ type: 'image', url: 'https://picsum.photos/seed/post1/800/400' }],
      timestamp: Date.now() - 7200000,
      reactions: [],
      comments: [],
      shareCount: 0
    }
  ]);

  const updateCommentReactions = (
    comments: PostComment[],
    commentId: string,
    updateFn: (comment: PostComment) => PostComment
  ): PostComment[] => {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return updateFn(comment);
      }
      if (comment.replies?.length > 0) {
        return {
          ...comment,
          replies: updateCommentReactions(comment.replies, commentId, updateFn)
        };
      }
      return comment;
    });
  };

  const addCommentReaction = (postId: string, commentId: string, reaction: { type: string; userId: string }) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: updateCommentReactions(
            post.comments,
            commentId,
            comment => ({
              ...comment,
              reactions: [...comment.reactions, { ...reaction, timestamp: Date.now() }]
            })
          )
        };
      }
      return post;
    }));
  };

  const removeCommentReaction = (postId: string, commentId: string, userId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: updateCommentReactions(
            post.comments,
            commentId,
            comment => ({
              ...comment,
              reactions: comment.reactions.filter(r => r.userId !== userId)
            })
          )
        };
      }
      return post;
    }));
  };

  const addComment = (postId: string, comment: Omit<PostComment, 'id' | 'timestamp' | 'reactions' | 'replies'>) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: PostComment = {
          ...comment,
          id: Date.now().toString(),
          timestamp: Date.now(),
          reactions: [],
          replies: []
        };

        if (comment.parentId) {
          return {
            ...post,
            comments: updateCommentReactions(
              post.comments,
              comment.parentId,
              parentComment => ({
                ...parentComment,
                replies: [...(parentComment.replies || []), newComment]
              })
            )
          };
        }

        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  // Rest of the context implementation...
  const addPost = (content: string, media?: PostMedia[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'Current User',
        avatar: 'https://ui-avatars.com/api/?name=Current+User'
      },
      content,
      media,
      timestamp: Date.now(),
      reactions: [],
      comments: [],
      shareCount: 0
    };
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const editPost = (postId: string, content: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            content, 
            isEdited: true, 
            editedTimestamp: Date.now() 
          } 
        : post
    ));
  };

  const addReaction = (postId: string, reaction: Omit<PostReaction, 'timestamp'>) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const existingReaction = post.reactions.find(r => r.userId === reaction.userId);
        if (existingReaction) {
          return {
            ...post,
            reactions: post.reactions.map(r =>
              r.userId === reaction.userId
                ? { ...reaction, timestamp: Date.now() }
                : r
            )
          };
        }
        return {
          ...post,
          reactions: [...post.reactions, { ...reaction, timestamp: Date.now() }]
        };
      }
      return post;
    }));
  };

  const removeReaction = (postId: string, userId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            reactions: post.reactions.filter(r => r.userId !== userId)
          }
        : post
    ));
  };

  const deleteComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId)
          }
        : post
    ));
  };

  const sharePost = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, shareCount: post.shareCount + 1 }
        : post
    ));
  };

  return (
    <PostContext.Provider value={{
      posts,
      addPost,
      deletePost,
      editPost,
      addReaction,
      removeReaction,
      addComment,
      deleteComment,
      sharePost,
      addCommentReaction,
      removeCommentReaction
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}