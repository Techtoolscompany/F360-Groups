import React from 'react';
import CommunityCard from '../community/CommunityCard';
import CreatePost from '../posts/CreatePost';
import PostMedia from '../posts/PostMedia';
import PostReactions from '../posts/PostReactions';
import PostComments from '../posts/PostComments';
import UserProfileLink from '../shared/UserProfileLink';
import { usePosts } from '../../context/PostContext';

export default function Feed() {
  const { posts, addPost, addReaction, removeReaction, addComment, deleteComment, sharePost } = usePosts();
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

        {/* Posts */}
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

            <div className="flex space-x-4 mt-4 pt-4 border-t border-[#2a2f38]">
              <PostReactions
                reactions={post.reactions}
                onReact={(type) => addReaction(post.id, { type, userId: currentUserId })}
                onRemoveReaction={() => removeReaction(post.id, currentUserId)}
                currentUserReaction={post.reactions.find(r => r.userId === currentUserId)}
              />
              <PostComments
                comments={post.comments}
                onAddComment={(content) => addComment(post.id, {
                  content,
                  userId: currentUserId,
                  userName: 'Current User',
                  userAvatar: 'https://ui-avatars.com/api/?name=Current+User'
                })}
                onDeleteComment={(commentId) => deleteComment(post.id, commentId)}
              />
              <button
                onClick={() => sharePost(post.id)}
                className="flex items-center space-x-2 text-gray-400 hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>{post.shareCount > 0 ? post.shareCount : ''}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-4">
        <CommunityCard {...community} />
      </div>
    </div>
  );
}