
import React from 'react';

// Icons
const AcademicCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6m-6-3h12" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.562a4.5 4.5 0 017.778 0M12 20.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.008z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.875 12.336a9.75 9.75 0 0114.25 0M2.625 8.71a14.25 14.25 0 0118.75 0" />
    </svg>
);

const PresentationChartLineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const CATEGORIES = [
  {
    title: 'Exaado Academy',
    description: 'Unlock your potential with our expert-led courses and trainings.',
    icon: <AcademicCapIcon />,
    path: '/academy',
    bgClass: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Forex Services',
    description: 'Advanced tools and resources for your Forex trading journey.',
    icon: <ChartBarIcon />,
    path: '/forex',
    bgClass: 'from-green-500 to-green-700',
  },
  {
    title: 'Signals',
    description: 'High-accuracy signals to guide your trading decisions.',
    icon: <WifiIcon />,
    path: '/signals',
    bgClass: 'from-purple-500 to-purple-700',
  },
  {
    title: 'Indicators',
    description: 'Purchase powerful indicators to enhance your market analysis.',
    icon: <PresentationChartLineIcon />,
    path: '/indicators',
    bgClass: 'from-yellow-500 to-yellow-700',
  },
  {
    title: 'Exaado Consultations',
    description: 'Book a one-on-one live consultation with our experts.',
    icon: <UserGroupIcon />,
    path: '/consultations',
    bgClass: 'from-red-500 to-red-700',
  },
];
