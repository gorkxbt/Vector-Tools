'use client'

import Link from 'next/link'
import { FaTwitter, FaDiscord, FaTelegram, FaGithub } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer style={{
      backgroundColor: "black",
      color: "white",
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
      padding: 0,
      position: "relative",
      overflow: "hidden",
      marginTop: "4rem",
      boxShadow: "0 -10px 30px rgba(255, 32, 32, 0.3)",
      borderTop: "3px solid #FF2020",
      display: "block"
    }}>
      {/* Red glow accent */}
      <div style={{
        position: "absolute",
        top: "-50px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        height: "100px",
        backgroundColor: "rgba(255, 32, 32, 0.35)",
        borderRadius: "100%",
        filter: "blur(80px)",
        opacity: 0.8
      }}></div>
      
      {/* Main content */}
      <div style={{
        padding: "3.5rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "3rem",
        position: "relative",
        zIndex: 1
      }}>
        {/* Logo section */}
        <div style={{ flex: "1", minWidth: "280px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <h2 style={{ 
              fontSize: "2rem", 
              fontWeight: "700", 
              marginBottom: "1.5rem",
              display: "inline-block" 
            }}>
              <span style={{ 
                color: "#FF2020", 
                textShadow: "0 0 15px rgba(255, 32, 32, 0.8)" 
              }}>Vector</span>{' '}
              <span style={{ color: "white" }}>Tools</span>
            </h2>
          </Link>
          
          <p style={{ 
            color: "#f0f0f0", 
            maxWidth: "24rem", 
            marginBottom: "2rem", 
            lineHeight: "1.7"
          }}>
            AI-powered Solana trading platform with real-time signals and automated portfolio management.
          </p>
          
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-icon">
              <FaDiscord />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noreferrer" className="social-icon">
              <FaTelegram />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
              <FaGithub />
            </a>
          </div>
        </div>
        
        {/* Footer links */}
        <div style={{ 
          display: "flex", 
          flex: "2",
          flexWrap: "wrap", 
          gap: "3rem",
          justifyContent: "space-between" 
        }}>
          <div>
            <h3 style={{ 
              fontSize: "1.125rem", 
              fontWeight: "600", 
              color: "white", 
              marginBottom: "1.2rem" 
            }}>
              <span style={{ color: "#FF2020" }}>Product</span>
            </h3>
            <ul className="footer-links">
              <li><Link href="/dashboard" style={{ color: "#f0f0f0", textDecoration: "none" }}>Dashboard</Link></li>
              <li><Link href="/dashboard/signals" style={{ color: "#f0f0f0", textDecoration: "none" }}>Signals</Link></li>
              <li><Link href="/dashboard/strategies" style={{ color: "#f0f0f0", textDecoration: "none" }}>Strategies</Link></li>
              <li><Link href="/dashboard/analytics" style={{ color: "#f0f0f0", textDecoration: "none" }}>Analytics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: "1.125rem", 
              fontWeight: "600", 
              color: "white", 
              marginBottom: "1.2rem" 
            }}>
              <span style={{ color: "#FF2020" }}>Resources</span>
            </h3>
            <ul className="footer-links">
              <li><Link href="/docs" style={{ color: "#f0f0f0", textDecoration: "none" }}>Documentation</Link></li>
              <li><Link href="/docs/api" style={{ color: "#f0f0f0", textDecoration: "none" }}>API</Link></li>
              <li><Link href="/docs/faq" style={{ color: "#f0f0f0", textDecoration: "none" }}>FAQ</Link></li>
              <li><Link href="/docs/support" style={{ color: "#f0f0f0", textDecoration: "none" }}>Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: "1.125rem", 
              fontWeight: "600", 
              color: "white", 
              marginBottom: "1.2rem" 
            }}>
              <span style={{ color: "#FF2020" }}>Legal</span>
            </h3>
            <ul className="footer-links">
              <li><Link href="/privacy" style={{ color: "#f0f0f0", textDecoration: "none" }}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ color: "#f0f0f0", textDecoration: "none" }}>Terms of Service</Link></li>
              <li><Link href="/disclaimer" style={{ color: "#f0f0f0", textDecoration: "none" }}>Risk Disclaimer</Link></li>
              <li><Link href="/cookies" style={{ color: "#f0f0f0", textDecoration: "none" }}>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright section */}
      <div style={{
        width: "100%",
        padding: "1.5rem 2rem",
        textAlign: "center",
        borderTop: "2px solid rgba(255, 32, 32, 0.4)",
        backgroundColor: "rgba(0, 0, 0, 0.95)"
      }}>
        <div style={{ 
          fontSize: "0.875rem", 
          color: "#f0f0f0", 
          maxWidth: "1400px", 
          margin: "0 auto" 
        }}>
          &copy; {currentYear} Vector Tools. All rights reserved.
        </div>
      </div>
      
      <style jsx global>{`
        .footer-links {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: 1rem;
        }
        
        .footer-links li a {
          color: #f0f0f0 !important;
          text-decoration: none !important;
          transition: all 0.2s ease;
          font-size: 1rem;
          position: relative;
          padding-bottom: 2px;
        }
        
        .footer-links li a:hover {
          color: #FF2020 !important;
          text-shadow: 0 0 8px rgba(255, 32, 32, 0.7);
        }
        
        .footer-links li a:hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #FF2020;
          box-shadow: 0 0 8px rgba(255, 32, 32, 0.7);
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          background-color: rgba(255, 32, 32, 0.15);
          border-radius: 9999px;
          color: white;
          transition: all 0.2s ease;
          font-size: 1.2rem;
        }
        
        .social-icon:hover {
          background-color: #FF2020;
          color: #000000;
          transform: translateY(-3px);
          box-shadow: 0 0 15px rgba(255, 32, 32, 0.7);
        }
      `}</style>
    </footer>
  )
}

export default Footer 