const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './chusho.config.js',
    './.vuepress/components/**/*.vue',
    './guide/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
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
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
