/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F2EC',
          300: '#EDE8E0',
          400: '#E0DAD0',
          500: '#D0C9BC',
        },
        charcoal: {
          50: '#F5F5F4',
          100: '#E7E5E3',
          200: '#C9C6C2',
          300: '#A09D98',
          400: '#6B6864',
          500: '#4A4845',
          600: '#3A3835',
          700: '#2B2927',
          800: '#1C1B1A',
          900: '#121111',
        },
        champagne: {
          50: '#FAF7F0',
          100: '#F2EBDB',
          200: '#E5D7B8',
          300: '#D4BE8E',
          400: '#C2A868',
          500: '#B8A57E',
          600: '#A89060',
          700: '#8A754E',
          800: '#6E5D3D',
          900: '#524530',
        },
        accent: {
          success: '#5B7A5A',
          warning: '#B8956A',
          error: '#9E5B5B',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'hero': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.15' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '10px',
        'xl': '16px',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(28, 27, 26, 0.04)',
        'card': '0 4px 30px rgba(28, 27, 26, 0.06)',
        'elevated': '0 12px 50px rgba(28, 27, 26, 0.10)',
        'inner-soft': 'inset 0 1px 2px rgba(28, 27, 26, 0.03)',
      },
      transitionDuration: {
        'lux': '700ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'lux': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-only': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in-only': 'fade-in-only 0.5s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'slide-down': 'slide-down 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'shimmer': 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [],
};
