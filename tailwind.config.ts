import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ec4899',
          50: '#fdf2f8',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          900: '#831843',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient':
          'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #9d174d 100%)',
      },
      boxShadow: {
        glow: '0 0 24px -2px rgba(236, 72, 153, 0.45)',
        'glow-lg': '0 0 60px -8px rgba(236, 72, 153, 0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'loader-slide': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(260%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        shimmer: 'shimmer 1.6s infinite',
        'loader-slide': 'loader-slide 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
