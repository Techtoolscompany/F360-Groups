import React, { useState } from 'react';
import { PostReaction } from '../../types/post';

interface PostReactionsProps {
  reactions: PostReaction[];
  onReact: (type: PostReaction['type']) => void;
  onRemoveReaction: () => void;
  currentUserReaction?: PostReaction;
}

function PostReactions({ reactions, onReact, onRemoveReaction, currentUserReaction }: PostReactionsProps) {
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const reactionTypes: { type: PostReaction['type']; icon: string }[] = [
    { type: 'like', icon: '👍' },
    { type: 'love', icon: '❤️' },
    { type: 'pray', icon: '🙏' },
    { type: 'amen', icon: '✝️' }
  ];

  const reactionCounts = reactions.reduce((acc, reaction) => {
    acc[reaction.type] = (acc[reaction.type] || 0) + 1;
    return acc;
  }, {} as Record<PostReaction['type'], number>);

  return (
    <div className="relative">
      {Object.entries(reactionCounts).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.entries(reactionCounts).map(([type, count]) => (
            <span key={type} className="text-sm text-gray-400 bg-[#2a2f38] px-2 py-1 rounded-full flex items-center space-x-1">
              <span>{reactionTypes.find(r => r.type === type)?.icon}</span>
              <span>{count}</span>
            </span>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          if (currentUserReaction) {
            onRemoveReaction();
          } else {
            setShowReactionPicker(!showReactionPicker);
          }
        }}
        className={`flex items-center space-x-2 ${
          currentUserReaction ? 'text-blue-500' : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        {currentUserReaction ? (
          <>
            <span>{reactionTypes.find(r => r.type === currentUserReaction.type)?.icon}</span>
            <span>{currentUserReaction.type}</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>Like</span>
          </>
        )}
      </button>

      {showReactionPicker && (
        <div className="absolute bottom-full left-0 mb-2 bg-[#2a2f38] rounded-lg shadow-lg p-2 flex space-x-2">
          {reactionTypes.map(({ type, icon }) => (
            <button
              key={type}
              onClick={() => {
                onReact(type);
                setShowReactionPicker(false);
              }}
              className="p-2 hover:bg-[#353b47] rounded-lg transition-colors"
            >
              <span className="text-xl">{icon}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostReactions;