'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaChartLine, FaRobot, FaWallet, FaExchangeAlt, FaBell } from 'react-icons/fa'

// Dynamic import for NewPairsTable with loading fallback
const NewPairsTable = dynamic(() => import('@/components/dashboard/NewPairsTable'), { 
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800 opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-red-600 animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">Loading trading data...</p>
      <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
    </div>
  )
})

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor the latest market trends and token launches on Solana
        </p>
      </motion.div>
      
      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mr-4">
              <FaChartLine className="text-xl text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Market Cap</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$12.4B</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500 font-medium">↑ 4.7%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">from yesterday</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mr-4">
              <FaExchangeAlt className="text-xl text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Trading Volume 24h</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$879M</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-red-500 font-medium">↓ 2.3%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">from yesterday</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mr-4">
              <FaWallet className="text-xl text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Wallets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">142K</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500 font-medium">↑ 11.2%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">from last week</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mr-4">
              <FaRobot className="text-xl text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Signal Accuracy</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">87.3%</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500 font-medium">↑ 1.5%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">improvement</span>
          </div>
        </div>
      </motion.div>
      
      {/* Notifications */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FaBell className="mr-2 text-red-600 dark:text-red-400" />
              Notifications
            </h2>
            <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md mr-3">
                  <FaChartLine className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">BONK up 15% in the last hour</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unusual volume detected. Consider setting take-profit levels.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">2 minutes ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md mr-3">
                  <FaRobot className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">AI Signal: PYTH potentially bullish</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technical indicators suggest a possible upward momentum.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">35 minutes ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-start">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md mr-3">
                  <FaExchangeAlt className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">New token pair detected: SOL/USDC</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Liquidity pool created with $1.2M initial funding.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* New Pairs Section with Suspense */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Token Pairs</h2>
          <p className="text-gray-600 dark:text-gray-400">Discover the latest token launches and trading opportunities</p>
        </div>
        
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800 opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-red-600 animate-spin"></div>
            </div>
            <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">Loading trading data...</p>
            <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
          </div>
        }>
          <NewPairsTable />
        </Suspense>
      </motion.div>
    </div>
  )
}

export default DashboardPage 