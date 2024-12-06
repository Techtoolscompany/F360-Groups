export function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

export async function getLinkPreview(url: string): Promise<{
  title?: string;
  description?: string;
  image?: string;
}> {
  // In a real app, you would use a link preview service or backend API
  // For now, we'll return mock data
  return {
    title: 'Link Preview',
    description: 'This is a preview of the linked content',
    image: 'https://picsum.photos/seed/preview/400/200'
  };
}

export function isVideoUrl(url: string): boolean {
  const videoPatterns = [
    /youtube\.com\/watch\?v=/,
    /youtu\.be\//,
    /vimeo\.com\//,
    /\.(mp4|webm|ogg)$/i
  ];
  return videoPatterns.some(pattern => pattern.test(url));
}