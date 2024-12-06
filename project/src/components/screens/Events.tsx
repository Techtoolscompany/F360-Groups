import React, { useState, useEffect } from 'react';
import { useSidebar } from '../../context/SidebarContext';

function Events() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const { setIsCollapsed } = useSidebar();

  useEffect(() => {
    setIsCollapsed(!!selectedEvent);
  }, [selectedEvent, setIsCollapsed]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Church Events</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create Event
        </button>
      </div>

      <div className="grid gap-6">
        {/* Upcoming Events */}
        <div className="bg-[#1e2128] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Sunday Service</h3>
                  <p className="text-sm text-gray-400">Tomorrow at 10:00 AM</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                RSVP
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Bible Study</h3>
                  <p className="text-sm text-gray-400">Wednesday at 7:00 PM</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                RSVP
              </button>
            </div>
          </div>
        </div>

        {/* Past Events */}
        <div className="bg-[#1e2128] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg opacity-75">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Youth Conference</h3>
                  <p className="text-sm text-gray-400">Last Sunday</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                View Recording
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;