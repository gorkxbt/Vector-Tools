'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaTwitter, FaTelegram, FaDiscord, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
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
  
  return (
    <>
      <Navbar />
      <main className="py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact <span className="vector-green neon-glow">Us</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions about Vector Tools? We're here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
                    <p className="font-medium">Thank you for your message!</p>
                    <p>We'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                        placeholder="Your Email"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-100 mb-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#39FF14]/10 p-3 rounded-full text-[#39FF14] mr-4">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">support@vectortools.io</p>
                      <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#39FF14]/10 p-3 rounded-full text-[#39FF14] mr-4">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-gray-600">Global & Remote</p>
                      <p className="text-sm text-gray-500 mt-1">We operate fully online. Our team is distributed worldwide.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#39FF14]/10 p-3 rounded-full text-[#39FF14] mr-4">
                      <FaClock />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Operating Hours</h3>
                      <p className="text-gray-600">24/7 Support</p>
                      <p className="text-sm text-gray-500 mt-1">Our systems run 24/7, just like the blockchain.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold mb-4">Connect with us</h2>
                <p className="text-gray-600 mb-6">
                  Follow us on social media for the latest updates, features, and announcements.
                </p>
                
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:text-[#39FF14] transition-colors">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:text-[#39FF14] transition-colors">
                    <FaTelegram size={24} />
                  </a>
                  <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:text-[#39FF14] transition-colors">
                    <FaDiscord size={24} />
                  </a>
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