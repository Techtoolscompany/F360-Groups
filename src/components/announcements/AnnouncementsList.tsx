import React from 'react';

function AnnouncementsList() {
  const announcements = [
    {
      id: 1,
      title: 'Easter Service Preparations',
      content: 'Join us this Sunday as we begin our special sermon series leading up to Easter.',
      author: 'Pastor John',
      date: '2 hours ago',
      type: 'important',
      image: 'https://picsum.photos/seed/easter/800/400'
    },
    {
      id: 2,
      title: 'Youth Ministry Updates',
      content: 'Exciting changes coming to our youth program! New activities and events planned.',
      author: 'Youth Ministry Team',
      date: '1 day ago',
      type: 'general',
      image: 'https://picsum.photos/seed/youth/800/400'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Church Announcements</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          New Announcement
        </button>
      </div>

      <div className="space-y-6">
        {announcements.map(announcement => (
          <div 
            key={announcement.id} 
            className={`bg-[#1e2128] rounded-xl overflow-hidden ${
              announcement.type === 'important' ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            {announcement.image && (
              <img 
                src={announcement.image} 
                alt={announcement.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{announcement.title}</h2>
                {announcement.type === 'important' && (
                  <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                    Important
                  </span>
                )}
              </div>
              <p className="text-gray-300 mb-4">{announcement.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${announcement.author.replace(' ', '+')}`}
                    alt={announcement.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{announcement.author}</span>
                </div>
                <span>{announcement.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementsList;