'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaChartPie, 
  FaSignal, 
  FaCogs, 
  FaChartLine, 
  FaBell, 
  FaCog, 
  FaBars, 
  FaTimes, 
  FaWallet,
  FaExclamationTriangle,
  FaArrowLeft,
  FaRocket
} from 'react-icons/fa'

type Props = {
  children: React.ReactNode
}

type PhantomWindow = Window & {
  solana?: {
    isPhantom: boolean;
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
    disconnect: () => Promise<void>;
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
    isConnected: boolean;
    publicKey?: { toString: () => string };
  }
}

declare const window: PhantomWindow;

const DashboardLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [currentTime, setCurrentTime] = useState('')
  const [windowWidth, setWindowWidth] = useState(0)
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false)
  const [connectionError, setConnectionError] = useState("")
  const pathname = usePathname()
  
  // Calculate shortened address for display
  const shortenedAddress = walletAddress 
    ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`
    : '';

  useEffect(() => {
    // Check if Phantom is installed
    if (typeof window !== 'undefined') {
      const checkPhantomInstallation = () => {
        if ("solana" in window && window.solana?.isPhantom) {
          setIsPhantomInstalled(true)
          
          // Check if already connected
          if (window.solana.isConnected && window.solana.publicKey) {
            setWalletConnected(true)
            setWalletAddress(window.solana.publicKey.toString())
          }
        } else {
          setIsPhantomInstalled(false)
        }
      }
      
      checkPhantomInstallation()
      
      // Setup event listeners for wallet connection state changes
      if (window.solana) {
        const handleAccountsChange = () => {
          if (window.solana?.isConnected && window.solana.publicKey) {
            setWalletConnected(true)
            setWalletAddress(window.solana.publicKey.toString())
          } else {
            setWalletConnected(false)
            setWalletAddress("")
          }
        }
        
        window.solana.on('accountsChanged', handleAccountsChange)
        
        return () => {
          window.solana?.off('accountsChanged', handleAccountsChange)
        }
      }
    }
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    // Handle window width for mobile view
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
      };
    }
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { name: 'Portfolio', path: '/dashboard', icon: <FaChartPie /> },
    { name: 'New Pairs', path: '/dashboard/new-pairs', icon: <FaRocket /> },
    { name: 'Signals', path: '/dashboard/signals', icon: <FaSignal /> },
    { name: 'Strategies', path: '/dashboard/strategies', icon: <FaCogs /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <FaChartLine /> },
    { name: 'Notifications', path: '/dashboard/notifications', icon: <FaBell /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FaCog /> },
  ]

  const connectWallet = async () => {
    setConnectionError("")
    
    try {
      if (!isPhantomInstalled) {
        window.open('https://phantom.app/', '_blank')
        return
      }
      
      // Connect to wallet
      const response = await window.solana?.connect()
      if (response) {
        setWalletConnected(true)
        setWalletAddress(response.publicKey.toString())
      }
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error)
      setConnectionError("Failed to connect to Phantom wallet")
    }
  }

  const disconnectWallet = async () => {
    try {
      await window.solana?.disconnect()
      setWalletConnected(false)
      setWalletAddress("")
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  const isMobile = windowWidth < 768;

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Mobile Header */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1rem', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        display: isMobile ? 'flex' : 'none', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #f3f4f6'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            <span className="vector-red neon-glow">Vector</span>{' '}
            <span>Tools</span>
          </h1>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ padding: '0.5rem', color: '#4b5563', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <AnimatePresence>
        <motion.div 
          style={{
            background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            width: '18rem',
            position: isMobile ? 'fixed' : 'relative',
            inset: isMobile ? '0 auto auto 0' : 'auto',
            zIndex: 30,
            transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
            transition: 'transform 0.3s ease-in-out'
          }}
          initial={false}
          animate={{
            x: isOpen || !isMobile ? 0 : -288,
            opacity: 1
          }}
        >
          {/* Sidebar Header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(243, 244, 246, 0.6)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span className="vector-red neon-glow">Vector</span>{' '}
                <span>Tools</span>
              </h1>
            </Link>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>{currentTime}</div>
          </div>
          
          {/* Wallet Connection Area */}
          <div style={{ padding: '1rem', borderBottom: '1px solid rgba(243, 244, 246, 0.6)' }}>
            {walletConnected ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Connected wallet:</span>
                  <button 
                    onClick={disconnectWallet}
                    style={{ fontSize: '0.75rem', color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    Disconnect
                  </button>
                </div>
                <div style={{ 
                  padding: '0.5rem 0.75rem', 
                  backgroundColor: 'rgba(243, 244, 246, 0.8)', 
                  borderRadius: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  backdropFilter: 'blur(4px)' 
                }}>
                  <FaWallet style={{ color: '#9ca3af', marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>{shortenedAddress}</span>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={connectWallet}
                  className="btn-primary"
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#FF2020',
                    color: '#111827',
                    border: 'none',
                    fontWeight: '500',
                    boxShadow: '0 0 15px rgba(255, 32, 32, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <FaWallet style={{ marginRight: '0.5rem' }} />
                  {isPhantomInstalled ? 'Connect Phantom Wallet' : 'Install Phantom Wallet'}
                </button>
                
                {connectionError && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.75rem', 
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center' 
                  }}>
                    <FaExclamationTriangle style={{ marginRight: '0.25rem' }} />
                    {connectionError}
                  </div>
                )}
                
                {!isPhantomInstalled && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.75rem', 
                    color: '#6b7280',
                    textAlign: 'center' 
                  }}>
                    Phantom wallet extension required
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Navigation Items */}
          <nav style={{ padding: '1rem' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '0.5rem', 
                      transition: 'all 0.2s',
                      backgroundColor: pathname === item.path ? 'rgba(255, 32, 32, 0.1)' : 'transparent',
                      color: pathname === item.path ? '#FF2020' : '#4b5563',
                      fontWeight: pathname === item.path ? '500' : 'normal',
                      boxShadow: pathname === item.path ? '0 0 10px rgba(255, 32, 32, 0.2)' : 'none'
                    }}
                  >
                    <span style={{ marginRight: '0.75rem', fontSize: '1.125rem' }}>{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Back to Home */}
          <div style={{ marginTop: 'auto', padding: '1rem' }}>
            <Link
              href="/"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                color: '#6b7280',
                borderRadius: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <FaArrowLeft style={{ marginRight: '0.5rem' }} />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Main Content */}
      <main style={{ 
        flex: '1',
        padding: isMobile ? '1.5rem 1rem' : '2rem',
        overflowX: 'hidden'
      }}>
        {/* Close menu button for mobile */}
        {isMobile && isOpen && (
          <div 
            style={{ 
              position: 'fixed', 
              inset: '0', 
              backgroundColor: 'rgba(0, 0, 0, 0.25)', 
              zIndex: 20 
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
        
        {/* Main content container */}
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* If wallet not connected, show connect prompt for needed sections */}
          {!walletConnected && pathname !== '/dashboard' && pathname !== '/dashboard/settings' ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}>
              <FaWallet style={{ fontSize: '3rem', color: '#FF2020', marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Connect Your Phantom Wallet</h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                To access this section, you need to connect your Phantom wallet first to view your tokens and enable trading features.
              </p>
              <button
                onClick={connectWallet}
                className="btn-primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#FF2020',
                  color: '#111827',
                  border: 'none',
                  fontWeight: '500',
                  boxShadow: '0 0 15px rgba(255, 32, 32, 0.3)',
                  cursor: 'pointer'
                }}
              >
                <FaWallet style={{ marginRight: '0.5rem' }} />
                {isPhantomInstalled ? 'Connect Phantom Wallet' : 'Install Phantom Wallet'}
              </button>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout 