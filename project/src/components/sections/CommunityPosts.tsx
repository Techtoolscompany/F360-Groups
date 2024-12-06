import React from 'react';

function CommunityPosts() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Community Posts</h2>
        <button className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm">
          Create Post
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src="https://ui-avatars.com/api/?name=Youth+Ministry" alt="Youth Ministry" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-medium">Youth Ministry</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Amazing youth service today! Thanks to everyone who participated in our worship session. Don't forget about our weekly Bible study tomorrow at 7 PM!
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/403/300" alt="Youth Service" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://picsum.photos/404/300" alt="Youth Service" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPosts;