import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import JSZip from 'jszip';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const webDistZip = require('../assets/web-dist.zip');

function base64ToUint8Array(b64: string): Uint8Array {
  const raw = globalThis.atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return arr;
}

function normalizeZipPath(name: string): string {
  return name.replace(/\\/g, '/').replace(/^(\.\/)+/, '');
}

/**
 * Extracts the embedded browser build (Vite dist) and returns a file:// URI to index.html.
 */
export async function extractBundledWebDist(): Promise<{ htmlUri: string; readAccessDir: string }> {
  const asset = Asset.fromModule(webDistZip);
  await asset.downloadAsync();
  const zipUri = asset.localUri ?? asset.uri;
  if (!zipUri) {
    throw new Error('Could not resolve bundled web-dist.zip');
  }

  const b64 = await FileSystem.readAsStringAsync(zipUri, { encoding: 'base64' });
  const zip = await JSZip.loadAsync(base64ToUint8Array(b64));

  const doc = FileSystem.documentDirectory;
  if (!doc) {
    throw new Error('documentDirectory is not available');
  }

  const destRoot = `${doc}web-dist/`;
  try {
    await FileSystem.deleteAsync(destRoot, { idempotent: true });
  } catch {
    /* ignore */
  }
  await FileSystem.makeDirectoryAsync(destRoot, { intermediates: true });

  for (const rawName of Object.keys(zip.files)) {
    const entry = zip.files[rawName];
    if (!entry || entry.dir) {
      continue;
    }
    const name = normalizeZipPath(rawName);
    if (name.includes('..')) {
      continue;
    }
    const outPath = destRoot + name;
    const parent = outPath.includes('/') ? outPath.slice(0, outPath.lastIndexOf('/')) : destRoot;
    if (parent.length >= destRoot.length) {
      await FileSystem.makeDirectoryAsync(parent, { intermediates: true });
    }
    const fileB64 = await entry.async('base64');
    await FileSystem.writeAsStringAsync(outPath, fileB64, { encoding: 'base64' });
  }

  const indexPath = `${destRoot}index.html`;
  const info = await FileSystem.getInfoAsync(indexPath);
  if (!info.exists) {
    throw new Error('Bundled web-dist.zip did not contain index.html');
  }

  return { htmlUri: indexPath, readAccessDir: doc };
}
