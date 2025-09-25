
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  bgClass: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon, path, bgClass }) => {
  return (
    <Link to={path} className="block group">
      <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${bgClass} overflow-hidden h-full flex flex-col justify-between transform transition-transform duration-300 group-hover:scale-105 shadow-lg`}>
        <div>
          <div className="bg-white/20 rounded-xl p-3 inline-block mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-gray-200 text-sm">{description}</p>
        </div>
        <div className="mt-6 flex items-center justify-end text-white font-medium">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-white/10 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
        <div className="absolute top-5 -left-12 w-24 h-24 bg-white/10 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default CategoryCard;
