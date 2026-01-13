export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C5A059',
        champagne: '#E8D3A3',
        midnight: '#0A0A0B',
        charcoal: '#161618',
        'charcoal-light': '#1F1F22',
        'amber-glow': '#FFBF00',
        'glass-dark': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'silver-text': '#A1A1AA',
        'white-text': '#F4F4F5',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
