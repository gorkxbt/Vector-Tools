'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import usePumpFun, { SortOption, FilterOptions } from '@/hooks/usePumpFun'
import { NewPairData } from '@/types/market'
import { 
  FaSortAmountDown, 
  FaSortAmountDownAlt, 
  FaExternalLinkAlt,
  FaSpinner, 
  FaCheckCircle, 
  FaTimesCircle,
  FaExclamationTriangle,
  FaSyncAlt,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaHourglassHalf,
  FaInfoCircle,
  FaBolt,
  FaShieldAlt,
  FaCheck,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch
} from 'react-icons/fa'

// Import formatters
import { formatCurrency, formatTimeAgo, formatPercent, formatNumber, formatPrice } from '@/utils/formatters'

// Price change formatter with color
const PriceChange = ({ value }: { value: number }) => {
  const formattedValue = value ? Math.abs(value).toFixed(2) : '0.00';
  const isPositive = value >= 0;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      color: isPositive ? '#10b981' : '#ef4444',
      fontWeight: '500',
      fontSize: '0.875rem',
      width: 'fit-content'
    }}>
      {isPositive ? (
        <FaArrowUp style={{ marginRight: '0.25rem', fontSize: '0.75rem' }} />
      ) : (
        <FaArrowDown style={{ marginRight: '0.25rem', fontSize: '0.75rem' }} />
      )}
      {formattedValue}%
    </div>
  );
}

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

// Add RiskBadge component
// Risk badge component
const RiskBadge = ({ risk }: { risk?: string }) => {
  if (!risk) return null;
  
  let icon, label;
  
  if (risk === 'LOW') {
    icon = <FaCheckCircle style={{ marginRight: '0.25rem', color: '#10b981', fontSize: '0.75rem' }} />;
    label = 'Low';
  } else if (risk === 'MEDIUM') {
    icon = <FaExclamationTriangle style={{ marginRight: '0.25rem', color: '#f59e0b', fontSize: '0.75rem' }} />;
    label = 'Medium';
  } else if (risk === 'HIGH') {
    icon = <FaTimesCircle style={{ marginRight: '0.25rem', color: '#ef4444', fontSize: '0.75rem' }} />;
    label = 'High';
  } else {
    icon = null;
    label = risk;
  }
  
  return (
    <span style={{
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'fit-content',
      backgroundColor: risk === 'LOW' ? 'rgba(16, 185, 129, 0.1)' : 
                     risk === 'MEDIUM' ? 'rgba(245, 158, 11, 0.1)' : 
                     risk === 'HIGH' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(107, 114, 128, 0.1)',
      color: risk === 'LOW' ? '#10b981' : 
             risk === 'MEDIUM' ? '#f59e0b' : 
             risk === 'HIGH' ? '#ef4444' : '#6b7280',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: risk === 'LOW' ? 'rgba(16, 185, 129, 0.2)' : 
                   risk === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' : 
                   risk === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(107, 114, 128, 0.2)',
    }}>
      {icon}
      {label} Risk
    </span>
  );
};

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
    if (sortField !== field) return <FaSort style={{ color: '#9ca3af' }} />;
    return sortDirection === 'asc' ? <FaSortUp style={{ color: '#FF2020' }} /> : <FaSortDown style={{ color: '#FF2020' }} />;
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

  // Handle clicking on a row
  const handleRowClick = (pair: NewPairData) => {
    if (onSelect) {
      onSelect(pair);
    }
  };

  // Display pairs with limit if specified
  const displayPairs = limit ? filteredPairs.slice(0, limit) : filteredPairs;

  return (
    <div style={{ width: '100%' }}>
      {/* Filters section */}
      {showFilters && (
        <div style={{ 
          marginBottom: '1rem', 
          padding: '1rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '0.5rem', 
          border: '1px solid #e5e7eb' 
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            marginBottom: '1rem' 
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search by name, symbol or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    paddingLeft: '2.5rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #d1d5db',
                    outline: 'none'
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#9ca3af' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleSearch}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.25rem',
                  border: '1px solid #d1d5db',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                <FaSearch size={12} />
                Search
              </button>
              
              <button
                onClick={resetFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.25rem',
                  border: '1px solid #d1d5db',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Clear Filters
              </button>
              
              <button
                onClick={refresh}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#FF2020',
                  borderRadius: '0.25rem',
                  border: 'none',
                  fontWeight: '500',
                  color: 'white'
                }}
                title={lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never updated'}
              >
                <FaSyncAlt style={isLoading ? { animation: 'spin 1s linear infinite' } : {}} size={12} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ 
        width: '100%', 
        overflowX: 'auto', 
        backgroundColor: 'white', 
        borderRadius: '0.75rem', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        {isLoading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '2rem', 
            color: '#6b7280' 
          }}>
            <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} />
            Loading pairs...
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#ef4444' 
          }}>
            <FaTimesCircle style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
            <p>{error}</p>
          </div>
        ) : displayPairs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#6b7280' 
          }}>
            <p>No pairs found matching your criteria</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ 
                borderBottom: '1px solid #e5e7eb', 
                backgroundColor: '#f9fafb', 
                fontWeight: 600 
              }}>
                <th
                  style={{ padding: '0.75rem', textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => handleSort('createdAt')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Age {getSortIcon('createdAt')}
                  </div>
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Token</th>
                <th
                  style={{ padding: '0.75rem', textAlign: 'right', cursor: 'pointer' }}
                  onClick={() => handleSort('currentPrice')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                    Price {getSortIcon('currentPrice')}
                  </div>
                </th>
                <th
                  style={{ padding: '0.75rem', textAlign: 'right', cursor: 'pointer' }}
                  onClick={() => handleSort('priceChange')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                    Change {getSortIcon('priceChange')}
                  </div>
                </th>
                <th
                  style={{ padding: '0.75rem', textAlign: 'right', cursor: 'pointer' }}
                  onClick={() => handleSort('poolSize')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                    Pool Size {getSortIcon('poolSize')}
                  </div>
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Risk</th>
              </tr>
            </thead>
            <tbody>
              {displayPairs.map((pair, index) => (
                <tr 
                  key={pair.address}
                  style={{
                    borderBottom: index < displayPairs.length - 1 ? '1px solid #e5e7eb' : 'none',
                    cursor: onSelect ? 'pointer' : 'default',
                    transition: 'background-color 0.1s',
                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb'
                  }}
                  onMouseOver={(e) => {e.currentTarget.style.backgroundColor = '#f3f4f6'}}
                  onMouseOut={(e) => {e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb'}}
                  onClick={() => handleRowClick(pair)}
                >
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaClock style={{ color: '#6b7280', fontSize: '0.875rem' }} />
                      <span>{formatTimeAgo(pair.createdAt)}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          {pair.name.substring(0, 24)}{pair.name.length > 24 ? '...' : ''} 
                          <VerificationBadge verified={pair.verified} />
                        </span>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {pair.symbol}/{pair.pairWithSymbol}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ fontWeight: '600' }}>{formatPrice(pair.currentPrice)}</span>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        Initial: {formatPrice(pair.initialPrice)}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                    <PriceChange value={pair.priceChange} />
                  </td>
                  <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                    {formatCurrency(pair.poolSize)}
                  </td>
                  <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <RiskBadge risk={pair.rugPullRisk} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default NewPairsTable 