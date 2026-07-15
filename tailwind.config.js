module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-500)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)'
        },
        accent: {
          emerald: 'var(--accent-emerald)',
          orange: 'var(--accent-orange)',
          crimson: 'var(--accent-crimson)',
          purple: 'var(--accent-purple)'
        },
        panel: 'var(--panel)',
        bg: 'var(--bg)'
      },
      borderRadius: {
        'xxl-24': '24px',
        'xl-20': '20px'
      },
      boxShadow: {
        'card-1': 'var(--card-elevation-1)',
        'card-2': 'var(--card-elevation-2)'
      }
    }
  },
  plugins: []
};
