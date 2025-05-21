'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FaChartLine, FaChartPie, FaChartBar, FaCalendarAlt, FaExchangeAlt, FaGlobe, FaInfoCircle, FaRegClock } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Mock data for analytics
const portfolioPerformance = {
  daily: [
    { date: '2023-12-01', value: 10250 },
    { date: '2023-12-02', value: 10400 },
    { date: '2023-12-03', value: 10380 },
    { date: '2023-12-04', value: 10450 },
    { date: '2023-12-05', value: 10800 },
    { date: '2023-12-06', value: 11200 },
    { date: '2023-12-07', value: 11500 },
    { date: '2023-12-08', value: 11800 },
    { date: '2023-12-09', value: 12000 },
    { date: '2023-12-10', value: 12400 },
    { date: '2023-12-11', value: 12350 },
    { date: '2023-12-12', value: 12580 },
    { date: '2023-12-13', value: 12620 },
    { date: '2023-12-14', value: 12650 },
  ],
  weekly: [
    { date: 'Week 1', value: 9800 },
    { date: 'Week 2', value: 10200 },
    { date: 'Week 3', value: 10500 },
    { date: 'Week 4', value: 11200 },
    { date: 'Week 5', value: 12000 },
    { date: 'Week 6', value: 12580 },
  ],
  monthly: [
    { date: 'Jul', value: 8500 },
    { date: 'Aug', value: 9200 },
    { date: 'Sep', value: 9600 },
    { date: 'Oct', value: 10500 },
    { date: 'Nov', value: 11500 },
    { date: 'Dec', value: 12580 },
  ],
};

const assetAllocation = [
  { name: 'SOL', value: 68.5 },
  { name: 'BONK', value: 14.9 },
  { name: 'RNDR', value: 9.8 },
  { name: 'JUP', value: 6.0 },
  { name: 'USDC', value: 0.8 },
];

const tradingHistory = [
  { 
    id: 't001', 
    date: '2023-12-14 09:45', 
    pair: 'SOL/USDC',
    type: 'buy',
    amount: 2.5,
    price: 245.23,
    value: 613.08,
    fee: 0.37,
    status: 'completed',
    profitLoss: null,
    strategy: 'SOL Momentum'
  },
  { 
    id: 't002', 
    date: '2023-12-10 14:22', 
    pair: 'SOL/USDC',
    type: 'sell',
    amount: 1.8,
    price: 242.15,
    value: 435.87,
    fee: 0.26,
    status: 'completed',
    profitLoss: 28.32,
    strategy: 'Manual'
  },
  { 
    id: 't003', 
    date: '2023-12-05 11:08', 
    pair: 'BONK/USDC',
    type: 'buy',
    amount: 5000000,
    price: 0.000125,
    value: 625.00,
    fee: 0.38,
    status: 'completed',
    profitLoss: null,
    strategy: 'BONK Sentiment'
  },
  { 
    id: 't004', 
    date: '2023-12-01 16:40', 
    pair: 'JUP/USDC',
    type: 'buy',
    amount: 420,
    price: 0.98,
    value: 411.60,
    fee: 0.25,
    status: 'completed',
    profitLoss: null,
    strategy: 'Manual'
  },
  { 
    id: 't005', 
    date: '2023-11-28 10:15', 
    pair: 'RNDR/USDC',
    type: 'sell',
    amount: 35.2,
    price: 4.85,
    value: 170.72,
    fee: 0.10,
    status: 'completed',
    profitLoss: -15.84,
    strategy: 'Manual'
  },
];

const marketInsights = [
  {
    title: 'SOL Momentum Strengthening',
    text: 'On-chain data shows increased accumulation by large holders. Price could continue upward trend.',
    date: '2023-12-14',
    sentiment: 'bullish'
  },
  {
    title: 'Jupiter Ecosystem Expanding',
    text: 'New integrations and partnerships continue to drive JUP token adoption and utility.',
    date: '2023-12-13',
    sentiment: 'bullish'
  },
  {
    title: 'Meme Coin Activity Slowing',
    text: 'Social volume for BONK and other meme coins has decreased 15% over the past week.',
    date: '2023-12-12',
    sentiment: 'bearish'
  },
  {
    title: 'Render Network Usage Increasing',
    text: 'RNDR seeing higher network activity as AI rendering demands grow.',
    date: '2023-12-10',
    sentiment: 'neutral'
  }
];

const performanceMetrics = {
  totalReturn: 25.8,
  winRate: 68,
  avgProfit: 42.16,
  avgLoss: -18.72,
  bestTrade: {
    pair: 'BONK/USDC',
    profit: 187.25,
    date: '2023-11-15'
  },
  worstTrade: {
    pair: 'RNDR/USDC',
    loss: -32.64,
    date: '2023-10-22'
  }
};

// Time range options for chart
const timeRanges = [
  { label: '7D', value: 'daily' },
  { label: '1M', value: 'weekly' },
  { label: '6M', value: 'monthly' }
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('daily');
  
  // Helper function to get performance data for the selected time range
  const getPerformanceData = () => {
    return portfolioPerformance[timeRange];
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
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Portfolio Analytics</h1>
            <p style={{ color: '#6b7280' }}>
              Track performance, analyze trades, and gain insights
            </p>
          </div>
          
          <div style={{ 
            display: 'inline-flex', 
            background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))', 
            backdropFilter: 'blur(8px)', 
            borderRadius: '0.75rem', 
            padding: '0.25rem' 
          }}>
            {timeRanges.map((range) => (
              <button
                key={range.value}
                style={{
                  padding: '0.375rem 0.75rem', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  borderRadius: '0.5rem', 
                  transition: 'all 0.2s',
                  backgroundColor: timeRange === range.value ? '#FF2020' : 'transparent',
                  color: timeRange === range.value ? '#111827' : '#4b5563',
                  boxShadow: timeRange === range.value ? '0 0 3px rgba(255, 32, 32, 0.5), 0 0 8px rgba(255, 32, 32, 0.3)' : 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Performance Chart */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <FaChartLine style={{ color: '#FF2020', marginRight: '0.5rem' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Portfolio Performance</h2>
          </div>
          
          <div style={{ 
            height: '300px', 
            position: 'relative', 
            marginBottom: '1rem',
            padding: '1rem'
          }}>
            {/* Simplified chart visualization */}
            <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 32, 32, 0.5)" />
                  <stop offset="100%" stopColor="rgba(255, 32, 32, 0.0)" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              <g>
                {[0, 1, 2, 3, 4].map((i) => (
                  <line 
                    key={i} 
                    x1="0" 
                    y1={i * 60} 
                    x2="800" 
                    y2={i * 60} 
                    stroke="#e5e7eb" 
                    strokeDasharray="4" 
                  />
                ))}
                
                {getPerformanceData().map((_, i) => {
                  const x = (i / (getPerformanceData().length - 1)) * 800;
                  return (
                    <line 
                      key={i} 
                      x1={x} 
                      y1="0" 
                      x2={x} 
                      y2="300" 
                      stroke="#e5e7eb" 
                      strokeDasharray="4" 
                    />
                  );
                })}
              </g>
              
              {/* Chart line */}
              <path
                d={`
                  M 0 ${300 - (getPerformanceData()[0].value / 15000) * 300}
                  ${getPerformanceData().map((item, i) => {
                    const x = (i / (getPerformanceData().length - 1)) * 800;
                    const y = 300 - (item.value / 15000) * 300;
                    return `L ${x} ${y}`;
                  }).join(' ')}
                `}
                fill="none"
                stroke="#FF2020"
                strokeWidth="3"
              />
              
              {/* Area under the line */}
              <path
                d={`
                  M 0 ${300 - (getPerformanceData()[0].value / 15000) * 300}
                  ${getPerformanceData().map((item, i) => {
                    const x = (i / (getPerformanceData().length - 1)) * 800;
                    const y = 300 - (item.value / 15000) * 300;
                    return `L ${x} ${y}`;
                  }).join(' ')}
                  L ${800} ${300 - (getPerformanceData()[getPerformanceData().length - 1].value / 15000) * 300}
                  L ${800} 300
                  L 0 300
                  Z
                `}
                fill="url(#areaGradient)"
                opacity="0.5"
              />
              
              {/* Data points */}
              {getPerformanceData().map((item, i) => {
                const x = (i / (getPerformanceData().length - 1)) * 800;
                const y = 300 - (item.value / 15000) * 300;
                return (
                  <circle 
                    key={i} 
                    cx={x} 
                    cy={y} 
                    r="4" 
                    fill="#FF2020" 
                  />
                );
              })}
            </svg>
            
            {/* Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              {getPerformanceData().filter((_, i, arr) => {
                // Show only a few labels for clarity
                const step = Math.max(1, Math.floor(arr.length / 6));
                return i % step === 0 || i === arr.length - 1;
              }).map((item, i) => (
                <div key={i} style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {item.date}
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '0.875rem' }}>
            <div>
              <span style={{ fontWeight: '500' }}>Start:</span> ${getPerformanceData()[0].value.toLocaleString()}
            </div>
            <div>
              <span style={{ fontWeight: '500' }}>End:</span> ${getPerformanceData()[getPerformanceData().length - 1].value.toLocaleString()}
            </div>
            <div>
              <span style={{ fontWeight: '500' }}>Change:</span> 
              <span style={{ color: getPerformanceData()[getPerformanceData().length - 1].value > getPerformanceData()[0].value ? '#10b981' : '#ef4444' }}>
                {((getPerformanceData()[getPerformanceData().length - 1].value / getPerformanceData()[0].value - 1) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Analytics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Asset Allocation */}
          <div style={{ 
            gridColumn: 'span 4', 
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaChartPie style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Asset Allocation</h2>
            </div>
            
            <div style={{ height: '200px', position: 'relative' }}>
              {/* Simple pie chart visualization */}
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {assetAllocation.map((asset, i) => {
                  // Calculate each slice
                  const startAngle = assetAllocation.slice(0, i).reduce((sum, a) => sum + a.value, 0) * 3.6;
                  const endAngle = startAngle + asset.value * 3.6;
                  
                  // Convert to radians for calculation
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  // Calculate path
                  const x1 = 50 + 30 * Math.cos(startRad);
                  const y1 = 50 + 30 * Math.sin(startRad);
                  const x2 = 50 + 30 * Math.cos(endRad);
                  const y2 = 50 + 30 * Math.sin(endRad);
                  
                  // Determine if the arc is large or small
                  const largeArcFlag = asset.value > 50 ? 1 : 0;
                  
                  // Calculate position for the label
                  const labelRad = (startAngle + endAngle) / 2 * Math.PI / 180;
                  const labelX = 50 + 45 * Math.cos(labelRad);
                  const labelY = 50 + 45 * Math.sin(labelRad);
                  
                  // Colors
                  const colors = ['#FF2020', '#FF4040', '#FF6060', '#FF8080', '#FFA0A0'];
                  
                  return (
                    <g key={i}>
                      <path 
                        d={`M 50 50 L ${x1} ${y1} A 30 30 0 ${largeArcFlag} 1 ${x2} ${y2} Z`} 
                        fill={colors[i % colors.length]} 
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              {assetAllocation.map((asset, i) => {
                const colors = ['#FF2020', '#FF4040', '#FF6060', '#FF8080', '#FFA0A0'];
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '0.75rem', 
                        height: '0.75rem', 
                        backgroundColor: colors[i % colors.length], 
                        borderRadius: '0.125rem',
                        marginRight: '0.5rem'
                      }} />
                      <span>{asset.name}</span>
                    </div>
                    <span style={{ fontWeight: '500' }}>{asset.value}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Performance Metrics */}
          <div style={{ 
            gridColumn: 'span 4', 
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaChartBar style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Performance Metrics</h2>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                Total Return
              </div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: performanceMetrics.totalReturn >= 0 ? '#10b981' : '#ef4444'
              }}>
                {performanceMetrics.totalReturn >= 0 ? '+' : ''}{performanceMetrics.totalReturn}%
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                  Win Rate
                </div>
                <div style={{ fontWeight: '500' }}>{performanceMetrics.winRate}%</div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                  Avg. Profit
                </div>
                <div style={{ fontWeight: '500', color: '#10b981' }}>
                  ${performanceMetrics.avgProfit.toFixed(2)}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                  Avg. Loss
                </div>
                <div style={{ fontWeight: '500', color: '#ef4444' }}>
                  ${performanceMetrics.avgLoss.toFixed(2)}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                  Profit Factor
                </div>
                <div style={{ fontWeight: '500' }}>
                  {Math.abs(performanceMetrics.avgProfit / performanceMetrics.avgLoss).toFixed(2)}
                </div>
              </div>
            </div>
            
            <div style={{ 
              borderTop: '1px solid #f3f4f6', 
              paddingTop: '1rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                  Best Trade
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{performanceMetrics.bestTrade.pair}</div>
                  <div style={{ fontWeight: '500', color: '#10b981' }}>
                    +${performanceMetrics.bestTrade.profit}
                  </div>
                </div>
              </div>
              
              <div>
                <div style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                  Worst Trade
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{performanceMetrics.worstTrade.pair}</div>
                  <div style={{ fontWeight: '500', color: '#ef4444' }}>
                    ${performanceMetrics.worstTrade.loss}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Insights */}
          <div style={{ 
            gridColumn: 'span 4', 
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            border: '1px solid #f3f4f6',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaGlobe style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Market Insights</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {marketInsights.map((insight, i) => {
                const sentimentColors = {
                  bullish: '#10b981',
                  bearish: '#ef4444',
                  neutral: '#6b7280'
                };
                
                return (
                  <div 
                    key={i}
                    style={{ 
                      padding: '0.75rem', 
                      backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                      borderRadius: '0.5rem',
                      border: '1px solid #f3f4f6'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ fontWeight: '600' }}>{insight.title}</div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        padding: '0.125rem 0.375rem',
                        backgroundColor: `${sentimentColors[insight.sentiment]}20`,
                        color: sentimentColors[insight.sentiment],
                        borderRadius: '9999px',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {insight.sentiment}
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>
                      {insight.text}
                    </p>
                    
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
                      <FaRegClock style={{ marginRight: '0.25rem' }} />
                      {insight.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Trading History */}
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaExchangeAlt style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Trading History</h2>
            </div>
            
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                color: '#6b7280',
                backgroundColor: 'transparent',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              <FaCalendarAlt style={{ marginRight: '0.375rem' }} />
              Filter
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Date/Time
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Pair
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Type
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Amount
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Price
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Value
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    P/L
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Strategy
                  </th>
                </tr>
              </thead>
              
              <tbody>
                {tradingHistory.map((trade, i) => (
                  <tr 
                    key={trade.id}
                    style={{ 
                      borderTop: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(243, 244, 246, 0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                      {trade.date}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '500' }}>
                      {trade.pair}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                      <span style={{ 
                        display: 'inline-block',
                        padding: '0.125rem 0.375rem',
                        backgroundColor: trade.type === 'buy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: trade.type === 'buy' ? '#10b981' : '#ef4444',
                        borderRadius: '0.25rem',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem'
                      }}>
                        {trade.type}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', textAlign: 'right' }}>
                      {trade.amount.toLocaleString(undefined, {
                        minimumFractionDigits: trade.amount < 0.01 ? 6 : 2,
                        maximumFractionDigits: trade.amount < 0.01 ? 6 : 2
                      })}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', textAlign: 'right' }}>
                      ${trade.price.toLocaleString(undefined, {
                        minimumFractionDigits: trade.price < 0.01 ? 6 : 2,
                        maximumFractionDigits: trade.price < 0.01 ? 6 : 2
                      })}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '500', textAlign: 'right' }}>
                      ${trade.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', textAlign: 'right' }}>
                      {trade.profitLoss !== null ? (
                        <span style={{ 
                          color: trade.profitLoss >= 0 ? '#10b981' : '#ef4444',
                          fontWeight: '500'
                        }}>
                          {trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2)}
                        </span>
                      ) : (
                        <span style={{ color: '#6b7280' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                      {trade.strategy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AnalyticsPage; 