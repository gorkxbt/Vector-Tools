import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet the <span className="vector-green neon-glow">Founder</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The visionary behind Vector Tools
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-[#39FF14] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-500">Founder</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">
                Founder & Lead Developer
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                With extensive experience in AI, blockchain, and software engineering, our founder built Vector Tools to empower Solana traders with cutting-edge AI and social signal technology.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                After years in traditional finance and crypto markets, they identified a need for more sophisticated, accessible tooling that could combine the power of social signals with on-chain data and AI predictions.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:text-[#39FF14] transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:text-[#39FF14] transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:text-[#39FF14] transition-colors">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 md:p-12 rounded-xl shadow-sm mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto italic">
              "To democratize advanced crypto trading tools by combining AI, social signals, and secure wallet integration in a user-friendly platform."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 vector-green">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible with AI and blockchain technology to provide traders with the most advanced tools.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 vector-green">Security</h3>
              <p className="text-gray-600">
                We prioritize the security of your assets and data, ensuring that your wallet connections and trades are protected with the highest standards.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 vector-green">Community</h3>
              <p className="text-gray-600">
                We're building a community of traders who share insights, strategies, and feedback to help everyone succeed in the Solana ecosystem.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 