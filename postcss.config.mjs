/** @type {import('postcss-load-config').Config} */

// This config is used by Next.js for processing CSS
// Currently using inline styles instead of Tailwind

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
