'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Roadmap from '@/components/Roadmap'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <Features />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
