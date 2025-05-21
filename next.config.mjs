/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore TypeScript and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Add support for serving static files
  images: {
    domains: ['assets.example.com'],
  },
  
  // Transpile packages that need it
  transpilePackages: ['three', 'gsap', 'react-icons'],
  
  // Server compilation options
  experimental: {
    serverComponentsExternalPackages: ['three', 'react-icons']
  },
  
  // Webpack configuration
  webpack: (config) => {
    // Handle node-specific modules for client-side
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    
    return config;
  },
};

export default nextConfig; 