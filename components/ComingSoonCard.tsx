import React from 'react';

const ComingSoonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col h-full items-center justify-center p-6 text-center">
      <div className="animate-pulse">
        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-500 dark:text-gray-400">New Course</h3>
      <p className="mt-2 text-lg font-semibold text-yellow-500 dark:text-yellow-400">Coming Soon</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Stay tuned for exciting new content!</p>
    </div>
  );
};

export default ComingSoonCard;