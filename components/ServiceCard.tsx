import React from 'react';

interface ServiceCardProps {
  name: string;
  description: string;
  price?: string;
  comingSoon?: boolean;
  tags?: string[];
  actionText?: string;
  imageUrl?: string;
  isExpanded?: boolean;
  onExpand?: () => void;
  fullDescription?: string;
  outcomes?: string[];
  requirements?: string[];
  completion?: number; // Percentage (0-100)
}

const DetailList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-700 dark:text-gray-200">{title}</h4>
      <ul className="mt-2 space-y-1 list-inside text-gray-600 dark:text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, comingSoon, tags, actionText = 'Purchase', imageUrl, isExpanded, onExpand, fullDescription, outcomes, requirements, completion }) => {
  const isDisabled = comingSoon;
  const hasDetails = fullDescription || (outcomes && outcomes.length > 0) || (requirements && requirements.length > 0);
  const isEnrolled = typeof completion === 'number';

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col h-full transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500 shadow-2xl shadow-blue-500/10' : 'hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg'} ${isDisabled ? 'opacity-60' : ''} overflow-hidden`}>
      <div onClick={onExpand} className={hasDetails ? 'cursor-pointer' : ''}>
        {imageUrl ? <img src={imageUrl} alt={name} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">No Image</div>}
        <div className="p-6">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
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
      </div>
      
      {isEnrolled && (
          <div className="px-6 mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${completion}%` }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">{completion}% Complete</p>
          </div>
      )}
      
      {/* Expandable Details Section */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="px-6 pb-6">
            <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: fullDescription || '' }} />
            <DetailList title="What you'll learn" items={outcomes || []} />
            <DetailList title="Requirements" items={requirements || []} />
        </div>
      </div>

      <div className="p-6 mt-auto border-t border-gray-200 dark:border-gray-700/50 flex justify-between items-center">
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
            e.stopPropagation(); // Prevent card expand/collapse when clicking the button
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
