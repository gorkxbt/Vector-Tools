import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ParticleBackground from '@/components/ParticleBackground'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
    <html lang="en">
      <body className={`${inter.className} min-h-screen overflow-x-hidden`} style={{ margin: 0, padding: 0 }}>
        <ParticleBackground />
        <div style={{ maxWidth: '100vw', overflowX: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
