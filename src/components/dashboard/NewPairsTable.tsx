'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePumpFun } from '@/hooks/usePumpFun'
import { NewPairData } from '@/types/market'
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
  FaArrowDown,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaCheck,
  FaSearch
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

// Filter options
type SortField = 'createdAt' | 'currentPrice' | 'priceChange' | 'poolSize' | 'volume24h' | 'txCount' | 'holders';
type SortOrder = 'asc' | 'desc';

interface NewPairsTableProps {
  limit?: number;
  showFilters?: boolean;
  onSelect?: (pair: NewPairData) => void;
}

const NewPairsTable = ({ limit, showFilters = true, onSelect }: NewPairsTableProps) => {
  // Use the PumpFun hook to get real data
  const { 
    filteredPairs, 
    isLoading, 
    error, 
    setFilter, 
    clearFilters, 
    setSort,
    refresh,
    lastUpdated
  } = usePumpFun();
  
  // Local state for UI
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState<boolean | undefined>(undefined);
  const [minPoolSize, setMinPoolSize] = useState<number | undefined>(undefined);
  const [riskLevel, setRiskLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH' | null>(null);

  // Apply sorting when it changes
  useEffect(() => {
    setSort(sortField, sortDirection);
  }, [sortField, sortDirection, setSort]);

  // Handle sort header click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending for most fields except creation date
      setSortField(field);
      setSortDirection(field === 'createdAt' ? 'desc' : 'desc');
    }
  };

  // Get sort icon based on current sort state
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-red-500" /> : <FaSortDown className="text-red-500" />;
  };

  // Apply search filter
  const handleSearch = () => {
    setFilter({ search: searchTerm });
  };

  // Apply all filters
  const applyFilters = () => {
    setFilter({
      verified: filterVerified,
      minPoolSize,
      riskLevel
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterVerified(undefined);
    setMinPoolSize(undefined);
    setRiskLevel(null);
    clearFilters();
  };

  // Format date relative to now
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return `${Math.floor(diffMins / 1440)}d ago`;
    }
  };

  // Format number with appropriate suffix
  const formatNumber = (num: number, decimals = 2) => {
    if (num === null || num === undefined) return 'N/A';
    
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(decimals)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(decimals)}K`;
    } else {
      return `$${num.toFixed(decimals)}`;
    }
  };

  // Format percent change
  const formatPercent = (value: number) => {
    if (value === null || value === undefined) return 'N/A';
    
    const isPositive = value >= 0;
    return (
      <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
        {isPositive ? '+' : ''}{value.toFixed(2)}%
      </span>
    );
  };

  // Handle clicking on a row
  const handleRowClick = (pair: NewPairData) => {
    if (onSelect) {
      onSelect(pair);
    }
  };

  // Risk badge component
  const RiskBadge = ({ risk }: { risk?: string }) => {
    if (!risk) return null;
    
    let color = 'bg-gray-200 text-gray-800';
    
    if (risk === 'LOW') {
      color = 'bg-green-100 text-green-800';
    } else if (risk === 'MEDIUM') {
      color = 'bg-yellow-100 text-yellow-800';
    } else if (risk === 'HIGH') {
      color = 'bg-red-100 text-red-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
        {risk}
      </span>
    );
  };

  // Display pairs with limit if specified
  const displayPairs = limit ? filteredPairs.slice(0, limit) : filteredPairs;

  return (
    <div className="w-full">
      {/* Filters section */}
      {showFilters && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, symbol or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pl-10 rounded border border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Search
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Reset
              </button>
              <button
                onClick={refresh}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
              >
                <FaSyncAlt className="mr-1" /> Refresh
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification</label>
              <select
                value={filterVerified === undefined ? '' : filterVerified ? 'verified' : 'unverified'}
                onChange={(e) => {
                  if (e.target.value === 'verified') setFilterVerified(true);
                  else if (e.target.value === 'unverified') setFilterVerified(false);
                  else setFilterVerified(undefined);
                }}
                className="w-full p-2 rounded border border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200"
              >
                <option value="">All tokens</option>
                <option value="verified">Verified only</option>
                <option value="unverified">Unverified only</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Min. Pool Size</label>
              <select
                value={minPoolSize || ''}
                onChange={(e) => setMinPoolSize(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-2 rounded border border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200"
              >
                <option value="">Any size</option>
                <option value="1000">$1,000+</option>
                <option value="10000">$10,000+</option>
                <option value="50000">$50,000+</option>
                <option value="100000">$100,000+</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
              <select
                value={riskLevel || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setRiskLevel(val ? val as 'LOW' | 'MEDIUM' | 'HIGH' : null);
                }}
                className="w-full p-2 rounded border border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200"
              >
                <option value="">Any risk</option>
                <option value="LOW">Low risk</option>
                <option value="MEDIUM">Medium risk</option>
                <option value="HIGH">High risk</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center"
            >
              <FaFilter className="mr-2" /> Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Last updated info */}
      {lastUpdated && (
        <div className="text-right text-sm text-gray-500 mb-2">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center p-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-2"></div>
          <p className="text-gray-600">Loading token pairs...</p>
        </div>
      )}
      
      {/* Results table */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    Created {getSortIcon('createdAt')}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Token
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('currentPrice')}
                >
                  <div className="flex items-center">
                    Price {getSortIcon('currentPrice')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('priceChange')}
                >
                  <div className="flex items-center">
                    Change {getSortIcon('priceChange')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('poolSize')}
                >
                  <div className="flex items-center">
                    Liquidity {getSortIcon('poolSize')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('volume24h')}
                >
                  <div className="flex items-center">
                    Volume 24h {getSortIcon('volume24h')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('holders')}
                >
                  <div className="flex items-center">
                    Holders {getSortIcon('holders')}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayPairs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No token pairs found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                displayPairs.map((pair) => (
                  <tr 
                    key={pair.address} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(pair)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(pair.createdAt)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2 flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          {pair.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {pair.symbol}
                            {pair.verified && (
                              <FaCheck className="inline-block ml-1 text-green-500" size={12} />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{pair.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatNumber(pair.currentPrice, 8)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm">{formatPercent(pair.priceChange)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatNumber(pair.poolSize)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatNumber(pair.volume24h)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pair.holders.toLocaleString()}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <RiskBadge risk={pair.rugPullRisk} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewPairsTable; 