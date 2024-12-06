import React, { useEffect } from 'react';
import { useSermons } from '../../context/SermonContext';
import SermonCard from '../sermons/SermonCard';
import SermonFilters from '../sermons/SermonFilters';

function Sermons() {
  const { sermons, series, fetchSermons, isLoading } = useSermons();

  useEffect(() => {
    fetchSermons();
  }, [fetchSermons]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Sermons</h1>
        <SermonFilters />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured Series */}
          {series.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Featured Series</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {series.map(s => (
                  <div key={s.id} className="bg-[#1e2128] rounded-xl overflow-hidden group cursor-pointer">
                    <div className="relative">
                      <img 
                        src={s.thumbnail} 
                        alt={s.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg">{s.name}</h3>
                        <p className="text-gray-300 text-sm mt-1">{s.sermons.length} sermons</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Sermons */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Sermons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map(sermon => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sermons;