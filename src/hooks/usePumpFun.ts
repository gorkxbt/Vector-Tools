'use client';

import { useState, useEffect, useCallback } from 'react';
import { getNewPumpFunPairs } from '@/services/api';
import { NewPairData } from '@/types/market';

// Sorting options
export type SortOption = 'newest' | 'poolSize' | 'priceChange' | 'volume';

// Filtering options
export interface FilterOptions {
  minPoolSize?: number;
  maxAge?: number; // in hours
  pairWith?: string; // e.g., 'USDC', 'SOL'
  verified?: boolean;
}

/**
 * Custom hook for PumpFun new pairs data
 */
export default function usePumpFun(initialFilters: FilterOptions = {}) {
  const [pairs, setPairs] = useState<NewPairData[]>([]);
  const [filteredPairs, setFilteredPairs] = useState<NewPairData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [refreshInterval, setRefreshInterval] = useState<number>(60000); // 1 minute default

  // Fetch new pairs data
  const fetchPairs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newPairs = await getNewPumpFunPairs();
      setPairs(newPairs);
      // Initial filtering and sorting will be handled by the useEffect below
    } catch (err) {
      console.error('Error fetching PumpFun pairs:', err);
      setError('Failed to load new token pairs');
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filtering and sorting whenever pairs, filters, or sortBy changes
  useEffect(() => {
    if (!pairs.length) return;
    
    let result = [...pairs];
    
    // Apply filters
    if (filters.minPoolSize) {
      result = result.filter(pair => pair.poolSize >= (filters.minPoolSize || 0));
    }
    
    if (filters.pairWith) {
      result = result.filter(pair => pair.pairWithSymbol.toLowerCase() === filters.pairWith?.toLowerCase());
    }
    
    if (filters.maxAge) {
      const cutoffTime = new Date();
      cutoffTime.setHours(cutoffTime.getHours() - (filters.maxAge || 24));
      result = result.filter(pair => new Date(pair.createdAt) >= cutoffTime);
    }
    
    if (filters.verified !== undefined) {
      result = result.filter(pair => pair.verified === filters.verified);
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
  }, [pairs, filters, sortBy]);

  // Set up automatic refresh
  useEffect(() => {
    fetchPairs();
    
    if (refreshInterval > 0) {
      const interval = setInterval(fetchPairs, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchPairs, refreshInterval]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    pairs: filteredPairs,
    totalCount: pairs.length,
    filteredCount: filteredPairs.length,
    loading,
    error,
    sortBy,
    filters,
    refreshInterval,
    setSortBy,
    updateFilters,
    setRefreshInterval,
    refresh: fetchPairs
  };
} 