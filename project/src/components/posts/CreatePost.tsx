import React, { useState, useRef } from 'react';
import { extractUrls, getLinkPreview, isVideoUrl } from '../../utils/linkParser';
import { PostMedia } from '../../types/post';

interface CreatePostProps {
  onSubmit: (content: string, media: PostMedia[]) => void;
}

function CreatePost({ onSubmit }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<PostMedia[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Extract and process URLs
    const urls = extractUrls(newContent);
    if (urls.length > 0) {
      setIsProcessing(true);
      const newMedia = await Promise.all(
        urls.map(async (url) => {
          if (isVideoUrl(url)) {
            return {
              type: 'video' as const,
              url
            };
          } else {
            const preview = await getLinkPreview(url);
            return {
              type: 'link' as const,
              url,
              thumbnail: preview.image,
              title: preview.title,
              description: preview.description
            };
          }
        })
      );
      setMedia(prevMedia => [...prevMedia, ...newMedia]);
      setIsProcessing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newMedia = Array.from(files).map(file => ({
        type: 'image' as const,
        url: URL.createObjectURL(file)
      }));
      setMedia(prevMedia => [...prevMedia, ...newMedia]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || media.length > 0) {
      onSubmit(content, media);
      setContent('');
      setMedia([]);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#1e2128] rounded-xl p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <img 
            src="https://ui-avatars.com/api/?name=User" 
            alt="User" 
            className="w-10 h-10 rounded-full"
          />
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Share something with your community..."
            className="flex-1 bg-[#2a2f38] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100 min-h-[80px] resize-none"
          />
        </div>

        {media.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {media.map((item, index) => (
              <div key={index} className="relative">
                {item.type === 'image' && (
                  <img 
                    src={item.url} 
                    alt="Upload preview" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                {item.type === 'video' && (
                  <div className="w-full h-32 bg-[#2a2f38] rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                {item.type === 'link' && (
                  <div className="w-full h-32 bg-[#2a2f38] rounded-lg p-2">
                    <p className="text-sm text-white font-medium truncate">{item.title || item.url}</p>
                    {item.thumbnail && (
                      <img 
                        src={item.thumbnail} 
                        alt="Link preview" 
                        className="w-full h-20 object-cover rounded mt-1"
                      />
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-4 pt-4 border-t border-[#2a2f38]">
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Photo</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-400 hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Video</span>
            </button>
          </div>
          <button
            type="submit"
            disabled={(!content.trim() && media.length === 0) || isProcessing}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;