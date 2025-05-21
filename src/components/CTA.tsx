'use client'

import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

const CTA = () => {
  return (
    <section id="cta" style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ 
        position: 'absolute', 
        top: '0', 
        right: '0', 
        width: '70%', 
        height: '100%', 
        background: 'radial-gradient(circle at right top, rgba(255, 32, 32, 0.08) 0%, rgba(255, 32, 32, 0) 70%)',
        zIndex: -1 
      }}></div>
      
      <div style={{ 
        position: 'absolute', 
        bottom: '0', 
        left: '0', 
        width: '50%', 
        height: '70%', 
        backgroundColor: 'rgba(255, 32, 32, 0.1)', 
        filter: 'blur(80px)', 
        borderRadius: '50%', 
        opacity: 0.3,
        zIndex: -1 
      }}></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            padding: '3rem 2rem', 
            textAlign: 'center',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 32, 32, 0.2)',
            maxWidth: '48rem',
            margin: '0 auto'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              Ready to <span style={{ color: '#FF2020', textShadow: '0 0 10px rgba(255, 32, 32, 0.3)' }}>Supercharge</span> Your Trading?
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '36rem', margin: '0 auto' }}>
              Join thousands of traders using Vector Tools to navigate the Solana ecosystem with confidence.
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span>Launch App</span>
              <FaArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
            
            <Link href="/docs" className="btn-secondary">
              View Documentation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA 