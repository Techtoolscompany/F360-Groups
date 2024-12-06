import React, { createContext, useContext, useState } from 'react';
import { Sermon, SermonSeries } from '../types/sermon';

interface SermonContextType {
  sermons: Sermon[];
  series: SermonSeries[];
  currentSermon: Sermon | null;
  isLoading: boolean;
  error: string | null;
  fetchSermons: () => Promise<void>;
  fetchSermonById: (id: string) => Promise<void>;
  likeSermon: (id: string) => Promise<void>;
  downloadSermon: (id: string) => Promise<void>;
  addView: (id: string) => Promise<void>;
}

const SermonContext = createContext<SermonContextType | undefined>(undefined);

// Mock data
const mockSermons: Sermon[] = [
  {
    id: '1',
    title: 'Walking in Faith',
    description: 'Discover how to strengthen your faith through daily challenges.',
    pastor: {
      id: 'pastor-john',
      name: 'Pastor John',
      email: 'pastor.john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Pastor+John',
      role: 'pastor',
      joinDate: new Date('2020-01-01'),
      lastActive: new Date(),
      bio: 'Senior Pastor',
      groups: ['general']
    },
    date: new Date(),
    videoUrl: 'https://example.com/sermon1.mp4',
    thumbnail: 'https://picsum.photos/seed/sermon1/800/400',
    duration: 3600,
    tags: ['faith', 'spiritual growth'],
    views: 156,
    likes: 45,
    downloads: 23
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    description: 'Understanding the transformative power of prayer in our lives.',
    pastor: {
      id: 'pastor-sarah',
      name: 'Pastor Sarah',
      email: 'pastor.sarah@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Pastor+Sarah',
      role: 'pastor',
      joinDate: new Date('2020-01-01'),
      lastActive: new Date(),
      bio: 'Youth Pastor',
      groups: ['youth']
    },
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    videoUrl: 'https://example.com/sermon2.mp4',
    thumbnail: 'https://picsum.photos/seed/sermon2/800/400',
    duration: 3300,
    tags: ['prayer', 'spiritual disciplines'],
    views: 128,
    likes: 38,
    downloads: 15
  }
];

const mockSeries: SermonSeries[] = [
  {
    id: '1',
    name: 'Foundations of Faith',
    description: 'A series exploring the fundamental aspects of Christian faith.',
    thumbnail: 'https://picsum.photos/seed/series1/800/400',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    sermons: mockSermons
  }
];

export function SermonProvider({ children }: { children: React.ReactNode }) {
  const [sermons, setSermons] = useState<Sermon[]>(mockSermons);
  const [series, setSeries] = useState<SermonSeries[]>(mockSeries);
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSermons = async () => {
    try {
      setIsLoading(true);
      // In a real app, fetch from API
      setSermons(mockSermons);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sermons');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSermonById = async (id: string) => {
    try {
      setIsLoading(true);
      const sermon = mockSermons.find(s => s.id === id);
      if (sermon) {
        setCurrentSermon(sermon);
      } else {
        throw new Error('Sermon not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sermon');
    } finally {
      setIsLoading(false);
    }
  };

  const likeSermon = async (id: string) => {
    try {
      setSermons(prev => prev.map(sermon => 
        sermon.id === id 
          ? { ...sermon, likes: sermon.likes + 1 }
          : sermon
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like sermon');
    }
  };

  const downloadSermon = async (id: string) => {
    try {
      setSermons(prev => prev.map(sermon => 
        sermon.id === id 
          ? { ...sermon, downloads: sermon.downloads + 1 }
          : sermon
      ));
      // In a real app, trigger download
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download sermon');
    }
  };

  const addView = async (id: string) => {
    try {
      setSermons(prev => prev.map(sermon => 
        sermon.id === id 
          ? { ...sermon, views: sermon.views + 1 }
          : sermon
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add view');
    }
  };

  return (
    <SermonContext.Provider value={{
      sermons,
      series,
      currentSermon,
      isLoading,
      error,
      fetchSermons,
      fetchSermonById,
      likeSermon,
      downloadSermon,
      addView
    }}>
      {children}
    </SermonContext.Provider>
  );
}

export function useSermons() {
  const context = useContext(SermonContext);
  if (context === undefined) {
    throw new Error('useSermons must be used within a SermonProvider');
  }
  return context;
}