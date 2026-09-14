import {
  Color,
  Group,
  InstancedMesh,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PlaneGeometry,
  Vector3,
} from "three";

import { KEEP, RIVER, SPAWN } from "./config";
import type { Gfx } from "./gfx";
import { fbm, rng } from "./math";
import type { Sim } from "./sim";

const dummy = new Object3D();

function distPath(x: number, z: number, samples: Vector3[]) {
  let best = Infinity;
  for (const p of samples) {
    const d = (p.x - x) * (p.x - x) + (p.z - z) * (p.z - z);
    if (d < best) best = d;
  }
  return Math.sqrt(best);
}

export function buildWorld(gfx: Gfx, sim: Sim) {
  const root = new Group();
  root.add(terrain(gfx, sim));
  root.add(road(gfx, sim));
  root.add(river(gfx));
  root.add(bridge(gfx));
  root.add(forest(gfx, sim));
  root.add(keep(gfx));
  root.add(camp(gfx));
  root.add(village(gfx));
  root.add(plots(gfx, sim));
  root.add(wheat(gfx, sim));
  return root;
}
