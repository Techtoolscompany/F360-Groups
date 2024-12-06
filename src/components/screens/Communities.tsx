import React from 'react';
import CommunityCard from '../community/CommunityCard';

function Communities() {
  const communities = [
    {
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
    },
    {
      name: 'Youth Ministry',
      description: 'A community for young believers to connect, grow, and serve together.',
      memberCount: 45,
      postCount: 128,
      adminCount: 2,
      admins: [
        {
          id: '2',
          name: 'Sarah Wilson',
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson'
        }
      ],
      coverImage: '',
      isPublic: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Communities</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create Community
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map((community, index) => (
          <CommunityCard key={index} {...community} />
        ))}
      </div>
    </div>
  );
}

export default Communities;