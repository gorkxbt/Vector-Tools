'use client'

import dynamic from 'next/dynamic'

// Use dynamic import for the 3D components to avoid SSR issues
const TradingBackground = dynamic(
  () => import('@/components/3D/TradingBackground'),
  { ssr: false }
)

export default function BackgroundWrapper() {
  return <TradingBackground />
} 