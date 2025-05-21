'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const Hero = () => {
  return (
    <section style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
        <motion.div 
          style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.2' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span style={{ color: '#FF2020', textShadow: '0 0 8px rgba(255, 20, 20, 0.5)' }}>AI-Powered</span> Solana Trading
          </motion.h1>
          
          <motion.p 
            style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: '#4b5563', maxWidth: '48rem', margin: '0 auto', lineHeight: '1.7' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Harness the power of AI to maximize your Solana trading strategies with real-time market signals and automated portfolio management.
          </motion.p>
          
          <motion.div 
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/docs" style={{ 
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 20, 20, 0.5)',
              backgroundColor: 'transparent',
              color: '#FF2020',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}>
              Read Docs
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        style={{ 
          position: 'absolute',
          top: '25%',
          left: '-6rem',
          width: '16rem',
          height: '16rem',
          backgroundColor: '#FF2020',
          borderRadius: '50%',
          opacity: 0.05,
          filter: 'blur(3rem)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        style={{ 
          position: 'absolute',
          bottom: '25%',
          right: '-6rem',
          width: '20rem',
          height: '20rem',
          backgroundColor: '#FF2020',
          borderRadius: '50%',
          opacity: 0.05,
          filter: 'blur(3rem)'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1 
        }}
      />
    </section>
  )
}

export default Hero 