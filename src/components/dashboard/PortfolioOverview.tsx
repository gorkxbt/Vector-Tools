'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown, FaInfoCircle, FaWallet, FaSpinner, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useWallet } from '@/hooks/useWallet'
import { TokenInfo } from '@/types/tokens'
import { formatWalletAddress } from '@/utils/wallet'
import { getSolanaPrice } from '@/services/api'

// Phantom wallet interface
type PhantomWindow = Window & {
  solana?: {
    isPhantom: boolean;
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
    disconnect: () => Promise<void>;
    isConnected: boolean;
    publicKey?: { toString: () => string };
    signMessage?: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
    request: (request: { method: string, params?: Record<string, unknown> }) => Promise<unknown>;
  }
}

declare const window: PhantomWindow;

// Token type definition
interface Token {
  name: string;
  symbol: string;
  amount: number;
  value: number;
  price: number;
  change: number;
  color: string;
  mint?: string;
  logo?: string;
}

// Portfolio data type
interface PortfolioData {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  tokens: Token[];
}

// Price API interface
interface TokenPrice {
  price: number;
  change24h: number;
}

// Time range options for chart
const timeRanges = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: 'YTD', value: 'ytd' },
  { label: 'ALL', value: 'all' }
]

// Token colors for visualization
const tokenColors = [
  '#FF2020', '#FF4040', '#FF6060', '#FF8080', '#FFA0A0', 
  '#FFC0C0', '#FFD0D0', '#FFE0E0', '#FFF0F0', '#FFFFFF'
]

// Common SPL tokens and metadata
const tokenMetadata: Record<string, { name: string, symbol: string, logo?: string }> = {
  'So11111111111111111111111111111111111111112': { name: 'Wrapped SOL', symbol: 'SOL', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': { name: 'USD Coin', symbol: 'USDC', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png' },
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': { name: 'USDT', symbol: 'USDT', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png' },
  'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': { name: 'BONK', symbol: 'BONK', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png' },
  'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN': { name: 'Jupiter', symbol: 'JUP', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/logo.png' },
  '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs': { name: 'Render Token', symbol: 'RNDR', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.svg' },
}

// Fallback data in case wallet isn't connected or for demo mode
const fallbackData: PortfolioData = {
  totalValue: 12583.45,
  dailyChange: 547.89,
  dailyChangePercent: 4.55,
  tokens: [
    {
      name: 'Solana',
      symbol: 'SOL',
      amount: 34.5,
      value: 8625.00,
      price: 250.00,
      change: 5.8,
      color: '#FF2020'
    },
    {
      name: 'BONK',
      symbol: 'BONK',
      amount: 15000000,
      value: 1875.00,
      price: 0.000125,
      change: 12.3,
      color: '#FF4040'
    },
    {
      name: 'Render',
      symbol: 'RNDR',
      amount: 245.6,
      value: 1228.00,
      price: 5.00,
      change: -2.4,
      color: '#FF6060'
    },
    {
      name: 'Jupiter',
      symbol: 'JUP',
      amount: 758.3,
      value: 758.30,
      price: 1.00,
      change: 1.5,
      color: '#FF8080'
    },
    {
      name: 'USDC',
      symbol: 'USDC',
      amount: 97.15,
      value: 97.15,
      price: 1.00,
      change: 0,
      color: '#FFA0A0'
    }
  ]
};

// Mock function to simulate getting token prices from an API
const getTokenPrice = async (symbol: string): Promise<TokenPrice> => {
  // In a real app, this would call an actual price API
  // For demo, use random values based on symbol
  const symbolHash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate somewhat realistic price based on symbol
  const basePrice = {
    'SOL': 250.00,
    'BONK': 0.000125,
    'RNDR': 5.00,
    'JUP': 1.00,
    'USDC': 1.00,
    'USDT': 1.00,
  }[symbol] || (symbolHash % 100) + 1;
  
  // Add some randomness to simulate market fluctuation
  const randomFactor = 0.95 + (Math.random() * 0.1); // 0.95 to 1.05
  const price = basePrice * randomFactor;
  
  // Random 24h change between -5% and 15%
  const change24h = -5 + (Math.random() * 20);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return { price, change24h };
};

const PortfolioOverview = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if Phantom is available and connected
        if (window.solana?.isConnected && window.solana.publicKey) {
          // This would normally call an API to get token balances
          // For this demo, we'll simulate it with browser-side code
          
          try {
            // In a real app, we would get this from an RPC provider
            // For this demo, we'll simulate SPL token balances
            const tokens: Token[] = [];
            const solBalance = 5 + Math.random() * 10; // Random SOL balance
            
            // Add SOL balance
            tokens.push({
              name: 'Solana',
              symbol: 'SOL',
              amount: parseFloat(solBalance.toFixed(3)),
              price: 0, // To be filled
              value: 0, // To be calculated
              change: 0, // To be filled
              color: tokenColors[0]
            });
            
            // Simulate some random token holdings
            const simulatedTokens = [
              { mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', amount: 1000000 + Math.floor(Math.random() * 20000000) }, // BONK
              { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: 50 + Math.floor(Math.random() * 200) }, // USDC
              { mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', amount: 100 + Math.floor(Math.random() * 1000) } // JUP
            ];
            
            // Add each token to our tokens array
            simulatedTokens.forEach((token, index) => {
              if (tokenMetadata[token.mint]) {
                const { name, symbol } = tokenMetadata[token.mint];
                tokens.push({
                  name,
                  symbol,
                  amount: token.amount,
                  price: 0, // To be filled
                  value: 0, // To be calculated
                  change: 0, // To be filled
                  color: tokenColors[index + 1],
                  mint: token.mint,
                  logo: tokenMetadata[token.mint].logo
                });
              }
            });
            
            // Fetch prices for all tokens
            const tokenPrices = await Promise.all(
              tokens.map(token => getTokenPrice(token.symbol))
            );
            
            // Update tokens with prices and calculate values
            let totalValue = 0;
            let totalChange = 0;
            
            tokens.forEach((token, index) => {
              token.price = tokenPrices[index].price;
              token.change = tokenPrices[index].change24h;
              token.value = token.amount * token.price;
              totalValue += token.value;
              totalChange += token.value * (token.change / 100);
            });
            
            // Calculate overall portfolio metrics
            const dailyChangePercent = totalValue > 0 ? (totalChange / totalValue) * 100 : 0;
            
            // Set portfolio data
            setPortfolioData({
              totalValue,
              dailyChange: totalChange,
              dailyChangePercent,
              tokens: tokens.sort((a, b) => b.value - a.value) // Sort by value descending
            });
            
            setUsingFallback(false);
          } catch (err) {
            console.error("Error fetching token balances:", err);
            setPortfolioData(fallbackData);
            setUsingFallback(true);
          }
        } else {
          // If wallet not connected, use fallback data
          setPortfolioData(fallbackData);
          setUsingFallback(true);
        }
      } catch (err) {
        console.error("Error in portfolio data fetch:", err);
        setError("Failed to load portfolio data. Please try again.");
        setPortfolioData(fallbackData);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolioData();
    
    // Set up refresh interval (every 60 seconds)
    const intervalId = setInterval(fetchPortfolioData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !portfolioData) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <FaSpinner style={{ fontSize: '2rem', color: '#FF2020', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem' }}>Loading portfolio data...</p>
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  if (error && !portfolioData) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0.75rem',
        border: '1px solid #f3f4f6'
      }}>
        <FaInfoCircle style={{ fontSize: '2rem', color: '#FF2020', marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Error Loading Portfolio</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: '#FF2020', 
            color: 'white', 
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Refresh
        </button>
      </div>
    );
  }
  
  // From here on, we know portfolioData is defined
  const data = portfolioData || fallbackData;

  return (
    <motion.div 
      style={{ marginBottom: '2rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '0.5rem' }}>Portfolio Overview</h2>
          {usingFallback && (
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: 'medium', 
              backgroundColor: 'rgba(255, 32, 32, 0.1)', 
              color: '#FF2020', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <FaInfoCircle style={{ marginRight: '0.25rem' }} />
              Demo Mode
            </div>
          )}
        </div>
        <div style={{ 
          display: 'inline-flex', 
          background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))', 
          backdropFilter: 'blur(8px)', 
          borderRadius: '0.75rem', 
          padding: '0.25rem' 
        }}>
          {timeRanges.map((range) => (
            <button
              key={range.value}
              style={{
                padding: '0.375rem 0.75rem', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                borderRadius: '0.5rem', 
                transition: 'all 0.2s',
                backgroundColor: timeRange === range.value ? '#FF2020' : 'transparent',
                color: timeRange === range.value ? '#111827' : '#4b5563',
                boxShadow: timeRange === range.value ? '0 0 3px rgba(255, 32, 32, 0.5), 0 0 8px rgba(255, 32, 32, 0.3)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => setTimeRange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <motion.div 
          style={{ 
            background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))', 
            backdropFilter: 'blur(8px)', 
            padding: '1.5rem', 
            borderRadius: '0.75rem', 
            border: '1px solid #f3f4f6' 
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
            <FaWallet style={{ color: '#FF2020', marginRight: '0.5rem' }} />
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Portfolio Value</div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}>${data.totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: data.dailyChange >= 0 ? '#10b981' : '#ef4444', 
            marginTop: '0.5rem' 
          }}>
            {data.dailyChange >= 0 
              ? <FaCaretUp style={{ marginRight: '0.25rem' }} /> 
              : <FaCaretDown style={{ marginRight: '0.25rem' }} />
            }
            <span>${Math.abs(data.dailyChange).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            <span style={{ marginLeft: '0.25rem' }}>({Math.abs(data.dailyChangePercent).toFixed(2)}%)</span>
            <span style={{ color: '#6b7280', marginLeft: '0.5rem', fontSize: '0.875rem' }}>24h</span>
          </div>
        </motion.div>
        
        <div style={{ 
          position: 'relative', 
          height: '11rem', 
          background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))', 
          backdropFilter: 'blur(8px)', 
          borderRadius: '0.75rem', 
          overflow: 'hidden', 
          border: '1px solid #f3f4f6', 
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' 
        }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            {/* Demo chart - in real app this would be a chart component */}
            <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 400 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 32, 32, 0.5)" />
                  <stop offset="100%" stopColor="rgba(255, 32, 32, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,150 L0,120 C20,115 40,110 60,100 C80,90 100,70 120,65 C140,60 160,70 180,80 C200,90 220,100 240,90 C260,80 280,60 300,55 C320,50 340,60 360,70 C380,80 400,90 400,95 L400,150 Z"
                fill="url(#chart-gradient)"
                strokeWidth="3"
                stroke="#FF2020"
              />
              
              {/* Add some decorative dots */}
              <circle cx="120" cy="65" r="4" fill="#FF2020" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
              <circle cx="240" cy="90" r="4" fill="#FF2020" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
              <circle cx="300" cy="55" r="4" fill="#FF2020" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
            </svg>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '500', color: '#6b7280' }}>
              Portfolio Performance
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))', 
        backdropFilter: 'blur(8px)', 
        borderRadius: '0.75rem', 
        overflow: 'hidden', 
        border: '1px solid #f3f4f6', 
        marginBottom: '1.5rem' 
      }}>
        <div style={{ 
          padding: '1rem', 
          borderBottom: '1px solid #f3f4f6', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          backgroundColor: 'rgba(249, 250, 251, 0.5)' 
        }}>
          <div style={{ fontWeight: '500' }}>Portfolio Assets</div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{data.tokens.length} assets</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '100%' }}>
            <thead style={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
              <tr>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>24h</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #f3f4f6' }}>
              {data.tokens.map((token, index) => (
                <motion.tr 
                  key={token.symbol} 
                  style={{ 
                    transition: 'background-color 0.2s'
                  }}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.7)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        borderRadius: '9999px', 
                        marginRight: '0.75rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
                        backgroundColor: token.color + '22',
                        overflow: 'hidden'
                      }}>
                        {token.logo ? (
                          <img 
                            src={token.logo} 
                            alt={token.symbol} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                          />
                        ) : (
                          <div style={{ 
                            width: '1.5rem', 
                            height: '1.5rem', 
                            borderRadius: '9999px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            backgroundColor: token.color,
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            {token.symbol.slice(0, 1)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500' }}>{token.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: '500' }}>{token.amount < 1 && token.amount > 0 ? token.amount.toFixed(7) : token.amount.toLocaleString()}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: '500' }}>
                      ${token.price < 0.01 ? token.price.toFixed(7) : token.price.toFixed(2)}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: '500' }}>${token.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end',
                      color: token.change >= 0 ? '#10b981' : '#ef4444'
                    }}>
                      {token.change >= 0 
                        ? <FaCaretUp style={{ marginRight: '0.25rem' }} /> 
                        : <FaCaretDown style={{ marginRight: '0.25rem' }} />
                      }
                      {Math.abs(token.change).toFixed(2)}%
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioOverview 