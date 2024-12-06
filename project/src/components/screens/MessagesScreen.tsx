import React from 'react';

function MessagesScreen() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Messages</h1>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pastor John</h2>
          <p className="text-gray-600 dark:text-gray-300">Last message: God bless you!</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Youth Group Chat</h2>
          <p className="text-gray-600 dark:text-gray-300">Last message: See you all tomorrow!</p>
        </div>
      </div>
    </div>
  );
}

export default MessagesScreen;