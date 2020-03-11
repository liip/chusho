module.exports = {
  plugins: {
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': {
      content: [
        './public/**/*.html',
        './src/**/*.{vue,ts,js}',
        './config/storybook/preview.js',
      ],
      whitelist: ['html', 'body'],
      whitelistPatterns: [
        /:w-/, // Responsive widths are generated for CFlexItem
      ],
    },
  },
};
