import React from 'react';
import AnnouncementsList from '../announcements/AnnouncementsList';
import AnnouncementsSidebar from '../announcements/AnnouncementsSidebar';

function Announcements() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <AnnouncementsList />
      </div>
      <div className="lg:col-span-4">
        <AnnouncementsSidebar />
      </div>
    </div>
  );
}

export default Announcements;