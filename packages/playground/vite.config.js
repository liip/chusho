export default {
  optimizeDeps: {
    exclude: ['chusho'],
    include: [
      'highlight.js/lib/core',
      'highlight.js/lib/languages/xml',
      'prettier/esm/standalone',
      'prettier/esm/parser-html',
    ],
  },
};
