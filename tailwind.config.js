/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          blue: '#007AFF',
          red: '#FF3B30',
          green: '#34C759',
          orange: '#FF9500',
          yellow: '#FFCC00',
          purple: '#AF52DE',
          pink: '#FF2D55',
          gray: {
            1: '#8E8E93',
            2: '#AEAEB2',
            3: '#C7C7CC',
            4: '#D1D1D6',
            5: '#E5E5EA',
            6: '#F2F2F7',
          }
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'ios-caption': ['12px', '16px'],
        'ios-footnote': ['13px', '18px'],
        'ios-body': ['17px', '22px'],
        'ios-callout': ['16px', '21px'],
        'ios-title3': ['20px', '25px'],
        'ios-title2': ['22px', '28px'],
        'ios-title': ['28px', '34px'],
        'ios-large': ['34px', '41px'],
      },
      borderRadius: {
        'ios': '10px',
        'ios-lg': '14px',
        'ios-xl': '20px',
      },
      boxShadow: {
        'ios': '0 0 0 0.5px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.08)',
        'ios-card': '0 0 0 0.5px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.12)',
        'ios-modal': '0 0 0 0.5px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}
