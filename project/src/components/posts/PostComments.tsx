import React from 'react';
import { PostComment } from '../../types/post';
import MediaInput from '../shared/MediaInput';
import CommentItem from './CommentItem';

interface PostCommentsProps {
  comments: PostComment[];
  onAddComment: (content: string, parentId?: string) => void;
  onDeleteComment: (commentId: string) => void;
  onReactToComment: (commentId: string, reaction: { type: string; userId: string }) => void;
  onRemoveCommentReaction: (commentId: string, userId: string) => void;
  currentUserId: string;
}

function PostComments({ 
  comments, 
  onAddComment, 
  onDeleteComment, 
  onReactToComment,
  onRemoveCommentReaction,
  currentUserId 
}: PostCommentsProps) {
  return (
    <div className="space-y-4">
      <div className="text-gray-400">
        {comments.length} Comments
      </div>

      <MediaInput
        onSubmit={(content) => onAddComment(content)}
        placeholder="Write a comment..."
        buttonText="Comment"
        showIcons={false}
      />

      <div className="space-y-4">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={onAddComment}
            onDelete={onDeleteComment}
            onReact={onReactToComment}
            onRemoveReaction={onRemoveCommentReaction}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
}

export default PostComments;