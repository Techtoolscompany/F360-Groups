import React from 'react';
import { ChatGroup } from '../../types/chat';

interface GroupListProps {
  groups: ChatGroup[];
  onSelectGroup: (group: ChatGroup) => void;
  selectedGroupId?: string;
}

function GroupList({ groups, onSelectGroup, selectedGroupId }: GroupListProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-lg font-semibold">Groups</h2>
        <button className="text-sm text-blue-500 hover:text-blue-400">
          Create Group
        </button>
      </div>
      
      {groups.map((group) => (
        <button
          key={group.id}
          onClick={() => onSelectGroup(group)}
          className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
            selectedGroupId === group.id ? 'bg-[#2a2f38]' : 'hover:bg-[#2a2f38]'
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">
                {group.name.split(' ').map(word => word[0]).join('')}
              </span>
            </div>
            {group.type === 'private' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-medium">{group.name}</h3>
            {group.lastMessage && (
              <p className="text-sm text-gray-400 truncate">{group.lastMessage.content}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

export default GroupList;