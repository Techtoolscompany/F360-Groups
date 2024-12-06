import React from 'react';

function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: 'Sunday Service',
      time: 'Tomorrow at 10:00 AM',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Bible Study',
      time: 'Wednesday at 7:00 PM',
      color: 'purple'
    },
    {
      id: 3,
      title: 'Youth Group',
      time: 'Friday at 6:30 PM',
      color: 'green'
    }
  ];

  return (
    <div className="bg-[#1e2128] rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map(event => (
          <div 
            key={event.id}
            className={`border-l-4 border-${event.color}-500 pl-3`}
          >
            <p className="font-medium text-white">{event.title}</p>
            <p className="text-sm text-gray-400">{event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;