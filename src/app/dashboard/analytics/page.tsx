'use client'

import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FaChartLine, FaInfoCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

const AnalyticsPage = () => {
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
              <FaChartLine style={{ color: '#FF2020', marginRight: '0.5rem' }} />
              Market Analytics
            </h1>
            <p style={{ color: '#6b7280' }}>
              Track market trends, volume, and metrics across the Solana ecosystem
            </p>
          </div>
        </div>
        
        <div style={{ 
          padding: '2rem', 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          textAlign: 'center',
          border: '1px solid #f3f4f6'
        }}>
          <FaInfoCircle style={{ fontSize: '3rem', color: '#FF2020', marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Analytics Module Coming Soon</h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            We&apos;re currently developing advanced analytics tools to provide detailed market insights and trend analysis.
          </p>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default AnalyticsPage 