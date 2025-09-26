import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Course, Bundle, AcademyData } from './types';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ServiceCard from '../components/ServiceCard';
import BundleCard from '../components/BundleCard';
import Loader from '../components/Loader';
import { fetchAcademyData } from './academyapi';
import SmallCategoryCard from '../components/SmallCategoryCard';

// New Icons for carousel navigation
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

// New Section component with cleaner styling
const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <section className={`mb-16 ${className}`}>
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
    {children}
  </section>
);

// New enhanced HorizontalCarousel component
const HorizontalCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const childCount = React.Children.count(children);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    if (childCount === 0) return null;

    return (
        <div className="relative group">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4"
                // FIX: React style properties must be in camelCase. Changed '-ms-overflow-style' to 'msOverflowStyle'.
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {React.Children.map(children, child => (
                    <div className="flex-shrink-0 w-full sm:w-[350px] first:pl-4 last:pr-4">
                        {child}
                    </div>
                ))}
            </div>

            {childCount > 1 && (
                <>
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200 dark:border-gray-700"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200 dark:border-gray-700"
                    >
                        <ChevronRightIcon />
                    </button>
                </>
            )}
        </div>
    );
};

const AcademyPage: React.FC = () => {
  const [academyData, setAcademyData] = useState<AcademyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'bundles'>('courses');

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

  const { enrolledCourses, enrolledBundles, featuredCourses, featuredBundles, allCourses, allBundles } = useMemo(() => {
    if (!academyData) return { enrolledCourses: [], enrolledBundles: [], featuredCourses: [], featuredBundles: [], allCourses: [], allBundles: [] };
    
    const enrolledCourseIds = new Set(academyData.my_enrollments.course_ids);
    const enrolledCourses = academyData.courses.filter(course => enrolledCourseIds.has(course.id));
    
    const enrolledBundleIds = new Set(academyData.my_enrollments.bundle_ids);
    const enrolledBundles = academyData.bundles.filter(bundle => enrolledBundleIds.has(bundle.id));
    
    const featuredCourseIds = new Set([...academyData.highlight_course_ids, ...academyData.top_course_ids]);
    const featuredCourses = academyData.courses.filter(course => featuredCourseIds.has(course.id));

    const featuredBundleIds = new Set([...academyData.highlight_bundle_ids, ...academyData.top_bundle_ids]);
    const featuredBundles = academyData.bundles.filter(bundle => featuredBundleIds.has(bundle.id));

    return { enrolledCourses, enrolledBundles, featuredCourses, featuredBundles, allCourses: academyData.courses, allBundles: academyData.bundles };
  }, [academyData]);

  const hasEnrollments = enrolledCourses.length > 0 || enrolledBundles.length > 0;

  const TabButton: React.FC<{
      label: string;
      isActive: boolean;
      onClick: () => void;
  }> = ({ label, isActive, onClick }) => (
      <button
          onClick={onClick}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 ${
              isActive
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
          }`}
          aria-current={isActive ? 'page' : undefined}
      >
          {label}
      </button>
  );

  return (
    <div>
      <BackButton />
      <Header title="Exaado Academy" subtitle="Expand your knowledge and sharpen your skills with our curated courses." />
      
      {loading && <Loader />}
      {error && <p className="text-center text-red-400">Error loading academy data: {error.message}</p>}
      
      {academyData && !loading && !error && (
        <div className="space-y-12">
          {hasEnrollments && (
             <section className="p-6 sm:p-8 rounded-2xl bg-gray-100 dark:bg-gray-800/50">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Continue Learning</h2>
                {enrolledCourses.length > 0 && (
                  <div className='mb-8'>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Your Courses</h3>
                    <HorizontalCarousel>
                        {enrolledCourses.map(course => (
                             <ServiceCard
                                key={`enrolled-${course.id}`}
                                name={course.title}
                                description={course.short_description}
                                imageUrl={course.thumbnail}
                                linkTo={`/course/${course.id}`}
                                completion={course.completion}
                              />
                        ))}
                    </HorizontalCarousel>
                  </div>
                )}
                {enrolledBundles.length > 0 && (
                   <div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Your Bundles</h3>
                    <HorizontalCarousel>
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
                   </div>
                )}
             </section>
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
          
          <div>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                   <TabButton label="Courses" isActive={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
                   <TabButton label="Bundles" isActive={activeTab === 'bundles'} onClick={() => setActiveTab('bundles')} />
                </nav>
            </div>
            
            <div className="pt-10">
                {activeTab === 'courses' ? (
                    <div className="space-y-16">
                         <Section title="Featured Courses">
                           <HorizontalCarousel>
                              {featuredCourses.map(course => (
                                   <ServiceCard
                                      key={`featured-${course.id}`}
                                      name={course.title}
                                      description={course.short_description}
                                      price={course.price}
                                      tags={[course.level, `${course.total_number_of_lessons} lessons`]}
                                      actionText={course.is_free_course === '1' ? "Access Now" : "Enroll Now"}
                                      imageUrl={course.thumbnail}
                                      linkTo={`/course/${course.id}`}
                                    />
                              ))}
                           </HorizontalCarousel>
                        </Section>
                        <Section title="All Courses">
                            <HorizontalCarousel>
                                {allCourses.map(course => (
                                     <ServiceCard
                                        key={`all-${course.id}`}
                                        name={course.title}
                                        description={course.short_description}
                                        price={course.price}
                                        tags={[course.level, `${course.total_number_of_lessons} lessons`]}
                                        actionText={course.is_free_course === '1' ? "Access Now" : "Enroll Now"}
                                        imageUrl={course.thumbnail}
                                        linkTo={`/course/${course.id}`}
                                      />
                                ))}
                            </HorizontalCarousel>
                        </Section>
                    </div>
                ) : (
                    <div className="space-y-16">
                        <Section title="Featured Bundles">
                            <HorizontalCarousel>
                                {featuredBundles.map(bundle => (
                                    <BundleCard
                                        key={`featured-${bundle.id}`}
                                        id={bundle.id}
                                        title={bundle.title}
                                        description={bundle.description}
                                        price={bundle.price}
                                        imageUrl={bundle.image}
                                    />
                                ))}
                            </HorizontalCarousel>
                        </Section>
                        <Section title="All Bundles">
                             <HorizontalCarousel>
                                {allBundles.map(bundle => (
                                    <BundleCard
                                        key={`all-${bundle.id}`}
                                        id={bundle.id}
                                        title={bundle.title}
                                        description={bundle.description}
                                        price={bundle.price}
                                        imageUrl={bundle.image}
                                    />
                                ))}
                             </HorizontalCarousel>
                        </Section>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademyPage;