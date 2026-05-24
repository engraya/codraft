import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        xs: '360px',
      },
    },
    extend: {
      colors: {
        // Surface scale — near-black to elevated dark
        dark: {
          100: '#09090B',   // Page background
          200: '#111113',   // Card / panel background
          300: '#18181B',   // Hover / subtle elevated
          350: '#1C1C1F',   // Stronger elevated
          400: '#27272A',   // Borders, inputs
          500: '#3F3F46',   // Strong borders, dividers
        },
        // Accent — refined indigo-blue (not electric tutorial-blue)
        blue: {
          100: '#A1A1AA',   // Muted text (was blue-tinted, now neutral)
          400: '#6581F5',   // Lighter accent
          500: '#4F6FE8',   // Primary action
        },
        // Destructive
        red: {
          400: '#F87171',
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        doc: 'url(/assets/images/doc.png)',
        modal: 'url(/assets/images/modal.png)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.18s ease-out',
        'scale-in': 'scale-in 0.15s ease-out',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.5)',
        modal: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
        'input-focus': '0 0 0 2px rgba(79,111,232,0.25)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
