import React from 'react';
import ReactPlayer from 'react-player';
import { useSermonPlayer } from '../../hooks/useSermonPlayer';

interface SermonVideoProps {
  videoUrl: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

function SermonVideo({ videoUrl, title, onProgress, onComplete }: SermonVideoProps) {
  const { 
    playerRef,
    playing,
    volume,
    playbackRate,
    handleProgress,
    handlePlay,
    handlePause,
    handleVolumeChange,
    handlePlaybackRateChange
  } = useSermonPlayer({ onProgress, onComplete });

  return (
    <div className="relative aspect-video bg-[#1e2128] rounded-lg overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onEnded={() => onComplete?.()}
        controls
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0
            }
          },
          vimeo: {
            playerOptions: {
              title: false,
              byline: false,
              portrait: false
            }
          }
        }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="font-medium">{title}</h3>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={playing ? handlePause : handlePlay}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {playing ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
            
            <div className="relative group">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-3.536m0 0a5 5 0 01-1.414-3.536M4 12a8 8 0 018-8" />
                </svg>
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="relative group">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <select
                value={playbackRate}
                onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#2a2f38] text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SermonVideo;