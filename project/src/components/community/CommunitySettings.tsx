import React from 'react';

interface CommunitySettingsProps {
  onClose: () => void;
}

function CommunitySettings({ onClose }: CommunitySettingsProps) {
  return (
    <div className="bg-[#1e2128] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Community Settings</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Privacy
          </label>
          <select className="w-full bg-[#2a2f38] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Post Approval
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="bg-[#2a2f38] rounded text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-white">Require admin approval for posts</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Member Permissions
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="bg-[#2a2f38] rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-white">Can create events</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="bg-[#2a2f38] rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-white">Can invite new members</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="bg-[#2a2f38] rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-white">Can share files</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#2a2f38]">
          <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Delete Community
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunitySettings;