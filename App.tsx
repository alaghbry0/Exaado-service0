import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AcademyPage from './pages/AcademyPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import ForexPage from './pages/ForexPage';
import SignalsPage from './pages/SignalsPage';
import IndicatorsPage from './pages/IndicatorsPage';
import ConsultationsPage from './pages/ConsultationsPage';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';
import BundleDetailPage from './pages/BundleDetailPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
          <ThemeToggleButton />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/academy" element={<AcademyPage />} />
              <Route path="/academy/category/:categoryId" element={<CategoryDetailPage />} />
              <Route path="/bundle/:bundleId" element={<BundleDetailPage />} />
              <Route path="/forex" element={<ForexPage />} />
              <Route path="/signals" element={<SignalsPage />} />
              <Route path="/indicators" element={<IndicatorsPage />} />
              <Route path="/consultations" element={<ConsultationsPage />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;