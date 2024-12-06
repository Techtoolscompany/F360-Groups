import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Sermon } from '../../types/sermon';

interface SermonCardProps {
  sermon: Sermon;
}

function SermonCard({ sermon }: SermonCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <Link to={`/sermons/${sermon.id}`}>
      <div className="bg-[#1e2128] rounded-xl overflow-hidden group cursor-pointer">
        <div className="relative">
          <img 
            src={sermon.thumbnail} 
            alt={sermon.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
            <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 px-2 py-1 rounded text-sm text-white">
            {formatDuration(sermon.duration)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
            {sermon.title}
          </h3>
          <div className="flex items-center space-x-2 mt-2">
            <img 
              src={sermon.pastor.avatar} 
              alt={sermon.pastor.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-400">{sermon.pastor.name}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
            <span>{format(sermon.date, 'MMM d, yyyy')}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {sermon.views}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {sermon.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SermonCard;