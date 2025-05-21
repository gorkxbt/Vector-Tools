'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaWallet, 
  FaShieldAlt, 
  FaTwitter, 
  FaBrain, 
  FaChartLine, 
  FaStar, 
  FaChartPie, 
  FaCogs, 
  FaBell, 
  FaExchangeAlt,
  FaRobot
} from 'react-icons/fa'

const featuresList = [
  {
    icon: <FaWallet style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Phantom Wallet Integration",
    description: "Securely connect your Phantom wallet to manage your Solana assets seamlessly."
  },
  {
    icon: <FaShieldAlt style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Automated Stop-Loss Manager",
    description: "Set dynamic stop-losses that adjust automatically to protect your investments and lock in profits."
  },
  {
    icon: <FaTwitter style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Real-Time Social Signal Monitoring",
    description: "Track Twitter and Telegram for early bullish or bearish signals from crypto influencers."
  },
  {
    icon: <FaBrain style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "AI-Powered Sentiment Analysis",
    description: "Natural language processing analyzes social media posts to determine sentiment and trigger trades."
  },
  {
    icon: <FaChartLine style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Macro Market Forecasting",
    description: "Machine learning models predict Solana price trends to guide your trading decisions."
  },
  {
    icon: <FaStar style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Unified Alpha Score",
    description: "Aggregate social, on-chain, and AI signals into a single actionable score."
  },
  {
    icon: <FaChartPie style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Portfolio Overview",
    description: "View real-time balances, asset performance, and historical charts."
  },
  {
    icon: <FaCogs style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Strategy Configuration",
    description: "Customize trade triggers, hold times, exit strategies, and risk parameters."
  },
  {
    icon: <FaBell style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Signal Alerts & Notifications",
    description: "Receive real-time alerts via the dashboard and Telegram bot."
  },
  {
    icon: <FaExchangeAlt style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Trade Execution Dashboard",
    description: "Monitor executed trades, pending orders, and stop-loss triggers."
  },
  {
    icon: <FaRobot style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Automated Trading",
    description: "Execute trades automatically based on AI signals and your predefined strategies."
  },
  {
    icon: <FaChartLine style={{ color: "#FF2020", fontSize: "1.5rem" }} />,
    title: "Performance Analytics",
    description: "View detailed reports on your trading strategy performance and optimize based on results."
  }
]

const Features = () => {
  return (
    <section id="features" style={{ padding: "4rem 1.5rem", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", maxWidth: "48rem", margin: "0 auto", marginBottom: "3rem" }}
        >
          <h2 style={{ fontSize: "2.25rem", fontWeight: "700", marginBottom: "1rem" }}>
            Core <span style={{ color: "#FF2020", textShadow: "0 0 8px rgba(255, 20, 20, 0.5)" }}>Features</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "#4b5563" }}>
            Vector Tools provides a comprehensive suite of AI-powered trading tools designed specifically for the Solana ecosystem.
          </p>
        </motion.div>

        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "1.5rem", 
          justifyContent: "center"
        }}>
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(0.4, index * 0.05) }}
              style={{ 
                padding: "1.25rem", 
                backgroundColor: "white", 
                borderRadius: "0.5rem", 
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #f3f4f6",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                width: "calc(25% - 1.125rem)",
                minWidth: "280px",
                maxWidth: "350px",
                height: "auto",
                display: "flex",
                flexDirection: "column"
              }}
              whileHover={{
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                transform: "translateY(-5px)"
              }}
            >
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: "0.75rem" 
              }}>
                <div style={{ marginRight: "0.75rem" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{feature.title}</h3>
              </div>
              <p style={{ color: "#4b5563", fontSize: "0.95rem", marginTop: "auto" }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 