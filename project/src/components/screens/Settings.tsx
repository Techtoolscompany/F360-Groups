import React from 'react';

function Settings() {
  const isAdmin = true; // This should come from your auth context

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {isAdmin && (
        <div className="bg-[#1e2128] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Announcements</h3>
              <div className="space-y-4">
                <textarea
                  placeholder="Write your announcement..."
                  className="w-full bg-[#2a2f38] rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={4}
                />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                  Send Announcement
                </button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#2a2f38]">
              <h3 className="text-lg font-medium mb-2">User Management</h3>
              <button className="bg-[#2a2f38] text-white px-6 py-2 rounded-lg hover:bg-[#353b47]">
                Manage Users
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1e2128] rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        {/* Add account settings here */}
      </div>

      <div className="bg-[#1e2128] rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        {/* Add notification settings here */}
      </div>
    </div>
  );
}

export default Settings;