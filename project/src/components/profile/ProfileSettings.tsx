import React from 'react';
import { useAuth } from '../../context/AuthContext';

function ProfileSettings() {
  const { userSettings, updateSettings } = useAuth();

  const handleToggle = (key: keyof typeof userSettings) => {
    updateSettings({ [key]: !userSettings[key] });
  };

  const handlePrivacyToggle = (key: keyof typeof userSettings.privacy) => {
    updateSettings({
      privacy: {
        ...userSettings.privacy,
        [key]: !userSettings.privacy[key]
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e2128] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Push Notifications</h3>
              <p className="text-sm text-gray-400">Receive notifications for important updates</p>
            </div>
            <button
              onClick={() => handleToggle('notifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                userSettings.notifications ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                userSettings.notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Email Updates</h3>
              <p className="text-sm text-gray-400">Receive email notifications</p>
            </div>
            <button
              onClick={() => handleToggle('emailUpdates')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                userSettings.emailUpdates ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                userSettings.emailUpdates ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1e2128] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Privacy Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Show Email</h3>
              <p className="text-sm text-gray-400">Make your email visible to other members</p>
            </div>
            <button
              onClick={() => handlePrivacyToggle('showEmail')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                userSettings.privacy.showEmail ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                userSettings.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Show Groups</h3>
              <p className="text-sm text-gray-400">Show your group memberships</p>
            </div>
            <button
              onClick={() => handlePrivacyToggle('showGroups')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                userSettings.privacy.showGroups ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                userSettings.privacy.showGroups ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Show Activity</h3>
              <p className="text-sm text-gray-400">Show your recent activity to others</p>
            </div>
            <button
              onClick={() => handlePrivacyToggle('showActivity')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                userSettings.privacy.showActivity ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                userSettings.privacy.showActivity ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;