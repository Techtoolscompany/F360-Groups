import React from 'react';

function CommunityScreen() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Communities</h1>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Youth Ministry</h2>
          <p className="text-gray-600 dark:text-gray-300">Active members: 45</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bible Study Group</h2>
          <p className="text-gray-600 dark:text-gray-300">Active members: 28</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Worship Team</h2>
          <p className="text-gray-600 dark:text-gray-300">Active members: 12</p>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Create New Community
      </button>
    </div>
  );
}

export default CommunityScreen;