import type { EnemyKind, Targeting, TowerKind } from "./types";

export const START_GOLD = 200;
export const START_LIVES = 20;
export const SELL_RATE = 0.6;
export const WORLD = { minX: -26, maxX: 28, minZ: -16, maxZ: 16 };

export const WAYPOINTS: [number, number, number][] = [
  [-20.5, 0, 0.2],
  [-13.2, 0, 0.2],
  [-13.2, 0, 6.6],
  [-5.0, 0, 6.6],
  [-5.0, 0, -6.2],
  [4.2, 0, -6.2],
  [4.2, 0, 0.15],
  [8.7, 0, 0.15],
  [8.7, 0, 6.5],
  [15.2, 0, 6.5],
  [15.2, 0, 1.15],
  [20.4, 0, 1.15],
];

export const RIVER = { x0: 6.35, x1: 9.35 };
export const KEEP = { x: 23.2, z: 1.15 };
export const SPAWN = { x: -21.4, z: 0.2 };

export type TowerDef = {
  kind: TowerKind;
  name: string;
  blurb: string;
  cost: number;
  upgradeCost: number;
  range: number;
  damage: number;
  rate: number;
  projectileSpeed: number;
  splash: number;
  pierce: number;
  hitsFlying: boolean;
  armorPierce: number;
  slow: number;
  ballistic: boolean;
  arc: number;
};

export const TOWERS: Record<TowerKind, TowerDef> = {
  archer: {
    kind: "archer",
    name: "Archer Tower",
    blurb: "Swift longbows. Only reliable answer to wyverns besides magic.",
    cost: 55,
    upgradeCost: 45,
    range: 6.4,
    damage: 7,
    rate: 1.35,
    projectileSpeed: 18,
    splash: 0,
    pierce: 0,
    hitsFlying: true,
    armorPierce: 0,
    slow: 0,
    ballistic: false,
    arc: 0,
  },
  ballista: {
    kind: "ballista",
    name: "Ballista",
    blurb: "Siege bolts punch armor and skewer a line of foes.",
    cost: 110,
    upgradeCost: 85,
    range: 11.2,
    damage: 34,
    rate: 0.42,
    projectileSpeed: 22,
    splash: 0,
    pierce: 2,
    hitsFlying: false,
    armorPierce: 0.85,
    slow: 0,
    ballistic: false,
    arc: 0,
  },
  catapult: {
    kind: "catapult",
    name: "Catapult",
    blurb: "Arcing stones. Crushes clumps on the road.",
    cost: 125,
    upgradeCost: 90,
    range: 9.6,
    damage: 22,
    rate: 0.38,
    projectileSpeed: 10,
    splash: 2.3,
    pierce: 0,
    hitsFlying: false,
    armorPierce: 0.2,
    slow: 0,
    ballistic: true,
    arc: 3.4,
  },
  cannon: {
    kind: "cannon",
    name: "Cannon Tower",
    blurb: "Black powder. Heavy splash, brutal against brutes.",
    cost: 175,
    upgradeCost: 120,
    range: 8.2,
    damage: 40,
    rate: 0.48,
    projectileSpeed: 14,
    splash: 2.8,
    pierce: 0,
    hitsFlying: false,
    armorPierce: 0.7,
    slow: 0,
    ballistic: true,
    arc: 2.2,
  },
  mage: {
    kind: "mage",
    name: "Mage Spire",
    blurb: "Frost orbs slow the host and strike air or earth.",
    cost: 145,
    upgradeCost: 110,
    range: 7.6,
    damage: 16,
    rate: 0.85,
    projectileSpeed: 12,
    splash: 1.1,
    pierce: 0,
    hitsFlying: true,
    armorPierce: 0.6,
    slow: 0.45,
    ballistic: false,
    arc: 0,
  },
};

export const TOWER_ORDER: TowerKind[] = ["archer", "ballista", "catapult", "cannon", "mage"];

export type EnemyDef = {
  kind: EnemyKind;
  name: string;
  hp: number;
  speed: number;
  gold: number;
  flying: boolean;
  armor: number;
  scale: number;
};

export const ENEMIES: Record<EnemyKind, EnemyDef> = {
  raider: { kind: "raider", name: "Raider", hp: 38, speed: 2.05, gold: 7, flying: false, armor: 0, scale: 1 },
  berserker: { kind: "berserker", name: "Berserker", hp: 28, speed: 3.15, gold: 10, flying: false, armor: 0, scale: 0.92 },
  brute: { kind: "brute", name: "Brute", hp: 160, speed: 1.28, gold: 22, flying: false, armor: 0.38, scale: 1.45 },
  wyvern: { kind: "wyvern", name: "Wyvern", hp: 72, speed: 2.55, gold: 26, flying: true, armor: 0.12, scale: 1.15 },
  warlord: { kind: "warlord", name: "Warlord", hp: 620, speed: 1.12, gold: 90, flying: false, armor: 0.42, scale: 1.7 },
};

export type SpawnGroup = {
  kind: EnemyKind;
  count: number;
  interval: number;
  offset: number;
};

export type Wave = {
  name: string;
  groups: SpawnGroup[];
};

export const WAVES: Wave[] = [
  { name: "Scouts of the Blackwald", groups: [{ kind: "raider", count: 8, interval: 0.85, offset: 0 }] },
  {
    name: "The King's Road burns",
    groups: [{ kind: "raider", count: 12, interval: 0.62, offset: 0 }],
  },
  {
    name: "Berserkers at the hedge",
    groups: [
      { kind: "raider", count: 8, interval: 0.7, offset: 0 },
      { kind: "berserker", count: 6, interval: 0.55, offset: 2.2 },
    ],
  },
  {
    name: "A running slaughter",
    groups: [
      { kind: "raider", count: 10, interval: 0.5, offset: 0 },
      { kind: "berserker", count: 10, interval: 0.45, offset: 1.5 },
    ],
  },
  {
    name: "Brutes of the Ashclan",
    groups: [
      { kind: "brute", count: 5, interval: 1.6, offset: 0 },
      { kind: "raider", count: 10, interval: 0.55, offset: 0.4 },
    ],
  },
  {
    name: "Wings over Ironwood",
    groups: [
      { kind: "wyvern", count: 5, interval: 1.3, offset: 0 },
      { kind: "raider", count: 8, interval: 0.6, offset: 0.8 },
    ],
  },
  {
    name: "The crush",
    groups: [
      { kind: "brute", count: 7, interval: 1.35, offset: 0 },
      { kind: "berserker", count: 10, interval: 0.5, offset: 1.2 },
    ],
  },
  {
    name: "Sky and stone",
    groups: [
      { kind: "wyvern", count: 7, interval: 1.05, offset: 0 },
      { kind: "brute", count: 6, interval: 1.4, offset: 0.6 },
      { kind: "berserker", count: 6, interval: 0.55, offset: 2 },
    ],
  },
  {
    name: "The warhost entire",
    groups: [
      { kind: "raider", count: 12, interval: 0.4, offset: 0 },
      { kind: "berserker", count: 10, interval: 0.42, offset: 1 },
      { kind: "brute", count: 6, interval: 1.2, offset: 2 },
      { kind: "wyvern", count: 6, interval: 1.1, offset: 3 },
    ],
  },
  {
    name: "The Warlord's march",
    groups: [
      { kind: "warlord", count: 1, interval: 0, offset: 2.5 },
      { kind: "brute", count: 6, interval: 1.4, offset: 0 },
      { kind: "berserker", count: 10, interval: 0.48, offset: 1 },
      { kind: "wyvern", count: 5, interval: 1.2, offset: 4 },
    ],
  },
];

export const TARGETING_LABEL: Record<Targeting, string> = {
  first: "First",
  last: "Last",
  closest: "Closest",
  strongest: "Strongest",
};

export function scaledTower(kind: TowerKind, level: number): TowerDef {
  const b = TOWERS[kind];
  const m = 1 + level * 0.55;
  return {
    ...b,
    damage: b.damage * m,
    range: b.range * (1 + level * 0.12),
    rate: b.rate * (1 + level * 0.12),
    splash: b.splash * (1 + level * 0.1),
    pierce: b.pierce + (level > 0 && kind === "ballista" ? 1 : 0),
    slow: Math.min(0.7, b.slow * (1 + level * 0.15)),
  };
}
