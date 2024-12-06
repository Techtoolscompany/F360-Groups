import React from 'react';
import SermonSection from './sections/SermonSection';
import ChurchUpdates from './sections/ChurchUpdates';
import CommunityPosts from './sections/CommunityPosts';

function HomeScreen() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Sermons */}
      <div className="col-span-3">
        <SermonSection />
      </div>

      {/* Middle Column - Church Updates */}
      <div className="col-span-6">
        <ChurchUpdates />
        <div className="mt-6">
          <CommunityPosts />
        </div>
      </div>

      {/* Right Column - Upcoming Events & Quick Links */}
      <div className="col-span-3">
        <div className="bg-white dark:bg-dark-card rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-accent-blue pl-3">
              <p className="font-medium">Sunday Service</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow at 10:00 AM</p>
            </div>
            <div className="border-l-4 border-accent-purple pl-3">
              <p className="font-medium">Bible Study</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wednesday at 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;