module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vectorRed: "#FF2020",
        vectorRedLight: "rgba(255, 32, 32, 0.1)",
        vectorRedDark: "#D61212",
      },
      boxShadow: {
        'neon': '0 0 5px rgba(255, 32, 32, 0.5), 0 0 15px rgba(255, 32, 32, 0.3)',
        'neon-sm': '0 0 3px rgba(255, 32, 32, 0.5), 0 0 8px rgba(255, 32, 32, 0.3)',
        'neon-lg': '0 0 10px rgba(255, 32, 32, 0.6), 0 0 20px rgba(255, 32, 32, 0.4), 0 0 30px rgba(255, 32, 32, 0.2)',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 32, 32, 0.5), 0 0 15px rgba(255, 32, 32, 0.3)' },
          '50%': { boxShadow: '0 0 8px rgba(255, 32, 32, 0.7), 0 0 20px rgba(255, 32, 32, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}; 