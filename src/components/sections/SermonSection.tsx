import React from 'react';

function SermonSection() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Latest Sermons</h2>
      <div className="space-y-4">
        <div className="group cursor-pointer">
          <div className="relative">
            <img 
              src="https://picsum.photos/400/225" 
              alt="Sermon" 
              className="rounded-lg w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="font-medium mt-2">Walking in Faith</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pastor John • Feb 11, 2024</p>
        </div>

        <div className="group cursor-pointer">
          <div className="relative">
            <img 
              src="https://picsum.photos/401/225" 
              alt="Sermon" 
              className="rounded-lg w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="font-medium mt-2">The Power of Prayer</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pastor Sarah • Feb 4, 2024</p>
        </div>
      </div>
    </div>
  );
}

export default SermonSection;