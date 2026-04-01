#!/usr/bin/env node

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { resolve } = require('node:path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

function removeTrailingSlash(value) {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function escapeRegExp(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('port', {
      default: 8080,
      describe: 'The port where the branded shell should run.',
      type: 'number',
    })
    .option('host', {
      default: 'localhost',
      describe: 'The host name or IP for the server to use.',
      type: 'string',
    })
    .option('backend', {
      default: 'https://dev3.openmrs.org',
      describe: 'The backend to proxy API requests to.',
      type: 'string',
      coerce: (value) => (value.endsWith('/') ? value.slice(0, -1) : value),
    })
    .option('add-cookie', {
      default: '',
      describe: 'Additional cookies to provide when proxying.',
      type: 'string',
    })
    .option('spa-path', {
      default: '/openmrs/spa/',
      describe: 'The path of the application on the target server.',
      type: 'string',
    })
    .option('api-url', {
      default: '/openmrs/',
      describe: 'The URL of the API. Can be a path if the API is on the same target server.',
      type: 'string',
    })
    .option('open', {
      default: false,
      describe: 'Immediately opens the SPA page URL in the browser.',
      type: 'boolean',
    })
    .help()
    .parse();

  const host = argv.host;
  const port = argv.port;
  const backend = argv.backend;
  const addCookie = argv['add-cookie'];
  const spaPath = removeTrailingSlash(argv['spa-path']);
  const apiUrl = removeTrailingSlash(argv['api-url']);
  const indexHtmlPathMatcher = new RegExp(`${escapeRegExp(spaPath)}(/(?!.*\\.(js|woff2?|json|.{2,3}$)).*)?$`);
  const app = express();
  const source = resolve(process.cwd(), 'dist');
  const index = resolve(source, 'index.html');
  const pageUrl = `http://${host}:${port}${spaPath}`;

  app.get([spaPath, `${spaPath}/`, indexHtmlPathMatcher], (_, res) => {
    res.sendFile(index);
  });

  app.use(spaPath, express.static(source, { index: false }));
  app.use(
    apiUrl,
    createProxyMiddleware(
      (pathname) => new RegExp(`${escapeRegExp(apiUrl)}/.*`).test(pathname) && !indexHtmlPathMatcher.test(pathname),
      {
        target: backend,
        changeOrigin: true,
        onProxyReq(proxyReq) {
          if (addCookie) {
            const origCookie = proxyReq.getHeader('cookie');
            const newCookie = `${origCookie};${addCookie}`;
            proxyReq.setHeader('cookie', newCookie);
          }
        },
      },
    ),
  );

  app.listen(port, host, () => {
    console.log(`[SOUL] Branded shell available at ${pageUrl}`);

    if (argv.open) {
      import('open').then(({ default: openBrowser }) => {
        openBrowser(pageUrl, { wait: false }).catch(() => {});
      });
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
