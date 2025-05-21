'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getNewPumpFunPairs } from '@/services/api';
import { NewPairData } from '@/types/market';

// Sorting options
export type SortOption = 'newest' | 'poolSize' | 'priceChange' | 'volume';
export type SortOrder = 'asc' | 'desc';

// Filtering options
export interface FilterOptions {
  minPoolSize?: number;
  maxAge?: number; // in hours
  pairWith?: string; // e.g., 'USDC', 'SOL'
  verified?: boolean;
  search?: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | null;
}

/**
 * Custom hook to fetch and manage PumpFun token pair data
 */
export default function usePumpFun(initialFilters: FilterOptions = {}) {
  const [pairs, setPairs] = useState<NewPairData[]>([]);
  const [filteredPairs, setFilteredPairs] = useState<NewPairData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOptions>(initialFilters);
  const [sortConfig, setSortConfig] = useState<{field: SortOption, order: SortOrder}>({
    field: 'newest',
    order: 'desc'
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Apply current filter and sort settings to the pairs data
   */
  const applyFiltersAndSort = useCallback(() => {
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
    
    if (filter.pairWith) {
      result = result.filter(pair => 
        pair.pairWithSymbol.toLowerCase() === filter.pairWith?.toLowerCase()
      );
    }
    
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      result = result.filter(
        pair => 
          pair.name.toLowerCase().includes(searchTerm) || 
          pair.symbol.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filter.riskLevel) {
      result = result.filter(pair => pair.rugPullRisk === filter.riskLevel);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let compareA, compareB;
      
      switch (sortConfig.field) {
        case 'newest':
          compareA = new Date(a.createdAt).getTime();
          compareB = new Date(b.createdAt).getTime();
          break;
        case 'poolSize':
          compareA = a.poolSize;
          compareB = b.poolSize;
          break;
        case 'priceChange':
          compareA = a.priceChange;
          compareB = b.priceChange;
          break;
        case 'volume':
          compareA = a.volume24h;
          compareB = b.volume24h;
          break;
        default:
          compareA = new Date(a.createdAt).getTime();
          compareB = new Date(b.createdAt).getTime();
      }
      
      if (sortConfig.order === 'asc') {
        return compareA - compareB;
      } else {
        return compareB - compareA;
      }
    });
    
    setFilteredPairs(result);
  }, [pairs, filter, sortConfig]);

  /**
   * Fetch pairs data from API
   */
  const fetchPairsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getNewPumpFunPairs();
      setPairs(data);
    } catch (err) {
      console.error('Error fetching PumpFun pairs:', err);
      setError('Failed to load new pairs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data fetching
  useEffect(() => {
    fetchPairsData();
    
    // Set up auto-refresh interval (every 2 minutes)
    intervalRef.current = setInterval(() => {
      fetchPairsData();
    }, 2 * 60 * 1000);
    
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchPairsData]);
  
  // Apply filters and sorting when pairs or filter/sort settings change
  useEffect(() => {
    applyFiltersAndSort();
  }, [pairs, filter, sortConfig, applyFiltersAndSort]);
  
  // Update filter state
  const updateFilters = (newFilterOptions: Partial<FilterOptions>) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      ...newFilterOptions
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilter({});
  };
  
  // Set sort field and order
  const setSortBy = (sortOption: SortOption) => {
    setSortConfig(prev => {
      // If clicking the same field, toggle order
      if (prev.field === sortOption) {
        return {
          ...prev,
          order: prev.order === 'asc' ? 'desc' : 'asc'
        };
      }
      
      // Otherwise, set new field with default desc order
      return {
        field: sortOption,
        order: 'desc'
      };
    });
  };
  
  // Manual refresh
  const refresh = () => {
    fetchPairsData();
  };
  
  return {
    // Data
    pairs: filteredPairs,
    allPairs: pairs,
    loading: isLoading,
    error,
    
    // Filter and sort state
    filter,
    sortBy: sortConfig.field,
    sortOrder: sortConfig.order,
    
    // Actions
    updateFilters,
    clearFilters,
    setSortBy,
    refresh,
    
    // Stats
    totalCount: pairs.length,
    filteredCount: filteredPairs.length
  };
} 