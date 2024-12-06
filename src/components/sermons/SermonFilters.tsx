import React, { useState } from 'react';

function SermonFilters() {
  const [selectedFilter, setSelectedFilter] = useState('recent');

  const filters = [
    { id: 'recent', label: 'Recent' },
    { id: 'popular', label: 'Popular' },
    { id: 'series', label: 'Series' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-[#2a2f38] rounded-lg p-1">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => setSelectedFilter(filter.id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedFilter === filter.id
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default SermonFilters;