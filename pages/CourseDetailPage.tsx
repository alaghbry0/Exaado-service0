import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AcademyData, Course } from './types';
import { fetchAcademyData } from './academyapi';
import Header from '../components/Header';
import Loader from '../components/Loader';

const StarRating: React.FC<{ rating: number; count: number }> = ({ rating, count }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-bold text-lg text-yellow-500">{rating.toFixed(1)}</span>
        <div className="flex">
          {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="text-yellow-400" />)}
          {halfStar && <StarIcon key="half" className="text-yellow-400" />}
          {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />)}
        </div>
        <span>({count} ratings)</span>
      </div>
    );
};

const StarIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
)

const DetailList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-8">
      <h3 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 mb-4 border-l-4 border-blue-500 pl-3">{title}</h3>
      <ul className="space-y-2 list-inside text-gray-700 dark:text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-start bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
            <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


const CourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
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

    const course = useMemo(() => {
        if (!academyData || !courseId) return null;
        return academyData.courses.find(c => c.id === courseId);
    }, [academyData, courseId]);
    
    const isEnrolled = useMemo(() => {
        if (!academyData || !course) return false;
        return academyData.my_enrollments.course_ids.includes(course.id);
    }, [academyData, course]);


    if (loading) return <div className="pt-20"><Loader /></div>;
    if (error) return <p className="text-center text-red-400">Error loading data: {error.message}</p>;
    if (!course) return <p className="text-center text-gray-500">Course not found.</p>;
    
    const priceDisplay = course.is_free_course === '1' || course.price.toLowerCase() === 'free' 
      ? 'Free' 
      : `$${course.discounted_price}`;


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
                    <Header title={course.title} />
                    <p className="text-center -mt-8 mb-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{course.short_description}</p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8">
                        <div className="flex items-center gap-2">
                            <img src="https://picsum.photos/seed/drmohammed/40/40" alt={course.instructor_name} className="w-8 h-8 rounded-full" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">Created by {course.instructor_name}</span>
                        </div>
                         <StarRating rating={course.rating} count={course.number_of_ratings} />
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                           <span>{course.total_enrollment} students</span>
                        </div>
                    </div>

                    <img src={course.cover_image} alt={course.title} className="w-full aspect-video object-cover rounded-2xl shadow-lg mb-8" />

                    <div className="prose dark:prose-invert max-w-none mb-6 p-6 bg-white dark:bg-gray-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Course Description</h2>
                        <div dangerouslySetInnerHTML={{ __html: course.description }} />
                    </div>

                    <DetailList title="What you'll learn" items={course.outcomes} />
                    <DetailList title="Requirements" items={course.requirements} />
                </div>

                {/* Right/Sidebar Column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                        <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover rounded-lg mb-4" />
                        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{priceDisplay}</span>
                        
                        <button className={`mt-6 w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg ${isEnrolled ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'} text-white`}>
                           {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                        </button>
                        
                        <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                             <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                                <span><strong>{course.total_number_of_lessons}</strong> lessons included</span>
                            </li>
                            <li className="flex items-center">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                                <span>Full lifetime access</span>
                            </li>
                            <li className="flex items-center capitalize">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a1 1 0 011-1h14a1 1 0 011 1v5a.997.997 0 01-.293-.707zM5 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                                <span><strong>{course.level}</strong> Level</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
