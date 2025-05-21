'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FaCogs, FaPlus, FaTrash, FaEdit, FaPlay, FaPause, FaRobot, FaChartLine, FaChartBar, FaFilter, FaExchangeAlt, FaCircle, FaInfoCircle } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

// Strategy types
type StrategyStatus = 'active' | 'paused' | 'draft';
type TokenSymbol = 'SOL' | 'BONK' | 'JUP' | 'RNDR' | 'USDC' | 'USDT';
type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
type StrategyType = 'trend_following' | 'mean_reversion' | 'breakout' | 'sentiment' | 'custom';

interface Strategy {
  id: string;
  name: string;
  description: string;
  status: StrategyStatus;
  type: StrategyType;
  createdAt: string;
  lastRun?: string;
  tokens: TokenSymbol[];
  timeframe: TimeFrame;
  profitLoss: number;
  profitLossPercent: number;
  settings: {
    entryCondition: string;
    exitCondition: string;
    maxPositionSize: number;
    stopLoss?: number;
    takeProfit?: number;
    trailingStop?: number;
  };
  trades: {
    total: number;
    profitable: number;
    unprofitable: number;
  };
}

// Function to format strategy type for display
const formatStrategyType = (type: StrategyType): string => {
  switch (type) {
    case 'trend_following':
      return 'Trend Following';
    case 'mean_reversion':
      return 'Mean Reversion';
    case 'breakout':
      return 'Breakout';
    case 'sentiment':
      return 'Social Sentiment';
    case 'custom':
      return 'Custom Strategy';
    default:
      return type;
  }
};

// Mock strategies data
const mockStrategies: Strategy[] = [
  {
    id: 'strat001',
    name: 'SOL Momentum',
    description: 'Trend following strategy for SOL based on moving average crossovers',
    status: 'active',
    type: 'trend_following',
    createdAt: '2023-09-15T10:30:00Z',
    lastRun: new Date().toISOString(),
    tokens: ['SOL'],
    timeframe: '1h',
    profitLoss: 3265.42,
    profitLossPercent: 12.8,
    settings: {
      entryCondition: 'EMA(12) crosses above EMA(26) AND RSI(14) > 50',
      exitCondition: 'EMA(12) crosses below EMA(26) OR RSI(14) < 40',
      maxPositionSize: 10,
      stopLoss: 5,
      takeProfit: 15,
      trailingStop: 2
    },
    trades: {
      total: 24,
      profitable: 17,
      unprofitable: 7
    }
  },
  {
    id: 'strat002',
    name: 'BONK Sentiment',
    description: 'Trading strategy for BONK based on social media sentiment analysis',
    status: 'active',
    type: 'sentiment',
    createdAt: '2023-10-05T14:20:00Z',
    lastRun: new Date().toISOString(),
    tokens: ['BONK'],
    timeframe: '4h',
    profitLoss: 1892.73,
    profitLossPercent: 37.5,
    settings: {
      entryCondition: 'Social sentiment bullish AND tweet volume increased by 30%',
      exitCondition: 'Social sentiment bearish OR price drops 8%',
      maxPositionSize: 5,
      stopLoss: 10,
      takeProfit: 25
    },
    trades: {
      total: 12,
      profitable: 9,
      unprofitable: 3
    }
  },
  {
    id: 'strat003',
    name: 'JUP Reversal',
    description: 'Mean reversion strategy for JUP using overbought/oversold conditions',
    status: 'paused',
    type: 'mean_reversion',
    createdAt: '2023-11-22T09:10:00Z',
    lastRun: '2023-11-28T16:45:00Z',
    tokens: ['JUP'],
    timeframe: '15m',
    profitLoss: -345.18,
    profitLossPercent: -4.2,
    settings: {
      entryCondition: 'RSI(14) < 30 AND Price < BB_Lower(20,2)',
      exitCondition: 'RSI(14) > 60 OR Price > BB_Middle(20,2)',
      maxPositionSize: 8,
      stopLoss: 7,
      trailingStop: 3
    },
    trades: {
      total: 31,
      profitable: 15,
      unprofitable: 16
    }
  },
  {
    id: 'strat004',
    name: 'SOL/USDC Grid',
    description: 'Grid trading strategy for SOL/USDC pair with equal price intervals',
    status: 'draft',
    type: 'custom',
    createdAt: '2023-12-10T11:30:00Z',
    tokens: ['SOL', 'USDC'],
    timeframe: '1h',
    profitLoss: 0,
    profitLossPercent: 0,
    settings: {
      entryCondition: 'Grid levels set at 5% intervals between $200 and $300',
      exitCondition: 'Take profit at grid level crosses',
      maxPositionSize: 15
    },
    trades: {
      total: 0,
      profitable: 0,
      unprofitable: 0
    }
  }
];

// Template strategies for user to choose from
const templateStrategies = [
  {
    name: 'Trend Following',
    description: 'Strategy that aims to capture gains by riding the momentum of existing market trends.',
    type: 'trend_following'
  },
  {
    name: 'Mean Reversion',
    description: 'Strategy based on the idea that prices and returns eventually move back toward their historical average.',
    type: 'mean_reversion'
  },
  {
    name: 'Breakout',
    description: 'Captures gains by entering the market when price breaks above or below a defined range.',
    type: 'breakout'
  },
  {
    name: 'Social Sentiment',
    description: 'Uses AI analysis of social media sentiment to predict and act on market movements.',
    type: 'sentiment'
  },
  {
    name: 'Custom Strategy',
    description: 'Build your own strategy from scratch with custom entry and exit conditions.',
    type: 'custom'
  }
];

const StrategiesPage = () => {
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [showNewStrategy, setShowNewStrategy] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | StrategyStatus>('all');
  
  // Filter strategies based on selected status
  const filteredStrategies = strategies.filter(strategy => 
    statusFilter === 'all' || strategy.status === statusFilter
  );
  
  // Calculate overall stats
  const totalProfit = strategies.reduce((sum, strategy) => sum + strategy.profitLoss, 0);
  const totalTrades = strategies.reduce((sum, strategy) => sum + strategy.trades.total, 0);
  const activeTradingStrategies = strategies.filter(s => s.status === 'active').length;
  
  // Toggle strategy status
  const toggleStrategyStatus = (id: string) => {
    setStrategies(strategies.map(strategy => {
      if (strategy.id === id) {
        if (strategy.status === 'active') {
          return { ...strategy, status: 'paused' };
        } else if (strategy.status === 'paused' || strategy.status === 'draft') {
          return { ...strategy, status: 'active', lastRun: new Date().toISOString() };
        }
      }
      return strategy;
    }));
  };
  
  // Delete strategy
  const deleteStrategy = (id: string) => {
    setStrategies(strategies.filter(strategy => strategy.id !== id));
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
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Trading Strategies</h1>
            <p style={{ color: '#6b7280' }}>
              Create, manage, and monitor your automated trading strategies
            </p>
          </div>
          
          <button
            onClick={() => setShowNewStrategy(!showNewStrategy)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: '#FF2020',
              color: 'white',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(255, 32, 32, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            <FaPlus style={{ marginRight: '0.5rem' }} />
            New Strategy
          </button>
        </div>
        
        {/* Statistics Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem' 
        }}>
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <FaRobot style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Strategies</div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{activeTradingStrategies}</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <FaChartLine style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Profit/Loss</div>
            </div>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              color: totalProfit >= 0 ? '#10b981' : '#ef4444'
            }}>
              ${totalProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <FaExchangeAlt style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Trades</div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalTrades}</div>
          </motion.div>
        </div>
        
        {/* Filter controls */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
            <FaFilter style={{ color: '#6b7280', marginRight: '0.5rem' }} />
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Status:</span>
          </div>
          
          <div style={{ 
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.5rem',
            padding: '0.25rem'
          }}>
            <button
              onClick={() => setStatusFilter('all')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: statusFilter === 'all' ? '#FF2020' : 'transparent',
                color: statusFilter === 'all' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: statusFilter === 'active' ? '#FF2020' : 'transparent',
                color: statusFilter === 'active' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('paused')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: statusFilter === 'paused' ? '#FF2020' : 'transparent',
                color: statusFilter === 'paused' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              Paused
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: statusFilter === 'draft' ? '#FF2020' : 'transparent',
                color: statusFilter === 'draft' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              Draft
            </button>
          </div>
        </div>
        
        {/* New Strategy Templates Section */}
        <AnimatePresence>
          {showNewStrategy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ 
                marginBottom: '2rem',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0.75rem',
                border: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Create New Strategy</h2>
                  <button
                    onClick={() => setShowNewStrategy(false)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#6b7280',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      lineHeight: 1
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
                  Choose a strategy template to get started:
                </p>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {templateStrategies.map((template, index) => (
                    <motion.div
                      key={template.type}
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
                      style={{ 
                        padding: '1.25rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.5rem',
                        border: '1px solid #f3f4f6',
                        cursor: 'pointer'
                      }}
                    >
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {template.name}
                      </h3>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                        {template.description}
                      </p>
                      <button
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          backgroundColor: '#FF2020',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Use This Template
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Strategies List */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredStrategies.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1',
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                No strategies found with the selected filter.
              </p>
              <button
                onClick={() => setStatusFilter('all')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#FF2020',
                  color: 'white',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Show All Strategies
              </button>
            </div>
          ) : (
            filteredStrategies.map(strategy => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  padding: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '0.75rem',
                  border: '1px solid #f3f4f6',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Status indicator */}
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', display: 'flex', alignItems: 'center' }}>
                  <FaCircle style={{ 
                    fontSize: '0.75rem',
                    color: strategy.status === 'active' ? '#10b981' : strategy.status === 'paused' ? '#f59e0b' : '#6b7280',
                    marginRight: '0.5rem'
                  }} />
                  <span style={{ 
                    fontSize: '0.875rem',
                    color: strategy.status === 'active' ? '#10b981' : strategy.status === 'paused' ? '#f59e0b' : '#6b7280',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {strategy.status}
                  </span>
                </div>
                
                {/* Strategy name and type */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem', paddingRight: '5rem' }}>
                  {strategy.name}
                </h3>
                <div style={{ 
                  display: 'inline-block',
                  padding: '0.125rem 0.5rem',
                  backgroundColor: 'rgba(255, 32, 32, 0.1)',
                  color: '#FF2020',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  marginBottom: '0.75rem'
                }}>
                  {formatStrategyType(strategy.type)}
                </div>
                
                {/* Description */}
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {strategy.description}
                </p>
                
                {/* Stats */}
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.125rem' }}>
                      Tokens
                    </div>
                    <div style={{ fontWeight: '500' }}>
                      {strategy.tokens.join(', ')}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.125rem' }}>
                      Timeframe
                    </div>
                    <div style={{ fontWeight: '500' }}>
                      {strategy.timeframe}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.125rem' }}>
                      Profit/Loss
                    </div>
                    <div style={{ 
                      fontWeight: '500', 
                      color: strategy.profitLoss >= 0 ? '#10b981' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      ${strategy.profitLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      <span style={{ 
                        fontSize: '0.75rem', 
                        marginLeft: '0.5rem',
                        padding: '0.125rem 0.25rem',
                        backgroundColor: strategy.profitLoss >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '0.25rem'
                      }}>
                        {strategy.profitLoss >= 0 ? '+' : ''}{strategy.profitLossPercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.125rem' }}>
                      Trades
                    </div>
                    <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                      {strategy.trades.total}
                      {strategy.trades.total > 0 && (
                        <div style={{ 
                          fontSize: '0.75rem', 
                          marginLeft: '0.5rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#10b981', marginRight: '0.25rem' }}>
                            W: {strategy.trades.profitable}
                          </span>
                          <span style={{ color: '#ef4444' }}>
                            L: {strategy.trades.unprofitable}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Controls */}
                <div style={{ 
                  display: 'flex',
                  gap: '0.5rem',
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '1rem'
                }}>
                  <button
                    onClick={() => toggleStrategyStatus(strategy.id)}
                    style={{
                      flex: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      backgroundColor: strategy.status === 'active' ? '#f59e0b' : '#10b981',
                      color: 'white',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {strategy.status === 'active' ? (
                      <>
                        <FaPause style={{ marginRight: '0.25rem' }} />
                        Pause
                      </>
                    ) : (
                      <>
                        <FaPlay style={{ marginRight: '0.25rem' }} />
                        {strategy.status === 'draft' ? 'Start' : 'Resume'}
                      </>
                    )}
                  </button>
                  
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      color: '#6b7280',
                      borderRadius: '0.375rem',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer'
                    }}
                  >
                    <FaEdit />
                  </button>
                  
                  <button
                    onClick={() => deleteStrategy(strategy.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      color: '#ef4444',
                      borderRadius: '0.375rem',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer'
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        {/* Help Section */}
        {strategies.length === 0 && (
          <div style={{ 
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaInfoCircle style={{ color: '#FF2020', marginRight: '0.75rem', fontSize: '1.25rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Getting Started with Trading Strategies</h3>
            </div>
            
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              Automated trading strategies help you capture opportunities in the Solana market without constant manual monitoring. 
              Here's how to get started:
            </p>
            
            <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Click "New Strategy" to choose a template</li>
              <li style={{ marginBottom: '0.5rem' }}>Configure entry and exit conditions based on technical indicators or social sentiment</li>
              <li style={{ marginBottom: '0.5rem' }}>Set position sizes, stop-loss, and take-profit levels</li>
              <li style={{ marginBottom: '0.5rem' }}>Start the strategy and monitor its performance in your dashboard</li>
            </ol>
            
            <button
              onClick={() => setShowNewStrategy(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 1rem',
                backgroundColor: '#FF2020',
                color: 'white',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <FaPlus style={{ marginRight: '0.5rem' }} />
              Create Your First Strategy
            </button>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}

export default StrategiesPage; 