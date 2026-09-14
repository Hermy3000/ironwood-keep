export type TowerKind = "archer" | "ballista" | "catapult" | "cannon" | "mage";
export type EnemyKind = "raider" | "berserker" | "brute" | "wyvern" | "warlord";
export type Targeting = "first" | "last" | "closest" | "strongest";
export type Phase = "menu" | "playing" | "paused" | "victory" | "defeat";
export type CameraPreset = "iso" | "top" | "low" | "keep" | "spawn";

export type Plot = {
  id: number;
  x: number;
  z: number;
  occupied: number | null;
};

export type Tower = {
  id: number;
  kind: TowerKind;
  plotId: number;
  x: number;
  y: number;
  z: number;
  level: number;
  cooldown: number;
  yaw: number;
  pitch: number;
  spent: number;
  recoil: number;
};

export type Enemy = {
  id: number;
  kind: EnemyKind;
  alive: boolean;
  t: number;
  x: number;
  y: number;
  z: number;
  yaw: number;
  hp: number;
  maxHp: number;
  speed: number;
  slow: number;
  slowT: number;
  flying: boolean;
  armor: number;
  gold: number;
  bob: number;
  hitFlash: number;
};

export type Projectile = {
  id: number;
  alive: boolean;
  kind: TowerKind;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  damage: number;
  splash: number;
  pierce: number;
  pierceLeft: number;
  hitFlying: boolean;
  armorPierce: number;
  slow: number;
  targetId: number;
  ttl: number;
  ballistic: boolean;
  sx: number;
  sy: number;
  sz: number;
  tx: number;
  ty: number;
  tz: number;
  age: number;
  flight: number;
  arc: number;
  hits: number[];
};

export type Particle = {
  alive: boolean;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  r: number;
  g: number;
  b: number;
};

export type HudTower = {
  id: number;
  kind: TowerKind;
  level: number;
  spent: number;
  x: number;
  z: number;
};

export type HudEnemy = {
  x: number;
  z: number;
  flying: boolean;
  kind: EnemyKind;
};
