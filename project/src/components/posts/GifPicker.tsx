import React, { useState, useEffect } from 'react';

interface GifPickerProps {
  onSelect: (gifUrl: string) => void;
  onClose: () => void;
}

function GifPicker({ onSelect, onClose }: GifPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        searchGifs(searchQuery);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const searchGifs = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=YOUR_GIPHY_API_KEY&q=${query}&limit=20`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute z-50 bottom-full mb-2 bg-[#2a2f38] rounded-lg shadow-lg w-96">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Search GIFs</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#353b47]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search GIFs..."
          className="w-full bg-[#1e2128] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white mb-4"
        />
        <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                className="w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  onSelect(gif.images.original.url);
                  onClose();
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GifPicker;