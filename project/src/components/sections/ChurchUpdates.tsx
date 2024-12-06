import React from 'react';

function ChurchUpdates() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Church Updates</h2>
        <button className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm">
          New Update
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src="https://ui-avatars.com/api/?name=Pastor+John" alt="Pastor John" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-medium">Pastor John</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            We're excited to announce our upcoming Easter service preparations! Join us this Sunday as we begin our special sermon series leading up to Easter.
          </p>
          <img src="https://picsum.photos/402/300" alt="Easter Service" className="rounded-lg w-full h-48 object-cover" />
        </div>
      </div>
    </div>
  );
}

export default ChurchUpdates;