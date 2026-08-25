/**
 * The linkages the landing page runs, written as PMKS+ fixtures.
 *
 * Each one is the same declarative shape the app's own MATLAB-verified test
 * suite is written in (`engine/vendor/test-utils/verification/fixture.ts`), so
 * the page's mechanisms are built, solved and drawn by exactly the code the app
 * ships — not by a second implementation of it.
 *
 * Coordinates are written in centimetres and multiplied into the app's internal
 * frame by `cm()`. The app draws at MODEL_SCALE (200) internal units per user
 * unit and sizes every mark against `objectScale`, so a linkage authored in the
 * app's own frame comes out at the app's own proportions.
 */
import type { MechanismFixture } from '../vendor/test-utils/verification/fixture';
import { cylinderBoomFixture } from '../vendor/test-utils/verification/slot-fixtures';
import { MODEL_SCALE } from '../vendor/app/model/render-scale';
import { PART_COLORS } from '../vendor/app/model/joint-colors';
import { ANALYSIS_SERIES_COLORS } from '../vendor/app/model/analysis-series';

/** Centimetres to the internal frame everything below is authored in. */
const cm = (v: number) => v * MODEL_SCALE;

/**
 * Ten revolutions a minute: slow enough to follow a coupler point by eye.
 *
 * As radians a second, because that is the unit `Mechanism` is commanded in —
 * the per-joint `driveSpeed` field is the one that takes rpm.
 */
const RPM = 10;
const INPUT = (RPM * 2 * Math.PI) / 60;

const [PALE, INDIGO, NAVY, MINT, TEAL, PINE] = PART_COLORS;

/**
 * Where two bars of known length, pinned at `p` and `q`, meet.
 *
 * `branch` picks which of the two intersections to take — the two assemblies a
 * four-bar can be built in, and the one thing about a linkage that cannot be
 * derived from its lengths.
 */
function meet(
  p: { x: number; y: number },
  lp: number,
  q: { x: number; y: number },
  lq: number,
  branch: 1 | -1
) {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const d = Math.hypot(dx, dy);
  const a = (lp * lp - lq * lq + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, lp * lp - a * a)) * branch;
  return {
    x: p.x + (a * dx) / d - (h * dy) / d,
    y: p.y + (a * dy) / d + (h * dx) / d,
  };
}

/** A point rigidly fixed to the bar from `from` to `to`, in that bar's frame. */
function onBar(
  from: { x: number; y: number },
  to: { x: number; y: number },
  along: number,
  across: number
) {
  const d = Math.hypot(to.x - from.x, to.y - from.y);
  const ux = (to.x - from.x) / d;
  const uy = (to.y - from.y) / d;
  return { x: from.x + ux * along - uy * across, y: from.y + uy * along + ux * across };
}

/**
 * A crank-rocker or drag-link four-bar with a point traced off one of its bars.
 *
 * The four families on the page that are four-bars underneath — the hero, the
 * drag-link, Hoeken's straight line, the pumping unit — differ only in their
 * proportions and in which bar carries the traced point, so they are one
 * function rather than four near-copies of the same joint list.
 */
function fourBar(opts: {
  crank: number;
  ground: number;
  coupler: number;
  rocker: number;
  /** The traced point, in the frame of the bar named by `on`. */
  trace: [number, number];
  on: 'coupler' | 'rocker';
  /** Crank angle the linkage is drawn at, in degrees. */
  start?: number;
  branch?: 1 | -1;
}): MechanismFixture {
  const theta = ((opts.start ?? 55) * Math.PI) / 180;
  const A = { x: 0, y: 0 };
  const D = { x: opts.ground, y: 0 };
  const B = { x: Math.cos(theta) * opts.crank, y: Math.sin(theta) * opts.crank };
  const C = meet(B, opts.coupler, D, opts.rocker, opts.branch ?? 1);
  const P =
    opts.on === 'rocker'
      ? onBar(D, C, opts.trace[0], opts.trace[1])
      : onBar(B, C, opts.trace[0], opts.trace[1]);
  return {
    joints: [
      { id: 'A', x: cm(A.x), y: cm(A.y), ground: true, input: true },
      { id: 'B', x: cm(B.x), y: cm(B.y) },
      { id: 'C', x: cm(C.x), y: cm(C.y) },
      { id: 'D', x: cm(D.x), y: cm(D.y), ground: true },
      { id: 'P', x: cm(P.x), y: cm(P.y), trace: true },
    ],
    links: [
      { joints: 'AB', fill: PALE },
      { joints: opts.on === 'coupler' ? 'BCP' : 'BC', fill: INDIGO },
      { joints: opts.on === 'rocker' ? 'CDP' : 'CD', fill: NAVY },
    ],
    inputAngVel: INPUT,
  };
}

export interface Linkage {
  /** Matches the `mech` a canvas on the page asks for. */
  id: string;
  fixture: MechanismFixture;
  /**
   * Draw the velocity of the traced point, as the app's Analyze tab draws it:
   * two dozen arrows around the cycle and a heavier one at the live pose.
   */
  vectors?: boolean;
  /**
   * What to draw them in, if not the ink the app's canvas uses.
   *
   * The canvas draws a velocity vector in the series colour of its y component,
   * because on a graph the arrow and the curve have to be the same red. On the
   * hero there is no graph to agree with, and red on an indigo linkage reads as
   * a warning rather than as a quantity — so it takes the yellow the app plots
   * *magnitude* in instead, which is the same drawing's other name for the same
   * arrow's length.
   */
  vectorInk?: string;
  /**
   * How faint the two dozen path arrows are behind the live one. The canvas
   * draws them at 0.45, which was chosen against its red; the same alpha on a
   * yellow lands close to white, because the two inks are nowhere near the same
   * lightness. Raised here for exactly that reason and no other.
   */
  vectorTraceOpacity?: number;
}

export const LINKAGES: Linkage[] = [
  /**
   * The hero. A Grashof crank-rocker — 1.2 + 3.2 is less than 2.6 + 3.0, and
   * the crank is the shortest bar, so it turns the whole way round — with the
   * coupler point set out to one side where its curve is a clear kidney rather
   * than a flat arc.
   */
  {
    id: 'fourbar',
    vectors: true,
    vectorInk: ANALYSIS_SERIES_COLORS.Z,
    vectorTraceOpacity: 0.7,
    fixture: fourBar({
      crank: 1.2,
      ground: 3.2,
      coupler: 2.6,
      rocker: 3.0,
      trace: [1.6, 1.7],
      on: 'coupler',
    }),
  },

  /**
   * A single-cylinder engine, from the app's own library: a flywheel on the
   * crankshaft driving a piston down a bore on the crankshaft's centreline.
   *
   * The one link on the page drawn as a disc rather than as a bar. The rim pin
   * is what gives the disc its size — a circular link is drawn as the circle
   * that reaches its outermost joint — and it sits opposite the crank pin,
   * where an engine puts its counterweight.
   */
  {
    id: 'flywheel',
    fixture: (() => {
      const rim = 1.4;
      const stroke = 1.0;
      const rod = 3.6;
      const theta = (40 * Math.PI) / 180;
      const B = { x: Math.cos(theta) * stroke, y: Math.sin(theta) * stroke };
      const C = { x: B.x + Math.sqrt(Math.max(0, rod * rod - B.y * B.y)), y: 0 };
      return {
        joints: [
          { id: 'A', x: 0, y: 0, ground: true, input: true },
          { id: 'B', x: cm(B.x), y: cm(B.y) },
          { id: 'R', x: cm(-rim * Math.cos(theta)), y: cm(-rim * Math.sin(theta)) },
          { id: 'C', x: cm(C.x), y: cm(C.y) },
        ],
        links: [
          { joints: 'ABR', name: 'Flywheel', fill: PALE, circle: true },
          { joints: 'BC', name: 'Connecting rod', fill: INDIGO },
        ],
        slider: { at: 'C', prisId: 'P', angleRad: 0 },
        inputAngVel: INPUT,
      } satisfies MechanismFixture;
    })(),
  },

  /**
   * Hoeken's straight line. The traced point is carried on the coupler at twice
   * its length, where the curve flattens into a near-straight stroke across the
   * top — the reason the linkage is taught at all.
   */
  {
    id: 'hoeken',
    fixture: fourBar({
      crank: 1.0,
      ground: 2.0,
      coupler: 2.5,
      rocker: 2.5,
      trace: [5.0, 0],
      on: 'coupler',
      start: 120,
    }),
  },

  /**
   * A boom raised by a hydraulic cylinder — the app's own Gate 5 mechanism,
   * taken as it is written in the verification suite.
   *
   * The drive is not a turning crank: it is the cylinder's own length, and the
   * boom angle follows from it by the law of cosines. So this one does not go
   * round — it extends, stops, and comes back, which is what a ram does.
   *
   * Built at MODEL_SCALE because that is what the fixture's `scale` is for: a
   * cylinder's stroke is bounded by its own slot, and a slot is drawn in mark
   * units, which are absolute.
   */
  {
    id: 'cylinderBoom',
    fixture: cylinderBoomFixture(MODEL_SCALE),
  },

  /**
   * Slider-crank, offset. The rod's far pin is a block in a guide cut along the
   * world's x axis, and the traced point rides the rod between the two.
   */
  {
    id: 'slider',
    fixture: (() => {
      const crank = 1.0;
      const rod = 2.8;
      const offset = 0.4;
      const theta = (50 * Math.PI) / 180;
      const B = { x: Math.cos(theta) * crank, y: Math.sin(theta) * crank };
      const C = { x: B.x + Math.sqrt(Math.max(0, rod * rod - (offset - B.y) ** 2)), y: offset };
      const P = onBar(B, C, 1.4, 0.6);
      return {
        joints: [
          { id: 'A', x: 0, y: 0, ground: true, input: true },
          { id: 'B', x: cm(B.x), y: cm(B.y) },
          { id: 'C', x: cm(C.x), y: cm(C.y) },
          { id: 'P', x: cm(P.x), y: cm(P.y), trace: true },
        ],
        links: [
          { joints: 'AB', fill: PALE },
          { joints: 'BCP', fill: INDIGO },
        ],
        slider: { at: 'C', prisId: 'S', angleRad: 0 },
        inputAngVel: INPUT,
      } satisfies MechanismFixture;
    })(),
  },

  /**
   * Scotch yoke, built the way the app's own scotch-yoke fixture is: the crank
   * pin rides a slot cut into the yoke (a floating slot on link CD), the yoke
   * is welded to a block in a guide along x, and the block's travel is
   * r cos theta. The one linkage here with no coupler curve to draw.
   */
  {
    id: 'yoke',
    fixture: (() => {
      // A yoke is a tall drawing and the card it goes in is a wide one, so the
      // crank is set as large as the slot will carry: the pin's rise is what
      // makes the picture tall, and its sweep is what makes it wide. The slot
      // has to outrun the pin at both ends by more than the block's own half
      // length, or the pin runs out of slot part way round and the solver stops
      // the cycle short. C carries the guide, so it hangs further below than D
      // reaches above.
      const crank = 1.2;
      const drop = 2.0;
      const rise = 1.8;
      return {
        joints: [
          { id: 'A', x: 0, y: 0, ground: true, input: true },
          { id: 'B', x: cm(crank), y: 0 },
          { id: 'C', x: cm(crank), y: cm(-drop) },
          { id: 'D', x: cm(crank), y: cm(rise) },
        ],
        links: [
          { joints: 'AB', fill: PALE },
          { joints: 'CD', fill: INDIGO },
        ],
        sliders: [
          { at: 'B', prisId: 'E', on: { carrier: 'CD', a: 'C', b: 'D' } },
          { at: 'C', prisId: 'F', angleRad: 0 },
        ],
        // The yoke is rigid with the block it rides in — a Slide, not a pin —
        // which is what makes the whole assembly translate instead of turning
        // about C. Without it the linkage has a degree of freedom too many and
        // the solver refuses it, exactly as the app would.
        welds: ['C'],
        inputAngVel: INPUT,
      } satisfies MechanismFixture;
    })(),
  },

  /**
   * Whitworth quick return. The crank pin rides the slot of a lever pivoted
   * below its centre, so the lever sweeps fast one way and slow the other, and
   * a rod carries that to a ram on a horizontal guide.
   */
  {
    id: 'whitworth',
    fixture: (() => {
      // Proportioned for the wide card it sits in: the ram's stroke is what
      // makes this drawing broad, and the stroke follows the lever's sweep,
      // which follows how much of the crank's circle sits off the pivot. The
      // crank pin must also stay clear of both ends of the slot by more than
      // the block's half length all the way round — hence a lever longer than
      // the pin ever reaches.
      const crank = 0.9;
      const offset = 1.4;
      const lever = 3.0;
      const rod = 2.4;
      const line = 3.2;
      const theta = (35 * Math.PI) / 180;
      const O = { x: 0, y: offset };
      const A = { x: O.x + Math.cos(theta) * crank, y: O.y + Math.sin(theta) * crank };
      const phi = Math.atan2(A.y, A.x);
      const R = { x: Math.cos(phi) * lever, y: Math.sin(phi) * lever };
      const S = { x: R.x + Math.sqrt(Math.max(0, rod * rod - (line - R.y) ** 2)), y: line };
      return {
        joints: [
          { id: 'O', x: cm(O.x), y: cm(O.y), ground: true, input: true },
          { id: 'A', x: cm(A.x), y: cm(A.y) },
          { id: 'Q', x: 0, y: 0, ground: true },
          { id: 'R', x: cm(R.x), y: cm(R.y) },
          { id: 'S', x: cm(S.x), y: cm(S.y) },
        ],
        links: [
          { joints: 'OA', fill: PALE },
          { joints: 'QR', fill: INDIGO },
          { joints: 'RS', fill: NAVY },
        ],
        sliders: [
          { at: 'A', prisId: 'P', on: { carrier: 'QR', a: 'Q', b: 'R' } },
          { at: 'S', prisId: 'T', angleRad: 0 },
        ],
        inputAngVel: INPUT,
      } satisfies MechanismFixture;
    })(),
  },

  /**
   * Six-bar with a slider: a crank-rocker whose coupler carries a long rod down
   * onto a block in a guide. Two bars past a four-bar, and the stroke at the
   * bottom is nothing like the crank that drives it.
   */
  {
    id: 'sixbar',
    fixture: (() => {
      const crank = 1.1;
      const ground = 3.0;
      const coupler = 2.4;
      const rocker = 2.6;
      const rod = 4.4;
      const line = -1.8;
      const theta = (70 * Math.PI) / 180;
      const A = { x: 0, y: 0 };
      const D = { x: ground, y: 0 };
      const B = { x: Math.cos(theta) * crank, y: Math.sin(theta) * crank };
      const C = meet(B, coupler, D, rocker, 1);
      const E = onBar(B, C, 1.2, -0.6);
      const F = { x: E.x + Math.sqrt(Math.max(0, rod * rod - (line - E.y) ** 2)), y: line };
      return {
        joints: [
          { id: 'A', x: cm(A.x), y: cm(A.y), ground: true, input: true },
          { id: 'B', x: cm(B.x), y: cm(B.y) },
          { id: 'C', x: cm(C.x), y: cm(C.y) },
          { id: 'D', x: cm(D.x), y: cm(D.y), ground: true },
          { id: 'E', x: cm(E.x), y: cm(E.y) },
          { id: 'F', x: cm(F.x), y: cm(F.y) },
        ],
        links: [
          { joints: 'AB', fill: PALE },
          { joints: 'BCE', fill: INDIGO },
          { joints: 'CD', fill: NAVY },
          { joints: 'EF', fill: MINT },
        ],
        slider: { at: 'F', prisId: 'G', angleRad: 0 },
        inputAngVel: INPUT,
      } satisfies MechanismFixture;
    })(),
  },
];
