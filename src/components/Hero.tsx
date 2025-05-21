'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaRocket, FaChartLine, FaRobot } from 'react-icons/fa'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { AnimatedButton, AnimatedText } from './AnimatedComponents'

// Use dynamic import for the 3D logo component
const VectorLogo = dynamic(
  () => import('@/components/3D/VectorLogo'),
  { ssr: false }
)

const Hero = () => {
  // GSAP animations for advanced effects
  useEffect(() => {
    // Create a timeline for sequence animations
    const tl = gsap.timeline();
    
    // Add floating animations to elements
    gsap.to('.floating-element', {
      y: '-=20',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });
    
    // Add pulse animation to call-to-action
    gsap.to('.cta-pulse', {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(255, 32, 32, 0.6)',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    return () => {
      // Clean up animations
      gsap.killTweensOf('.floating-element');
      gsap.killTweensOf('.cta-pulse');
    };
  }, []);
  
  return (
    <section className="relative py-20 overflow-hidden min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <AnimatedText 
                variant="gradient" 
                className="text-4xl md:text-6xl mb-6 leading-tight"
              >
                AI-Powered Solana Trading
              </AnimatedText>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Harness the power of AI to maximize your Solana trading strategies with real-time market signals and automated portfolio management.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <AnimatedButton 
                variant="primary"
                icon={<FaRocket />}
                className="cta-pulse"
              >
                Launch App
              </AnimatedButton>
              
              <Link href="/docs">
                <AnimatedButton variant="secondary">
                  Explore Docs
                </AnimatedButton>
              </Link>
            </motion.div>
            
            {/* Feature highlights */}
            <motion.div 
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                  <FaChartLine size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2">Real-time Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced charting and market tracking with AI predictions</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 floating-element">
                <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                  <FaRobot size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2">AI Trading</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Automated strategies that adapt to market conditions</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                  <FaRocket size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2">New Pairs Scanner</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Discover trending tokens before they take off</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* 3D Logo and visual elements */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-[400px] h-[400px]">
              {/* 3D Logo component */}
              <VectorLogo size={400} />
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl floating-element" />
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-red-500/10 rounded-full blur-xl floating-element" />
              
              {/* Stats cards floating around the logo */}
              <motion.div 
                className="absolute top-10 left-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-sm w-40 floating-element"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="font-bold">24h Volume</div>
                <div className="text-green-500 font-bold text-xl">$1.2M</div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-sm w-40 floating-element"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="font-bold">New Pairs</div>
                <div className="text-red-500 font-bold text-xl">+327</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-24 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500/5 to-blue-500/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default Hero 