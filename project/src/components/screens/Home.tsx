import React from 'react';
import SermonSection from '../sections/SermonSection';
import ChurchUpdates from '../sections/ChurchUpdates';
import CommunityPosts from '../sections/CommunityPosts';

function Home() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <SermonSection />
      </div>

      <div className="col-span-6">
        <ChurchUpdates />
        <div className="mt-6">
          <CommunityPosts />
        </div>
      </div>

      <div className="col-span-3">
        <div className="bg-[#1e2128] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium text-white">Sunday Service</p>
              <p className="text-sm text-gray-400">Tomorrow at 10:00 AM</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <p className="font-medium text-white">Bible Study</p>
              <p className="text-sm text-gray-400">Wednesday at 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;