import React from 'react';
import CommunityCard from '../community/CommunityCard';
import CreatePost from './CreatePost';
import PostMedia from './PostMedia';
import PostActions from './PostActions';
import UserProfileLink from '../shared/UserProfileLink';
import { usePosts } from '../../context/PostContext';

export default function Feed() {
  const { 
    posts, 
    addPost, 
    addReaction, 
    removeReaction, 
    addComment, 
    deleteComment, 
    sharePost,
    addCommentReaction,
    removeCommentReaction
  } = usePosts();
  const currentUserId = 'current-user'; // This should come from auth context

  const community = {
    name: 'Divine Connection Community',
    description: 'Discover how Divine Connection Praise Ministry (DCPM) can help you grow spiritually, strengthen your family, and achieve financial freedom.',
    memberCount: 2,
    postCount: 0,
    adminCount: 1,
    admins: [
      {
        id: '1',
        name: 'Pastor John',
        avatar: 'https://ui-avatars.com/api/?name=Pastor+John'
      }
    ],
    coverImage: '',
    isPublic: true
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <CreatePost onSubmit={(content, media) => addPost(content, media)} />

        {posts.map(post => (
          <div key={post.id} className="bg-[#1e2128] rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <UserProfileLink
                userId={post.author.id}
                userName={post.author.name}
                userAvatar={post.author.avatar}
              />
              <span className="text-sm text-gray-400">
                {new Date(post.timestamp).toLocaleTimeString()}
                {post.isEdited && <span className="ml-2">(edited)</span>}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{post.content}</p>
            
            {post.media && <PostMedia media={post.media} />}

            <PostActions
              post={post}
              currentUserId={currentUserId}
              onReact={addReaction}
              onRemoveReaction={removeReaction}
              onAddComment={addComment}
              onDeleteComment={deleteComment}
              onShare={(postId, text) => sharePost(postId)}
              onReactToComment={addCommentReaction}
              onRemoveCommentReaction={removeCommentReaction}
            />
          </div>
        ))}
      </div>

      <div className="lg:col-span-4">
        <CommunityCard {...community} />
      </div>
    </div>
  );
}