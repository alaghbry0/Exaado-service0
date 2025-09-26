import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AcademyData, Course, Bundle, Category } from './types';
import { fetchAcademyData } from './academyapi';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ServiceCard from '../components/ServiceCard';
import BundleCard from '../components/BundleCard';

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [academyData, setAcademyData] = useState<AcademyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAcademyData();
        setAcademyData(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const category = useMemo(() => {
    if (!academyData || !categoryId) return null;
    return academyData.categories.find(cat => cat.id === categoryId);
  }, [academyData, categoryId]);

  const coursesInCategory = useMemo(() => {
    if (!academyData || !categoryId) return [];
    // Courses are linked to categories via sub_category_id
    return academyData.courses.filter(course => course.sub_category_id === categoryId);
  }, [academyData, categoryId]);

  const bundlesInCategory = useMemo(() => {
    if (!academyData || !categoryId) return [];
    // Bundles are linked to categories via sub_category_id
    return academyData.bundles.filter(bundle => bundle.sub_category_id === categoryId);
  }, [academyData, categoryId]);
  
  const handleExpand = (courseId: string) => {
    setExpandedCourseId(prevId => (prevId === courseId ? null : courseId));
  };


  if (loading) return <div className="pt-20"><Loader /></div>;
  if (error) return <p className="text-center text-red-400">Error loading data: {error.message}</p>;
  if (!category) return <p className="text-center text-gray-500">Category not found.</p>;

  return (
    <div>
      <div className="mb-8">
        <Link
          to="/academy"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <span>Back to Academy</span>
        </Link>
      </div>
      <Header title={category.name} subtitle={`Browse all courses and bundles in the ${category.name} category.`} />

      {coursesInCategory.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesInCategory.map(course => (
              <ServiceCard
                key={course.id}
                name={course.title}
                description={course.short_description}
                price={course.price === 'Free' ? 'Free' : course.discounted_price}
                tags={[course.level, `${course.total_number_of_lessons} lessons`, course.instructor_name]}
                actionText={course.is_free_course === '1' ? "Access Now" : "Enroll Now"}
                imageUrl={course.thumbnail}
                isExpanded={expandedCourseId === course.id}
                onExpand={() => handleExpand(course.id)}
                fullDescription={course.description}
                outcomes={course.outcomes}
                requirements={course.requirements}
              />
            ))}
          </div>
        </section>
      )}

      {bundlesInCategory.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundlesInCategory.map(bundle => (
              <BundleCard
                key={bundle.id}
                title={bundle.title}
                description={bundle.description}
                price={bundle.price}
                imageUrl={bundle.image}
              />
            ))}
          </div>
        </section>
      )}

      {coursesInCategory.length === 0 && bundlesInCategory.length === 0 && (
         <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No courses or bundles found in this category yet.</p>
         </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
