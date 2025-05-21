'use client'

import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import NewPairsTable from '@/components/dashboard/NewPairsTable'
import StatsCard from '@/components/dashboard/StatsCard'
import SocialLink from '@/components/dashboard/SocialLink'
import { motion } from 'framer-motion'
import { FaRocket, FaTwitter, FaDiscord, FaGlobe } from 'react-icons/fa'
import { usePumpFun } from '@/hooks/usePumpFun'
import { formatCurrency, formatPercent } from '@/utils/formatters'

const NewPairsPage = () => {
  const { pairs, filteredPairs, isLoading, refresh } = usePumpFun();
  const [stats, setStats] = useState({
    newPairsCount: 0,
    totalVolume: 0,
    topGainer: { symbol: 'N/A', priceChange: 0 },
    highestLiquidity: { symbol: 'N/A', poolSize: 0, pairWithSymbol: 'USDC' }
  });
  
  // Force refresh data when component loads
  useEffect(() => {
    // Refresh data on initial load
    refresh();
    
    // Set up a refresh interval (every 30 seconds)
    const intervalId = setInterval(() => {
      refresh();
    }, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [refresh]);

  // Calculate dashboard stats from real data
  useEffect(() => {
    if (pairs && pairs.length > 0) {
      // Count pairs created in last 24 hours
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);
      const newPairsCount = pairs.filter(pair => 
        new Date(pair.createdAt) > oneDayAgo
      ).length;
      
      // Calculate total volume
      const totalVolume = pairs.reduce((sum, pair) => sum + (pair.volume24h || 0), 0);
      
      // Find top gainer
      const sortedByGain = [...pairs].sort((a, b) => (b.priceChange || 0) - (a.priceChange || 0));
      const topGainer = sortedByGain.length > 0 ? sortedByGain[0] : { symbol: 'N/A', priceChange: 0 };
      
      // Find highest liquidity
      const sortedByLiquidity = [...pairs].sort((a, b) => (b.poolSize || 0) - (a.poolSize || 0));
      const highestLiquidity = sortedByLiquidity.length > 0 ? sortedByLiquidity[0] : 
        { symbol: 'N/A', poolSize: 0, pairWithSymbol: 'USDC' };
      
      setStats({
        newPairsCount,
        totalVolume,
        topGainer,
        highestLiquidity
      });
    }
  }, [pairs]);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <FaRocket style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              New Token Pairs
            </h1>
            <p style={{ color: '#6b7280' }}>
              Track the latest token pairs on Solana via PumpFun with real-time data and filtering
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <SocialLink 
              href="https://pump.fun/" 
              icon={<FaGlobe />}
              label="PumpFun"
              bgColor="rgba(255, 32, 32, 0.1)"
              textColor="#FF2020"
            />
            
            <SocialLink 
              href="https://twitter.com/PumpDotFun" 
              icon={<FaTwitter />}
              label="Twitter"
              bgColor="rgba(29, 161, 242, 0.1)"
              textColor="#1DA1F2"
            />
            
            <SocialLink 
              href="https://discord.gg/pump-fun" 
              icon={<FaDiscord />}
              label="Discord"
              bgColor="rgba(88, 101, 242, 0.1)"
              textColor="#5865F2"
            />
          </div>
        </div>
        
        {/* Trading Info Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem' 
        }}>
          <StatsCard
            title="New Pairs (24h)"
            value={stats.newPairsCount}
            subtitle={pairs && pairs.length > 0 ? `${pairs.length} total pairs tracked` : 'Loading data...'}
            loading={isLoading}
          />
          
          <StatsCard
            title="Trading Volume"
            value={formatCurrency(stats.totalVolume)}
            subtitle="Based on 24h volume data"
            loading={isLoading}
          />
          
          <StatsCard
            title="Top Gainer (24h)"
            value={stats.topGainer.symbol}
            subtitle={isLoading ? 'Loading...' : `+${stats.topGainer.priceChange?.toFixed(2) || 0}%`}
            loading={isLoading}
          />
          
          <StatsCard
            title="Highest Liquidity"
            value={formatCurrency(stats.highestLiquidity.poolSize)}
            subtitle={isLoading ? 'Loading...' : `${stats.highestLiquidity.symbol}/${stats.highestLiquidity.pairWithSymbol} pair`}
            loading={isLoading}
          />
        </div>
        
        {/* New Pairs Table */}
        <NewPairsTable />
        
        {/* Info Footnote */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          fontSize: '0.875rem', 
          color: '#6b7280',
          border: '1px solid #f3f4f6'
        }}>
          <h3 style={{ fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>About New Pairs</h3>
          <p>
            This data is sourced from PumpFun, a leading Solana token creation & trading platform. New tokens appear here within minutes 
            of being created. Always conduct your own research (DYOR) before trading any token. Many new tokens carry high risk.
          </p>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default NewPairsPage 