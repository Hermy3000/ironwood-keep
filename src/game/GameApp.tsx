import { useEffect, useRef, useState, type RefObject } from "react";
import type { Engine } from "./engine";
import { Hud } from "./Hud";
import { unlockAudio } from "./audio";

export function GameApp() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg">
        <p className="font-display tracking-[0.25em] text-muted uppercase">Mustering the host</p>
      </div>
    );
  }
  return <GameShell />;
}

function GameShell() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let engine: Engine | null = null;
    void import("./engine").then(({ Engine: EngineImpl }) => {
      if (disposed || !canvas) return;
      engine = new EngineImpl(canvas);
      engineRef.current = engine;
    });
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      disposed = true;
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      engine?.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-bg">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full touch-none" />
      <div className="pointer-events-none absolute inset-0 z-10">
        <Hud engineRef={engineRef} />
        <MobileView engineRef={engineRef} />
      </div>
    </div>
  );
}

function MobileView({ engineRef }: { engineRef: RefObject<Engine | null> }) {
  return (
    <div className="pointer-events-none absolute top-16 right-3 flex flex-col gap-1.5 md:hidden">
      <div className="pointer-events-auto flex flex-col gap-1.5">
        <button
          type="button"
          className="flex h-11 items-center rounded-md border border-edge bg-surface/90 px-3 text-xs text-fg"
          onClick={() => engineRef.current?.applyPreset("iso", true)}
        >
          Iso
        </button>
        <button
          type="button"
          className="flex h-11 items-center rounded-md border border-edge bg-surface/90 px-3 text-xs text-fg"
          onClick={() => engineRef.current?.applyPreset("top", true)}
        >
          Top
        </button>
        <button
          type="button"
          className="flex h-11 items-center rounded-md border border-edge bg-surface/90 px-3 text-xs text-fg"
          onClick={() => engineRef.current?.applyPreset("low", true)}
        >
          Low
        </button>
      </div>
    </div>
  );
}
