import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  name: string;
  description: string;
  price?: string;
  comingSoon?: boolean;
  tags?: string[];
  actionText?: string;
  imageUrl?: string;
  linkTo?: string;
  completion?: number; // Percentage (0-100)
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, comingSoon, tags, actionText = 'Purchase', imageUrl, linkTo, completion }) => {
  const isDisabled = comingSoon;
  const isEnrolled = typeof completion === 'number';

  const CardContent = (
    <>
      {imageUrl ? <img src={imageUrl} alt={name} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">No Image</div>}
      <div className="p-6">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{name}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm h-10 overflow-hidden">{description}</p>
          {tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col h-full transition-shadow duration-300 hover:shadow-lg ${isDisabled ? 'opacity-60' : ''} overflow-hidden group`}>
      {linkTo ? (
          <Link to={linkTo} className="flex flex-col flex-grow">
            {CardContent}
          </Link>
        ) : (
          <div className="flex flex-col flex-grow">{CardContent}</div>
      )}
      
      {isEnrolled && (
          <div className="px-6 mb-4 mt-auto">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${completion}%` }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">{completion}% Complete</p>
          </div>
      )}
      
      <div className="p-6 border-t border-gray-200 dark:border-gray-700/50 flex justify-between items-center">
        {price && !comingSoon && (
           <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {price.toLowerCase() === 'free' ? 'Free' : `$${price}`}
           </span>
        )}
        {comingSoon && <span className="text-lg font-semibold text-yellow-500 dark:text-yellow-400">Coming Soon</span>}

        <button
          disabled={isDisabled}
          className={`${isEnrolled ? 'bg-green-600 enabled:hover:bg-green-500' : 'bg-blue-600 enabled:hover:bg-blue-500' } text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking the button if inside a link
            // Add purchase logic here
          }}
        >
          {isEnrolled ? 'Continue' : actionText}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
