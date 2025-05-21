'use client'

import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import NewPairsTable from '@/components/dashboard/NewPairsTable'
import { motion } from 'framer-motion'
import { FaRocket, FaTwitter, FaDiscord, FaGlobe } from 'react-icons/fa'

const NewPairsPage = () => {
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
            <a 
              href="https://pump.fun/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255, 32, 32, 0.1)',
                color: '#FF2020',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              <FaGlobe style={{ marginRight: '0.375rem' }} />
              PumpFun
            </a>
            
            <a 
              href="https://twitter.com/PumpDotFun" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(29, 161, 242, 0.1)',
                color: '#1DA1F2',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              <FaTwitter style={{ marginRight: '0.375rem' }} />
              Twitter
            </a>
            
            <a 
              href="https://discord.gg/pump-fun" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(88, 101, 242, 0.1)',
                color: '#5865F2',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              <FaDiscord style={{ marginRight: '0.375rem' }} />
              Discord
            </a>
          </div>
        </div>
        
        {/* Trading Info Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem' 
        }}>
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: '1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>New Pairs (24h)</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>142</div>
            <div style={{ fontSize: '0.875rem', color: '#10b981', display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
              +23% vs previous day
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: '1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Trading Volume</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>$14.2M</div>
            <div style={{ fontSize: '0.875rem', color: '#10b981', display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
              +8.2% vs previous day
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: '1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Top Gainer (24h)</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>MOONX</div>
            <div style={{ fontSize: '0.875rem', color: '#10b981', display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
              +428% in 6 hours
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: '1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Highest Liquidity</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>$1.2M</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
              KING/USDC pair
            </div>
          </motion.div>
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