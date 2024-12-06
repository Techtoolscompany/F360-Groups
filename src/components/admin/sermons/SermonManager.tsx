import React, { useState } from 'react';
import { useSermons } from '../../../context/SermonContext';
import { usePermissions } from '../../../hooks/usePermissions';
import SermonUploader from '../../sermons/SermonUploader';
import { Sermon } from '../../../types/sermon';

function SermonManager() {
  const { canCreateSermon, canEditSermon, canDeleteSermon } = usePermissions();
  const { sermons, addSermon, updateSermon, deleteSermon } = useSermons();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  const handleVideoUpload = async (videoData: { url: string; type: string }) => {
    if (!canCreateSermon()) return;
    
    setIsUploading(true);
    try {
      await addSermon({
        title: '',
        description: '',
        videoUrl: videoData.url,
        date: new Date(),
        duration: 0,
        tags: []
      });
    } catch (error) {
      console.error('Failed to upload sermon:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Manage Sermons</h2>
        {canCreateSermon() && (
          <button
            onClick={() => setSelectedSermon(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            New Sermon
          </button>
        )}
      </div>

      {/* Sermon List */}
      <div className="bg-[#1e2128] rounded-xl p-6">
        <div className="space-y-4">
          {sermons.map(sermon => (
            <div
              key={sermon.id}
              className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-white">{sermon.title}</h3>
                  <p className="text-sm text-gray-400">
                    {sermon.pastor.name} • {new Date(sermon.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {canEditSermon() && (
                  <button
                    onClick={() => setSelectedSermon(sermon)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                )}
                {canDeleteSermon() && (
                  <button
                    onClick={() => deleteSermon(sermon.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Form */}
      {(selectedSermon === null && canCreateSermon()) && (
        <div className="bg-[#1e2128] rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Upload New Sermon</h3>
          <SermonUploader onUpload={handleVideoUpload} />
        </div>
      )}
    </div>
  );
}

export default SermonManager;