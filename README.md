# Angry Pixel Engine Skeleton

## About

A starter template for building a game with the [Angry Pixel Engine](https://angrypixel.gg/engine) and shipping it to three targets from a single codebase: **browser**, **desktop** (Electron) and **mobile** (Expo / React Native).

It's an [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) monorepo — one repository holding several packages that are developed together:

| Package | Path | Role |
| --- | --- | --- |
| `@angry-pixel-app/game` | `packages/game` | Your game code (scenes, entities, components, systems). The single source of truth. |
| `@angry-pixel-app/browser` | `apps/browser` | [Vite](https://vite.dev) web app. Imports the game package and runs it in the browser. This is also the build consumed by the other targets. |
| `@angry-pixel-app/desktop` | `apps/desktop` | Electron shell that loads the browser app. |
| `@angry-pixel-app/mobile` | `apps/mobile` | Expo app that renders the browser app inside a native WebView. |

Desktop and mobile don't re-implement the game; they wrap the browser build. You write gameplay once in `packages/game`.

## Setup

Requirements:

- [Node.js](https://nodejs.org) LTS and npm.
- For mobile: the [EAS CLI](https://docs.expo.dev/eas/) (`npm install -g eas-cli`) and an [Expo](https://expo.dev) account, only needed for builds.

Install all workspace dependencies from the repository root (a single install covers every package):

```bash
npm install
```

## Development environment

### Browser

```bash
npm run dev:browser
```

Starts the Vite dev server at `http://localhost:3000` with hot reload.

### Desktop

The desktop shell loads the browser dev server, so run the browser first in one terminal:

```bash
npm run dev:browser
```

Then, in a second terminal:

```bash
npm run dev:desktop
```

### Mobile

The mobile app loads the browser dev server through a WebView. From a physical device, `localhost` points at the phone itself, so you must use your computer's local network address.

1. Start the browser dev server:

   ```bash
   npm run dev:browser
   ```

2. Create `apps/mobile/.env` (git-ignored) pointing at your machine's LAN IP:

   ```bash
   EXPO_PUBLIC_GAME_URL=http://192.168.1.42:3000
   ```

   Replace `192.168.1.42` with your computer's address on the local network. If unset, the app falls back to `http://localhost:3000`.

3. Start Expo:

   ```bash
   npm run dev:mobile
   ```

4. Install **[Expo Go](https://expo.dev/go)** on your phone and scan the QR code from the terminal to run the app. The phone and computer must be on the same network.

## Build

### Browser

```bash
npm run build:browser
```

Outputs a static site to `apps/browser/dist`.

### Desktop

```bash
npm run build:desktop
```

Builds the browser app and packages it with [electron-builder](https://www.electron.build). Installers are written to `apps/desktop/out` (`.dmg` on macOS, NSIS on Windows, AppImage on Linux).

### Android

Builds run on [EAS Build](https://docs.expo.dev/build/introduction/) and embed the browser build inside the app.

1. Edit `apps/mobile/app.json` with your own Expo project data — at minimum `name`, `slug`, `owner`, `android.package`, and `extra.eas.projectId`.
2. Build:

   ```bash
   npm run build:android
   ```

   This bundles the browser build into the mobile app and starts the EAS Android build (`preview` profile → APK). For a store-ready bundle use the `production` profile via `npm run eas:build:android:production -w @angry-pixel-app/mobile`.

### iOS

TBD.

## Engine docs

Full engine documentation: https://angrypixel.gg/engine
