# Angry Pixel multiplatform skeleton

Monorepo for games built with [Angry Pixel Engine](https://github.com/angry-pixel-studio/angry-pixel-engine): shared game code in `packages/game`, and thin shells for **browser** (Vite), **desktop** (Electron), and **mobile** (Expo + WebView). Workspaces are plain **npm workspaces** (no Turborepo).

## Layout

| Path | Role |
|------|------|
| `packages/game` | Scenes, systems, entities, config, `startGame()` — depends on `angry-pixel` |
| `apps/browser` | Vite app; serves `packages/game/public` as static assets |
| `apps/desktop` | Electron; dev loads `http://localhost:3000`, production loads `apps/browser/dist` |
| `apps/mobile` | Expo; **release** loads embedded `apps/browser/dist` (zipped); **dev** uses the Vite URL |

## Setup

```bash
npm install
```

## Develop — browser

```bash
npm run dev:browser
```

Open [http://localhost:3000](http://localhost:3000). Append `?debug=1` for collider / mouse debug overlays (same idea as the upstream [skeleton](https://github.com/angry-pixel-studio/angry-pixel-skeleton-ts)).

The dev server binds to all interfaces (`host: true`) so phones on your LAN can reach it.

## Develop — desktop

1. Terminal A: `npm run dev:browser`
2. Terminal B: `npm run dev:desktop`

Electron opens the Vite dev URL when the app is not packaged (`!app.isPackaged`).

**Production-style check:** build the browser app, then point Electron at the `dist` folder (unpackaged runs default to the dev server, so set `ELECTRON_USE_DIST=1`). Vite uses `base: './'` so assets work under `file://`.

```bash
npm run build -w @angry-pixel-multiplatform/browser
ELECTRON_USE_DIST=1 npm run dev -w @angry-pixel-multiplatform/desktop
```

On Windows (cmd): `set ELECTRON_USE_DIST=1&& npm run dev -w @angry-pixel-multiplatform/desktop`

## Develop — mobile (WebView)

In **`__DEV__`** (Expo Go / dev client), the WebView loads **`EXPO_PUBLIC_GAME_URL`** (Vite), not the embedded bundle.

1. Start the browser dev server: `npm run dev:browser`
2. On a physical device, point at your machine’s LAN IP (not `localhost`).

Copy [`apps/mobile/.env.example`](apps/mobile/.env.example) to `apps/mobile/.env` and set:

```bash
EXPO_PUBLIC_GAME_URL=http://192.168.x.x:3000
```

Then:

```bash
npm run dev:mobile
```

**Android emulator:** use `http://10.0.2.2:3000` to reach the host loopback.

**Release / EAS builds:** the app embeds the **same output as Electron** — `apps/browser/dist` is zipped to [`apps/mobile/assets/web-dist.zip`](apps/mobile/assets/web-dist.zip), shipped in the binary, extracted on first open, and loaded as `file://` (see [`apps/mobile/src/bundledWeb.ts`](apps/mobile/src/bundledWeb.ts)). Regenerate the zip after web changes:

```bash
npm run bundle:web-for-mobile
```

`EXPO_PUBLIC_FORCE_REMOTE_URL=1` forces the remote URL even in release (see `.env.example`).

**iOS / Android:** cleartext HTTP in `app.json` is for **dev** URLs only; embedded `file://` does not need network.

### Android APK (EAS Build)

The mobile app is linked to [Expo Application Services](https://docs.expo.dev/build/introduction/). Config lives in [`apps/mobile/eas.json`](apps/mobile/eas.json).

**Git:** EAS expects the monorepo root to be a **git** repository (`git init` at the repo root is enough). Commit your work as you normally would; builds use the tracked project state.

1. Install and log in: `npm i -g eas-cli` and `eas login` (already done on your machine).
2. **Project link** — `eas init` was run from `apps/mobile`; [`app.json`](apps/mobile/app.json) includes `extra.eas.projectId` and `owner`.
3. **Build profiles** — `preview` and `development` produce an **APK** (`android.buildType: "apk"`). `production` builds an **AAB** (Play Store default).

From the repo root:

```bash
npm run build:android
```

That runs **`bundle:web-for-mobile`** (game + Vite build + refresh `web-dist.zip`) and then starts EAS. On EAS servers, **`eas-build-post-install`** in [`apps/mobile/package.json`](apps/mobile/package.json) runs the same bundle step so the uploaded archive always contains an up-to-date web build.

Or from `apps/mobile`:

```bash
cd apps/mobile && npm run eas:build:android
```

(Ensure `assets/web-dist.zip` is current — run `npm run bundle:web-for-mobile` from the repo root first if you skipped the root script.)

EAS will prompt for credentials (or reuse stored ones) and upload the project. When the build finishes, download the **APK** from the [Expo dashboard](https://expo.dev) build page.

**Identifiers:** `ios.bundleIdentifier` and `android.package` are set to `com.angrypixel.multiplatform` in [`app.json`](apps/mobile/app.json); change them if you publish under another id.

## Build

```bash
npm run build
```

Runs game TypeScript checks, then the browser production build (used by Electron and as the WebView target).

### Desktop (Electron installer)

```bash
npm run build:desktop
```

Builds the game + Vite app, then runs [electron-builder](https://www.electron.build/) in `apps/desktop`. Installers and unpacked output go under [`apps/desktop/out/`](apps/desktop/out/) (e.g. `.dmg` on macOS, `.exe` NSIS on Windows, `AppImage` on Linux). Targets are defined in [`apps/desktop/package.json`](apps/desktop/package.json) under `"build"`.

If the browser bundle is already built, you can run only the packager:

```bash
npm run build -w @angry-pixel-multiplatform/desktop
```

**Icons:** The canonical app artwork is [`apps/mobile/assets/icon.png`](apps/mobile/assets/icon.png) (used for Expo icon, splash, adaptive icon, and web favicon via [`app.json`](apps/mobile/app.json)). After changing it, refresh the Electron copy with `npm run sync-desktop-icon` (Unix `cp`; copy the file manually on Windows). [`electron-builder`](https://www.electron.build/icons.html) reads [`apps/desktop/build/icon.png`](apps/desktop/build/icon.png) for `.app` / `.dmg` / Windows / Linux. On **macOS**, `BrowserWindow`’s `icon` option is ignored; the Dock uses the bundled asset (and in dev, `app.dock.setIcon` uses `build/icon.png`).

## Lint / format

```bash
npm run lint
npm run format
```

## Engine docs

- [angrypixel.gg/engine/docs](https://angrypixel.gg/engine/docs/)
- [docs.angrypixel.gg](https://docs.angrypixel.gg/)
