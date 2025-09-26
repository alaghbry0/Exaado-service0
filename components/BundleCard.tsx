import React from 'react';
import { Link } from 'react-router-dom';

interface BundleCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const BundleCard: React.FC<BundleCardProps> = ({ id, title, description, price, imageUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm flex-grow">{description}</p>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <Link
            to={`/bundle/${id}`}
            className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200 hover:bg-purple-500 text-center"
          >
            View Bundle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;