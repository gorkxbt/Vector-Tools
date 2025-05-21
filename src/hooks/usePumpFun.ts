'use client';

import { useState, useEffect } from 'react';
import { getNewPumpFunPairs } from '@/services/api';
import { NewPairData } from '@/types/market';

type SortField = 'createdAt' | 'currentPrice' | 'priceChange' | 'poolSize' | 'volume24h' | 'txCount' | 'holders';
type SortOrder = 'asc' | 'desc';
type FilterOptions = {
  verified?: boolean;
  minPoolSize?: number;
  maxAge?: number; // in hours
  search?: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | null;
};

interface PumpFunData {
  pairs: NewPairData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  filteredPairs: NewPairData[];
  setFilter: (options: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  setSort: (field: SortField, order: SortOrder) => void;
  refresh: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage PumpFun token pair data
 */
export function usePumpFun(): PumpFunData {
  const [pairs, setPairs] = useState<NewPairData[]>([]);
  const [filteredPairs, setFilteredPairs] = useState<NewPairData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filter, setFilterState] = useState<FilterOptions>({});
  const [sortConfig, setSortConfig] = useState<{field: SortField, order: SortOrder}>({
    field: 'createdAt',
    order: 'desc'
  });

  // Fetch data on mount and set up refresh interval
  useEffect(() => {
    fetchPairsData();
    
    // Set up interval to refresh data every 30 seconds
    const intervalId = setInterval(fetchPairsData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Apply filters and sorting when pairs or filter/sort settings change
  useEffect(() => {
    applyFiltersAndSort();
  }, [pairs, filter, sortConfig]);

  /**
   * Fetch new token pair data from the API
   */
  const fetchPairsData = async () => {
    try {
      setIsLoading(true);
      const newPairs = await getNewPumpFunPairs();
      setPairs(newPairs);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch token pairs');
      console.error('Error fetching PumpFun pairs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Apply current filter and sort settings to the pairs data
   */
  const applyFiltersAndSort = () => {
    let result = [...pairs];
    
    // Apply filters
    if (filter.verified !== undefined) {
      result = result.filter(pair => pair.verified === filter.verified);
    }
    
    if (filter.minPoolSize) {
      result = result.filter(pair => pair.poolSize >= (filter.minPoolSize || 0));
    }
    
    if (filter.maxAge) {
      const cutoffTime = new Date();
      cutoffTime.setHours(cutoffTime.getHours() - (filter.maxAge || 24));
      result = result.filter(pair => new Date(pair.createdAt) >= cutoffTime);
    }
    
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      result = result.filter(pair => 
        pair.name.toLowerCase().includes(searchTerm) ||
        pair.symbol.toLowerCase().includes(searchTerm) ||
        pair.address.toLowerCase() === searchTerm
      );
    }
    
    if (filter.riskLevel) {
      result = result.filter(pair => pair.rugPullRisk === filter.riskLevel);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const fieldA = a[sortConfig.field];
      const fieldB = b[sortConfig.field];
      
      // Handle special case for dates
      if (sortConfig.field === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortConfig.order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (fieldA < fieldB) return sortConfig.order === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredPairs(result);
  };

  /**
   * Update filter options
   */
  const setFilter = (options: Partial<FilterOptions>) => {
    setFilterState(prev => ({
      ...prev,
      ...options
    }));
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setFilterState({});
  };

  /**
   * Set sorting configuration
   */
  const setSort = (field: SortField, order: SortOrder) => {
    setSortConfig({ field, order });
  };

  /**
   * Manually refresh data
   */
  const refresh = async () => {
    await fetchPairsData();
  };

  return {
    pairs,
    isLoading,
    error,
    lastUpdated,
    filteredPairs,
    setFilter,
    clearFilters,
    setSort,
    refresh
  };
} 