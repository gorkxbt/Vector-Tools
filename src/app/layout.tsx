import React from 'react'
import './globals.css'
import { Outfit } from 'next/font/google'
import type { Metadata } from 'next'
import BackgroundWrapper from '@/components/3D/BackgroundWrapper'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Vector Tools - AI-Powered Solana Trading Dashboard',
  description: 'AI-powered crypto trading platform for Solana blockchain with Phantom wallet integration, automated trading strategies, and real-time market signals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className} style={{ 
        minHeight: '100vh', 
        overflowX: 'hidden',
        margin: 0, 
        padding: 0 
      }}>
        <BackgroundWrapper />
        <div style={{ maxWidth: '100vw', overflowX: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
