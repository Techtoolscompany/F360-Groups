import { UserProfile } from './user';

export interface Sermon {
  id: string;
  title: string;
  description: string;
  pastor: UserProfile;
  date: Date;
  videoUrl: string;
  thumbnail: string;
  duration: number; // in seconds
  tags: string[];
  series?: {
    id: string;
    name: string;
    order: number;
  };
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: 'pdf' | 'doc' | 'ppt';
  }[];
  views: number;
  likes: number;
  downloads: number;
}

export interface SermonSeries {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  startDate: Date;
  endDate?: Date;
  sermons: Sermon[];
}