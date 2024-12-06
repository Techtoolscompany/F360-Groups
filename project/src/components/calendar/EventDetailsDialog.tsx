import React from 'react';
import { format } from 'date-fns';
import { CalendarEvent } from '../../context/CalendarContext';
import { useAuth } from '../../context/AuthContext';

interface EventDetailsDialogProps {
  event: CalendarEvent;
  onClose: () => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

function EventDetailsDialog({ event, onClose, onEdit, onDelete }: EventDetailsDialogProps) {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      onDelete?.(event.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1e2128] rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">{event.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {event.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-400">Description</h3>
              <p className="text-white mt-1">{event.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Start Time</h3>
              <p className="text-white mt-1">
                {format(event.startTime, 'MMM d, yyyy h:mm a')}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">End Time</h3>
              <p className="text-white mt-1">
                {format(event.endTime, 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400">Category</h3>
            <p className="text-white mt-1 capitalize">{event.category}</p>
          </div>

          {event.isRecurring && (
            <div>
              <h3 className="text-sm font-medium text-gray-400">Recurring</h3>
              <p className="text-white mt-1">
                Every {event.recurringPattern?.interval}{' '}
                {event.recurringPattern?.frequency}
                {event.recurringPattern?.interval > 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Video Conference Details (if applicable) */}
          <div className="border-t border-[#2a2f38] pt-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Join Meeting</h3>
            <a
              href="#"
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Join Video Call</span>
            </a>
          </div>

          {isAdmin && (
            <div className="flex justify-end space-x-3 pt-4 border-t border-[#2a2f38]">
              <button
                onClick={() => onEdit?.(event)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsDialog;