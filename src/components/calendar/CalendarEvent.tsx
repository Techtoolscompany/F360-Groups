import React from 'react';

interface CalendarEventProps {
  title: string;
  time: string;
  category: string;
  color: string;
}

function CalendarEvent({ title, time, category, color }: CalendarEventProps) {
  return (
    <div 
      className={`p-2 rounded-lg mb-2 ${
        color === 'blue' ? 'bg-blue-500 bg-opacity-10 border-l-4 border-blue-500' :
        color === 'green' ? 'bg-green-500 bg-opacity-10 border-l-4 border-green-500' :
        color === 'purple' ? 'bg-purple-500 bg-opacity-10 border-l-4 border-purple-500' :
        color === 'orange' ? 'bg-orange-500 bg-opacity-10 border-l-4 border-orange-500' :
        'bg-gray-500 bg-opacity-10 border-l-4 border-gray-500'
      }`}
    >
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="text-xs text-gray-400">{time}</div>
      <div className="text-xs text-gray-400 mt-1">
        <span className={`
          inline-block w-2 h-2 rounded-full mr-1
          ${color === 'blue' ? 'bg-blue-500' :
            color === 'green' ? 'bg-green-500' :
            color === 'purple' ? 'bg-purple-500' :
            color === 'orange' ? 'bg-orange-500' :
            'bg-gray-500'
          }
        `}></span>
        {category}
      </div>
    </div>
  );
}

export default CalendarEvent;