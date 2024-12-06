import { useRef, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';

interface UseSermonPlayerProps {
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export function useSermonPlayer({ onProgress, onComplete }: UseSermonPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleProgress = useCallback(({ played }: { played: number }) => {
    onProgress?.(played);
  }, [onProgress]);

  const handlePlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setPlaying(false);
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const handlePlaybackRateChange = useCallback((newRate: number) => {
    setPlaybackRate(newRate);
  }, []);

  return {
    playerRef,
    playing,
    volume,
    playbackRate,
    handleProgress,
    handlePlay,
    handlePause,
    handleVolumeChange,
    handlePlaybackRateChange
  };
}