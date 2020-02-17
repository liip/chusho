module.exports = {
  plugins: {
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': {
      content: [
        './public/**/*.html',
        './src/**/*.vue',
        './config/storybook/preview.js',
      ],
      whitelist: ['html', 'body'],
    },
  },
};
