/**
 * Solve every linkage on the landing page with the app's own engine, once, and
 * write what the page needs to draw them into public/mechanisms/.
 *
 * The page ships no solver. Positions come from PMKS+'s `PositionSolver`,
 * velocities from its `KinematicsSolver`, link outlines from `RealLink.d`,
 * slot channels and slider marks from `SliderMarkService` — the same objects
 * the app draws from. What lands in the JSON is the drawing, in the app's
 * internal frame, and the runtime's whole job is to put it on screen.
 *
 * Link and rider bodies are rigid, so each one is written once in its rest pose
 * with the two joints it is carried by; the page rebuilds every other pose as a
 * translate-and-rotate of that path, which is exactly what the app does when it
 * transports a link between timesteps.
 */
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

import { RealJoint, PrisJoint } from '../vendor/app/model/joint';
import { JOINT_FAMILIES } from '../vendor/app/model/joint-colors';
import { RealLink, SliderBlock } from '../vendor/app/model/link';
import { KinematicsSolver } from '../vendor/app/model/mechanism/kinematic-solver';
import { MODEL_SCALE } from '../vendor/app/model/render-scale';
import { DEFAULT_OBJECT_SCALE } from '../vendor/app/model/object-scale';
import { mergedChannels } from '../vendor/app/model/compound-link-path';
import { GROUND_STROKE, motorBodyPath, plusPath } from '../vendor/app/model/joint-marks';
import { buildVectorTrace, VECTOR_INK } from '../vendor/app/model/vector-trace';
import { SliderMarkService, type SliderMark } from '../vendor/app/services/slider-mark.service';
import { buildMechanismAtScale } from '../vendor/test-utils/verification/fixture';
import { LINKAGES } from './linkages';

/**
 * How many poses of a cycle are written out.
 *
 * The solver walks one degree at a time; every fourth is far more than the eye
 * resolves at ten revolutions a minute, and it is the difference between a
 * page that carries nine kilobytes of geometry and one that carries forty.
 */
const FRAMES = 90;

/** What the app opens at, and what the mark sizes below are struck against. */
const OBJECT_SCALE = DEFAULT_OBJECT_SCALE;

/** The joint radius the mark layer is asked for, as `freshMarks` asks for it. */
const MARK_R = 0.15 * OBJECT_SCALE;

const round = (v: number) => Math.round(v * 100) / 100;

/** An SVG path with its numbers cut to two decimals — a fiftieth of a joint. */
function trimPath(d: string): string {
  return d.replace(/-?\d+\.\d+/g, (n) => String(round(Number(n))));
}

interface Rigid {
  /** Rest-pose path, in the world frame of frame 0. */
  d: string;
  /** Indices into `jointIds` of the two joints the body's pose is read from. */
  by: [number, number];
}

function main() {
  const out = join(process.cwd(), 'public/mechanisms');
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  const index: { id: string; bytes: number }[] = [];

  for (const linkage of LINKAGES) {
    const built = buildMechanismAtScale(linkage.fixture, OBJECT_SCALE);
    const { mechanism } = built;
    if (!mechanism.isMechanismValid()) {
      throw new Error(`${linkage.id}: the solver will not run this linkage`);
    }
    const steps = mechanism.joints.length;
    if (steps < 8) {
      throw new Error(`${linkage.id}: solved to only ${steps} poses`);
    }

    // Evenly around whatever the solver produced. `steps` is one pose per
    // degree plus the closing repeat, so dropping the last keeps the loop
    // seamless instead of holding the opening pose for two frames.
    const pick = Array.from({ length: FRAMES }, (_, i) =>
      Math.round((i * (steps - 1)) / FRAMES)
    );

    const jointIds = mechanism.joints[0].map((j) => j.id);
    const indexOf = new Map(jointIds.map((id, i) => [id, i]));

    const frames = pick.map((t) =>
      mechanism.joints[t].flatMap((j) => [round(j.x), round(j.y)])
    );

    // ---- Bodies -------------------------------------------------------
    // The mark service is asked at the rest pose only: a channel is cut into
    // its carrier and travels with it, so the cut belongs to the body.
    const marker = new SliderMarkService();
    const restJoints = mechanism.joints[0];
    const channels = marker.channels(restJoints, MARK_R);

    // A welded rider is drawn by its block's weld plate instead of on its own:
    // the plate is rider and block fused into one outline, so drawing both
    // would put the rider's edge inside the plate and double its alpha.
    const restMarks = marker.marks(restJoints, MARK_R, guidesOf(mechanism));
    const plated = new Set(
      restMarks.flatMap((mark) => (mark.plate ? mark.plate.links.map((l) => l.id) : []))
    );

    const bodies: (Rigid & { id: string; fill: string })[] = [];
    for (const link of mechanism.links[0]) {
      if (!(link instanceof RealLink) || link instanceof SliderBlock) continue;
      if (plated.has(link.id)) continue;
      const cuts = channels.filter((c) => c.carrierId === link.id).map((c) => c.path);
      // A driven pin that is not grounded wears its motor case as part of the
      // body it is bolted to, exactly as `outlineWithMotor` adds it.
      const motor = link.joints.find(
        (j) => j instanceof RealJoint && j.input && !j.ground && !(j instanceof PrisJoint)
      ) as RealJoint | undefined;
      const outline = motor
        ? `${link.d} ${translated(motorBodyPath(MARK_R), motor.x, motor.y)}`
        : link.d;
      const d = cuts.length === 0 ? outline : `${outline} ${mergedChannels(cuts)}`;
      const [p, q] = link.joints;
      bodies.push({
        id: link.id,
        fill: link.fill,
        d: trimPath(d),
        by: [indexOf.get(p.id)!, indexOf.get(q.id)!],
      });
    }

    // ---- Sliders ------------------------------------------------------
    // Blocks and rails come from the app's mark layer. The block outline is a
    // function of the mark radius alone, so it is written once and placed by
    // the frame the service reports for each pose.
    const sliders = restMarks.map((mark) => ({
      id: mark.id,
      block: trimPath(mark.block),
      // Drawn in the block's frame, standing in for the links it is fused to.
      plate: mark.plate ? { d: trimPath(mark.plate.path), fill: mark.plate.fill } : null,
      // Links merely pinned to the block are redrawn above it (the app's layer
      // 4) so a coupler ending at a slider is not swallowed by the black block.
      // Same outline, so the page draws the body it already has a second time.
      riders: mark.riders.map((rider) => rider.link.id),
      rails: mark.rails
        ? {
            x: round(mark.rails.x),
            y: round(mark.rails.y),
            rotation: round(mark.rails.rotation),
            rails: mark.rails.rails.map(seg),
            dashed: mark.rails.dashedRails.map(seg),
            ticks: mark.rails.ticks.map(seg),
          }
        : null,
      // Where the block sits at each pose. Recomputed rather than derived from
      // the pin, because a slot's own angle is what turns the block and that
      // is the mark layer's answer to give.
      poses: [] as number[][],
    }));

    for (const t of pick) {
      const marks = marker.marks(mechanism.joints[t], MARK_R, guidesOf(mechanism));
      sliders.forEach((slider) => {
        const at = marks.find((m: SliderMark) => m.id === slider.id);
        slider.poses.push(at ? [round(at.x), round(at.y), round(at.rotation)] : [0, 0, 0]);
      });
    }

    // ---- Traced paths and velocity ------------------------------------
    const traced = mechanism.joints[0]
      .map((j, i) => ({ joint: j as RealJoint, i }))
      .filter(({ joint }) => joint instanceof RealJoint && joint.showCurve);

    const traces = traced.map(({ i }) => ({
      i,
      d: trimPath(
        mechanism.joints
          .map((frame, t) => `${t === 0 ? 'M' : 'L'} ${frame[i].x} ${frame[i].y}`)
          .join(' ') + ' Z'
      ),
    }));

    let vectors: ReturnType<typeof velocityTrace> = null;
    if (linkage.vectors && traced.length > 0) {
      vectors = velocityTrace(mechanism, traced[0].i, pick);
    }

    const view = bounds(mechanism, sliders);

    const payload = {
      id: linkage.id,
      objectScale: OBJECT_SCALE,
      modelScale: MODEL_SCALE,
      rpm: linkage.fixture.inputAngVel,
      /** Seconds of real time one written cycle stands for. */
      period: 60 / Math.abs(linkage.fixture.inputAngVel),
      view,
      jointIds,
      // Every stroke and radius the drawing needs, resolved here against the
      // object scale so the page never has to know the rules behind them.
      style: {
        jointFill: JOINT_FAMILIES[0].normal,
        trace: 0.01 * OBJECT_SCALE,
        groundLine: GROUND_STROKE.rail * MARK_R,
        groundHatch: GROUND_STROKE.hatch * MARK_R,
        glyph: OBJECT_SCALE * 1.2,
      },
      joints: mechanism.joints[0]
        .map((j, i) => ({ j, i }))
        .filter(({ j }) => j instanceof RealJoint && !(j instanceof PrisJoint))
        .map(({ j, i }) => {
          const joint = j as RealJoint;
          return {
            i,
            id: joint.id,
            r: joint.r * OBJECT_SCALE,
            ground: joint.ground,
            input: joint.input,
            // As `drivenClockwise` asks it: a negative commanded speed is the
            // clockwise one, and the asset named CW is the one that reads
            // clockwise through the drawing's y-flip.
            cw: linkage.fixture.inputAngVel < 0,
            weld: joint.isWelded ? trimPath(plusPath(MARK_R)) : null,
          };
        }),
      bodies,
      sliders,
      traces,
      vectors,
      frames,
    };

    const text = JSON.stringify(payload);
    writeFileSync(join(out, `${linkage.id}.json`), text);
    index.push({ id: linkage.id, bytes: text.length });
    console.log(
      `${linkage.id.padEnd(10)} ${String(steps).padStart(4)} poses solved  ` +
        `${bodies.length} bodies  ${sliders.length} sliders  ${(text.length / 1024).toFixed(1)} kB`
    );
  }

  writeFileSync(join(out, 'index.json'), JSON.stringify(index));
}

function seg(s: { x1: number; y1: number; x2: number; y2: number }) {
  return [round(s.x1), round(s.y1), round(s.x2), round(s.y2)];
}

function translated(d: string, x: number, y: number): string {
  // The motor case is authored about the origin; the app places it with a
  // transform, and a precomputed body has to carry it already placed.
  return d.replace(/(-?[\d.]+)\s+(-?[\d.]+)/g, (_, a, b) => `${Number(a) + x} ${Number(b) + y}`);
}

/**
 * How far each grounded guide's block runs over the whole cycle, which is what
 * decides how long its rail is drawn. Lifted from the canvas's own `guides()`.
 */
function guidesOf(mechanism: any) {
  const found = new Map<string, { x: number; y: number; lo: number; hi: number }>();
  const frames = mechanism.joints;
  const rest = frames[0];
  for (let index = 0; index < rest.length; index++) {
    const joint = rest[index];
    if (!(joint instanceof PrisJoint) || !joint.ground) continue;
    const angle = joint.slotAngle;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    let lo = 0;
    let hi = 0;
    for (const frame of frames) {
      const at = frame[index];
      if (!at) continue;
      const along = (at.x - joint.x) * cos + (at.y - joint.y) * sin;
      lo = Math.min(lo, along);
      hi = Math.max(hi, along);
    }
    found.set(joint.id, { x: joint.x, y: joint.y, lo, hi });
  }
  return found;
}

/**
 * The velocity of one joint over the cycle, drawn the way the Analyze tab draws
 * it: two dozen arrows around the path, normalised against the largest anywhere
 * in the cycle, plus the live vector at each written pose so the arrow on screen
 * is drawn to the same scale as the ones behind it.
 */
function velocityTrace(mechanism: any, jointIndex: number, pick: number[]) {
  const id = mechanism.joints[0][jointIndex].id;
  const steps = mechanism.joints.length;
  KinematicsSolver.resetVariables();
  KinematicsSolver.requiredLoops = mechanism.requiredLoops;

  const at: { x: number; y: number }[] = [];
  const vel: { x: number; y: number }[] = [];
  for (let t = 0; t < steps; t++) {
    KinematicsSolver.determineKinematics(
      mechanism.joints[t],
      mechanism.links[t],
      mechanism.inputAngularVelocities[t]
    );
    const v = KinematicsSolver.jointVelMap.get(id);
    at.push({ x: mechanism.joints[t][jointIndex].x, y: mechanism.joints[t][jointIndex].y });
    vel.push(v ? { x: v[0], y: v[1] } : { x: 0, y: 0 });
  }

  const shape = buildVectorTrace(steps, (i) => at[i], (i) => vel[i], sweptSpan(mechanism));
  if (!shape) return null;

  return {
    ink: VECTOR_INK.velocity,
    d: trimPath(shape.d),
    // The arrow at the pose on screen: tail, then the vector already scaled to
    // the same length the pale arrows behind it were drawn at, so the live one
    // can never look like a spike the cycle does not contain. The page turns
    // the four numbers into a path with the app's own `arrowPath`.
    live: pick.map((t) => [
      round(at[t].x),
      round(at[t].y),
      round(vel[t].x * shape.scale),
      round(vel[t].y * shape.scale),
    ]),
  };
}

/**
 * The diagonal of everything the joints ever sweep — what an arrow's length is
 * measured against, as `MechanismService.sweptSpanOf` measures it.
 */
function sweptSpan(mechanism: any): number {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const frame of mechanism.joints)
    for (const j of frame) {
      minX = Math.min(minX, j.x);
      maxX = Math.max(maxX, j.x);
      minY = Math.min(minY, j.y);
      maxY = Math.max(maxY, j.y);
    }
  const span = Math.hypot(maxX - minX, maxY - minY);
  return span > 0 ? span : MODEL_SCALE;
}

/** Everything the drawing ever occupies, so the page can frame it once. */
function bounds(mechanism: any, sliders: { rails: { rails: number[][] } | null }[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const see = (x: number, y: number) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  };
  for (const frame of mechanism.joints) for (const j of frame) see(j.x, j.y);
  for (const slider of sliders) {
    if (!slider.rails) continue;
    for (const r of slider.rails.rails) {
      see(r[0], r[1]);
      see(r[2], r[3]);
    }
  }
  // Room for the marks that hang off a joint rather than sitting on it: a
  // ground triangle and its hatching reach about six tenths of a mark below.
  const pad = 0.9 * OBJECT_SCALE;
  return {
    x: round(minX - pad),
    y: round(minY - pad),
    w: round(maxX - minX + pad * 2),
    h: round(maxY - minY + pad * 2),
  };
}

main();
