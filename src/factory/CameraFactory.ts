import { Camera, Component, Transform, Vector2 } from "angry-pixel";

export const cameraFactory = (
    layers: string[],
    position: Vector2 = new Vector2(),
    depth: number = 0,
    zoom: number = 1,
): Component[] => [new Transform({ position }), new Camera({ layers, zoom, depth })];
