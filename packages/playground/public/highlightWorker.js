self.importScripts(
  'https://unpkg.com/prettier@2.2.1/standalone.js',
  'https://unpkg.com/prettier@2.2.1/parser-html.js',
  'https://unpkg.com/@highlightjs/cdn-assets@10.4.1/highlight.min.js',
  'https://unpkg.com/@highlightjs/cdn-assets@10.4.1/languages/xml.min.js'
);

self.addEventListener('message', (e) => {
  const code = self.hljs.highlight(
    'xml',
    self.prettier.format(e.data, {
      parser: 'html',
      plugins: self.prettierPlugins,
      htmlWhitespaceSensitivity: 'ignore',
    })
  ).value;

  self.postMessage(code);
});
