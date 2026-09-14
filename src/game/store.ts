import { create } from "zustand";
import type { CameraPreset, HudEnemy, HudTower, Phase, Targeting, TowerKind } from "./types";
import { START_GOLD, START_LIVES, WAVES } from "./config";

export type GameStore = {
  phase: Phase;
  gold: number;
  lives: number;
  wave: number;
  waveTotal: number;
  waveActive: boolean;
  waveName: string;
  enemiesAlive: number;
  selectedBuild: TowerKind | null;
  selectedTower: HudTower | null;
  targeting: Targeting;
  speed: 1 | 2;
  cameraPreset: CameraPreset;
  follow: boolean;
  muted: boolean;
  shake: boolean;
  message: string;
  hoverValid: boolean;
  minimapEnemies: HudEnemy[];
  minimapTowers: HudTower[];
  camX: number;
  camZ: number;
  camDist: number;
  camAzimuth: number;
  camPolar: number;
  setPhase: (phase: Phase) => void;
  setSelectedBuild: (kind: TowerKind | null) => void;
  setTargeting: (t: Targeting) => void;
  setSpeed: (s: 1 | 2) => void;
  setCameraPreset: (p: CameraPreset) => void;
  setFollow: (v: boolean) => void;
  toggleMute: () => void;
  toggleShake: () => void;
  setMessage: (m: string) => void;
  sync: (patch: Partial<GameStore>) => void;
  resetHud: () => void;
};

const muteKey = "ironwood-mute";
const shakeKey = "ironwood-shake";

function readFlag(key: string, fallback: boolean) {
  if (typeof window === "undefined") return fallback;
  const v = window.localStorage.getItem(key);
  if (v === null) return fallback;
  return v === "1";
}

export const useGame = create<GameStore>((set, get) => ({
  phase: "menu",
  gold: START_GOLD,
  lives: START_LIVES,
  wave: 0,
  waveTotal: WAVES.length,
  waveActive: false,
  waveName: WAVES[0]?.name ?? "",
  enemiesAlive: 0,
  selectedBuild: null,
  selectedTower: null,
  targeting: "first",
  speed: 1,
  cameraPreset: "iso",
  follow: false,
  muted: readFlag(muteKey, false),
  shake: readFlag(shakeKey, true),
  message: "",
  hoverValid: false,
  minimapEnemies: [],
  minimapTowers: [],
  camX: 0,
  camZ: 0,
  camDist: 32,
  camAzimuth: Math.PI / 4,
  camPolar: 0.95,
  setPhase: (phase) => set({ phase }),
  setSelectedBuild: (kind) => set({ selectedBuild: kind, selectedTower: kind ? null : get().selectedTower }),
  setTargeting: (t) => set({ targeting: t }),
  setSpeed: (s) => set({ speed: s }),
  setCameraPreset: (p) => set({ cameraPreset: p, follow: p === "iso" ? get().follow : false }),
  setFollow: (v) => set({ follow: v }),
  toggleMute: () => {
    const muted = !get().muted;
    window.localStorage.setItem(muteKey, muted ? "1" : "0");
    set({ muted });
  },
  toggleShake: () => {
    const shake = !get().shake;
    window.localStorage.setItem(shakeKey, shake ? "1" : "0");
    set({ shake });
  },
  setMessage: (message) => set({ message }),
  sync: (patch) => set(patch),
  resetHud: () =>
    set({
      gold: START_GOLD,
      lives: START_LIVES,
      wave: 0,
      waveActive: false,
      waveName: WAVES[0]?.name ?? "",
      enemiesAlive: 0,
      selectedBuild: null,
      selectedTower: null,
      message: "",
      hoverValid: false,
      minimapEnemies: [],
      minimapTowers: [],
    }),
}));
