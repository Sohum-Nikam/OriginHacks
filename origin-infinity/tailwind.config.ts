import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#fdfdfd',
        'cream': '#fcf9f2',
        'champagne': '#f9f3e6',
        'light-mocha': '#e8e1d4',
        'warm-gold': '#d4c09a',
        'golden-glow': '#e6d2a8',
        'deep-mocha': '#5d5444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 12s ease-in-out infinite',
        'cinematic-fade': 'cinematicFadeIn 1.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'blur-focus': 'blurToFocus 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'ripple-advanced': 'rippleExpand 2.5s cubic-bezier(0.22, 0.61, 0.36, 1) infinite',
        'sweep': 'sweep 3s infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-pulse': 'wavePulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1)',
            opacity: '0.3',
          },
          '25%': { 
            transform: 'translateY(-30px) translateX(10px) rotate(90deg) scale(1.1)',
            opacity: '0.5',
          },
          '50%': { 
            transform: 'translateY(-60px) translateX(-10px) rotate(180deg) scale(0.9)',
            opacity: '0.7',
          },
          '75%': { 
            transform: 'translateY(-30px) translateX(-20px) rotate(270deg) scale(1.05)',
            opacity: '0.4',
          },
        },
        cinematicFadeIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) scale(0.95)',
            filter: 'blur(4px)',
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)',
          },
        },
        blurToFocus: {
          '0%': { 
            filter: 'blur(12px) brightness(1.2)',
            opacity: '0',
          },
          '100%': { 
            filter: 'blur(0px) brightness(1)',
            opacity: '1',
          },
        },
        rippleExpand: {
          '0%': { 
            width: '0', 
            height: '0', 
            opacity: '0.8',
          },
          '100%': { 
            width: '400px', 
            height: '400px', 
            opacity: '0',
          },
        },
        sweep: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 70%' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        wavePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.2)', opacity: '0.3' },
        }
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'glass-light': '0 4px 24px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
      transitionTimingFunction: {
        'flowing': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'elegant': 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        'cinematic': 'cubic-bezier(0.23, 1, 0.32, 1)',
      }
    },
  },
  plugins: [],
}
export default config