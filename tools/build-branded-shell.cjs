#!/usr/bin/env node

const { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { basename, join, resolve } = require('node:path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { runBuild } = require('openmrs/dist/commands/build');
const packageJson = require('../package.json');

const brandingConfigPath = resolve(process.cwd(), 'branding', 'openmrs-branding.config.json');
const brandingCssPath = resolve(process.cwd(), 'branding', 'branding.css');
const brandingJsPath = resolve(process.cwd(), 'branding', 'branding.js');
const brandLogoPath = resolve(process.cwd(), 'public', 'file.svg');
const moduleRoutesPath = resolve(process.cwd(), 'dist', 'routes.json');
const moduleBundleName = basename(packageJson.browser);
const brandPageTitle = 'NIDANHS';
const mergedImportmapPath = resolve(process.cwd(), 'dist', 'brand-importmap.json');
const mergedRoutesPath = resolve(process.cwd(), 'dist', 'brand-routes.registry.json');

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('backend', {
      default: 'https://dev3.openmrs.org',
      describe: 'The backend to proxy API requests to.',
      type: 'string',
      coerce: (value) => (value.endsWith('/') ? value.slice(0, -1) : value),
    })
    .option('spa-path', {
      default: '/openmrs/spa/',
      describe: 'The public SPA path for the built shell.',
      type: 'string',
    })
    .option('api-url', {
      default: '/openmrs/',
      describe: 'The API path for the built shell.',
      type: 'string',
    })
    .option('target', {
      default: 'dist',
      describe: 'The directory where the branded shell should be written.',
      type: 'string',
    })
    .option('env', {
      default: 'production',
      describe: 'The build environment.',
      type: 'string',
    })
    .help()
    .parse();

  if (!existsSync(moduleRoutesPath)) {
    throw new Error(`Expected ${moduleRoutesPath} to exist. Run the module build before building the shell.`);
  }

  const target = resolve(process.cwd(), argv.target);
  const spaPath = argv['spa-path'].endsWith('/') ? argv['spa-path'].slice(0, -1) : argv['spa-path'];
  const apiUrl = argv['api-url'].endsWith('/') ? argv['api-url'].slice(0, -1) : argv['api-url'];
  const importmapUrl = `${argv.backend}${spaPath}/importmap.json`;
  const routesUrl = `${argv.backend}${spaPath}/routes.registry.json`;
  const [remoteImportmap, remoteRoutes] = await Promise.all([fetchJson(importmapUrl), fetchJson(routesUrl)]);
  const localRoutes = JSON.parse(readFileSync(moduleRoutesPath, 'utf8'));

  remoteImportmap.imports[packageJson.name] = `./${moduleBundleName}`;
  remoteRoutes[packageJson.name] = localRoutes;
  writeFileSync(mergedImportmapPath, JSON.stringify(remoteImportmap, null, 2));
  writeFileSync(mergedRoutesPath, JSON.stringify(remoteRoutes, null, 2));
  process.env.OMRS_FAVICON = `${spaPath}/assets/file.svg`;

  await runBuild({
    target,
    registry: 'https://registry.npmjs.org/',
    defaultLocale: '',
    importmap: mergedImportmapPath,
    routes: mergedRoutesPath,
    spaPath,
    fresh: false,
    apiUrl,
    pageTitle: brandPageTitle,
    supportOffline: false,
    configUrls: [],
    configPaths: [brandingConfigPath],
    buildConfig: undefined,
    env: argv.env,
    assets: [brandingCssPath, brandingJsPath],
  });

  mkdirSync(join(target, 'assets'), { recursive: true });
  copyFileSync(brandLogoPath, join(target, 'assets', 'file.svg'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
