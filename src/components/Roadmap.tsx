'use client'

import React, { useState } from 'react'
import { FaRocket, FaDatabase, FaRobot, FaMobile, FaCheckCircle, FaSpinner, FaCalendarAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState(1)
  
  // Roadmap data
  const roadmapData = [
    {
      id: 1,
      name: "Phase 1",
      title: "Platform Launch",
      date: "Q2 2023",
      status: "Completed",
      icon: <FaRocket style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
      description: "Initial platform launch with Phantom wallet integration, basic real-time market data, and signal indicators for Solana tokens.",
      highlights: [
        "Phantom wallet integration",
        "Real-time market data",
        "Basic signal indicators",
        "Portfolio tracking"
      ]
    },
    {
      id: 2,
      name: "Phase 2",
      title: "AI Signal Enhancement",
      date: "Q3 2023",
      status: "In Progress",
      icon: <FaDatabase style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
      description: "Upgrade AI signal detection with on-chain data analysis, social sentiment monitoring, and improved technical indicators with backtesting capabilities.",
      highlights: [
        "Enhanced AI signal detection",
        "On-chain data analysis",
        "Social sentiment monitoring",
        "Backtesting capabilities"
      ]
    },
    {
      id: 3,
      name: "Phase 3",
      title: "Automated Trading",
      date: "Q4 2023",
      status: "Planned",
      icon: <FaRobot style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
      description: "Implement advanced automated trading strategies, portfolio optimization algorithms, and customizable risk management settings for users.",
      highlights: [
        "Automated trading strategies",
        "Portfolio optimization",
        "Customizable risk management",
        "Strategy marketplace"
      ]
    },
    {
      id: 4,
      name: "Phase 4",
      title: "Mobile App & Expansion",
      date: "Q1 2024",
      status: "Planned",
      icon: <FaMobile style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
      description: "Launch mobile applications for iOS and Android, expand to additional blockchains, and introduce advanced notification systems for trading opportunities.",
      highlights: [
        "iOS & Android applications",
        "Multi-chain expansion",
        "Advanced notifications",
        "Developer API"
      ]
    }
  ]
  
  return (
    <section id="roadmap" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 className="section-title">
          Development <span style={{ color: '#FF2020' }}>Roadmap</span>
        </h2>
        <p className="section-subtitle">
          Our strategic plan for building and evolving the Vector Tools platform.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', overflowX: 'auto', padding: '1rem 0' }}>
          <div style={{ display: 'flex', position: 'relative' }}>
            {/* Timeline connector */}
            <div className="timeline-connector"></div>
            
            {/* Phase buttons */}
            {roadmapData.map((phase) => (
              <div 
                key={phase.id} 
                className={`timeline-item ${activePhase === phase.id ? 'active' : ''}`}
                onClick={() => setActivePhase(phase.id)}
              >
                <div className="timeline-dot">
                  {phase.status === "Completed" ? (
                    <FaCheckCircle className="completed-icon" />
                  ) : (
                    <span>{phase.id}</span>
                  )}
                </div>
                <div className="timeline-label">
                  <div>{phase.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{phase.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Phase content */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {roadmapData.map((phase) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activePhase === phase.id ? 1 : 0,
                y: activePhase === phase.id ? 0 : 20,
                display: activePhase === phase.id ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="phase-content"
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '3.5rem', 
                  height: '3.5rem', 
                  backgroundColor: 'rgba(255, 32, 32, 0.1)', 
                  borderRadius: '9999px', 
                  marginRight: '1rem',
                  boxShadow: '0 0 10px rgba(255, 32, 32, 0.2)'
                }}>
                  {phase.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0' }}>{phase.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{phase.date}</span>
                    <span className={`phase-status ${phase.status.toLowerCase().replace(' ', '-')}`}>
                      {phase.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                {phase.description}
              </p>
              
              <div className="phase-highlights">
                {phase.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    {highlight}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .timeline-connector {
          position: absolute;
          top: 50%;
          left: 38px;
          right: 38px;
          height: 4px;
          background-color: #e5e7eb;
          transform: translateY(-50%);
          z-index: -1;
        }
        
        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          cursor: pointer;
          padding: 0 1.5rem;
          text-align: center;
          width: 7rem;
        }
        
        .timeline-dot {
          width: 3rem;
          height: 3rem;
          border-radius: 9999px;
          background-color: white;
          border: 4px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          font-weight: bold;
          color: #6b7280;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .timeline-item.active .timeline-dot {
          border-left: 4px solid #FF2020;
          border-color: #FF2020;
          box-shadow: 0 0 15px rgba(255, 32, 32, 0.2);
          color: #FF2020;
        }
        
        .timeline-label {
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .timeline-item:hover .timeline-dot {
          transform: scale(1.1);
        }
        
        .timeline-item.active .timeline-label {
          color: #111827;
        }
        
        .phase-content {
          background-color: white;
          border-radius: 0.75rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .phase-status {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .phase-status.completed {
          background-color: #FF2020;
          color: white;
        }
        
        .phase-status.in-progress {
          background-color: rgba(255, 32, 32, 0.1);
          color: #FF2020;
        }
        
        .phase-status.planned {
          background-color: rgba(255, 32, 32, 0.1);
          color: #FF2020;
          box-shadow: 0 0 10px rgba(255, 32, 32, 0.3);
        }
        
        .completed-icon {
          color: #FF2020;
        }
        
        .phase-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }
        
        .highlight-item {
          background-color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid #f3f4f6;
        }
      `}</style>
    </section>
  )
}

export default Roadmap 