/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#000000',
          'black-dark': '#0A0A0A',
          'black-darker': '#050505',
          red: '#FF0000',
          'red-dark': '#C90000',
          'red-darker': '#3A0000',
          'red-light': '#FF1A1A',
          'red-lighter': '#FF4D4D',
          'red-alpha': 'rgba(255, 0, 0, 0.6)',
          gray: '#A0A0A0',
        },
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 2s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #FF0000, 0 0 10px #FF0000, 0 0 15px #FF0000' },
          '100%': { textShadow: '0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #FF0000' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink-caret': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#FF0000' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'cyber-red': '0 0 5px rgba(255, 0, 0, 0.6)',
        'cyber-red-sm': '0 0 3px rgba(255, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};

