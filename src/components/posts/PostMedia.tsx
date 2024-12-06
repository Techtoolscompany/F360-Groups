import React from 'react';
import { PostMedia as PostMediaType } from '../../types/post';

interface PostMediaProps {
  media: PostMediaType[];
}

function PostMedia({ media }: PostMediaProps) {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-4 space-y-4">
      {media.map((item, index) => {
        if (item.type === 'image') {
          return (
            <img
              key={index}
              src={item.url}
              alt="Post content"
              className="w-full rounded-lg"
            />
          );
        }

        if (item.type === 'video') {
          if (item.url.includes('youtube.com') || item.url.includes('youtu.be')) {
            const videoId = item.url.includes('youtube.com') 
              ? new URLSearchParams(new URL(item.url).search).get('v')
              : item.url.split('/').pop();
            
            return (
              <div key={index} className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            );
          }

          return (
            <video
              key={index}
              src={item.url}
              controls
              className="w-full rounded-lg"
            />
          );
        }

        if (item.type === 'link') {
          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#2a2f38] rounded-lg overflow-hidden hover:bg-[#353b47] transition-colors"
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title || 'Link preview'}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-medium text-white">{item.title || item.url}</h3>
                {item.description && (
                  <p className="text-gray-400 mt-1 text-sm">{item.description}</p>
                )}
                <p className="text-blue-400 text-sm mt-2">{item.url}</p>
              </div>
            </a>
          );
        }

        return null;
      })}
    </div>
  );
}

export default PostMedia;