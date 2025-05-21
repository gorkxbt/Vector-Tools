'use client'

import React from 'react'
import { useState } from 'react'
import { FaTwitter, FaTelegram, FaSearch, FaFilter, FaEllipsisV } from 'react-icons/fa'

// Mock signal data
const signalData = [
  {
    id: 1,
    influencer: "SolanaWhale",
    platform: "Twitter",
    time: "10:23 AM",
    date: "Today",
    token: "SOL",
    message: "Bullish on $SOL with the new DEX launch coming. Looking for a breakout above $260 soon.",
    sentiment: "Bullish",
    confidence: 85
  },
  {
    id: 2,
    influencer: "CryptoInsider",
    platform: "Telegram",
    time: "9:45 AM",
    date: "Today",
    token: "JUP",
    message: "Jupiter ($JUP) showing strong volume ahead of the v2 release. This is going to be big!",
    sentiment: "Bullish",
    confidence: 79
  },
  {
    id: 3,
    influencer: "TradingMaster",
    platform: "Twitter",
    time: "8:30 AM",
    date: "Today",
    token: "BONK",
    message: "Not liking what I'm seeing with $BONK chart patterns. Potential H&S forming. Be careful.",
    sentiment: "Bearish",
    confidence: 62
  },
  {
    id: 4,
    influencer: "SolanaNews",
    platform: "Telegram",
    time: "Yesterday",
    date: "May 20",
    token: "RNDR",
    message: "Render Network ($RNDR) adding Solana support! This is massively bullish for cross-chain development.",
    sentiment: "Bullish",
    confidence: 91
  },
  {
    id: 5,
    influencer: "DeFiExpert",
    platform: "Twitter",
    time: "Yesterday",
    date: "May 20",
    token: "SOL",
    message: "Solana network metrics reaching ATH again. TPS over 4,500 consistently with sub-second finality.",
    sentiment: "Bullish",
    confidence: 88
  }
]

const SignalFeed = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Live Signal Feed</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            style={{ 
              padding: '0.5rem', 
              color: '#4b5563', 
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
          </button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input 
            type="text" 
            placeholder="Search signals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              paddingLeft: '2.5rem', 
              paddingRight: '1rem', 
              paddingTop: '0.5rem', 
              paddingBottom: '0.5rem', 
              borderRadius: '0.375rem', 
              border: '1px solid #d1d5db'
            }}
          />
        </div>
        
        {showFilters && (
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', backgroundColor: '#f9fafb' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Filter by:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              <select style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', fontSize: '0.875rem' }}>
                <option>All tokens</option>
                <option>SOL</option>
                <option>BONK</option>
                <option>JUP</option>
                <option>RNDR</option>
              </select>
              <select style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', fontSize: '0.875rem' }}>
                <option>All influencers</option>
                <option>SolanaWhale</option>
                <option>CryptoInsider</option>
                <option>TradingMaster</option>
                <option>SolanaNews</option>
              </select>
              <select style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', fontSize: '0.875rem' }}>
                <option>All sentiment</option>
                <option>Bullish</option>
                <option>Bearish</option>
                <option>Neutral</option>
              </select>
              <select style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', fontSize: '0.875rem' }}>
                <option>All time</option>
                <option>Today</option>
                <option>Yesterday</option>
                <option>This week</option>
                <option>This month</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Signal items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {signalData.map((signal) => (
          <div 
            key={signal.id} 
            style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              transition: 'box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  borderRadius: '9999px', 
                  backgroundColor: '#e5e7eb', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '0.5rem', 
                  color: '#4b5563' 
                }}>
                  {signal.platform === "Twitter" ? <FaTwitter /> : <FaTelegram />}
                </div>
                <div>
                  <div style={{ fontWeight: '500' }}>{signal.influencer}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {signal.platform} • {signal.time}, {signal.date}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  backgroundColor: signal.sentiment === "Bullish" 
                    ? "rgba(16, 185, 129, 0.1)" 
                    : signal.sentiment === "Bearish" 
                    ? "rgba(239, 68, 68, 0.1)" 
                    : "rgba(107, 114, 128, 0.1)",
                  color: signal.sentiment === "Bullish" 
                    ? "#10b981" 
                    : signal.sentiment === "Bearish" 
                    ? "#ef4444" 
                    : "#6b7280"
                }}>
                  {signal.sentiment}
                </span>
                <button style={{ 
                  marginLeft: '0.5rem', 
                  color: '#9ca3af',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <FaEllipsisV size={14} />
                </button>
              </div>
            </div>
            
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', color: '#FF2020' }}>#{signal.token}</span> {signal.message}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Confidence: {signal.confidence}%
              </div>
              <button style={{ 
                fontSize: '0.75rem', 
                color: '#FF2020', 
                fontWeight: '500',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}>
                Create Strategy
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <button style={{ 
          color: '#FF2020',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}>
          Load More Signals
        </button>
      </div>
    </div>
  )
}

export default SignalFeed 