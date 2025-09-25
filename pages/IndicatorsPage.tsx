import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import { fetchIndicatorsData } from './api';
import { IndicatorsData, IndicatorSubscriptionPlan } from './types';

const MySubscriptionCard: React.FC<{ subscription: NonNullable<IndicatorsData['my_subscription']> }> = ({ subscription }) => (
    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg shadow-green-500/30 dark:shadow-green-500/20 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full opacity-50"></div>
        <div className="absolute bottom-5 -left-12 w-24 h-24 bg-white/10 rounded-full opacity-50"></div>
        <div className="relative z-10">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-medium opacity-80">Your Current Plan</p>
                    <h3 className="text-3xl font-bold capitalize">{subscription.status}</h3>
                </div>
            </div>
            <div className="mt-6 text-sm opacity-90 space-y-2 border-t border-white/20 pt-4">
                <p><strong>Status:</strong> <span className="font-semibold py-1 px-2.5 bg-white/20 rounded-md text-xs">Active</span></p>
                <p><strong>Access since:</strong> {new Date(parseInt(subscription.date_added) * 1000).toLocaleDateString()}</p>
            </div>
        </div>
    </div>
);

const PlanCard: React.FC<{ plan: IndicatorSubscriptionPlan }> = ({ plan }) => {
    const isBestValue = plan.duration_in_months === '0';

    return (
        <div className={`relative bg-white dark:bg-gray-800 border rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 ${isBestValue ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-xl'}`}>
            {isBestValue && <div className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Best Value</div>}
            
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h4>
            
            <div className="my-6">
                <span className="text-xl text-red-500/90 line-through">${plan.price}</span>
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white ml-2">${plan.discounted_price}</span>
            </div>
            
            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-6 h-10 flex items-center">
                {plan.duration_in_months === '0' ? 'One-Time Payment for Lifetime Access' : `Billed once for ${plan.duration_in_months} months`}
            </p>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 text-left">
                {['Access to all indicators', 'All future updates included', 'Premium 24/7 Support', 'TradingView Integration'].map(feature => (
                    <li key={feature} className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className="mt-auto w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg">
                Subscribe Now
            </button>
        </div>
    );
};

const IndicatorsPage: React.FC = () => {
    const [data, setData] = useState<IndicatorsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const fetchedData = await fetchIndicatorsData();
                setData(fetchedData);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('An unknown error occurred'));
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div>
            <BackButton />
            <Header title="Trading Indicators" subtitle="Unlock unlimited access to all our premium indicators with a single subscription." />
            
            {loading && <Loader />}
            {error && <p className="text-center text-red-400">Error loading indicator plans: {error.message}</p>}
            
            {data && !loading && !error && (
                <div className="space-y-16">
                    {data.my_subscription && (
                        <section>
                            <MySubscriptionCard subscription={data.my_subscription} />
                        </section>
                    )}

                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Choose Your Plan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {data.subscriptions.map(plan => (
                                <PlanCard key={plan.id} plan={plan} />
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default IndicatorsPage;
