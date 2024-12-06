export function getVideoProvider(url: string): 'youtube' | 'vimeo' | 'direct' | null {
  if (!url) return null;

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }

  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }

  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return 'direct';
  }

  return null;
}

export function extractVideoId(url: string, provider: 'youtube' | 'vimeo' | 'direct'): string | null {
  if (!url) return null;

  switch (provider) {
    case 'youtube': {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
      return match ? match[1] : null;
    }
    case 'vimeo': {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }
    case 'direct':
      return url;
    default:
      return null;
  }
}

export function generateThumbnail(url: string, provider: 'youtube' | 'vimeo' | 'direct'): string {
  const videoId = extractVideoId(url, provider);
  if (!videoId) return '';

  switch (provider) {
    case 'youtube':
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    case 'vimeo':
      // Note: Vimeo requires an API call to get thumbnails
      // This is a placeholder URL
      return `https://vumbnail.com/${videoId}.jpg`;
    case 'direct':
      return ''; // Direct video files don't have thumbnails
    default:
      return '';
  }
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}