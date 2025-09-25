import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES } from '../components/constants';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = CATEGORIES.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header title="Welcome to Exaado Services" subtitle="Explore our comprehensive suite of tools, resources, and expert guidance designed to elevate your trading and investment journey."/>
      
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(category => (
          <CategoryCard
            key={category.path}
            title={category.title}
            description={category.description}
            icon={category.icon}
            path={category.path}
            bgClass={category.bgClass}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
