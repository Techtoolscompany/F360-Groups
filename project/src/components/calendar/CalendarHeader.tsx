import React from 'react';

interface CalendarHeaderProps {
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddEvent: () => void;
  view: string;
  onViewChange: (view: string) => void;
}

function CalendarHeader({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth, 
  onAddEvent,
  view,
  onViewChange
}: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold text-white">Calendar</h1>
        <div className="flex items-center bg-[#2a2f38] rounded-lg">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-2 rounded-lg ${view === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-2 rounded-lg ${view === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-[#2a2f38] rounded-lg p-2">
          <button 
            onClick={onPrevMonth}
            className="p-1 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="px-3 text-white">{currentMonth}</span>
          <button 
            onClick={onNextMonth}
            className="p-1 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <button
          onClick={onAddEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Event</span>
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;