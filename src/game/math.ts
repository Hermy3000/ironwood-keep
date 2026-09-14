export function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function damp(current: number, target: number, lambda: number, dt: number) {
  return target + (current - target) * Math.exp(-lambda * dt);
}

export function distSq(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function hash2(ix: number, iy: number, period: number) {
  const x = ((ix % period) + period) % period;
  const y = ((iy % period) + period) % period;
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function fade(t: number) {
  return t * t * (3 - 2 * t);
}

export function valueNoise(u: number, v: number, period: number) {
  const x = u * period;
  const y = v * period;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = fade(x - x0);
  const fy = fade(y - y0);
  const a = hash2(x0, y0, period);
  const b = hash2(x0 + 1, y0, period);
  const c = hash2(x0, y0 + 1, period);
  const d = hash2(x0 + 1, y0 + 1, period);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

export function fbm(u: number, v: number) {
  return (
    valueNoise(u, v, 4) * 0.5 +
    valueNoise(u, v, 8) * 0.25 +
    valueNoise(u, v, 16) * 0.15 +
    valueNoise(u, v, 32) * 0.1
  );
}
