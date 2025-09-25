import React from 'react';
import { Link } from 'react-router-dom';

const BackButton: React.FC = () => {
  return (
    <div className="mb-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        <span>Back to Services</span>
      </Link>
    </div>
  );
};

export default BackButton;
