import React, { useState } from 'react';

interface ShareDialogProps {
  onClose: () => void;
  onShare: (text: string) => void;
  postContent: string;
}

function ShareDialog({ onClose, onShare, postContent }: ShareDialogProps) {
  const [shareText, setShareText] = useState('');

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    onShare(shareText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1e2128] rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Share Post</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-[#2a2f38] rounded-lg p-4 mb-4">
          <p className="text-gray-300">{postContent}</p>
        </div>

        <form onSubmit={handleShare}>
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-[#2a2f38] rounded-lg p-4 text-white mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShareDialog;