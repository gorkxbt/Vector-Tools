'use client'

import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountDownAlt, 
  FaSpinner, 
  FaCheckCircle, 
  FaTimesCircle,
  FaExclamationTriangle,
  FaSyncAlt,
  FaClock,
  FaHourglassHalf,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'

// Sorting options
export type SortOption = 'newest' | 'poolSize' | 'priceChange' | 'volume';

// Filtering options
export interface FilterOptions {
  minPoolSize?: number;
  maxAge?: number; // in hours
  pairWith?: string; // e.g., 'USDC', 'SOL'
  verified?: boolean;
}

interface NewPairData {
  address: string;
  name: string;
  symbol: string;
  poolAddress: string;
  poolSize: number;
  createdAt: string;
  pairWithSymbol: string;
  pairWithAddress: string;
  initialPrice: number;
  currentPrice: number;
  priceChange: number;
  volume24h: number;
  txCount: number;
  holders: number;
  verified: boolean;
  rugPullRisk?: string;
}

// Time ago formatter
const formatTimeAgo = (timestamp: string): string => {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return `${seconds} seconds ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  return `${Math.floor(seconds / 86400)} days ago`
}

// Price change formatter with color
const PriceChange = ({ value }: { value: number }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    color: value >= 0 ? '#10b981' : '#ef4444',
    fontWeight: '500'
  }}>
    {value >= 0 ? (
      <FaArrowUp style={{ marginRight: '0.25rem', fontSize: '0.75rem' }} />
    ) : (
      <FaArrowDown style={{ marginRight: '0.25rem', fontSize: '0.75rem' }} />
    )}
    {Math.abs(value).toFixed(2)}%
  </div>
)

// Verification badge
const VerificationBadge = ({ verified }: { verified: boolean }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    color: verified ? '#10b981' : '#ef4444'
  }}>
    {verified ? (
      <FaCheckCircle title="Verified" />
    ) : (
      <FaTimesCircle title="Unverified" />
    )}
  </div>
)

// Mock data for demonstration
const mockPairs: NewPairData[] = [
  {
    address: 'XYZ123456789',
    name: 'Moon Rocket',
    symbol: 'MOON',
    poolAddress: 'POOL123456789',
    poolSize: 25000,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    pairWithSymbol: 'USDC',
    pairWithAddress: 'USDC123456789',
    initialPrice: 0.000001,
    currentPrice: 0.000005,
    priceChange: 400,
    volume24h: 15000,
    txCount: 120,
    holders: 75,
    verified: true
  },
  {
    address: 'ABC123456789',
    name: 'Solana Doge',
    symbol: 'SOLDOGE',
    poolAddress: 'POOL987654321',
    poolSize: 15000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    pairWithSymbol: 'SOL',
    pairWithAddress: 'SOL123456789',
    initialPrice: 0.00002,
    currentPrice: 0.000015,
    priceChange: -25,
    volume24h: 9000,
    txCount: 85,
    holders: 50,
    verified: false
  },
  {
    address: 'DEF123456789',
    name: 'Pump King',
    symbol: 'KING',
    poolAddress: 'POOL567891234',
    poolSize: 120000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    pairWithSymbol: 'USDC',
    pairWithAddress: 'USDC123456789',
    initialPrice: 0.01,
    currentPrice: 0.02,
    priceChange: 100,
    volume24h: 50000,
    txCount: 320,
    holders: 180,
    verified: true
  },
  {
    address: 'GHI123456789',
    name: 'Meme Coin',
    symbol: 'MEME',
    poolAddress: 'POOL345678912',
    poolSize: 8000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    pairWithSymbol: 'USDT',
    pairWithAddress: 'USDT123456789',
    initialPrice: 0.0005,
    currentPrice: 0.0002,
    priceChange: -60,
    volume24h: 5000,
    txCount: 62,
    holders: 35,
    verified: false,
    rugPullRisk: 'High'
  },
  {
    address: 'JKL123456789',
    name: 'Moon X',
    symbol: 'MOONX',
    poolAddress: 'POOL234567891',
    poolSize: 45000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    pairWithSymbol: 'USDC',
    pairWithAddress: 'USDC123456789',
    initialPrice: 0.0001,
    currentPrice: 0.0006,
    priceChange: 500,
    volume24h: 28000,
    txCount: 210,
    holders: 95,
    verified: true
  }
];

/**
 * New Pairs Table Component
 * Displays new token pairs from PumpFun with filtering and sorting
 */
const NewPairsTable = () => {
  const [pairs, setPairs] = useState<NewPairData[]>(mockPairs);
  const [filteredPairs, setFilteredPairs] = useState<NewPairData[]>(mockPairs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters, setFilters] = useState<FilterOptions>({
    maxAge: 24
  });
  
  // Handle filter change
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  }
  
  // Apply filters and sorting
  const applyFilters = (newFilters: FilterOptions) => {
    let result = [...pairs];
    
    // Apply filters
    if (newFilters.minPoolSize) {
      result = result.filter(pair => pair.poolSize >= (newFilters.minPoolSize || 0));
    }
    
    if (newFilters.pairWith) {
      result = result.filter(pair => pair.pairWithSymbol.toLowerCase() === newFilters.pairWith?.toLowerCase());
    }
    
    if (newFilters.maxAge) {
      const cutoffTime = new Date();
      cutoffTime.setHours(cutoffTime.getHours() - (newFilters.maxAge || 24));
      result = result.filter(pair => new Date(pair.createdAt) >= cutoffTime);
    }
    
    if (newFilters.verified !== undefined) {
      result = result.filter(pair => pair.verified === newFilters.verified);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'poolSize':
        result.sort((a, b) => b.poolSize - a.poolSize);
        break;
      case 'priceChange':
        result.sort((a, b) => b.priceChange - a.priceChange);
        break;
      case 'volume':
        result.sort((a, b) => b.volume24h - a.volume24h);
        break;
    }
    
    setFilteredPairs(result);
  }
  
  // Refresh data
  const refresh = () => {
    setLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would be an API call
      setPairs(mockPairs);
      applyFilters(filters);
      setLoading(false);
    }, 1000);
  }
  
  // Predefined filters
  const timeFilters = [
    { label: '1H', value: 1 },
    { label: '6H', value: 6 },
    { label: '24H', value: 24 },
    { label: '7D', value: 168 },
    { label: 'All', value: undefined }
  ]
  
  const poolSizeFilters = [
    { label: 'All', value: undefined },
    { label: '> $100', value: 100 },
    { label: '> $1K', value: 1000 },
    { label: '> $10K', value: 10000 },
    { label: '> $100K', value: 100000 }
  ]
  
  const pairWithFilters = [
    { label: 'All', value: undefined },
    { label: 'USDC', value: 'USDC' },
    { label: 'SOL', value: 'SOL' },
    { label: 'USDT', value: 'USDT' }
  ]
  
  if (loading && pairs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FaSpinner style={{ fontSize: '2rem', color: '#FF2020', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem' }}>Loading new pairs...</p>
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }
  
  if (error) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0.75rem',
        border: '1px solid #f3f4f6'
      }}>
        <FaExclamationTriangle style={{ fontSize: '2rem', color: '#FF2020', marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Error Loading New Pairs</h3>
        <p>{error}</p>
        <button 
          onClick={() => refresh()}
          style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: '#FF2020', 
            color: 'white', 
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Filter Panel */}
      <div style={{ 
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0.75rem',
        marginBottom: '1.5rem',
        border: '1px solid #f3f4f6'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaFilter style={{ color: '#FF2020', marginRight: '0.5rem' }} />
            <h3 style={{ fontWeight: 'bold' }}>Filter New Pairs</h3>
          </div>
          
          <button
            onClick={() => refresh()}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 32, 32, 0.1)',
              color: '#FF2020',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {loading ? (
              <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} />
            ) : (
              <FaSyncAlt style={{ marginRight: '0.5rem' }} />
            )}
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Age filter */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Time</div>
            <div style={{ 
              display: 'inline-flex',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.5rem',
              padding: '0.25rem'
            }}>
              {timeFilters.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleFilterChange('maxAge', option.value)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: filters.maxAge === option.value ? '#FF2020' : 'transparent',
                    color: filters.maxAge === option.value ? 'white' : '#6b7280',
                    cursor: 'pointer'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Pool size filter */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Pool Size</div>
            <div style={{ 
              display: 'inline-flex',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.5rem',
              padding: '0.25rem'
            }}>
              {poolSizeFilters.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleFilterChange('minPoolSize', option.value)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: filters.minPoolSize === option.value ? '#FF2020' : 'transparent',
                    color: filters.minPoolSize === option.value ? 'white' : '#6b7280',
                    cursor: 'pointer'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Paired with filter */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Paired With</div>
            <div style={{ 
              display: 'inline-flex',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.5rem',
              padding: '0.25rem'
            }}>
              {pairWithFilters.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleFilterChange('pairWith', option.value)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: filters.pairWith === option.value ? '#FF2020' : 'transparent',
                    color: filters.pairWith === option.value ? 'white' : '#6b7280',
                    cursor: 'pointer'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Verified filter */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Verification</div>
            <div style={{ 
              display: 'inline-flex',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.5rem',
              padding: '0.25rem'
            }}>
              <button
                onClick={() => handleFilterChange('verified', undefined)}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  borderRadius: '0.375rem',
                  border: 'none',
                  backgroundColor: filters.verified === undefined ? '#FF2020' : 'transparent',
                  color: filters.verified === undefined ? 'white' : '#6b7280',
                  cursor: 'pointer'
                }}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange('verified', true)}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  borderRadius: '0.375rem',
                  border: 'none',
                  backgroundColor: filters.verified === true ? '#FF2020' : 'transparent',
                  color: filters.verified === true ? 'white' : '#6b7280',
                  cursor: 'pointer'
                }}
              >
                Verified
              </button>
              <button
                onClick={() => handleFilterChange('verified', false)}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  borderRadius: '0.375rem',
                  border: 'none',
                  backgroundColor: filters.verified === false ? '#FF2020' : 'transparent',
                  color: filters.verified === false ? 'white' : '#6b7280',
                  cursor: 'pointer'
                }}
              >
                Unverified
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          <div>
            Showing {filteredPairs.length} of {pairs.length} pairs
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                applyFilters(filters);
              }}
              style={{ 
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #e5e7eb',
                backgroundColor: 'white',
                fontSize: '0.875rem'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="poolSize">Pool Size</option>
              <option value="priceChange">Price Change</option>
              <option value="volume">Trading Volume</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Pairs Table */}
      {filteredPairs.length === 0 ? (
        <div style={{ 
          padding: '3rem 1rem', 
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          border: '1px solid #f3f4f6'
        }}>
          <FaClock style={{ fontSize: '2rem', color: '#FF2020', marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>No Pairs Found</h3>
          <p style={{ color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>
            No token pairs match your current filter criteria. Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0', 
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid #f3f4f6'
          }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Token</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Paired With</th>
                <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Pool Size</th>
                <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Current Price</th>
                <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Change</th>
                <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Volume 24h</th>
                <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Verified</th>
                <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '600', color: '#374151' }}>Age</th>
              </tr>
            </thead>
            <tbody>
              {filteredPairs.map((pair, index) => (
                <motion.tr 
                  key={pair.address}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  style={{
                    transition: 'background-color 0.2s',
                    backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(249, 250, 251, 0.5)'
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 32, 32, 0.05)' }}
                >
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        borderRadius: '9999px', 
                        backgroundColor: '#FF2020', 
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        marginRight: '0.75rem',
                        fontSize: '0.875rem'
                      }}>
                        {pair.symbol.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500' }}>{pair.symbol}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{pair.name.length > 20 ? pair.name.slice(0, 20) + '...' : pair.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '1.5rem', 
                        height: '1.5rem', 
                        borderRadius: '9999px', 
                        backgroundColor: '#6b7280', 
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        marginRight: '0.5rem',
                        fontSize: '0.75rem'
                      }}>
                        {pair.pairWithSymbol.charAt(0)}
                      </div>
                      <span>{pair.pairWithSymbol}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '500' }}>
                    ${pair.poolSize.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '500' }}>
                    ${pair.currentPrice < 0.01 
                      ? pair.currentPrice.toExponential(2) 
                      : pair.currentPrice.toLocaleString(undefined, { maximumFractionDigits: pair.currentPrice < 0.1 ? 4 : 2 })}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6' }}>
                    <PriceChange value={pair.priceChange} />
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontWeight: '500' }}>
                    ${pair.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #f3f4f6' }}>
                    <VerificationBadge verified={pair.verified} />
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6', fontSize: '0.875rem', color: '#6b7280' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <FaHourglassHalf style={{ marginRight: '0.375rem', fontSize: '0.75rem' }} />
                      {formatTimeAgo(pair.createdAt)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

export default NewPairsTable 