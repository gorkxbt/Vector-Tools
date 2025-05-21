import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Colors
    'text-white', 'text-gray-400', 'text-gray-500', 'text-red-500', 'text-green-500', 'text-blue-500',
    'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'text-green-600', 'text-green-700', 'text-green-800', 
    'text-yellow-600', 'text-yellow-700', 'text-yellow-800',
    'text-red-600', 'text-red-700', 'text-red-800',
    'text-blue-600', 'text-blue-700', 'text-blue-800',
    
    'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300',
    'bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-500', 'bg-red-600', 'bg-red-700',
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-500', 'bg-green-600', 'bg-green-700',
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200',
    'bg-blue-50', 'bg-blue-100', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700',
    
    'bg-opacity-10', 'bg-opacity-20', 'bg-opacity-50',
    
    'bg-gradient-to-br', 'bg-gradient-to-r', 'from-pink-500', 'to-purple-700', 'from-red-500', 'to-red-700',
    
    'border-gray-200', 'border-gray-300', 'border-red-200', 'border-red-300',
    'border-green-200', 'border-green-300', 'border-yellow-200', 'border-yellow-300',
    'border-blue-200', 'border-blue-300',
    
    // Sizing and spacing
    'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10',
    'px-1', 'px-2', 'px-3', 'px-4', 'px-5', 'px-6', 'px-8', 'px-10',
    'py-1', 'py-2', 'py-3', 'py-4', 'py-5', 'py-6', 'py-8', 'py-10',
    'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5',
    'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5',
    'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5', 'pl-10',
    'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5',
    
    'my-1', 'my-2', 'my-3', 'my-4', 'my-5',
    'mx-1', 'mx-2', 'mx-3', 'mx-4', 'mx-5', 'mx-auto',
    'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'mt-8',
    'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'mb-8',
    'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5',
    'mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5',
    
    'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-8',
    
    'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-8', 'h-10', 'h-full', 'h-screen',
    'w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-8', 'w-10', 'w-full', 'w-fit', 'w-screen',
    'min-h-screen', 'min-w-full',
    'max-w-[180px]', 'max-w-full', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl', 'max-w-5xl', 'max-w-6xl', 'max-w-7xl',
    
    // Flex
    'flex', 'flex-row', 'flex-col', 'inline-flex', 'flex-1', 'flex-grow', 'flex-shrink-0',
    'justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly',
    'items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch',
    
    // Borders
    'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full', 
    'rounded-t', 'rounded-b', 'rounded-l', 'rounded-r',
    'border', 'border-0', 'border-2', 'border-t', 'border-b', 'border-l', 'border-r',
    
    // Typography
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl',
    'font-normal', 'font-medium', 'font-semibold', 'font-bold',
    'uppercase', 'lowercase', 'capitalize', 'normal-case',
    'truncate', 'text-ellipsis', 'whitespace-nowrap',
    
    // Other
    'shadow', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl',
    'opacity-0', 'opacity-50', 'opacity-100',
    'animate-spin', 'animate-pulse', 'transition', 'transition-colors', 'duration-200', 'duration-300',
    'hover:bg-red-700', 'hover:bg-blue-700', 'hover:bg-gray-50', 'hover:bg-gray-300',
    'hover:text-white', 'hover:text-red-500', 'group-hover:translate-x-1',
    'focus:ring', 'focus:ring-red-200', 'focus:border-red-300',
    'overflow-x-auto', 'overflow-y-auto', 'overflow-x-hidden', 'relative', 'absolute',
    'top-0', 'left-0', 'right-0', 'bottom-0', 'top-3', 'left-3', 'right-3', 'bottom-3',
    'cursor-pointer', 'ring', 'whitespace-nowrap',
    'divide-y', 'divide-gray-200',
    'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5',
    'md:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4',
    'space-y-2', 'space-y-4', 'space-y-8',
  ],
  theme: {
    extend: {
      colors: {
        vectorRed: "#FF2020",
        vectorRedLight: "rgba(255, 32, 32, 0.1)",
        vectorRedDark: "#D61212",
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      boxShadow: {
        'neon': '0 0 5px rgba(255, 32, 32, 0.5), 0 0 15px rgba(255, 32, 32, 0.3)',
        'neon-sm': '0 0 3px rgba(255, 32, 32, 0.5), 0 0 8px rgba(255, 32, 32, 0.3)',
        'neon-lg': '0 0 10px rgba(255, 32, 32, 0.6), 0 0 20px rgba(255, 32, 32, 0.4), 0 0 30px rgba(255, 32, 32, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 32, 32, 0.5), 0 0 15px rgba(255, 32, 32, 0.3)' },
          '50%': { boxShadow: '0 0 8px rgba(255, 32, 32, 0.7), 0 0 20px rgba(255, 32, 32, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      padding: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      },
    },
  },
  plugins: [],
}

export default config; 