import React from 'react';

function Photos() {
  const photos = [
    { id: 1, url: 'https://picsum.photos/seed/photo1/400/400' },
    { id: 2, url: 'https://picsum.photos/seed/photo2/400/400' },
    { id: 3, url: 'https://picsum.photos/seed/photo3/400/400' },
    { id: 4, url: 'https://picsum.photos/seed/photo4/400/400' },
    { id: 5, url: 'https://picsum.photos/seed/photo5/400/400' },
    { id: 6, url: 'https://picsum.photos/seed/photo6/400/400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Photos</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Upload Photo
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="aspect-square relative group cursor-pointer">
            <img 
              src={photo.url} 
              alt={`Photo ${photo.id}`} 
              className="rounded-lg w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                <button className="p-2 bg-white rounded-full">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                </button>
                <button className="p-2 bg-white rounded-full">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;