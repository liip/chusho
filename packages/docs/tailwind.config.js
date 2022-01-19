module.exports = {
  content: [
    './chusho.config.js',
    './.vuepress/components/**/*.vue',
    './guide/**/*.md',
  ],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
