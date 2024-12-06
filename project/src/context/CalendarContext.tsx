import React, { createContext, useContext, useState } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category: string;
  color: string;
  createdBy: string;
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}

interface CalendarContextType {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id' | 'createdBy'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Dummy data
const dummyEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Sunday Service',
    description: 'Weekly worship service',
    startTime: new Date(new Date().setHours(10, 0, 0, 0)),
    endTime: new Date(new Date().setHours(12, 0, 0, 0)),
    category: 'service',
    color: 'blue',
    createdBy: 'admin',
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1
    }
  },
  {
    id: '2',
    title: 'Bible Study',
    description: 'Weekly Bible study session',
    startTime: new Date(new Date().setHours(19, 0, 0, 0)),
    endTime: new Date(new Date().setHours(20, 30, 0, 0)),
    category: 'study',
    color: 'purple',
    createdBy: 'admin'
  },
  {
    id: '3',
    title: 'Youth Group Meeting',
    description: 'Youth ministry activities and discussion',
    startTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    category: 'youth',
    color: 'green',
    createdBy: 'admin'
  },
  {
    id: '4',
    title: 'Worship Team Practice',
    description: 'Preparation for Sunday service',
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    category: 'worship',
    color: 'yellow',
    createdBy: 'admin'
  }
];

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>(dummyEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addEvent = async (event: Omit<CalendarEvent, 'id' | 'createdBy'>) => {
    try {
      setIsLoading(true);
      const newEvent: CalendarEvent = {
        ...event,
        id: Date.now().toString(),
        createdBy: 'admin'
      };
      setEvents(prev => [...prev, newEvent]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add event');
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (id: string, eventUpdates: Partial<CalendarEvent>) => {
    try {
      setIsLoading(true);
      setEvents(prev => prev.map(event => 
        event.id === id 
          ? { ...event, ...eventUpdates }
          : event
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      setIsLoading(true);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CalendarContext.Provider value={{
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      isLoading,
      error
    }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}