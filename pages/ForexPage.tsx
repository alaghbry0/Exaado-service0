import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import { fetchForexData } from './api';
import { ForexData, ForexSubscriptionPlan, MyForexSubscription } from './types';

const MySubscriptionCard: React.FC<{ subscription: MyForexSubscription }> = ({ subscription }) => {
    let forexAddresses: string[] = [];
    try {
        const parsed = JSON.parse(subscription.forex_addresses);
        if (Array.isArray(parsed)) {
            forexAddresses = parsed;
        }
    } catch (e) {
        console.error("Failed to parse forex_addresses", e);
    }

    return (
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
                    {forexAddresses.length > 0 && (
                         <p><strong>Forex Addresses:</strong> <span className="font-mono bg-white/20 rounded px-2 py-1 text-xs">{forexAddresses.join(', ')}</span></p>
                    )}
                </div>
            </div>
        </div>
    );
};

const PlanCard: React.FC<{ plan: ForexSubscriptionPlan }> = ({ plan }) => {
    const isBestValue = plan.name.toLowerCase().includes('lifetime');
    const isFree = plan.price === '0';

    return (
        <div className={`relative bg-white dark:bg-gray-800 border rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 h-full ${isBestValue ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-xl'}`}>
            {isBestValue && <div className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Best Value</div>}
            
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h4>
            
            <div className="my-6 min-h-[70px] flex flex-col justify-center items-center">
                {isFree ? (
                     <span className="text-5xl font-extrabold text-gray-900 dark:text-white">Free</span>
                ) : (
                    <>
                        {plan.discounted_price && plan.discounted_price !== plan.price && <span className="text-xl text-red-500/90 line-through">${plan.price}</span>}
                        <span className="text-5xl font-extrabold text-gray-900 dark:text-white">${plan.discounted_price ?? plan.price}</span>
                    </>
                )}
            </div>
            
            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-6 h-10 flex items-center justify-center text-center">
                {isFree ? 'Get started with a demo' : plan.duration_in_months === '0' ? 'One-Time Payment for Lifetime Access' : `Billed once for ${plan.duration_in_months} months`}
            </p>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 text-left mb-8 w-full flex-grow">
                {[
                    isFree ? 'Limited features' : 'Access to all panels', 
                    'One-click trade execution', 
                    'Premium 24/7 Support', 
                    'MT4 & MT5 Compatible'
                ].map(feature => (
                    <li key={feature} className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className={`mt-auto w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg ${isFree ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                {isFree ? 'Start Demo' : 'Subscribe Now'}
            </button>
        </div>
    );
};


const ForexPage: React.FC = () => {
    const [data, setData] = useState<ForexData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const fetchedData = await fetchForexData();
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
            <Header title="Utility Trading Panels" subtitle="A powerful panel to manage your trades with one-click execution."/>
            
            {loading && <Loader />}
            {error && <p className="text-center text-red-400">Error loading data: {error.message}</p>}

            {data && !loading && !error && (
                 <div className="space-y-16">
                    {data.my_subscription && (
                        <section>
                            <MySubscriptionCard subscription={data.my_subscription} />
                        </section>
                    )}

                    {data.subscriptions.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                {data.my_subscription ? 'Upgrade Your Plan' : 'Choose Your Plan'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {data.subscriptions.map(plan => (
                                    <PlanCard key={plan.id} plan={plan} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default ForexPage;
