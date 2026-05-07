/** @type {import('tailwindcss').Config} */
// Force Vite HMR
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F2F7F4',
          100: '#E0EFE4',
          200: '#BDE3CA',
          300: '#7FB77E',
          400: '#54A05B',
          500: '#3C8A50',
          600: '#2F6B3F',
          700: '#235130',
          800: '#1A3F26',
          900: '#122D1B',
        },
        secondary: {
          50: '#FFFDF2',
          100: '#FFF6C0',
          200: '#FDE48D',
          300: '#FAD25B',
          400: '#F8CE44',
          500: '#F7C85C',
          600: '#DFA736',
          700: '#B58221',
          800: '#8A6216',
          900: '#63450E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}