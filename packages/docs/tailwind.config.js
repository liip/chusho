module.exports = {
  content: [
    './chusho.config.js',
    './.vuepress/components/**/*.vue',
    './guide/**/*.md',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
