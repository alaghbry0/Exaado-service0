import React from 'react';
import { useMiniAppServices } from '../components/useMiniAppServices';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ServiceCard from '../components/ServiceCard';
import Loader from '../components/Loader';

const SignalsPage: React.FC = () => {
  const { signals, loading, error } = useMiniAppServices();

  return (
    <div>
      <BackButton />
      <Header title="Trading Signals" subtitle="Subscribe to our high-performance signal packages." />
      {loading && <Loader />}
      {error && <p className="text-center text-red-400">Error loading signals: {error.message}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signals.map(signal => (
            <ServiceCard
              key={signal.id}
              name={signal.name}
              description={signal.description}
              price={signal.price}
              tags={[`Accuracy: ${signal.accuracy}`, `Provider: ${signal.provider}`]}
              actionText="Subscribe"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SignalsPage;