'use client'

import React from 'react'
import { FaTwitter, FaChartBar, FaDatabase } from 'react-icons/fa'

// Mock alpha score data
const alphaScoreData = {
  score: 78,
  trend: 'up',
  components: [
    { name: 'Social Sentiment', value: 82, icon: <FaTwitter /> },
    { name: 'Technical Analysis', value: 65, icon: <FaChartBar /> },
    { name: 'On-Chain Data', value: 87, icon: <FaDatabase /> }
  ]
}

const AlphaScore = () => {
  // Calculate the circle's circumference
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const scorePercent = alphaScoreData.score / 100
  const offset = circumference - scorePercent * circumference
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#FF2020'
    if (score >= 60) return '#FF4040'
    if (score >= 40) return '#FF6060'
    if (score >= 20) return '#FF8080'
    return '#FFA0A0'
  }
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Alpha Score</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Circular gauge */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '12rem', height: '12rem' }}>
            {/* Background circle */}
            <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 200 200">
              <circle 
                cx="100" 
                cy="100" 
                r={radius} 
                fill="none" 
                stroke="#f3f4f6" 
                strokeWidth="12"
              />
              {/* Score circle */}
              <circle 
                cx="100" 
                cy="100" 
                r={radius} 
                fill="none" 
                stroke={getScoreColor(alphaScoreData.score)} 
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            </svg>
            
            {/* Score text */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{alphaScoreData.score}</div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>out of 100</div>
            </div>
          </div>
        </div>
        
        {/* Score components */}
        <div style={{ gridColumn: 'span 2' }}>
          <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
            A composite score combining social sentiment, on-chain activity, and AI predictions to guide your trades.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {alphaScoreData.components.map((component) => (
              <div key={component.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#4b5563' }}>
                    <span style={{ marginRight: '0.5rem', color: '#FF2020' }}>{component.icon}</span>
                    {component.name}
                  </div>
                  <div style={{ fontWeight: '500' }}>{component.value}</div>
                </div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '0.5rem' }}>
                  <div 
                    style={{
                      height: '0.5rem',
                      borderRadius: '9999px',
                      width: `${component.value}%`,
                      backgroundColor: getScoreColor(component.value)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
            <h3 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Recommendation</h3>
            <p style={{ color: '#4b5563' }}>
              {alphaScoreData.score >= 70 
                ? "Strong bullish signals detected. Consider increasing Solana exposure." 
                : alphaScoreData.score >= 50 
                ? "Neutral market conditions. Monitor for trend confirmation." 
                : "Bearish signals present. Consider reducing exposure or setting tighter stop-losses."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlphaScore 