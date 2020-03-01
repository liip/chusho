module.exports = {
  plugins: {
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': {
      content: [
        './public/**/*.html',
        './src/**/*.vue',
        './src/**/*.ts',
        './config/storybook/preview.js',
      ],
      whitelist: ['html', 'body'],
    },
  },
};
