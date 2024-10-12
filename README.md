# Angry Pixel Skeleton

This template contains the necessary modules and the directory structure to start a new game project using [Angry Pixel Engine](https://github.com/angry-pixel-studio/angry-pixel-engine).

The directory structure is based on a layered architecture.

```yaml
dist:
    - image: Contains the image assets
    - favicon.ico: You can replace it for your game icon.
    - index.html: Entry point of the game.
src:
    - component: Contains the component classes.
    - config: Contains parameters and constants, such as asset paths, collision matrix, layers.
    - factory: Contains the entity factories.
    - scene: Contains the scene classes.
    - system: Contains the system classes.
    - index.ts: Entry point of the project, in this we instantiate the Game class.
```

You can create new asset directories inside `dist` forder, for example, you can create an `audio` folder for the music and sound fx, or a `font` directory for the fonts.
You can also create new layer directories inside the `src` folder, for example, if you are going to work with tilemaps, you can create a `tilemap` directory and put all your tilemap data files there.

## Setup development environment

### Clone the repository and move into the created directory

```bash
git clone git@github.com:angry-pixel-studio/angry-pixel-skeleton.git && cd angry-pixel-skeleton
```

You can also create your own repository based on this template by clicking the `Use this template` button.

### Install dependencies

```bash
yarn install
```

### Run

```bash
yarn start
```

The dev environment will run in http://localhost:8080/

## Build

The command generates a file named `bundle.js` inside the dist folder. This file contains the js code of your game.

```bash
yarn run build
```

## Share your game

Once built, you will have all the game data inside the dist folder, which can be used as a standalone website, or embedded inside an iframe, or shared on sites like [itch.io](itch.io) or [gamejolt.com](gamejolt.com) (in general these sites require the game folder to be uploaded as a .zip file).
