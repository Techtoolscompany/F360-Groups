import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';
import GifPicker from './GifPicker';

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

function CommentInput({ onSubmit }: CommentInputProps) {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setContent(prev => prev + emoji.native);
  };

  const handleGifSelect = (gifUrl: string) => {
    onSubmit(`[gif]${gifUrl}[/gif]`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex space-x-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-[#2a2f38] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
        />
        <button
          type="button"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowGifPicker(false);
          }}
          className="p-2 text-gray-400 hover:text-gray-300 bg-[#2a2f38] rounded-lg"
        >
          <span className="text-xl">😊</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setShowGifPicker(!showGifPicker);
            setShowEmojiPicker(false);
          }}
          className="p-2 text-gray-400 hover:text-gray-300 bg-[#2a2f38] rounded-lg"
        >
          <span className="font-medium">GIF</span>
        </button>
        <button
          type="submit"
          disabled={!content.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>

      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      {showGifPicker && (
        <GifPicker
          onSelect={handleGifSelect}
          onClose={() => setShowGifPicker(false)}
        />
      )}
    </form>
  );
}

export default CommentInput;