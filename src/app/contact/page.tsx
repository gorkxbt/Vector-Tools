'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaTwitter, FaTelegram, FaDiscord, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  
  useEffect(() => {
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaTelegram, href: '#', label: 'Telegram' },
    { icon: FaDiscord, href: '#', label: 'Discord' }
  ];
  
  const contactInfo = [
    { 
      icon: FaEnvelope, 
      title: 'Email', 
      value: 'support@vectortools.io',
      note: 'We typically respond within 24 hours.'
    },
    { 
      icon: FaMapMarkerAlt, 
      title: 'Location', 
      value: 'Global & Remote',
      note: 'We operate fully online. Our team is distributed worldwide.'
    },
    { 
      icon: FaClock, 
      title: 'Operating Hours', 
      value: '24/7 Support',
      note: 'Our systems run 24/7, just like the blockchain.'
    }
  ];
  
  return (
    <>
      <Navbar />
      <main style={{ padding: '5rem 1.5rem', paddingTop: '7rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Contact <span style={{ color: '#FF2020', textShadow: '0 0 5px rgba(255, 32, 32, 0.5)' }}>Us</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '768px', margin: '0 auto' }}>
              Have questions about Vector Tools? We're here to help.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: '4rem'
          }}>
            {/* Contact Form */}
            <div>
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                padding: isMobile ? '2rem' : '2.5rem' 
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Send us a message</h2>
                
                {isSubmitted ? (
                  <div style={{ 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.2)', 
                    color: '#065f46', 
                    borderRadius: '0.5rem', 
                    padding: '1rem', 
                    marginBottom: '1.5rem' 
                  }}>
                    <p style={{ fontWeight: '500' }}>Thank you for your message!</p>
                    <p>We'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label htmlFor="name" style={{ display: 'block', color: '#4b5563', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem 1rem', 
                          borderRadius: '0.5rem', 
                          border: '1px solid #d1d5db', 
                          outline: 'none',
                        }}
                        placeholder="Your Name"
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label htmlFor="email" style={{ display: 'block', color: '#4b5563', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem 1rem', 
                          borderRadius: '0.5rem', 
                          border: '1px solid #d1d5db', 
                          outline: 'none'
                        }}
                        placeholder="Your Email"
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label htmlFor="message" style={{ display: 'block', color: '#4b5563', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem 1rem', 
                          borderRadius: '0.5rem', 
                          border: '1px solid #d1d5db', 
                          outline: 'none',
                          resize: 'none'
                        }}
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: '#FF2020',
                        color: '#ffffff',
                        fontWeight: 500,
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <div style={{ 
                backgroundColor: '#f9fafb', 
                borderRadius: '0.75rem', 
                padding: isMobile ? '2rem' : '2.5rem', 
                border: '1px solid #f3f4f6', 
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Contact Information</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div style={{ 
                          backgroundColor: 'rgba(255, 32, 32, 0.1)', 
                          padding: '0.75rem', 
                          borderRadius: '9999px', 
                          color: '#FF2020', 
                          marginRight: '1rem' 
                        }}>
                          <Icon />
                        </div>
                        <div>
                          <h3 style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{item.title}</h3>
                          <p style={{ color: '#4b5563' }}>{item.value}</p>
                          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{item.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                padding: '2rem', 
                border: '1px solid #f3f4f6' 
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Connect with us</h2>
                <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
                  Follow us on social media for the latest updates, features, and announcements.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a 
                        key={index}
                        href={social.href}
                        aria-label={social.label} 
                        style={{ 
                          padding: '0.75rem', 
                          backgroundColor: '#f3f4f6', 
                          borderRadius: '9999px', 
                          color: '#4b5563',
                          display: 'flex',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.color = '#FF2020';
                        }}
                        onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.color = '#4b5563';
                        }}
                      >
                        <Icon size={24} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ContactPage 