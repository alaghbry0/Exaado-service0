import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AcademyData, Course, Bundle } from './types';
import { fetchAcademyData } from './academyapi';
import Header from '../components/Header';
import Loader from '../components/Loader';

const CourseInBundleCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-shadow hover:shadow-md">
        <img src={course.thumbnail} alt={course.title} className="w-24 h-16 object-cover rounded-md flex-shrink-0" />
        <div className="flex-grow">
            <h4 className="font-bold text-gray-900 dark:text-white">{course.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">by {course.instructor_name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.total_number_of_lessons} lessons</p>
        </div>
    </div>
);

const DetailList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-6">
      <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200 mb-3">{title}</h3>
      <ul className="space-y-2 list-inside text-gray-600 dark:text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


const BundleDetailPage: React.FC = () => {
    const { bundleId } = useParams<{ bundleId: string }>();
    const [academyData, setAcademyData] = useState<AcademyData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

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

    const bundle = useMemo(() => {
        if (!academyData || !bundleId) return null;
        return academyData.bundles.find(b => b.id === bundleId);
    }, [academyData, bundleId]);

    const coursesInBundle = useMemo(() => {
        if (!academyData || !bundle) return [];
        let courseIds: Set<string>;
        try {
            courseIds = new Set(JSON.parse(bundle.course_ids));
        } catch (e) {
            console.error("Failed to parse course_ids", e);
            return [];
        }
        return academyData.courses.filter(course => courseIds.has(course.id));
    }, [academyData, bundle]);

    if (loading) return <div className="pt-20"><Loader /></div>;
    if (error) return <p className="text-center text-red-400">Error loading data: {error.message}</p>;
    if (!bundle) return <p className="text-center text-gray-500">Bundle not found.</p>;

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Left/Main Column */}
                <div className="lg:col-span-2">
                    <Header title={bundle.title} />
                    <img src={bundle.cover_image} alt={bundle.title} className="w-full aspect-video object-cover rounded-2xl shadow-lg mb-8" />

                    <div className="prose dark:prose-invert max-w-none mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Description</h2>
                        <p>{bundle.description.replace(/\\r\\n/g, '\n')}</p>
                    </div>

                    <DetailList title="What you'll learn" items={bundle.outcomes} />
                    <DetailList title="Requirements" items={bundle.requirements} />
                    
                    <section className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Courses in this bundle ({coursesInBundle.length})</h2>
                        <div className="space-y-4">
                            {coursesInBundle.map(course => (
                                <CourseInBundleCard key={course.id} course={course} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right/Sidebar Column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                        <img src={bundle.image} alt={bundle.title} className="w-full aspect-square object-cover rounded-lg mb-4" />
                        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${bundle.price}</span>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">One-time payment, lifetime access.</p>
                        
                        <button className="mt-6 w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:bg-purple-500 text-lg">
                           Enroll in Bundle
                        </button>
                        
                        <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                             <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                                <span>Includes <strong>{coursesInBundle.length} courses</strong></span>
                            </li>
                            {bundle.free_sessions_count && parseInt(bundle.free_sessions_count) > 0 && (
                                <li className="flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                   <span><strong>{bundle.free_sessions_count} free</strong> private sessions</span>
                                </li>
                            )}
                            <li className="flex items-center">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                                <span>Full lifetime access</span>
                            </li>
                            {bundle.telegram_url && bundle.telegram_url.trim() && (
                               <li className="flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path d="M11 14a1 1 0 100-2h-1v-1a1 1 0 10-2 0v1H7a1 1 0 100 2h1v1a1 1 0 102 0v-1h1z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                                   <span>Private Telegram group access</span>
                               </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BundleDetailPage;