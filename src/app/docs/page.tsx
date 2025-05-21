'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaBook, FaCode, FaQuestionCircle, FaHeadset, FaRocket, FaLightbulb, FaServer, FaAngleRight } from 'react-icons/fa'

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState<string>('')
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({})
  
  const sections = useMemo(() => [
    { id: 'getting-started', title: 'Getting Started', icon: <FaRocket /> },
    { id: 'features', title: 'Features & Capabilities', icon: <FaLightbulb /> },
    { id: 'api', title: 'API Documentation', icon: <FaServer /> },
    { id: 'faq', title: 'FAQ', icon: <FaQuestionCircle /> }
  ], [])
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      
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
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])
  
  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
            Vector Tools Documentation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know to leverage our advanced Solana trading toolkit
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <h2 className="text-xl font-bold text-white">Documentation</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`flex items-center py-3 px-4 rounded-xl transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="mr-3 text-lg">{section.icon}</span>
                        {section.title}
                        {activeSection === section.id && (
                          <FaAngleRight className="ml-auto" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-4">
                    Additional Resources
                  </h3>
                  <ul className="space-y-1">
                    <li>
                      <Link href="/docs/api">
                        <div className="flex items-center py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                          <FaCode className="mr-3 text-gray-500" />
                          Full API Reference
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/support">
                        <div className="flex items-center py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                          <FaHeadset className="mr-3 text-gray-500" />
                          Support
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="lg:w-3/4">
            <motion.section
              id="getting-started"
              ref={setSectionRef('getting-started')}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-10 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    <FaRocket className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Getting Started</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">
                    Vector Tools provides advanced analytics and trading tools for Solana markets.
                    This documentation will help you get started with our platform and make the most
                    of its features.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Quick Setup</h3>
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-6 mb-8">
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">1</div>
                        <div>
                          <strong className="text-red-600 dark:text-red-400">Create an account</strong>
                          <p className="text-gray-600 dark:text-gray-300">Sign up with your email or connect with your wallet</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">2</div>
                        <div>
                          <strong className="text-red-600 dark:text-red-400">Connect your Solana wallet</strong>
                          <p className="text-gray-600 dark:text-gray-300">We support Phantom, Solflare, and other popular wallets</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">3</div>
                        <div>
                          <strong className="text-red-600 dark:text-red-400">Configure your dashboard</strong>
                          <p className="text-gray-600 dark:text-gray-300">Customize widgets and data displays to your preference</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">4</div>
                        <div>
                          <strong className="text-red-600 dark:text-red-400">Set up notifications</strong>
                          <p className="text-gray-600 dark:text-gray-300">Get alerts for new tokens and market opportunities</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Platform Overview</h3>
                  <p className="text-lg leading-relaxed">
                    Vector Tools is designed to help traders identify new token opportunities, track market trends,
                    and execute strategies with precision. Our dashboard provides real-time data and alerts
                    for Solana&apos;s most active markets.
                  </p>
                  
                  <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 mt-6 rounded-r-xl">
                    <div className="flex">
                      <span className="text-red-500 text-2xl mr-4">🚀</span>
                      <div>
                        <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Pro Tip</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Spend some time configuring your notification preferences in settings to ensure you 
                          don&apos;t miss important market events while avoiding alert fatigue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="features"
              ref={setSectionRef('features')}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-10 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    <FaLightbulb className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Features & Capabilities</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400 flex items-center">
                        <FaRocket className="mr-2" /> New Token Discovery
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Our platform constantly monitors Solana DEXs for newly created trading pairs,
                        giving you early access to potential opportunities.
                      </p>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Real-time detection of new token listings
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Automatic risk assessment and verification
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Detailed token metrics and analysis
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Historical performance tracking
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400 flex items-center">
                        <FaChartLine className="mr-2" /> Market Analytics
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Get comprehensive analytics on Solana tokens with custom filters and sorting options.
                      </p>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Price action and volume analysis
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Liquidity depth measurements
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Holder distribution metrics
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Social sentiment tracking
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400 flex items-center">
                      <FaBolt className="mr-2" /> Trading Signals
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Our AI-powered system identifies potential trading opportunities based on multiple data sources.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Technical analysis patterns
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          On-chain activity signals
                        </li>
                      </ul>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Unusual volume or price movements
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Smart money wallet tracking
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                    <div className="flex">
                      <span className="text-yellow-500 text-2xl mr-4">⚠️</span>
                      <div>
                        <h4 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Important Note</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          All trading signals should be considered educational information only. Always conduct your
                          own research before making investment decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="api"
              ref={setSectionRef('api')}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-10 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    <FaServer className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">API Documentation</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Vector Tools provides a comprehensive API for developers to access our data
                    and integrate with their own applications.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Authentication</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        All API requests require authentication using an API key. You can generate your key
                        in the dashboard settings.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Rate Limits</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Free tier: 60 requests/hour<br />
                        Pro tier: 600 requests/hour<br />
                        Enterprise: Custom limits
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Example Request</h3>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                    <code className="text-sm">
                      {`fetch('https://api.vectortools.io/v1/new-pairs', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))`}
                    </code>
                  </pre>
                  
                  <div className="mt-8 text-center">
                    <Link href="/docs/api" className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-xl transition-colors">
                      View Complete API Reference
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="faq"
              ref={setSectionRef('faq')}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    <FaQuestionCircle className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                      Is Vector Tools free to use?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Vector Tools offers a free tier with limited features and premium tiers
                      with advanced capabilities. Check our pricing page for more details.
                    </p>
                  </div>
                  
                  <div className="py-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                      How often is data updated?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Market data is updated in real-time. New token pairs are typically detected
                      within minutes of their creation on major Solana DEXs.
                    </p>
                  </div>
                  
                  <div className="py-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                      Can I use Vector Tools for automated trading?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Yes, our API can be integrated with trading bots and other automated systems.
                      Premium tiers include advanced API access with higher rate limits.
                    </p>
                  </div>
                  
                  <div className="py-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                      How do you identify risky tokens?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our risk assessment system analyzes multiple factors including contract code,
                      liquidity levels, ownership concentration, and trading patterns to identify
                      potential risks.
                    </p>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center justify-center">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Have more questions?
                  </p>
                  <div className="flex gap-4">
                    <Link href="/docs/faq" className="inline-block bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors">
                      Complete FAQ
                    </Link>
                    <Link href="/docs/support" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors">
                      Contact Support
                    </Link>
                  </div>
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