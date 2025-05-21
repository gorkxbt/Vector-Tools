'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaBook, FaCode, FaQuestionCircle, FaHeadset, FaChevronRight, FaChartLine, FaBolt } from 'react-icons/fa'

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState<string>('')
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({})
  
  const sections = useMemo(() => [
    { id: 'getting-started', title: 'Getting Started', icon: <FaBook /> },
    { id: 'features', title: 'Features & Capabilities', icon: <FaCode /> },
    { id: 'api', title: 'API Documentation', icon: <FaCode /> },
    { id: 'faq', title: 'FAQ', icon: <FaQuestionCircle /> }
  ], [])
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      
      // Find the current active section based on scroll position
      for (const section of sections) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])
  
  // Helper function for setting refs properly
  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
    return null;
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Documentation</h2>
              <div className="h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-5"></div>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium shadow-sm'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className={`mr-3 ${activeSection === section.id ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {section.icon}
                        </span>
                        {section.title}
                        {activeSection === section.id && (
                          <motion.span 
                            className="ml-auto text-red-500"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaChevronRight size={12} />
                          </motion.span>
                        )}
                      </a>
                    </li>
                  ))}
                  <li className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <Link href="/docs/api">
                      <div className="flex items-center py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <FaCode className="mr-3 text-gray-500 dark:text-gray-400" />
                        Full API Reference
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/faq">
                      <div className="flex items-center py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <FaQuestionCircle className="mr-3 text-gray-500 dark:text-gray-400" />
                        FAQ
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/support">
                      <div className="flex items-center py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <FaHeadset className="mr-3 text-gray-500 dark:text-gray-400" />
                        Support
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="lg:w-3/4">
            <motion.section
              id="getting-started"
              ref={setSectionRef('getting-started')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3 mr-4">
                  <FaBook className="text-red-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Getting Started</h2>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-red-500 to-red-600 w-16 rounded-full mb-6"></div>
              
              <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-red-600 dark:prose-a:text-red-400">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Vector Tools provides advanced analytics and trading tools for Solana markets.
                  This documentation will help you get started with our platform and make the most
                  of its features.
                </p>
                
                <h3 className="text-xl mt-8 mb-4 text-gray-800 dark:text-gray-100">Quick Setup</h3>
                <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">1</span>
                    <div>
                      <strong>Create an account</strong> - Sign up with your email or connect your wallet
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">2</span>
                    <div>
                      <strong>Connect your Solana wallet</strong> - We support Phantom, Solflare, and other popular wallets
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">3</span>
                    <div>
                      <strong>Configure your dashboard</strong> - Customize widgets and data displays to your preference
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">4</span>
                    <div>
                      <strong>Set up notifications</strong> - Get alerts for new tokens and market opportunities
                    </div>
                  </li>
                </ol>
                
                <h3 className="text-xl mt-8 mb-4 text-gray-800 dark:text-gray-100">Platform Overview</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Vector Tools is designed to help traders identify new token opportunities, track market trends,
                  and execute strategies with precision. Our dashboard provides real-time data and alerts
                  for Solana&apos;s most active markets.
                </p>
                
                <div className="bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 p-5 rounded-lg my-6 border border-red-100 dark:border-red-900/30">
                  <h4 className="font-bold mb-2 flex items-center text-red-600 dark:text-red-400">
                    <span className="text-xl mr-2">🚀</span> Pro Tip
                  </h4>
                  <p className="m-0 text-gray-700 dark:text-gray-300">
                    Spend some time configuring your notification preferences in settings to ensure you 
                    don&apos;t miss important market events while avoiding alert fatigue.
                  </p>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="features"
              ref={setSectionRef('features')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3 mr-4">
                  <FaCode className="text-red-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Features & Capabilities</h2>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-red-500 to-red-600 w-16 rounded-full mb-6"></div>
              
              <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-red-600 dark:prose-a:text-red-400">
                <h3 className="text-xl mt-2 mb-4 text-gray-800 dark:text-gray-100">New Token Discovery</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our platform constantly monitors Solana DEXs for newly created trading pairs,
                  giving you early access to potential opportunities. Features include:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Real-time detection of new token listings
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Automatic risk assessment and verification checks
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Detailed token metrics and contract analysis
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Historical performance tracking
                  </li>
                </ul>
                
                <h3 className="text-xl mt-8 mb-4 text-gray-800 dark:text-gray-100">Market Analytics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Get comprehensive analytics on Solana tokens with custom filters and sorting options:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Price action and volume analysis
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Liquidity depth measurements
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Holder distribution and concentration metrics
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Social sentiment tracking
                  </li>
                </ul>
                
                <h3 className="text-xl mt-8 mb-4 text-gray-800 dark:text-gray-100">Trading Signals</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI-powered system identifies potential trading opportunities based on:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Technical analysis patterns
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    On-chain activity signals
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Unusual volume or price movements
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    Smart money wallet tracking
                  </li>
                </ul>
                
                <div className="bg-gradient-to-r from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 p-5 rounded-lg my-6 border border-yellow-100 dark:border-yellow-900/30">
                  <h4 className="font-bold mb-2 flex items-center text-yellow-600 dark:text-yellow-400">
                    <span className="text-xl mr-2">⚠️</span> Important Note
                  </h4>
                  <p className="m-0 text-gray-700 dark:text-gray-300">
                    All trading signals should be considered educational information only. Always conduct your
                    own research before making investment decisions.
                  </p>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="api"
              ref={setSectionRef('api')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3 mr-4">
                  <FaCode className="text-red-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Documentation</h2>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-red-500 to-red-600 w-16 rounded-full mb-6"></div>
              
              <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-red-600 dark:prose-a:text-red-400">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Vector Tools provides a comprehensive API for developers to access our data
                  and integrate with their own applications.
                </p>
                
                <h3 className="text-xl mt-8 mb-4 text-gray-800 dark:text-gray-100">Authentication</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All API requests require authentication using an API key. You can generate your key
                  in the dashboard settings.
                </p>
                
                <h3 className="text-xl mt-8 mb-4 text-gray-800 dark:text-gray-100">Example Request</h3>
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-sm">
                    {`fetch('https://api.vectortools.io/v1/new-pairs', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})`}
                  </code>
                </pre>
                
                <div className="flex mt-8">
                  <Link href="/docs/api" className="inline-flex items-center px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">
                    View Full API Documentation
                    <FaChevronRight className="ml-2" size={12} />
                  </Link>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="faq"
              ref={setSectionRef('faq')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3 mr-4">
                  <FaQuestionCircle className="text-red-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-red-500 to-red-600 w-16 rounded-full mb-6"></div>
              
              <div className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      How often is token data updated?
                    </h3>
                  </div>
                  <div className="p-5 bg-white dark:bg-gray-800">
                    <p className="text-gray-700 dark:text-gray-300">
                      New token pairs are detected in real-time. Market data for existing tokens is refreshed every minute,
                      while detailed analytics are updated every 5 minutes.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Is there a mobile app available?
                    </h3>
                  </div>
                  <div className="p-5 bg-white dark:bg-gray-800">
                    <p className="text-gray-700 dark:text-gray-300">
                      Our mobile app is currently in beta testing and will be released soon. In the meantime,
                      our web application is fully responsive and works well on mobile devices.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Link href="/docs/faq" className="inline-flex items-center px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors">
                    View All FAQs
                    <FaChevronRight className="ml-2" size={12} />
                  </Link>
                </div>
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DocsPage 