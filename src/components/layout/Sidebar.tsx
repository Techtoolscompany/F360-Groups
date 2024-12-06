import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

function Sidebar() {
  const location = useLocation();
  const { isCollapsed } = useSidebar();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const groups = [
    { id: 'general', name: '# general', description: 'General discussions and updates for all church members' },
    { id: 'worship', name: '# worship', description: 'Coordination and discussions for the worship team' },
    { id: 'youth', name: '# youth', description: 'Youth ministry discussions and event planning' },
    { id: 'prayer-requests', name: '# prayer-requests', description: 'Share and respond to prayer requests' },
    { id: 'bible-study', name: '# bible-study', description: 'Weekly Bible study discussions and resources' }
  ];

  const handleGroupHover = (groupId: string | null) => {
    if (!isCollapsed) {
      setSelectedGroupId(groupId);
    }
  };

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-[#1e2128] flex flex-col h-full transition-all duration-300 ease-in-out relative`}
    >
      <div className={`p-4 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <img src="https://ui-avatars.com/api/?name=User" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-medium text-white text-base">User Name</h3>
              <p className="text-sm text-gray-400">@username</p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        <Link to="/feed" 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            isActive('/feed') ? 'bg-[#2a2f38] text-white' : 'text-gray-400 hover:bg-[#2a2f38]'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          {!isCollapsed && <span className="text-base">Feed</span>}
        </Link>

        <Link to="/announcements" 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            isActive('/announcements') ? 'bg-[#2a2f38] text-white' : 'text-gray-400 hover:bg-[#2a2f38]'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          {!isCollapsed && <span className="text-base">Announcements</span>}
        </Link>

        <Link to="/messages" 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            isActive('/messages') ? 'bg-[#2a2f38] text-white' : 'text-gray-400 hover:bg-[#2a2f38]'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {!isCollapsed && <span className="text-base">Messages</span>}
        </Link>

        <Link to="/calendar" 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            isActive('/calendar') ? 'bg-[#2a2f38] text-white' : 'text-gray-400 hover:bg-[#2a2f38]'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {!isCollapsed && <span className="text-base">Calendar</span>}
        </Link>

        <Link to="/courses" 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            isActive('/courses') ? 'bg-[#2a2f38] text-white' : 'text-gray-400 hover:bg-[#2a2f38]'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {!isCollapsed && <span className="text-base">Courses</span>}
        </Link>

        {!isCollapsed && (
          <div>
            <div className="flex items-center px-3 py-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="ml-2 text-base font-medium text-gray-400">Groups</span>
            </div>
            <div className="space-y-1">
              {groups.map(group => (
                <div key={group.id} className="relative">
                  <Link
                    to={`/channels/${group.id}`}
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActive(`/channels/${group.id}`) 
                        ? 'bg-[#2a2f38] text-white' 
                        : 'text-gray-400 hover:bg-[#2a2f38]'
                    }`}
                    onMouseEnter={() => handleGroupHover(group.id)}
                    onMouseLeave={() => handleGroupHover(null)}
                  >
                    <span className="truncate text-base">{group.name}</span>
                  </Link>
                  {selectedGroupId === group.id && (
                    <div className="absolute left-full ml-2 w-64 p-3 bg-[#2a2f38] rounded-lg shadow-lg z-50 top-0">
                      <p className="text-sm text-gray-300">{group.description}</p>
                    </div>
                  )}
                </div>
              ))}
              <button
                className="flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-[#2a2f38] w-full text-left"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-base">Add Group</span>
              </button>
            </div>
          </div>
        )}

        <Link to="/settings" 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            isActive('/settings') ? 'bg-[#2a2f38] text-white' : 'text-gray-400 hover:bg-[#2a2f38]'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {!isCollapsed && <span className="text-base">Settings</span>}
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;