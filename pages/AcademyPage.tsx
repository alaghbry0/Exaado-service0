import React, { useState, useEffect, useMemo } from 'react';
import { Course, Bundle, AcademyData } from './types';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ServiceCard from '../components/ServiceCard';
import BundleCard from '../components/BundleCard';
import Loader from '../components/Loader';
import { fetchAcademyData } from './academyapi';
import SmallCategoryCard from '../components/SmallCategoryCard';

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

  const enrolledCourses = useMemo(() => {
    if (!academyData) return [];
    const enrolledCourseIds = new Set(academyData.my_enrollments.course_ids);
    return academyData.courses.filter(course => enrolledCourseIds.has(course.id));
  }, [academyData]);

  const enrolledBundles = useMemo(() => {
    if (!academyData) return [];
    const enrolledBundleIds = new Set(academyData.my_enrollments.bundle_ids);
    return academyData.bundles.filter(bundle => enrolledBundleIds.has(bundle.id));
  }, [academyData]);
  
  const highlightCourses = useMemo(() => {
    if (!academyData) return [];
    const highlightCourseIds = new Set(academyData.highlight_course_ids);
    return academyData.courses.filter(course => highlightCourseIds.has(course.id));
  }, [academyData]);

  const highlightBundles = useMemo(() => {
    if (!academyData) return [];
    const highlightBundleIds = new Set(academyData.highlight_bundle_ids);
    return academyData.bundles.filter(bundle => highlightBundleIds.has(bundle.id));
  }, [academyData]);

  const topCourses = useMemo(() => {
    if (!academyData) return [];
    const topCourseIds = new Set(academyData.top_course_ids);
    return academyData.courses.filter(course => topCourseIds.has(course.id));
  }, [academyData]);

  const topBundles = useMemo(() => {
    if (!academyData) return [];
    const topBundleIds = new Set(academyData.top_bundle_ids);
    return academyData.bundles.filter(bundle => topBundleIds.has(bundle.id));
  }, [academyData]);


  const handleExpand = (courseId: string) => {
    setExpandedCourseId(prevId => (prevId === courseId ? null : courseId));
  };

  const hasEnrollments = academyData && (academyData.my_enrollments.course_ids.length > 0 || academyData.my_enrollments.bundle_ids.length > 0);

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
                    {enrolledCourses.map(course => (
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
                    {enrolledBundles.map(bundle => (
                        <BundleCard
                            key={`enrolled-${bundle.id}`}
                            id={bundle.id}
                            title={bundle.title}
                            description={bundle.description}
                            price={bundle.price}
                            imageUrl={bundle.image}
                        />
                    ))}
                </HorizontalCarousel>
             </Section>
          )}

          {highlightCourses.length > 0 && (
            <Section title="Highlighted Courses">
               <HorizontalCarousel>
                  {highlightCourses.map(course => (
                       <ServiceCard
                          key={`highlight-${course.id}`}
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

          {topCourses.length > 0 && (
            <Section title="Top Courses">
               <HorizontalCarousel>
                  {topCourses.map(course => (
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

          {highlightBundles.length > 0 && (
            <Section title="Highlighted Bundles">
                <HorizontalCarousel>
                    {highlightBundles.map(bundle => (
                        <BundleCard
                            key={`highlight-${bundle.id}`}
                            id={bundle.id}
                            title={bundle.title}
                            description={bundle.description}
                            price={bundle.price}
                            imageUrl={bundle.image}
                        />
                    ))}
                </HorizontalCarousel>
            </Section>
          )}

          {topBundles.length > 0 && (
            <Section title="Top Bundles">
                <HorizontalCarousel>
                    {topBundles.map(bundle => (
                        <BundleCard
                            key={`top-${bundle.id}`}
                            id={bundle.id}
                            title={bundle.title}
                            description={bundle.description}
                            price={bundle.price}
                            imageUrl={bundle.image}
                        />
                    ))}
                </HorizontalCarousel>
            </Section>
          )}
          
          {academyData.categories && academyData.categories.length > 0 && (
              <Section title="Browse by Category">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {academyData.categories.map(category => (
                          <SmallCategoryCard 
                              key={category.id} 
                              category={category} 
                          />
                      ))}
                  </div>
              </Section>
          )}
        </>
      )}
    </div>
  );
};

export default AcademyPage;