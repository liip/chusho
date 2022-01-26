const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./chusho.config.js', './index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        black: {
          default: '#000',
          50: 'rgba(0,0,0,.5)',
        },
        accent: {
          100: '#FEF2DD',
          200: '#FCDEAC',
          300: '#F9CB7B',
          400: '#F7B84A',
          500: '#F5A519',
          600: '#D38909',
          700: '#A26907',
          800: '#714905',
          900: '#402903',
        },
      },
    },
  },
};
