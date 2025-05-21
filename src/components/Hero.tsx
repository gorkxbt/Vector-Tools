'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaRocket } from 'react-icons/fa'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import the new optimized 3D background component with no SSR
const OptimizedBackground = dynamic(() => import('./3D/OptimizedBackground'), { 
  ssr: false 
})

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden">
      {/* 3D Trading Background */}
      <OptimizedBackground />
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Placeholder Logo */}
          <div className="inline-block mb-8">
            <motion.div
              className="flex items-center justify-center h-20 w-20 md:h-28 md:w-28 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg mx-auto"
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1, 1.05, 1] 
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
            >
              <svg className="w-12 h-12 md:w-16 md:h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,13h8V3H3V13z M3,21h8v-6H3V21z M13,21h8V11h-8V21z M13,3v6h8V3H13z" />
              </svg>
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Vector Tools
            </span>
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Advanced analytics and trading solutions for Solana markets with real-time data and AI-powered insights
          </motion.p>
        </motion.div>
        
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/dashboard">
            <motion.button
              className="group relative px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white font-medium rounded-lg shadow-lg flex items-center justify-center w-full md:w-auto overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                <FaRocket className="mr-2" />
                Launch Dashboard
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
          
          <Link href="/docs">
            <motion.button 
              className="px-6 py-3 bg-black/30 backdrop-blur-md text-white border border-white/20 font-medium rounded-lg shadow-lg flex items-center justify-center w-full md:w-auto hover:bg-black/40 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Documentation
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Features highlight */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Data</h3>
            <p className="text-gray-300">Live market data and insights from across Solana's ecosystem</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-300">Powerful metrics and visualizations to inform trading decisions</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Trading Signals</h3>
            <p className="text-gray-300">AI-powered trading signals to help identify opportunities</p>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default Hero 