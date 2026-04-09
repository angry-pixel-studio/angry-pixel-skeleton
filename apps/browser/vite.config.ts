import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gameSrc = path.resolve(__dirname, '../../packages/game/src');

export default defineConfig({
  plugins: [tsconfigPaths()],
  base: './',
  publicDir: path.resolve(__dirname, '../../packages/game/public'),
  resolve: {
    alias: {
      '@config': path.join(gameSrc, 'config'),
      '@component': path.join(gameSrc, 'component'),
      '@entity': path.join(gameSrc, 'entity'),
      '@scene': path.join(gameSrc, 'scene'),
      '@system': path.join(gameSrc, 'system'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
