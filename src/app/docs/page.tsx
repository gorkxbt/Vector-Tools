'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaBook, FaCode, FaQuestionCircle, FaHeadset } from 'react-icons/fa'

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState<string>('')
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({})
  
  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'features', title: 'Features & Capabilities' },
    { id: 'api', title: 'API Documentation' },
    { id: 'faq', title: 'FAQ' }
  ]
  
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
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Documentation</h2>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`block py-2 px-4 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                  <li className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <Link href="/docs/api">
                      <div className="flex items-center py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaCode className="mr-2" />
                        Full API Reference
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/faq">
                      <div className="flex items-center py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaQuestionCircle className="mr-2" />
                        FAQ
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/support">
                      <div className="flex items-center py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaHeadset className="mr-2" />
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
              ref={(el) => (sectionRefs.current['getting-started'] = el)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <FaBook className="text-red-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold">Getting Started</h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Vector Tools provides advanced analytics and trading tools for Solana markets.
                  This documentation will help you get started with our platform and make the most
                  of its features.
                </p>
                
                <h3>Quick Setup</h3>
                <ol>
                  <li>
                    <strong>Create an account</strong> - Sign up with your email or connect your wallet
                  </li>
                  <li>
                    <strong>Connect your Solana wallet</strong> - We support Phantom, Solflare, and other popular wallets
                  </li>
                  <li>
                    <strong>Configure your dashboard</strong> - Customize widgets and data displays to your preference
                  </li>
                  <li>
                    <strong>Set up notifications</strong> - Get alerts for new tokens and market opportunities
                  </li>
                </ol>
                
                <h3>Platform Overview</h3>
                <p>
                  Vector Tools is designed to help traders identify new token opportunities, track market trends,
                  and execute strategies with precision. Our dashboard provides real-time data and alerts
                  for Solana&apos;s most active markets.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg my-4">
                  <h4 className="font-bold mb-2">🚀 Pro Tip</h4>
                  <p className="m-0">
                    Spend some time configuring your notification preferences in settings to ensure you 
                    don&apos;t miss important market events while avoiding alert fatigue.
                  </p>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="features"
              ref={(el) => (sectionRefs.current['features'] = el)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-6">
                <FaCode className="text-red-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold">Features & Capabilities</h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <h3>New Token Discovery</h3>
                <p>
                  Our platform constantly monitors Solana DEXs for newly created trading pairs,
                  giving you early access to potential opportunities. Features include:
                </p>
                <ul>
                  <li>Real-time detection of new token listings</li>
                  <li>Automatic risk assessment and verification checks</li>
                  <li>Detailed token metrics and contract analysis</li>
                  <li>Historical performance tracking</li>
                </ul>
                
                <h3>Market Analytics</h3>
                <p>
                  Get comprehensive analytics on Solana tokens with custom filters and sorting options:
                </p>
                <ul>
                  <li>Price action and volume analysis</li>
                  <li>Liquidity depth measurements</li>
                  <li>Holder distribution and concentration metrics</li>
                  <li>Social sentiment tracking</li>
                </ul>
                
                <h3>Trading Signals</h3>
                <p>
                  Our AI-powered system identifies potential trading opportunities based on:
                </p>
                <ul>
                  <li>Technical analysis patterns</li>
                  <li>On-chain activity signals</li>
                  <li>Unusual volume or price movements</li>
                  <li>Smart money wallet tracking</li>
                </ul>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg my-4">
                  <h4 className="font-bold mb-2">⚠️ Important Note</h4>
                  <p className="m-0">
                    All trading signals should be considered educational information only. Always conduct your
                    own research before making investment decisions.
                  </p>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="api"
              ref={(el) => (sectionRefs.current['api'] = el)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <FaCode className="text-red-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold">API Documentation</h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Vector Tools provides a comprehensive API for developers to access our data
                  and integrate with their own applications.
                </p>
                
                <h3>Authentication</h3>
                <p>
                  All API requests require authentication using an API key. You can generate your key
                  in the dashboard settings.
                </p>
                
                <h3>Example Request</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                  <code>
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
                
                <p>
                  For complete API documentation, please visit our <Link href="/docs/api" className="text-red-500 hover:text-red-600">API Reference</Link> section.
                </p>
              </div>
            </motion.section>
            
            <motion.section
              id="faq"
              ref={(el) => (sectionRefs.current['faq'] = el)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <FaQuestionCircle className="text-red-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Is Vector Tools free to use?</h3>
                  <p>
                    Vector Tools offers a free tier with limited features and premium tiers
                    with advanced capabilities. Check our pricing page for more details.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">How often is data updated?</h3>
                  <p>
                    Market data is updated in real-time. New token pairs are typically detected
                    within minutes of their creation on major Solana DEXs.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Can I use Vector Tools for automated trading?</h3>
                  <p>
                    Yes, our API can be integrated with trading bots and other automated systems.
                    Premium tiers include advanced API access with higher rate limits.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">How do you identify risky tokens?</h3>
                  <p>
                    Our risk assessment system analyzes multiple factors including contract code,
                    liquidity levels, ownership concentration, and trading patterns to identify
                    potential risks.
                  </p>
                </div>
                
                <p className="mt-8">
                  Have more questions? Visit our <Link href="/docs/faq" className="text-red-500 hover:text-red-600">complete FAQ</Link> or
                  contact our <Link href="/docs/support" className="text-red-500 hover:text-red-600">support team</Link>.
                </p>
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DocsPage 