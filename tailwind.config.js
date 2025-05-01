/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E0F2FF',
          100: '#B8E2FF',
          200: '#8CCBFF',
          300: '#5EB5FF',
          400: '#3A9EFF',
          500: '#0A84FF', // Primary blue
          600: '#0070E0',
          700: '#005BB3',
          800: '#004786',
          900: '#003359',
        },
        success: {
          50: '#E3FCEB',
          100: '#C2F5D3',
          200: '#92EBAE',
          300: '#63DE89',
          400: '#44D36F',
          500: '#30D158', // Success green
          600: '#27AD48',
          700: '#1F873A',
          800: '#18652C',
          900: '#10431D',
        },
        warning: {
          50: '#FFF3E0',
          100: '#FFE5B3',
          200: '#FFD380',
          300: '#FFC14D',
          400: '#FFB226',
          500: '#FF9F0A', // Warning orange
          600: '#D98300',
          700: '#B36A00',
          800: '#8D5100',
          900: '#663A00',
        },
        danger: {
          50: '#FFEBEB',
          100: '#FFC9C9',
          200: '#FF9E9E',
          300: '#FF7373',
          400: '#FF5252',
          500: '#FF453A', // Error red
          600: '#DB3030',
          700: '#B72525',
          800: '#931B1B',
          900: '#701414',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#E3E8EF',
          300: '#CDD5DF',
          400: '#9AA4B2',
          500: '#697586',
          600: '#4B5563',
          700: '#364152',
          800: '#202939',
          900: '#121926',
        },
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      boxShadow: {
        'card': '0 2px 6px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.12)',
        'dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};