import React, { useState } from 'react';
import PostReactions from './PostReactions';
import PostComments from './PostComments';
import ShareDialog from './ShareDialog';
import { Post, PostReaction, PostComment } from '../../types/post';

interface PostActionsProps {
  post: Post;
  currentUserId: string;
  onReact: (postId: string, reaction: Omit<PostReaction, 'timestamp'>) => void;
  onRemoveReaction: (postId: string, userId: string) => void;
  onAddComment: (postId: string, comment: Omit<PostComment, 'id' | 'timestamp' | 'reactions' | 'replies'>) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  onShare: (postId: string, text: string) => void;
  onReactToComment: (postId: string, commentId: string, reaction: { type: string; userId: string }) => void;
  onRemoveCommentReaction: (postId: string, commentId: string, userId: string) => void;
}

function PostActions({
  post,
  currentUserId,
  onReact,
  onRemoveReaction,
  onAddComment,
  onDeleteComment,
  onShare,
  onReactToComment,
  onRemoveCommentReaction
}: PostActionsProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleAddComment = (content: string, parentId?: string) => {
    onAddComment(post.id, {
      content,
      userId: currentUserId,
      userName: 'Current User',
      userAvatar: 'https://ui-avatars.com/api/?name=Current+User',
      parentId
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <PostReactions
          reactions={post.reactions}
          onReact={(type) => onReact(post.id, { type, userId: currentUserId })}
          onRemoveReaction={() => onRemoveReaction(post.id, currentUserId)}
          currentUserReaction={post.reactions.find(r => r.userId === currentUserId)}
        />
        <button
          onClick={() => setShowShareDialog(true)}
          className="flex items-center space-x-2 text-gray-400 hover:text-gray-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{post.shareCount > 0 ? post.shareCount : ''}</span>
        </button>
      </div>

      <PostComments
        comments={post.comments}
        onAddComment={handleAddComment}
        onDeleteComment={(commentId) => onDeleteComment(post.id, commentId)}
        onReactToComment={(commentId, reaction) => onReactToComment(post.id, commentId, reaction)}
        onRemoveCommentReaction={(commentId, userId) => onRemoveCommentReaction(post.id, commentId, userId)}
        currentUserId={currentUserId}
      />

      {showShareDialog && (
        <ShareDialog
          onClose={() => setShowShareDialog(false)}
          onShare={(text) => onShare(post.id, text)}
          postContent={post.content}
        />
      )}
    </div>
  );
}

export default PostActions;