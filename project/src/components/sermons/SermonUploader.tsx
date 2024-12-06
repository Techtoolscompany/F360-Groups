import React, { useState } from 'react';
import { getVideoProvider } from '../../utils/videoUtils';

interface SermonUploaderProps {
  onUpload: (videoData: { url: string; type: 'youtube' | 'vimeo' | 'direct' | null }) => void;
}

function SermonUploader({ onUpload }: SermonUploaderProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const provider = getVideoProvider(videoUrl);
    
    if (!provider) {
      setError('Please enter a valid YouTube, Vimeo, or direct video URL');
      return;
    }

    onUpload({ url: videoUrl, type: provider });
    setVideoUrl('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-400 mb-1">
          Video URL
        </label>
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube, Vimeo, or direct video URL"
          className="w-full bg-[#2a2f38] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={!videoUrl.trim()}
        >
          Add Video
        </button>
      </div>
    </form>
  );
}

export default SermonUploader;