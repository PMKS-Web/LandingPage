/**
 * The shape of what `engine/precompute.ts` writes into public/mechanisms.
 *
 * Every number is in the app's internal frame: 200 units to the centimetre, y
 * up. The page draws it inside one `scale(1 -1)` group, exactly as the app's
 * canvas does, so nothing here has to be flipped on the way in.
 */

/** A rigid body: its outline at the rest pose, and the two joints it rides. */
export interface Body {
  id: string;
  fill: string;
  d: string;
  by: [number, number];
}

export interface Slider {
  id: string;
  /** The black block, drawn in its own frame. */
  block: string;
  /** A welded rider fused to the block, standing in for the link it is made of. */
  plate: { d: string; fill: string } | null;
  /** Bodies merely pinned to the block, redrawn above it. */
  riders: string[];
  rails: {
    x: number;
    y: number;
    rotation: number;
    rails: number[][];
    dashed: number[][];
    ticks: number[][];
  } | null;
  /** `[x, y, rotationDegrees]` at each written pose. */
  poses: number[][];
}

export interface MechanismData {
  id: string;
  objectScale: number;
  modelScale: number;
  rpm: number;
  /** Seconds of real time one written cycle stands for. */
  period: number;
  view: { x: number; y: number; w: number; h: number };
  style: {
    jointFill: string;
    trace: number;
    groundLine: number;
    groundHatch: number;
    glyph: number;
  };
  jointIds: string[];
  joints: {
    i: number;
    id: string;
    r: number;
    ground: boolean;
    input: boolean;
    cw: boolean;
    weld: string | null;
  }[];
  bodies: Body[];
  sliders: Slider[];
  traces: { i: number; d: string }[];
  vectors: { ink: string; traceOpacity: number; d: string; live: number[][] } | null;
  /** Per pose, every joint's x and y, in `jointIds` order. */
  frames: number[][];
}
