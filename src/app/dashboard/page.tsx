'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import PortfolioOverview from '@/components/dashboard/PortfolioOverview'
import AlphaScore from '@/components/dashboard/AlphaScore'
import SignalFeed from '@/components/dashboard/SignalFeed'

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(true)
  
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    
    // Set initial value
    handleResize()
    
    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }
    
    // Clean up
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  
  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Dashboard</h1>
        <p style={{ color: '#4b5563', marginTop: '0.5rem' }}>
          Monitor your portfolio, trade signals, and market analytics.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <PortfolioOverview />
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
          gap: '2rem'
        }}>
          <AlphaScore />
          <SignalFeed />
        </div>
      </div>
    </DashboardLayout>
  )
} 