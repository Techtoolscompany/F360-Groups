import React, { useState } from 'react';
import { CalendarEvent } from '../../context/CalendarContext';

interface EventDialogProps {
  onClose: () => void;
  onSubmit: (event: Omit<CalendarEvent, 'id' | 'createdBy'>) => void;
  initialEvent?: Partial<CalendarEvent>;
  isEdit?: boolean;
}

function EventDialog({ onClose, onSubmit, initialEvent, isEdit = false }: EventDialogProps) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [startTime, setStartTime] = useState(
    initialEvent?.startTime 
      ? new Date(initialEvent.startTime).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(
    initialEvent?.endTime 
      ? new Date(initialEvent.endTime).toISOString().slice(0, 16)
      : new Date(Date.now() + 3600000).toISOString().slice(0, 16)
  );
  const [category, setCategory] = useState(initialEvent?.category || 'general');
  const [color, setColor] = useState(initialEvent?.color || 'blue');
  const [isRecurring, setIsRecurring] = useState(initialEvent?.isRecurring || false);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'service', label: 'Service' },
    { value: 'study', label: 'Bible Study' },
    { value: 'youth', label: 'Youth' },
    { value: 'worship', label: 'Worship' }
  ];

  const colors = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-100 text-blue-800' },
    { value: 'green', label: 'Green', class: 'bg-green-100 text-green-800' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-100 text-purple-800' },
    { value: 'red', label: 'Red', class: 'bg-red-100 text-red-800' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      category,
      color,
      isRecurring,
      ...(isRecurring && {
        recurringPattern: {
          frequency: 'weekly',
          interval: 1
        }
      })
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1e2128] rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {isEdit ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#2a2f38] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#2a2f38] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-[#2a2f38] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-[#2a2f38] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#2a2f38] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {colors.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-8 h-8 rounded-full ${c.class} ${
                    color === c.value ? 'ring-2 ring-white' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded bg-[#2a2f38] text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="recurring" className="ml-2 text-sm text-gray-400">
              Recurring event
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventDialog;