import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';

function AnnouncementsSidebar() {
  const { events } = useCalendar();
  const upcomingEvents = events
    .filter(event => event.startTime > new Date())
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 3);

  const latestSermons = [
    {
      id: '1',
      title: 'Walking in Faith',
      pastor: 'Pastor John',
      date: new Date(),
      thumbnail: 'https://picsum.photos/seed/sermon1/400/225'
    },
    {
      id: '2',
      title: 'The Power of Prayer',
      pastor: 'Pastor Sarah',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      thumbnail: 'https://picsum.photos/seed/sermon2/400/225'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <div className="bg-[#1e2128] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
          <Link 
            to="/calendar"
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div 
              key={event.id}
              className={`p-3 rounded-lg bg-[#2a2f38] border-l-4 ${
                event.color === 'blue' ? 'border-blue-500' :
                event.color === 'green' ? 'border-green-500' :
                event.color === 'purple' ? 'border-purple-500' :
                event.color === 'red' ? 'border-red-500' :
                'border-yellow-500'
              }`}
            >
              <h3 className="font-medium text-white">{event.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {format(event.startTime, 'MMM d, h:mm a')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Sermons */}
      <div className="bg-[#1e2128] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Latest Sermons</h2>
          <Link 
            to="/sermons"
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {latestSermons.map(sermon => (
            <div key={sermon.id} className="group cursor-pointer">
              <div className="relative">
                <img 
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-medium text-white mt-2">{sermon.title}</h3>
              <p className="text-sm text-gray-400">
                {sermon.pastor} • {format(sermon.date, 'MMM d, yyyy')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsSidebar;