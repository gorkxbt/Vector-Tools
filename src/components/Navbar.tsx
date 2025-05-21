'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaArrowRight } from 'react-icons/fa'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 10) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }
    }

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }

    // Initialize mobile state
    handleResize()

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Docs', path: '/docs' }
  ]

  // Return null or a placeholder during SSR
  if (!mounted) {
    return (
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '1.25rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              <span style={{ color: '#FF2020' }}>Vector</span>{' '}
              <span>Tools</span>
            </h1>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s',
          padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
          background: isScrolled ? 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))' : 'transparent',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          boxShadow: isScrolled ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <h1 style={{ fontSize: isScrolled ? '1.25rem' : '1.5rem', fontWeight: 'bold', transition: 'all 0.3s' }}>
                <span style={{ color: '#FF2020', textShadow: '0 0 8px rgba(255, 32, 32, 0.5)', transition: 'all 0.3s', fontSize: isScrolled ? '1.25rem' : '1.5rem' }}>Vector</span>{' '}
                <span>Tools</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ display: mounted && !isMobile ? 'flex' : 'none', alignItems: 'center' }}>
              <ul style={{ 
                display: 'flex', 
                alignItems: 'center',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}>
                {navItems.map((item, index) => (
                  <li key={item.path} style={{ 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}>
                    <Link
                      href={item.path}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        transition: 'all 0.2s',
                        backgroundColor: pathname === item.path ? 'rgba(255, 32, 32, 0.1)' : 'transparent',
                        color: pathname === item.path ? '#FF2020' : '#4b5563',
                        fontWeight: pathname === item.path ? '500' : 'normal',
                        boxShadow: pathname === item.path ? '0 0 10px rgba(255, 32, 32, 0.3)' : 'none',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                    >
                      {item.name}
                    </Link>
                    {index < navItems.length - 1 && (
                      <span style={{ 
                        display: 'inline-block',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#d1d5db',
                        margin: '0 0.5rem'
                      }}></span>
                    )}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="btn-primary"
                style={{ 
                  marginLeft: '1.5rem', 
                  fontSize: '0.875rem',
                  display: 'flex', 
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#FF2020',
                  color: '#ffffff',
                  fontWeight: 500,
                  boxShadow: '0 0 15px rgba(255, 32, 32, 0.3)',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>Launch App</span>
                <FaArrowRight style={{ marginLeft: '0.5rem', transition: 'transform 0.2s' }} className="group-hover:translate-x-1" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ 
                display: mounted && isMobile ? 'block' : 'none',
                padding: '0.5rem',
                color: '#4b5563',
                backgroundColor: 'transparent', 
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes style={{ height: '1.5rem', width: '1.5rem' }} />
              ) : (
                <FaBars style={{ height: '1.5rem', width: '1.5rem' }} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              zIndex: 40,
              background: 'var(--glass-effect-bg, rgba(255, 255, 255, 0.8))',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid #e5e7eb',
              display: mounted && isMobile ? 'block' : 'none'
            }}
          >
            <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
              <ul style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}>
                {navItems.map((item) => (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    <Link
                      href={item.path}
                      style={{
                        display: 'block',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '1.125rem',
                        backgroundColor: pathname === item.path ? 'rgba(255, 20, 20, 0.1)' : 'transparent',
                        color: pathname === item.path ? '#FF2020' : '#4b5563',
                        fontWeight: pathname === item.path ? 500 : 'normal',
                        textDecoration: 'none'
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ paddingTop: '1rem' }}
                >
                  <Link
                    href="/dashboard"
                    className="btn-primary"
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: '#FF2020',
                      color: '#ffffff',
                      fontWeight: 500,
                      boxShadow: '0 0 15px rgba(255, 20, 20, 0.3)',
                      textDecoration: 'none'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Launch App <FaArrowRight style={{ marginLeft: '0.5rem' }} />
                    </span>
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Space for the fixed header */}
      <div style={{ height: isScrolled ? '4rem' : '5rem' }} />
    </>
  )
}

export default Navbar 