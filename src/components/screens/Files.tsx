import React from 'react';

function Files() {
  const files = [
    { id: 1, name: 'Project Documentation.pdf', size: '2.4 MB', type: 'pdf', date: '2024-02-15' },
    { id: 2, name: 'Design Assets.zip', size: '156 MB', type: 'zip', date: '2024-02-14' },
    { id: 3, name: 'Meeting Notes.docx', size: '845 KB', type: 'doc', date: '2024-02-13' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Files</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Upload File
        </button>
      </div>

      <div className="bg-[#1e2128] rounded-xl">
        {files.map(file => (
          <div 
            key={file.id}
            className="flex items-center space-x-4 p-4 hover:bg-[#2a2f38] cursor-pointer border-b border-[#2a2f38] last:border-0"
          >
            <div className="w-10 h-10 bg-[#2a2f38] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{file.name}</h3>
              <p className="text-sm text-gray-400">{file.size}</p>
            </div>
            <span className="text-sm text-gray-400">{file.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Files;