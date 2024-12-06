import React from 'react';
import { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-[#1a1d24] flex items-center justify-center p-4">
      <div className="bg-[#1e2128] rounded-xl p-6 max-w-md w-full text-center">
        <svg
          className="w-16 h-16 mx-auto text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h1 className="text-xl font-semibold text-white mb-2">Something went wrong</h1>
        <p className="text-gray-400 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;