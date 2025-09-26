import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../pages/types';

interface SmallCategoryCardProps {
  category: Category;
}

const SmallCategoryCard: React.FC<SmallCategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/academy/category/${category.id}`} 
      className="relative aspect-[4/3] rounded-lg overflow-hidden group block shadow-lg"
    >
      <img src={category.thumbnail} alt={category.name} className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="font-bold text-lg">{category.name}</h3>
        <p className="text-sm text-gray-300">{category.number_of_courses} Courses</p>
      </div>
    </Link>
  );
};

export default SmallCategoryCard;
