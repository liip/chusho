const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer: createViteServer } = require('vite');

const PORT = 3000;

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('/src/entry-server.js');
      const [appHtml, teleports] = await render(url);

      let html = template.replace(`<!--ssr-outlet-->`, appHtml);

      if (teleports) {
        Object.keys(teleports).forEach((id) => {
          html = html.replace(`<!--${id}-->`, teleports[id]);
        });
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT);

  // eslint-disable-next-line no-console
  console.info(`Server started, go to http://localhost:${PORT}`);
}

createServer();
