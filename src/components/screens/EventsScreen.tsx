import React from 'react';

function EventsScreen() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Upcoming Events</h1>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sunday Service</h2>
          <p className="text-gray-600 dark:text-gray-300">Tomorrow at 10:00 AM</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bible Study</h2>
          <p className="text-gray-600 dark:text-gray-300">Wednesday at 7:00 PM</p>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Create New Event
      </button>
    </div>
  );
}

export default EventsScreen;