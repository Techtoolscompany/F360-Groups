import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { UserProfile as UserProfileType } from '../../types/user';
import ProfileImageUpload from './ProfileImageUpload';

function UserProfile() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isEditingCover, setIsEditingCover] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch user profile data
    // For now, we'll use mock data
    setProfileData({
      id: userId || '',
      name: userId?.replace('-', ' ') || '',
      email: 'user@example.com',
      avatar: `https://ui-avatars.com/api/?name=${userId?.replace('-', '+')}`,
      role: 'member',
      bio: 'Active church member and volunteer',
      joinDate: new Date(),
      lastActive: new Date(),
      groups: ['general', 'worship', 'youth'],
      stats: {
        posts: 42,
        reactions: 156,
        comments: 89
      }
    });
  }, [userId]);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => prev ? {
          ...prev,
          coverImage: reader.result as string
        } : null);
      };
      reader.readAsDataURL(file);
    }
    setIsEditingCover(false);
  };

  const isOwnProfile = currentUser?.id === userId;

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-[#1e2128] rounded-xl overflow-hidden">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 relative">
            {profileData.coverImage ? (
              <img
                src={profileData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            
            {isOwnProfile && (
              <button 
                onClick={() => setIsEditingCover(true)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Change Cover</span>
              </button>
            )}
          </div>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end space-x-6">
              <div className="relative group">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-xl border-4 border-[#1e2128] relative z-10"
                />
                {isOwnProfile && (
                  <button
                    onClick={() => setShowImageUpload(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold">{profileData.name}</h1>
                <p className="text-gray-200 mt-1">{profileData.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="p-6 border-t border-[#2a2f38]">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-semibold text-white">{profileData.stats?.posts}</p>
              <p className="text-gray-400">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{profileData.stats?.reactions}</p>
              <p className="text-gray-400">Reactions</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{profileData.stats?.comments}</p>
              <p className="text-gray-400">Comments</p>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="border-t border-[#2a2f38]">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 px-6 py-3 text-center ${
                activeTab === 'posts'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 px-6 py-3 text-center ${
                activeTab === 'about'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex-1 px-6 py-3 text-center ${
                activeTab === 'groups'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Groups
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'about' && (
          <div className="bg-[#1e2128] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">About</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Bio</h3>
                <p className="text-white mt-1">{profileData.bio}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Member Since</h3>
                <p className="text-white mt-1">{format(profileData.joinDate, 'MMMM d, yyyy')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Last Active</h3>
                <p className="text-white mt-1">{format(profileData.lastActive, 'MMMM d, yyyy')}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="bg-[#1e2128] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Groups</h2>
            <div className="space-y-4">
              {profileData.groups.map((group) => (
                <div
                  key={group}
                  className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg"
                >
                  <span className="text-white">#{group}</span>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image upload modal */}
      {showImageUpload && (
        <ProfileImageUpload onClose={() => setShowImageUpload(false)} />
      )}

      {/* Cover image upload input */}
      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        onChange={handleCoverUpload}
        className="hidden"
      />
    </div>
  );
}

export default UserProfile;