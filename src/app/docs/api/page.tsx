'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ApiDocsPage = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main docs page with API section selected
    router.push('/docs?section=api')
  }, [router])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '50vh', 
      padding: '2rem' 
    }}>
      <div style={{ 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 20, 20, 0.05)',
        padding: '2rem',
        borderRadius: '0.5rem',
        maxWidth: '30rem'
      }}>
        <h1 style={{ marginBottom: '1rem' }}>Redirecting to API Documentation...</h1>
        <p>If you are not redirected automatically, please click <a href="/docs?section=api" style={{ color: '#FF2020', textDecoration: 'underline' }}>here</a>.</p>
      </div>
    </div>
  )
}

export default ApiDocsPage 