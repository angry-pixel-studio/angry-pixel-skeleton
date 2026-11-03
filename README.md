# Angry Pixel Engine Skeleton

## About

A starter template for building a game with the [Angry Pixel Engine](https://angrypixel.gg/engine) and shipping it to three targets from a single codebase: **browser**, **desktop** (Electron) and **mobile** (Expo / React Native).

It's an [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) monorepo — one repository holding several packages that are developed together:

| Package                         | Path            | Role                                                                                                                                         |
| ------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `@angry-pixel-skeleton/game`    | `packages/game` | Your game code (scenes, entities, components, systems). The single source of truth.                                                          |
| `@angry-pixel-skeleton/browser` | `apps/browser`  | [Vite](https://vite.dev) web app. Imports the game package and runs it in the browser. This is also the build consumed by the other targets. |
| `@angry-pixel-skeleton/desktop` | `apps/desktop`  | Electron shell that loads the browser app.                                                                                                   |
| `@angry-pixel-skeleton/mobile`  | `apps/mobile`   | Expo app that renders the browser app inside a native WebView.                                                                               |

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
npm run dev
```

Starts the Vite dev server at `http://localhost:3000` with hot reload.

### Desktop

The desktop shell loads the browser dev server, so run the browser first in one terminal:

```bash
npm run dev
```

Then, in a second terminal:

```bash
npm run dev:desktop
```

#### Window size and mode

The Electron window is configured in `apps/desktop/main.cjs`, inside `createWindow()`. By default the dev app opens as a fixed **1920×1080 window**, and the packaged app opens **fullscreen**:

```js
const isDev = !app.isPackaged;

const win = new BrowserWindow({
  fullscreen: !isDev, // fullscreen only in the packaged app
  resizable: false,
  width: 1920,
  height: 1080,
  useContentSize: true, // width/height are the game area, excluding the title bar
  center: true,
  // ...
});

// ...

if (!isDev) {
  win.maximize();
}
```

- **Resolution:** change `width` and `height`. With `useContentSize: true` they set the size of the page the game draws into. Set it to `false` if you want them to include the window frame and title bar instead.
- **Windowed or fullscreen:** `fullscreen` controls the mode. Use `fullscreen: true` to always run fullscreen, or `fullscreen: false` together with removing the `win.maximize()` call to always run windowed, including in the packaged app.
- **Resizable window:** set `resizable: true` to let the player resize the window.

The window size is separate from the game's own resolution, which is set by `width` and `height` in `packages/game/src/config/gameConfig.ts`. The game is scaled to fit the window at a 16:9 aspect ratio (set by `#app` in `apps/browser/src/style.css`), so a window with a different aspect ratio shows black bars. If you change the game's aspect ratio, update the `16/9` and `9/16` values there too.

### Mobile

The mobile app loads the browser dev server through a WebView. From a physical device, `localhost` points at the phone itself, so you must use your computer's local network address.

1. Start the browser dev server:

   ```bash
   npm run dev
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
npm run build
```

Outputs a static site to `apps/browser/dist`.

### Desktop

Each script builds the browser app and packages it with [electron-builder](https://www.electron.build) for one platform. Installers are written to `apps/desktop/out`.

| Command                       | Platform | Output                                    |
| ----------------------------- | -------- | ----------------------------------------- |
| `npm run build:desktop:mac`   | macOS    | `.dmg`                                    |
| `npm run build:desktop:win`   | Windows  | Portable `.exe` (runs without installing) |
| `npm run build:desktop:linux` | Linux    | `.AppImage`                               |

Notes:

- **macOS** builds only work on a Mac. Without an Apple Developer ID certificate the app is unsigned, and other Macs will warn before opening it. See [code signing](https://www.electron.build/code-signing).
- **Windows** builds a portable `.exe`: a single file players run directly, with no installation. The portable build works from macOS or Linux. If you switch to another Windows target, some need [Wine](https://www.winehq.org) on those systems (`brew install --cask wine-stable` on macOS) or the [electron-builder Docker image](https://www.electron.build/multi-platform-build). Without signing, Windows SmartScreen will warn players before the app opens.
- **Linux** builds work from macOS or Linux.
- **CPU architecture:** Windows and Linux builds are always `x64`, which is what most PCs use (set by `--x64` in the `build:win` and `build:linux` scripts in `apps/desktop/package.json`). macOS builds match the Mac you build on, so an Apple Silicon Mac produces `arm64`.
- The app icon is `apps/desktop/build/icon.png`, set for each platform by `build.mac.icon`, `build.win.icon` and `build.linux.icon` in `apps/desktop/package.json`. Use a square PNG of **1024×1024** pixels (macOS requires at least 512×512).

### Android

Builds run on [EAS Build](https://docs.expo.dev/build/introduction/) and embed the browser build inside the app.

1. Edit `apps/mobile/app.json` with your own Expo project data — at minimum `name`, `slug`, `owner`, `android.package`, and `extra.eas.projectId`.
2. Build:

   ```bash
   npm run build:android
   ```

   This bundles the browser build into the mobile app and starts the EAS Android build (`preview` profile → APK). For a store-ready bundle use the `production` profile via `npm run eas:build:android:production -w @angry-pixel-skeleton/mobile`.

### iOS

TBD.

## Engine docs

Full engine documentation: https://angrypixel.gg/engine
