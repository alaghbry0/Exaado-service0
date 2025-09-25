
import { useState, useEffect } from 'react';
import { Signal, Indicator } from '../types';

const MOCK_SIGNALS: Signal[] = [
  { id: 'sig_01', name: 'Gold Rush VIP', description: 'Premium signals for XAU/USD.', price: '99/mo', provider: 'ForexPros', accuracy: '88%' },
  { id: 'sig_02', name: 'EUR/USD Scalper', description: 'Short-term signals for the most popular pair.', price: '49/mo', provider: 'SignalFactory', accuracy: '92%' },
  { id: 'sig_03', name: 'Crypto Boom', description: 'Signals for major cryptocurrencies.', price: '129/mo', provider: 'CryptoSignal', accuracy: '85%' },
];

const MOCK_INDICATORS: Indicator[] = [
    { id: 'ind_01', name: 'Trend Master Pro', description: 'Advanced trend-following indicator.', price: '149', platform: 'MT4' },
    { id: 'ind_02', name: 'Volatility Crusher', description: 'Identify market volatility for breakout trades.', price: '199', platform: 'MT5' },
    { id: 'ind_03', name: 'Supply & Demand Zones', description: 'Automatically plots key S&D zones.', price: '120', platform: 'MT4' },
];

interface MiniAppServices {
  signals: Signal[];
  indicators: Indicator[];
  loading: boolean;
  error: Error | null;
}

export const useMiniAppServices = (): MiniAppServices => {
  const [data, setData] = useState<Omit<MiniAppServices, 'loading' | 'error'>>({ signals: [], indicators: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({
          signals: MOCK_SIGNALS,
          indicators: MOCK_INDICATORS,
        });
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
};
