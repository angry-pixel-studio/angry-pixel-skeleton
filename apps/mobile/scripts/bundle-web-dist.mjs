#!/usr/bin/env node
/**
 * Zips apps/browser/dist into apps/mobile/assets/web-dist.zip for embedding in the native app (like Electron loading dist).
 * Run from repo root: npm run bundle:web-for-mobile
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mobileRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(mobileRoot, '..', '..');
const browserDist = path.join(repoRoot, 'apps', 'browser', 'dist');
const outZip = path.join(mobileRoot, 'assets', 'web-dist.zip');

const args = process.argv.slice(2);
const skipBuild = args.includes('--skip-build');

if (!skipBuild) {
  execSync('npm run build -w @angry-pixel-skeleton/game && npm run build -w @angry-pixel-skeleton/browser', {
    cwd: repoRoot,
    stdio: 'inherit',
  });
}

if (!fs.existsSync(path.join(browserDist, 'index.html'))) {
  console.error('Missing apps/browser/dist/index.html. Build the browser app first.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(outZip), { recursive: true });
if (fs.existsSync(outZip)) {
  fs.unlinkSync(outZip);
}

if (os.platform() === 'win32') {
  const distWin = browserDist.replace(/'/g, "''");
  const zipWin = outZip.replace(/'/g, "''");
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path (Join-Path '${distWin}' '*') -DestinationPath '${zipWin}' -Force"`,
    { stdio: 'inherit' },
  );
} else {
  execSync(`cd "${browserDist}" && zip -r -q "${outZip}" .`, { stdio: 'inherit' });
}

console.log('Wrote', outZip);
