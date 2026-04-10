# Project context: Angry Pixel multiplatform skeleton + Angry Pixel Engine

This file summarizes **this monorepo** and **Angry Pixel Engine** so agents and contributors have a single place to align on architecture, entry points, and engine APIs. Engine details below are aligned with the official docs indexed under Context7 library `/angry-pixel-studio/angry-pixel-engine` (see [Engine docs](#official-documentation)).

---

## This repository

**Purpose:** A **multiplatform game skeleton** built on [Angry Pixel Engine](https://github.com/angry-pixel-studio/angry-pixel-engine): shared game code lives in `packages/game`; **browser** (Vite), **desktop** (Electron), and **mobile** (Expo + WebView) are thin shells. The root uses **npm workspaces** (no Turborepo).

| Path            | Role                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `packages/game` | Scenes, systems, entities, config, `startGame()` — depends on npm package `angry-pixel` (currently `^2.2.0`) |
| `apps/browser`  | Vite app; serves `packages/game/public` as static assets                                                     |
| `apps/desktop`  | Electron; dev often loads the Vite URL; production can load `apps/browser/dist`                              |
| `apps/mobile`   | Expo; dev uses `EXPO_PUBLIC_GAME_URL`; release embeds `apps/browser/dist` as a zip                           |

**Root scripts (high level):** `dev:browser`, `dev:desktop`, `dev:mobile`, `build` (game tsc + browser build), `build:desktop`, `bundle:web-for-mobile`, `build:android`.

**Game bootstrap:** `packages/game/src/bootstrap.ts` exports `startGame(container, options?)`, which constructs `new Game(createGameConfig(...))`, registers `MainScene`, and calls `game.start()`. Shells import `@angry-pixel-app/game` (see `packages/game/package.json` exports).

**Browser entry:** `apps/browser/src/main.ts` mounts the game on `#app`, reads `?debug=1` for engine debug flags (`colliders`, `mousePosition`), and calls `startGame`.

**TypeScript path aliases (game package):** `@config/*`, `@scene/*`, `@entity/*`, `@component/*`, `@system/*` — defined in `packages/game/tsconfig.json`.

**Conventions in this skeleton:**

- **Entities** are exported **arrays of component instances** from `packages/game/src/entity/` (e.g. `camera`, `logo`) and passed to `entityManager.createEntity(...)`.
- **Config** is centralized: `gameConfig.ts`, `assets.ts`, `layers.ts`, `collisionMatrix.ts` under `src/config/`.
- **Scenes** extend `Scene`: implement `loadAssets()`, `registerSystems()`, `createEntities()` (see `MainScene.ts`).
- **Custom logic** uses `GameSystem` subclasses registered in `registerSystems()` via `this.addSystem(...)`.

---

## Angry Pixel Engine (overview)

**What it is:** A **2D browser game engine** written in **TypeScript**, with **Entity–Component–System (ECS)** architecture, WebGL rendering, sprites/animation, physics, and collision support — suitable for desktop and mobile wrappers that host a web view or canvas.

**Main import surface:** The `angry-pixel` package (e.g. `Game`, `Scene`, `GameSystem`, components like `Transform`, `SpriteRenderer`, `Camera`, colliders, `RigidBody`, utilities like `Vector2`, `randomInt`, `rgbToHex`).

---

## ECS model

- **Entities:** Opaque IDs that group components. Created with `entityManager.createEntity(components[])` or `entityManager.createEntityFromArchetype(archetype)` (reusable templates; optional `children` for hierarchies).
- **Components:** Data-only (or engine-provided behavior data). Custom game state should live in small component classes; engine types include transforms, renderers, colliders, rigid bodies, audio, UI-related pieces, etc.
- **Systems:** Extend `GameSystem`, implement `onUpdate()` (and optional lifecycle hooks such as `onCreate`, `onEnabled`, `onDisabled`, `onDestroy`). Use `this.entityManager.search(ComponentClass)` to iterate matches; use `this.entityManager.getComponent(entity, ComponentClass)` when you already have an entity. Other common services: `this.timeManager.deltaTime`, `this.inputManager`, `this.gameConfig`, `this.assetManager`, `this.sceneManager`, `this.collisionRepository`.

---

## Game and scenes

- **`Game` + `GameConfig`:** Construct with a config object (`containerNode`, dimensions, `canvasColor`, optional `physicsFramerate`, `collisions` with `collisionMatrix` and optional broad-phase / method settings, `debug` flags, etc.). Call `game.addScene(SceneClass, name, isInitialScene?)` then `game.start()`. `game.stop()` ends the loop.
- **`Scene`:** Subclass and override:
  - **`loadAssets()`** — e.g. `assetManager.loadImage`, `loadAudio`, `loadFont`, `loadJson`, etc.
  - **`registerSystems()`** — `this.addSystem(MySystem)` or `this.addSystems([...])`.
  - **`createEntities()`** — spawn entities after assets are ready; use `getImage` / `getAudio` helpers when wiring renderers.
- **Scene transitions:** `this.sceneManager.loadScene("OtherScene")`; optional second argument can preserve entities that have a given component type across the transition.

---

## Game loop phases

The engine uses a **multi-phase loop** (see [general architecture](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/main/docs/docs/en/03-general-architecture.md)):

1. **Game logic** — typically **60 FPS**; default phase for systems (gameplay, input, animation).
2. **Physics** — fixed-rate step for collision and physical response.
3. **Rendering** — tied to display refresh.

**Implication:** If a system runs in the **game logic** phase, reads from `collisionRepository` reflect the **previous physics step**’s results, not the frame being computed — design collision reactions accordingly.

**Assigning a system to another phase:** Use decorators on the system class:

| Decorator          | Loop                  |
| ------------------ | --------------------- |
| `@PhysicsLoop()`   | Physics loop          |
| `@PreRenderLoop()` | Just before rendering |

Without a decorator, the system runs in the **game logic** loop. For environments without TypeScript decorators, the docs describe a `decorate(PhysicsLoop(), MySystem)`-style API.

---

## Collisions

- **`GameConfig.collisions.collisionMatrix`:** Pairs of layer names (strings) that should interact. Only listed pairs generate collisions.
- **Colliders** reference a **layer** string consistent with the matrix (this repo centralizes layers in `src/config/layers.ts`).
- **`CollisionRepository`** (available on systems): `findCollisionsForCollider(collider)`, `findCollisionsForColliderAndLayer(collider, layer)`, `findAll()`. Each collision exposes entities, colliders, and a **resolution** with **penetration** and **direction**.

---

## Assets and static files

Asset paths in code are typically relative to the **game `public/`** folder (served by Vite for the browser app). Centralize paths in config (this repo: `src/config/assets.ts`).

---

## Official documentation

- [angrypixel.gg/engine/api-docs](https://angrypixel.gg/engine/api-docs/)
- [docs.angrypixel.gg](https://docs.angrypixel.gg/)
- Engine source and markdown docs: [github.com/angry-pixel-studio/angry-pixel-engine](https://github.com/angry-pixel-studio/angry-pixel-engine) (e.g. `docs/docs/en/` for English topics: entities, components, systems, colliders, entity manager).

For up-to-date API nuances and version-specific behavior, prefer these sources over this file.
