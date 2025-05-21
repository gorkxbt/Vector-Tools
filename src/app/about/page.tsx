'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

const AboutPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialIcons = [
    { icon: FaTwitter, link: '#', label: 'Twitter' },
    { icon: FaLinkedin, link: '#', label: 'LinkedIn' },
    { icon: FaGithub, link: '#', label: 'GitHub' }
  ];

  const coreValues = [
    {
      title: 'Innovation',
      description: 'We continuously push the boundaries of what\'s possible with AI and blockchain technology to provide traders with the most advanced tools.'
    },
    {
      title: 'Security',
      description: 'We prioritize the security of your assets and data, ensuring that your wallet connections and trades are protected with the highest standards.'
    },
    {
      title: 'Community',
      description: 'We\'re building a community of traders who share insights, strategies, and feedback to help everyone succeed in the Solana ecosystem.'
    }
  ];

  return (
    <>
      <Navbar />
      <main style={{ padding: '5rem 1.5rem', paddingTop: '7rem' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Meet the <span style={{ color: '#FF2020', textShadow: '0 0 5px rgba(255, 32, 32, 0.5)' }}>Founder</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '768px', margin: '0 auto' }}>
              The visionary behind Vector Tools
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: '3rem', 
            alignItems: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{ width: isMobile ? '100%' : '33%', maxWidth: '300px' }}>
              <div style={{ 
                position: 'relative', 
                width: '16rem', 
                height: '16rem', 
                margin: '0 auto', 
                borderRadius: '9999px', 
                overflow: 'hidden', 
                border: '4px solid #FF2020', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #d1d5db 100%)' 
                }}></div>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6b7280' }}>Founder</span>
                </div>
              </div>
            </div>
            
            <div style={{ flex: '1' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Founder & Lead Developer
              </h2>
              <p style={{ color: '#4b5563', marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.75' }}>
                With extensive experience in AI, blockchain, and software engineering, our founder built Vector Tools to empower Solana traders with cutting-edge AI and social signal technology.
              </p>
              <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: '1.75' }}>
                After years in traditional finance and crypto markets, they identified a need for more sophisticated, accessible tooling that could combine the power of social signals with on-chain data and AI predictions.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialIcons.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.link} 
                      aria-label={social.label}
                      style={{ 
                        padding: '0.75rem', 
                        backgroundColor: '#f3f4f6', 
                        borderRadius: '9999px', 
                        color: '#4b5563', 
                        transition: 'all 0.2s',
                        display: 'flex'
                      }}
                      onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.color = '#FF2020';
                      }}
                      onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.color = '#4b5563';
                      }}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '2rem 3rem', 
            borderRadius: '0.75rem', 
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
            marginBottom: '4rem' 
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Our Mission</h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#374151', 
              lineHeight: '1.75', 
              textAlign: 'center', 
              maxWidth: '768px', 
              margin: '0 auto', 
              fontStyle: 'italic' 
            }}>
              "To democratize advanced crypto trading tools by combining AI, social signals, and secure wallet integration in a user-friendly platform."
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gap: '2rem'
          }}>
            {coreValues.map((value, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem', 
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
                  border: '1px solid #f3f4f6' 
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#FF2020' }}>
                  {value.title}
                </h3>
                <p style={{ color: '#4b5563' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage 