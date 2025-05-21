'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCode, FaBook, FaLightbulb, FaRocket, FaChartLine, FaWallet, FaShieldAlt } from 'react-icons/fa'

const Docs = () => {
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState('overview')
  const [isMobile, setIsMobile] = useState(true)
  
  useEffect(() => {
    // Get section from URL if available
    const sectionParam = searchParams.get('section')
    if (sectionParam && sections.find(s => s.id === sectionParam)) {
      setActiveSection(sectionParam)
    }
  }, [searchParams])
  
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
  
  const sections = [
    { id: 'overview', title: 'Overview', icon: <FaBook /> },
    { id: 'getting-started', title: 'Getting Started', icon: <FaRocket /> },
    { id: 'features', title: 'Features', icon: <FaLightbulb /> },
    { id: 'dashboard', title: 'Dashboard Guide', icon: <FaChartLine /> },
    { id: 'api', title: 'API Reference', icon: <FaCode /> },
    { id: 'security', title: 'Security', icon: <FaShieldAlt /> }
  ]
  
  const getContent = (sectionId: string) => {
    switch(sectionId) {
      case 'overview':
        return (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Vector Tools Overview
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Vector Tools is an AI-powered trading platform designed specifically for the Solana ecosystem. It combines advanced machine learning algorithms with blockchain technology to provide traders with real-time insights, automated strategies, and portfolio management tools.
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
              Our Mission
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              At Vector Tools, we aim to democratize trading by making powerful AI tools accessible to both novice and experienced traders. Our platform leverages the latest advancements in artificial intelligence to predict market trends, analyze social sentiment, and automate trading strategies.
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
              Core Technologies
            </h3>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>
                <strong>AI & Machine Learning</strong>: Predictive models trained on vast datasets to identify market patterns
              </li>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>
                <strong>Natural Language Processing</strong>: Sentiment analysis of social media and news sources
              </li>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>
                <strong>Blockchain Integration</strong>: Direct connections to Solana's high-speed network
              </li>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>
                <strong>Automated Trading</strong>: Configurable strategies that execute without human intervention
              </li>
            </ul>
          </div>
        )
      
      case 'getting-started':
        return (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Getting Started with Vector Tools
            </h2>
            <div style={{ backgroundColor: 'rgba(255, 20, 20, 0.1)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#FF2020', marginBottom: '0.75rem' }}>
                Quick Start Guide
              </h3>
              <ol style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Create an account or connect with Phantom wallet</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Navigate to the dashboard</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Connect your Phantom wallet</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Explore real-time signals and portfolio insights</li>
              </ol>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
              Wallet Connection
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Vector Tools requires a connection to your Phantom wallet to access your Solana assets and execute trades. Here's how to connect:
            </p>
            <ol style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Install <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#FF2020', textDecoration: 'underline' }}>Phantom wallet</a> browser extension</li>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Click "Connect Phantom Wallet" in the dashboard sidebar</li>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Approve the connection request in the Phantom popup</li>
              <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Your wallet address and balances will appear in the dashboard</li>
            </ol>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
              System Requirements
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem', lineHeight: '1.7' }}>
              Vector Tools is a web-based application that works on most modern browsers:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Chrome (recommended)</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Firefox</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Brave</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Edge</li>
            </ul>
          </div>
        )
      
      case 'features':
        return (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Vector Tools Features
            </h2>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(255, 20, 20, 0.1)', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                  <FaWallet style={{ color: '#FF2020', fontSize: '1.5rem' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Phantom Wallet Integration</h3>
              </div>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', paddingLeft: '4rem' }}>
                Securely connect your Phantom wallet to manage your Solana assets seamlessly. View real-time balances, execute trades, and track performance all from one interface.
              </p>
            </div>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(255, 20, 20, 0.1)', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                  <FaChartLine style={{ color: '#FF2020', fontSize: '1.5rem' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>AI-Powered Market Analysis</h3>
              </div>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', paddingLeft: '4rem' }}>
                Our AI models analyze vast amounts of market data to identify patterns and predict future price movements. This includes technical analysis, on-chain data, and social sentiment monitoring.
              </p>
            </div>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(255, 20, 20, 0.1)', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                  <FaShieldAlt style={{ color: '#FF2020', fontSize: '1.5rem' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Automated Trading Strategies</h3>
              </div>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', paddingLeft: '4rem' }}>
                Create custom trading strategies based on specific signals or use our pre-built strategies. Set parameters like entry/exit points, position sizing, and risk management rules. The system executes trades automatically when conditions are met.
              </p>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2.5rem', marginBottom: '1rem' }}>
              Complete Feature List
            </h3>
            <ul style={{ paddingLeft: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ fontSize: '1.125rem' }}>Portfolio Overview</li>
              <li style={{ fontSize: '1.125rem' }}>Real-Time Social Signals</li>
              <li style={{ fontSize: '1.125rem' }}>Unified Alpha Score</li>
              <li style={{ fontSize: '1.125rem' }}>Strategy Configuration</li>
              <li style={{ fontSize: '1.125rem' }}>Automated Trading</li>
              <li style={{ fontSize: '1.125rem' }}>Stop-Loss Manager</li>
              <li style={{ fontSize: '1.125rem' }}>Performance Analytics</li>
              <li style={{ fontSize: '1.125rem' }}>Alert Notifications</li>
              <li style={{ fontSize: '1.125rem' }}>Signal Feed</li>
              <li style={{ fontSize: '1.125rem' }}>AI Sentiment Analysis</li>
            </ul>
          </div>
        )
      
      case 'dashboard':
        return (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Dashboard Guide
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.7' }}>
              The Vector Tools dashboard is your command center for monitoring and managing your Solana trading activities. Here's a detailed breakdown of each section:
            </p>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Portfolio Overview
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              The Portfolio section displays your current holdings, asset allocation, and performance metrics. Key features include:
            </p>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Total portfolio value and 24-hour change</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Asset breakdown with individual performance indicators</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Historical performance chart with adjustable time frames</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Risk assessment and diversification metrics</li>
            </ul>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
              Signals
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              The Signals section aggregates real-time intelligence from various sources:
            </p>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Social media sentiment from Twitter and Telegram</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>On-chain activity indicators</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Technical analysis alerts</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Whale wallet movement tracking</li>
            </ul>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
              Strategies
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Create and manage automated trading strategies based on various signals:
            </p>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Strategy builder with drag-and-drop interface</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Backtest capabilities against historical data</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Risk management settings</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Strategy performance tracking</li>
            </ul>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
              Analytics
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Deep insights into your trading performance:
            </p>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Win/loss ratios and profit analysis</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Strategy comparison tools</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Market correlation data</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Performance attribution analysis</li>
            </ul>
          </div>
        )
      
      case 'api':
        return (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              API Reference
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.7' }}>
              Vector Tools provides a robust API for developers who want to integrate our AI-powered trading signals and portfolio management capabilities into their own applications.
            </p>
            
            <div style={{ backgroundColor: '#f3f4f6', padding: '1.5rem', borderRadius: '0.5rem', fontFamily: 'monospace', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>Base URL: <code>https://api.vectortools.ai/v1</code></p>
              <p>Authentication: <code>Bearer TOKEN</code></p>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Endpoints
            </h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#FF2020', marginBottom: '0.5rem' }}>Authentication</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    POST /auth/token
                  </code>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>Generate an API token with your credentials</p>
                </li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#FF2020', marginBottom: '0.5rem' }}>Signals</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    GET /signals
                  </code>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>Get all current trading signals</p>
                </li>
                <li style={{ marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    GET /signals/{'{token}'}
                  </code>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>Get signals for a specific token</p>
                </li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#FF2020', marginBottom: '0.5rem' }}>Portfolio</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    GET /portfolio
                  </code>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>Get current portfolio status</p>
                </li>
                <li style={{ marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    GET /portfolio/history
                  </code>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>Get historical portfolio performance</p>
                </li>
              </ul>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
              Rate Limits
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem', lineHeight: '1.7' }}>
              Our API enforces the following rate limits:
            </p>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Free tier: 60 requests per hour</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Pro tier: 600 requests per hour</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Enterprise tier: Custom limits</li>
            </ul>
            
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem', lineHeight: '1.7' }}>
              For complete API documentation including request/response examples, please visit our{' '}
              <a href="/docs/api" style={{ color: '#FF2020', textDecoration: 'underline' }}>API Documentation Portal</a>.
            </p>
          </div>
        )
      
      case 'security':
        return (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Security Practices
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.7' }}>
              At Vector Tools, security is our top priority. We implement industry-leading standards to protect your data and assets.
            </p>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Wallet Security
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Vector Tools never stores your private keys. When you connect your Phantom wallet, you're establishing a secure connection that allows our platform to request transaction signatures from your wallet, but we never have direct access to your funds or private keys.
            </p>
            
            <div style={{ backgroundColor: 'rgba(255, 20, 20, 0.1)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#FF2020', marginBottom: '0.75rem' }}>
                Key Security Principles
              </h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Non-custodial design - we never control your funds</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>All wallet interactions require explicit approval</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Transaction details are always transparent</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Disconnect your wallet when not actively trading</li>
              </ul>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
              Data Protection
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              We implement multiple layers of protection for your personal and trading data:
            </p>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>End-to-end encryption for all sensitive data</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Regular security audits by independent third parties</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Compliance with GDPR and other relevant data protection regulations</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Strict internal access controls</li>
            </ul>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', marginTop: '2rem' }}>
              Best Practices for Users
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              To ensure maximum security while using Vector Tools, we recommend:
            </p>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Use a hardware wallet when possible</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Enable two-factor authentication for your account</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Regularly update your Phantom wallet extension</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Verify all transaction details before signing</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Only connect to Vector Tools through our official website</li>
            </ul>
          </div>
        )
      
      default:
        return <div>Select a section from the sidebar</div>
    }
  }

  return (
    <section style={{ padding: '2rem 0', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: '#4b5563', 
            fontWeight: '500',
            padding: '0.5rem 0',
            transition: 'color 0.2s ease'
          }}>
            <FaArrowLeft style={{ marginRight: '0.5rem' }} />
            Back to Home
          </Link>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '16rem 1fr', 
          gap: '2rem' 
        }}>
          {/* Sidebar */}
          <div style={{ 
            background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f3f4f6',
            position: 'sticky',
            top: '6rem',
            height: 'fit-content'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Documentation</h2>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {sections.map(section => (
                  <li key={section.id} style={{ marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: activeSection === section.id ? 'rgba(255, 20, 20, 0.1)' : 'transparent',
                        color: activeSection === section.id ? '#FF2020' : '#4b5563',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontWeight: activeSection === section.id ? '500' : 'normal'
                      }}
                    >
                      <span style={{ marginRight: '0.75rem', opacity: activeSection === section.id ? 1 : 0.7 }}>
                        {section.icon}
                      </span>
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div style={{ 
            background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f3f4f6'
          }}>
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getContent(activeSection)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Docs 