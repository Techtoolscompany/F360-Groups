import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';
import { useAuth } from '../../context/AuthContext';
import EventDialog from '../calendar/EventDialog';
import EventDetailsDialog from '../calendar/EventDetailsDialog';
import { CalendarEvent } from '../../context/CalendarContext';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { events, addEvent, updateEvent, deleteEvent, isLoading } = useCalendar();
  const { currentUser } = useAuth();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.startTime.getDate() === date.getDate() &&
      event.startTime.getMonth() === date.getMonth() &&
      event.startTime.getFullYear() === date.getFullYear()
    );
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setShowEventDialog(true);
  };

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="h-full bg-[#1e2128] rounded-xl p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-white">Calendar</h1>
          <div className="flex items-center space-x-2 bg-[#2a2f38] rounded-lg p-1">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 text-gray-400 hover:text-white rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white px-4">{format(currentDate, 'MMMM yyyy')}</span>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 text-gray-400 hover:text-white rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => {
              setSelectedEvent(null);
              setIsEditing(false);
              setShowEventDialog(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Event</span>
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-px bg-[#2a2f38]">
          {/* Day headers */}
          {days.map(day => (
            <div key={day} className="text-center py-2 text-sm font-medium text-gray-400 bg-[#1e2128]">
              {day}
            </div>
          ))}

          {/* Calendar cells */}
          {monthDays.map((date, i) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            
            return (
              <div
                key={i}
                className={`min-h-[120px] p-2 bg-[#1e2128] ${
                  !isCurrentMonth ? 'opacity-50' : ''
                }`}
              >
                <div className={`text-sm mb-1 ${
                  isToday(date) 
                    ? 'text-blue-500 font-semibold' 
                    : 'text-gray-400'
                }`}>
                  {format(date, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`${colorClasses[event.color]} text-xs p-1 rounded truncate cursor-pointer hover:opacity-80`}
                      title={`${format(event.startTime, 'h:mm a')} - ${event.title}`}
                    >
                      {format(event.startTime, 'h:mm a')} - {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showEventDialog && (
        <EventDialog
          onClose={() => {
            setShowEventDialog(false);
            setSelectedEvent(null);
            setIsEditing(false);
          }}
          onSubmit={isEditing ? 
            (event) => updateEvent(selectedEvent!.id, event) : 
            addEvent
          }
          initialEvent={selectedEvent}
          isEdit={isEditing}
        />
      )}

      {selectedEvent && !showEventDialog && (
        <EventDetailsDialog
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEditEvent}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
}

export default Calendar;