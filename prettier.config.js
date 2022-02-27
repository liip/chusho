module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  importOrder: [
    '/types',
    '/mixins',
    '/composables',
    '/utils',
    '/components',
    '/directives',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
