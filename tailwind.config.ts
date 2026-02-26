module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: '#f7fafc',
          DEFAULT: '#edf2f7',
          dark: '#a0aec0',
        },
        primary: {
          DEFAULT: '#4a5568',
          light: '#718096',
          dark: '#2d3748',
        },
      },
    },
  },
  plugins: [],
}