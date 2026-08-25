/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // The app's own Material indigo and amber, so a page about PMKS+ is
        // painted in the colours PMKS+ is painted in.
        indigo: {
          50: '#E8EAF6',
          100: '#c5cae9',
          200: '#9fa8da',
          500: '#3f51b5',
          700: '#303e9f',
          900: '#1a237e',
          950: '#151C63',
        },
        amber: {
          400: '#ffca28',
        },
        // Material's neutral ramp, plus the two cool greys the app rules its
        // canvas with — every hairline on this page is one of them.
        ink: {
          900: '#212121',
          700: '#424242',
          600: '#616161',
          500: '#757575',
          400: '#9E9E9E',
          200: '#E0E2EC',
          100: '#E6E6EA',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'Helvetica Neue', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        // One radius across the page: 5px on anything you press, 10px on
        // anything that holds a picture.
        DEFAULT: '5px',
        card: '10px',
      },
      boxShadow: {
        // Material elevation 6, which is what the app's own floating cards wear.
        card: '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)',
      },
      maxWidth: {
        page: '1440px',
      },
    },
  },
}
