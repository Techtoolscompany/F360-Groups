import React from 'react';
import { useSermons } from '../../context/SermonContext';
import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
  const { sermons } = useSermons();
  const { currentUser } = useAuth();

  const stats = [
    {
      name: 'Total Sermons',
      value: sermons.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Total Views',
      value: sermons.reduce((acc, sermon) => acc + sermon.views, 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      name: 'Total Likes',
      value: sermons.reduce((acc, sermon) => acc + sermon.likes, 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">{currentUser?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stats.map(stat => (
          <div
            key={stat.name}
            className="bg-[#1e2128] rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-[#2a2f38] rounded-lg text-blue-500">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1e2128] rounded-xl p-6">
        <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {sermons.slice(0, 5).map(sermon => (
            <div
              key={sermon.id}
              className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-white">{sermon.title}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(sermon.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{sermon.views} views</span>
                <span>{sermon.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;