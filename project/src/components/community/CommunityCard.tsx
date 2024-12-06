import React, { useState } from 'react';
import CommunitySettings from './CommunitySettings';

interface CommunityCardProps {
  name: string;
  description: string;
  memberCount: number;
  postCount: number;
  adminCount: number;
  admins: Array<{ id: string; name: string; avatar: string }>;
  coverImage: string;
  isPublic?: boolean;
}

function CommunityCard({
  name,
  description,
  memberCount,
  postCount,
  adminCount,
  admins,
  coverImage,
  isPublic = true
}: CommunityCardProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-[#1e2128] rounded-xl overflow-hidden">
        <div 
          className="h-32 bg-gradient-to-r from-purple-500 to-yellow-500 relative" 
          style={{
            backgroundImage: coverImage ? `url(${coverImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <button 
            onClick={() => setShowSettings(true)}
            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{name}</h2>
            {isPublic && (
              <span className="text-sm text-gray-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Public Group
              </span>
            )}
          </div>
          <p className="text-gray-400 mb-6">{description}</p>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-white">{memberCount}</p>
                <p className="text-sm text-gray-400">Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-white">{postCount}</p>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-white">{adminCount}</p>
                <p className="text-sm text-gray-400">Admin</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {admins.map(admin => (
                <img
                  key={admin.id}
                  src={admin.avatar}
                  alt={admin.name}
                  className="w-8 h-8 rounded-full border-2 border-[#1e2128]"
                  title={admin.name}
                />
              ))}
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Invite Members
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <CommunitySettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

export default CommunityCard;