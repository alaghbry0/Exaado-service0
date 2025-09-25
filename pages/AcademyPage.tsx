import React, { useState, useEffect } from 'react';
import { Course, Bundle, AcademyData } from './types';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ServiceCard from '../components/ServiceCard';
import BundleCard from '../components/BundleCard';
import Loader from '../components/Loader';
import { fetchAcademyData } from './api';
import ComingSoonCard from '../components/ComingSoonCard';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-blue-500 pl-4">{title}</h2>
    {children}
  </section>
);

const HorizontalCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
      {React.Children.map(children, child => (
        <div className="flex-shrink-0 w-full sm:w-[350px]">
          {child}
        </div>
      ))}
  </div>
);


const AcademyPage: React.FC = () => {
  const [academyData, setAcademyData] = useState<AcademyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
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

  const handleExpand = (courseId: string) => {
    setExpandedCourseId(prevId => (prevId === courseId ? null : courseId));
  };

  const filteredCourses = academyData?.all_courses.filter(course => {
    if (selectedLevel === 'All') return true;
    return course.level.toLowerCase() === selectedLevel.toLowerCase();
  });

  const filterLevels: ('All' | 'Beginner' | 'Intermediate' | 'Advanced')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  const hasEnrollments = academyData && (academyData.my_enrollments.courses.length > 0 || academyData.my_enrollments.bundles.length > 0);

  return (
    <div>
      <BackButton />
      <Header title="Exaado Academy" subtitle="Expand your knowledge and sharpen your skills with our curated courses." />
      
      {loading && <Loader />}
      {error && <p className="text-center text-red-400">Error loading academy data: {error.message}</p>}
      
      {academyData && !loading && !error && (
        <>
          {hasEnrollments && (
             <Section title="My Enrollments">
                <HorizontalCarousel>
                    {academyData.my_enrollments.courses.map(course => (
                         <ServiceCard
                            key={`enrolled-${course.id}`}
                            name={course.title}
                            description={course.short_description}
                            imageUrl={course.thumbnail}
                            isExpanded={expandedCourseId === course.id}
                            onExpand={() => handleExpand(course.id)}
                            fullDescription={course.description}
                            outcomes={course.outcomes}
                            requirements={course.requirements}
                            completion={course.completion}
                          />
                    ))}
                    {academyData.my_enrollments.bundles.map(bundle => (
                        <BundleCard
                            key={`enrolled-${bundle.id}`}
                            title={bundle.title}
                            description={bundle.description}
                            price={bundle.price}
                            imageUrl={bundle.image}
                        />
                    ))}
                </HorizontalCarousel>
             </Section>
          )}

          {academyData.top_courses.length > 0 && (
            <Section title="Top Courses">
               <HorizontalCarousel>
                  {academyData.top_courses.map(course => (
                       <ServiceCard
                          key={`top-${course.id}`}
                          name={course.title}
                          description={course.short_description}
                          price={course.price}
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
               </HorizontalCarousel>
            </Section>
          )}

          {academyData.top_bundles.length > 0 && (
            <Section title="Top Bundles">
                <HorizontalCarousel>
                    {academyData.top_bundles.map(bundle => (
                        <BundleCard
                            key={`top-${bundle.id}`}
                            title={bundle.title}
                            description={bundle.description}
                            price={bundle.price}
                            imageUrl={bundle.image}
                        />
                    ))}
                </HorizontalCarousel>
            </Section>
          )}
          
          <Section title="All Courses">
            <div className="mb-8 flex justify-center flex-wrap gap-3">
              {filterLevels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-blue-500 ${
                    selectedLevel === level
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                  }`}
                  aria-pressed={selectedLevel === level}
                >
                  {level}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses?.map(course => (
                course.status !== 'active' ? (
                  <ComingSoonCard key={course.id} />
                ) : (
                  <ServiceCard
                    key={course.id}
                    name={course.title}
                    description={course.short_description}
                    price={course.price}
                    tags={[course.level, `${course.total_number_of_lessons} lessons`, course.instructor_name]}
                    actionText={course.is_free_course === '1' ? "Access Now" : "Enroll Now"}
                    imageUrl={course.thumbnail}
                    isExpanded={expandedCourseId === course.id}
                    onExpand={() => handleExpand(course.id)}
                    fullDescription={course.description}
                    outcomes={course.outcomes}
                    requirements={course.requirements}
                  />
                )
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  );
};

export default AcademyPage;