'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FaSignal, FaTwitter, FaGlobe, FaReddit, FaDiscord, FaFilter, FaChartLine, FaRegClock, FaArrowUp, FaArrowDown, FaSpinner } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

// Define signal types
type SignalSource = 'twitter' | 'web' | 'reddit' | 'discord' | 'technical' | 'onchain';
type SignalSentiment = 'bullish' | 'bearish' | 'neutral';
type SignalStrength = 1 | 2 | 3 | 4 | 5;
type TimeFrame = '15m' | '1h' | '4h' | '1d' | '1w';

interface Signal {
  id: string;
  ticker: string;
  name: string;
  source: SignalSource;
  sourceUrl?: string;
  title: string;
  summary: string;
  timestamp: string;
  sentiment: SignalSentiment;
  strength: SignalStrength;
  timeframe: TimeFrame;
  price?: number;
  priceTarget?: number;
  logo?: string;
}

// Mock data for signals
const mockSignals: Signal[] = [
  {
    id: 'sig-001',
    ticker: 'SOL',
    name: 'Solana',
    source: 'technical',
    title: 'Bullish RSI Divergence',
    summary: 'Positive RSI divergence detected on the 4-hour chart suggesting a potential reversal from the recent downtrend.',
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    sentiment: 'bullish',
    strength: 4,
    timeframe: '4h',
    price: 250.75,
    priceTarget: 275.50,
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  {
    id: 'sig-002',
    ticker: 'JUP',
    name: 'Jupiter',
    source: 'twitter',
    sourceUrl: 'https://twitter.com',
    title: 'Jupiter Announces V2 Upgrade',
    summary: 'Jupiter DEX announces V2 upgrade with improved routing, lower fees, and expanded token support. Community reacting positively with high engagement.',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    sentiment: 'bullish',
    strength: 5,
    timeframe: '1d',
    price: 1.23,
    priceTarget: 1.55,
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/logo.png'
  },
  {
    id: 'sig-003',
    ticker: 'BONK',
    name: 'Bonk',
    source: 'reddit',
    sourceUrl: 'https://reddit.com',
    title: 'Decreased Social Sentiment',
    summary: 'Sentiment analysis shows decreasing enthusiasm and increased selling discussions across Reddit and Discord channels.',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    sentiment: 'bearish',
    strength: 3,
    timeframe: '1d',
    price: 0.000124,
    priceTarget: 0.000110,
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png'
  },
  {
    id: 'sig-004',
    ticker: 'RNDR',
    name: 'Render',
    source: 'onchain',
    title: 'Large Accumulation Detected',
    summary: 'Significant whale accumulation detected on-chain with 250,000 RNDR transferred from exchanges to private wallets in the last 24 hours.',
    timestamp: new Date(Date.now() - 360 * 60000).toISOString(),
    sentiment: 'bullish',
    strength: 4,
    timeframe: '1w',
    price: 5.28,
    priceTarget: 6.15,
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.svg'
  },
  {
    id: 'sig-005',
    ticker: 'USDC',
    name: 'USD Coin',
    source: 'web',
    sourceUrl: 'https://example.com',
    title: 'Stablecoin Regulation News',
    summary: 'New regulatory framework for stablecoins announced, potentially impacting USDC operations. Market remains stable but cautious.',
    timestamp: new Date(Date.now() - 840 * 60000).toISOString(),
    sentiment: 'neutral',
    strength: 2,
    timeframe: '1w',
    price: 1.00,
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
];

// Filter types
type SourceFilter = SignalSource | 'all';
type SentimentFilter = SignalSentiment | 'all';
type TimeframeFilter = TimeFrame | 'all';

const SignalsPage = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('all');
  const [timeframeFilter, setTimeframeFilter] = useState<TimeframeFilter>('all');
  const [refreshing, setRefreshing] = useState(false);
  
  // Function to get signals (mocked for now)
  const fetchSignals = async () => {
    setRefreshing(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Use mock data with randomized timestamps
    const updatedSignals = mockSignals.map(signal => ({
      ...signal,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60000)).toISOString()
    }));
    
    setSignals(updatedSignals);
    setLoading(false);
    setRefreshing(false);
  };
  
  useEffect(() => {
    fetchSignals();
    
    // Refresh signals every 5 minutes
    const interval = setInterval(() => {
      fetchSignals();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Apply filters to signals
  const filteredSignals = signals.filter(signal => {
    if (sourceFilter !== 'all' && signal.source !== sourceFilter) return false;
    if (sentimentFilter !== 'all' && signal.sentiment !== sentimentFilter) return false;
    if (timeframeFilter !== 'all' && signal.timeframe !== timeframeFilter) return false;
    return true;
  });
  
  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const signalTime = new Date(timestamp);
    const diffMs = now.getTime() - signalTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };
  
  // Get icon for signal source
  const getSourceIcon = (source: SignalSource) => {
    switch(source) {
      case 'twitter': return <FaTwitter />;
      case 'web': return <FaGlobe />;
      case 'reddit': return <FaReddit />;
      case 'discord': return <FaDiscord />;
      case 'technical': return <FaChartLine />;
      case 'onchain': return <FaSignal />;
      default: return <FaGlobe />;
    }
  };
  
  // Get color for sentiment
  const getSentimentColor = (sentiment: SignalSentiment) => {
    switch(sentiment) {
      case 'bullish': return '#10b981'; // green
      case 'bearish': return '#ef4444'; // red
      case 'neutral': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };
  
  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>AI Signal Feed</h1>
            <p style={{ color: '#6b7280' }}>
              Real-time trading signals powered by Vector Tools AI across social, technical, and on-chain data
            </p>
          </div>
          <button
            onClick={fetchSignals}
            disabled={refreshing}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 32, 32, 0.1)',
              color: '#FF2020',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '500',
              cursor: refreshing ? 'default' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {refreshing ? (
              <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} />
            ) : (
              <FaRegClock style={{ marginRight: '0.5rem' }} />
            )}
            {refreshing ? 'Refreshing...' : 'Refresh Signals'}
          </button>
        </div>
        
        {/* Filter controls */}
        <div style={{ 
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          marginBottom: '1.5rem',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <FaFilter style={{ color: '#6b7280', marginRight: '0.5rem' }} />
            <h3 style={{ fontWeight: '500' }}>Filter Signals</h3>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Source filter */}
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Source</div>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value as SourceFilter)}
                style={{ 
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'white',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Sources</option>
                <option value="technical">Technical Analysis</option>
                <option value="twitter">Twitter</option>
                <option value="reddit">Reddit</option>
                <option value="discord">Discord</option>
                <option value="web">Web News</option>
                <option value="onchain">On-chain Data</option>
              </select>
            </div>
            
            {/* Sentiment filter */}
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Sentiment</div>
              <select
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value as SentimentFilter)}
                style={{ 
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'white',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Sentiments</option>
                <option value="bullish">Bullish</option>
                <option value="bearish">Bearish</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            
            {/* Timeframe filter */}
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Timeframe</div>
              <select
                value={timeframeFilter}
                onChange={(e) => setTimeframeFilter(e.target.value as TimeframeFilter)}
                style={{ 
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'white',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Timeframes</option>
                <option value="15m">15 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">1 Day</option>
                <option value="1w">1 Week</option>
              </select>
            </div>
            
            {/* Reset filters button */}
            <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
              <button
                onClick={() => {
                  setSourceFilter('all');
                  setSentimentFilter('all');
                  setTimeframeFilter('all');
                }}
                style={{ 
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  borderRadius: '0.25rem',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer'
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Signals list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <FaSpinner style={{ fontSize: '2rem', color: '#FF2020', animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem' }}>Loading signals...</p>
            <style jsx global>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : filteredSignals.length === 0 ? (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            border: '1px solid #f3f4f6'
          }}>
            <p style={{ marginBottom: '1rem' }}>No signals match your current filters.</p>
            <button
              onClick={() => {
                setSourceFilter('all');
                setSentimentFilter('all');
                setTimeframeFilter('all');
              }}
              style={{ 
                padding: '0.5rem 1rem',
                backgroundColor: '#FF2020',
                color: 'white',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {filteredSignals.map((signal) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    padding: '1.5rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '0.75rem',
                    border: '1px solid #f3f4f6'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {/* Token logo */}
                    <div style={{ 
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid #f3f4f6',
                      backgroundColor: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {signal.logo ? (
                        <img 
                          src={signal.logo} 
                          alt={signal.ticker} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        />
                      ) : (
                        <div style={{ 
                          fontSize: '1rem',
                          fontWeight: 'bold', 
                          color: '#FF2020'
                        }}>
                          {signal.ticker}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{signal.ticker}</div>
                          <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{signal.name}</div>
                          <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            marginLeft: '0.75rem',
                            padding: '0.125rem 0.375rem',
                            backgroundColor: 'rgba(107, 114, 128, 0.1)',
                            color: '#6b7280',
                            borderRadius: '9999px',
                            fontSize: '0.75rem'
                          }}>
                            {getSourceIcon(signal.source)}
                            <span>{signal.source.charAt(0).toUpperCase() + signal.source.slice(1)}</span>
                          </div>
                        </div>
                        
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          color: getSentimentColor(signal.sentiment),
                          fontSize: '0.875rem'
                        }}>
                          {signal.sentiment === 'bullish' && <FaArrowUp style={{ marginRight: '0.25rem' }} />}
                          {signal.sentiment === 'bearish' && <FaArrowDown style={{ marginRight: '0.25rem' }} />}
                          <span style={{ fontWeight: '500' }}>
                            {signal.sentiment.charAt(0).toUpperCase() + signal.sentiment.slice(1)}
                          </span>
                          <span style={{ 
                            marginLeft: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#6b7280',
                            fontSize: '0.75rem'
                          }}>
                            <FaRegClock style={{ marginRight: '0.25rem' }} />
                            {getRelativeTime(signal.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Signal title */}
                      <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{signal.title}</h3>
                      
                      {/* Signal summary */}
                      <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{signal.summary}</p>
                      
                      {/* Footer with additional details */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.125rem 0.375rem',
                          backgroundColor: 'rgba(107, 114, 128, 0.1)',
                          borderRadius: '0.25rem'
                        }}>
                          <span>Timeframe: {signal.timeframe}</span>
                        </div>
                        
                        {signal.price && (
                          <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.125rem 0.375rem',
                            backgroundColor: 'rgba(107, 114, 128, 0.1)',
                            borderRadius: '0.25rem'
                          }}>
                            <span>Current: ${signal.price.toLocaleString(undefined, { minimumFractionDigits: signal.price < 0.01 ? 6 : 2, maximumFractionDigits: signal.price < 0.01 ? 6 : 2 })}</span>
                          </div>
                        )}
                        
                        {signal.priceTarget && (
                          <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.125rem 0.375rem',
                            backgroundColor: 'rgba(107, 114, 128, 0.1)',
                            borderRadius: '0.25rem',
                            color: getSentimentColor(signal.sentiment)
                          }}>
                            <span>Target: ${signal.priceTarget.toLocaleString(undefined, { minimumFractionDigits: signal.priceTarget < 0.01 ? 6 : 2, maximumFractionDigits: signal.priceTarget < 0.01 ? 6 : 2 })}</span>
                          </div>
                        )}
                        
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.125rem 0.375rem',
                          backgroundColor: 'rgba(107, 114, 128, 0.1)',
                          borderRadius: '0.25rem'
                        }}>
                          <span>Strength: {Array(5).fill('★').map((star, i) => (
                            <span key={i} style={{ color: i < signal.strength ? '#FF2020' : '#d1d5db' }}>{star}</span>
                          ))}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default SignalsPage; 