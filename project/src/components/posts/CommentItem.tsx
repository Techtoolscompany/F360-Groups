import React, { useState } from 'react';
import { PostComment } from '../../types/post';
import MediaInput from '../shared/MediaInput';
import PostReactions from './PostReactions';

interface CommentItemProps {
  comment: PostComment;
  onReply: (content: string, parentId: string) => void;
  onDelete: (commentId: string) => void;
  onReact: (commentId: string, reaction: { type: string; userId: string }) => void;
  onRemoveReaction: (commentId: string, userId: string) => void;
  currentUserId: string;
  isReply?: boolean;
}

function CommentItem({
  comment,
  onReply,
  onDelete,
  onReact,
  onRemoveReaction,
  currentUserId,
  isReply = false
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);

  const handleSubmitReply = (content: string) => {
    onReply(content, comment.id);
    setIsReplying(false);
  };

  const handleReaction = (type: string) => {
    onReact(comment.id, { type, userId: currentUserId });
  };

  const handleRemoveReaction = () => {
    onRemoveReaction(comment.id, currentUserId);
  };

  return (
    <div className={`flex space-x-3 ${isReply ? 'ml-12 mt-4' : ''}`}>
      <img
        src={comment.userAvatar}
        alt={comment.userName}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-[#2a2f38] rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">{comment.userName}</span>
            <span className="text-sm text-gray-400">
              {new Date(comment.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-gray-300 mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <PostReactions
            reactions={comment.reactions}
            onReact={handleReaction}
            onRemoveReaction={handleRemoveReaction}
            currentUserReaction={comment.reactions.find(r => r.userId === currentUserId)}
          />
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="text-gray-400 hover:text-gray-300 text-sm"
          >
            Reply
          </button>
          {comment.userId === currentUserId && (
            <button
              onClick={() => onDelete(comment.id)}
              className="text-gray-400 hover:text-red-500 text-sm"
            >
              Delete
            </button>
          )}
        </div>

        {isReplying && (
          <div className="mt-4">
            <MediaInput
              onSubmit={handleSubmitReply}
              placeholder={`Reply to ${comment.userName}...`}
              buttonText="Reply"
              showIcons={false}
              autoFocus
            />
          </div>
        )}

        {comment.replies?.map(reply => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onReply={onReply}
            onDelete={onDelete}
            onReact={onReact}
            onRemoveReaction={onRemoveReaction}
            currentUserId={currentUserId}
            isReply
          />
        ))}
      </div>
    </div>
  );
}

export default CommentItem;