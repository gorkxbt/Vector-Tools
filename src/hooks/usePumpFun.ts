import { useState, useEffect, useCallback } from 'react';

// Define types for the hook
export type SortOption = 'newest' | 'poolSize' | 'priceChange' | 'volume';

export interface FilterOptions {
  maxAge?: number;           // in hours
  minPoolSize?: number;      // in USD
  pairWith?: string;         // symbol
  verified?: boolean;        // verified status
}

// Example token pair data structure
interface PairData {
  address: string;
  symbol: string;
  name: string;
  verified: boolean;
  pairWithSymbol: string;
  poolSize: number;
  currentPrice: number;
  priceChange: number;
  volume24h: number;
  createdAt: string;
  rugPullRisk?: string;     // LOW, MEDIUM, HIGH
}

// Mock data generator
const generateMockPairs = (count: number = 50): PairData[] => {
  const pairSymbols = ['USDC', 'SOL', 'USDT'];
  const riskLevels = ['LOW', 'MEDIUM', 'HIGH'];
  const now = new Date();
  
  return Array.from({ length: count }, (_, i) => {
    // Generate timestamps within the last 7 days
    const createdAt = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const symbol = `TKN${Math.floor(Math.random() * 1000)}`;
    const verified = Math.random() > 0.5;
    const pairWithSymbol = pairSymbols[Math.floor(Math.random() * pairSymbols.length)];
    const poolSize = Math.floor(Math.random() * 1000000) + 1000; // $1K to $1M
    const currentPrice = Math.random() * (Math.random() > 0.8 ? 10 : 0.01); // Most under $0.01, some higher
    const priceChange = (Math.random() - 0.3) * 100; // -30% to +70%
    const volume24h = Math.floor(Math.random() * poolSize * 0.5) + 100; // Volume up to 50% of pool size
    
    // Assign risk level based on verification and pool size
    let rugPullRisk: string | undefined;
    if (!verified) {
      rugPullRisk = poolSize < 10000 ? 'HIGH' : 'MEDIUM';
    } else {
      rugPullRisk = poolSize < 5000 ? 'MEDIUM' : 'LOW';
    }
    
    // 20% chance to not have a risk assessment
    if (Math.random() > 0.8) {
      rugPullRisk = undefined;
    }
    
    return {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      symbol,
      name: `Token ${symbol}`,
      verified,
      pairWithSymbol,
      poolSize,
      currentPrice,
      priceChange,
      volume24h,
      createdAt: createdAt.toISOString(),
      rugPullRisk
    };
  });
};

// Main hook for handling token pair data and filtering
const usePumpFun = (initialFilters: FilterOptions = {}) => {
  const [allPairs, setAllPairs] = useState<PairData[]>([]);
  const [pairs, setPairs] = useState<PairData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filteredCount, setFilteredCount] = useState<number>(0);
  
  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Fetch data (simulated with mock data)
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock data
      const mockData = generateMockPairs(100);
      setAllPairs(mockData);
      setTotalCount(mockData.length);
      
      // Success!
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch token pairs. Please try again later.');
      setLoading(false);
    }
  }, []);
  
  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Apply filters and sorting when data or filters change
  useEffect(() => {
    if (allPairs.length === 0) return;
    
    // Apply filters
    let filtered = [...allPairs];
    
    // Filter by age
    if (filters.maxAge !== undefined) {
      const cutoffTime = new Date();
      cutoffTime.setHours(cutoffTime.getHours() - filters.maxAge);
      
      filtered = filtered.filter(pair => {
        const pairTime = new Date(pair.createdAt);
        return pairTime >= cutoffTime;
      });
    }
    
    // Filter by pool size
    if (filters.minPoolSize !== undefined) {
      filtered = filtered.filter(pair => pair.poolSize >= filters.minPoolSize!);
    }
    
    // Filter by pair symbol
    if (filters.pairWith !== undefined) {
      filtered = filtered.filter(pair => pair.pairWithSymbol === filters.pairWith);
    }
    
    // Filter by verification status
    if (filters.verified !== undefined) {
      filtered = filtered.filter(pair => pair.verified === filters.verified);
    }
    
    // Sort the filtered results
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'poolSize':
          return b.poolSize - a.poolSize;
        case 'priceChange':
          return b.priceChange - a.priceChange;
        case 'volume':
          return b.volume24h - a.volume24h;
        default:
          return 0;
      }
    });
    
    // Update state
    setPairs(filtered);
    setFilteredCount(filtered.length);
    
  }, [allPairs, filters, sortBy]);
  
  // Refresh data function
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);
  
  return {
    pairs,
    loading,
    error,
    sortBy,
    setSortBy,
    updateFilters,
    refresh,
    totalCount,
    filteredCount
  };
};

export default usePumpFun; 