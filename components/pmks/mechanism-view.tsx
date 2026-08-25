'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { arrowPath } from '@/engine/vendor/app/model/vector-trace'
import type { MechanismData } from './data'
import type { Player } from './use-mechanism'

/**
 * A PMKS+ mechanism, drawn the way the app draws it.
 *
 * Nothing here decides what anything looks like. Every outline, colour, stroke
 * width and mark comes out of `public/mechanisms/*.json`, which
 * `engine/precompute.ts` writes by running the app's own solver and mark
 * geometry over the linkage; this file lays those pieces out in the order and
 * the nesting the app's canvas lays them out in — one `scale(1 -1)` group with
 * the model's own y-up coordinates inside it — and moves them.
 *
 * The layer order is the app's, and it is load-bearing: rails under bodies so a
 * guide reads as something the linkage runs on, blocks over bodies, riders over
 * blocks so a rod pinned to a slider is not swallowed by it, joints over
 * everything because a pin is the thing you point at.
 */

const MODEL_SCALE = 200
const AXIS = '#3f51b5'
const MINOR = '#f2f2f4'
const MAJOR = '#e6e6ea'
const PATH_INK = '#1a237e'

/**
 * The app's grid rule (`SvgGridService.cellSizeFor`): the largest one, two or
 * five of a decade whose major cell still fits inside 200 screen pixels, so the
 * ruling subdivides steadily instead of in jumps.
 */
function cellSizeFor(pxPerUnit: number): number {
  const unitsPerMajor = 200 / (pxPerUnit * MODEL_SCALE)
  if (!(unitsPerMajor > 0) || !Number.isFinite(unitsPerMajor)) return 10000 * MODEL_SCALE
  const decade = 10 ** Math.floor(Math.log10(unitsPerMajor))
  const majorUnits = [5, 2, 1].find((step) => decade * step <= unitsPerMajor) ?? 1
  return decade * majorUnits * MODEL_SCALE
}

function lines(from: number, to: number, step: number, skipZero: boolean): number[] {
  const out: number[] = []
  // Guard rather than trust: a degenerate box would spin here forever.
  if (!(step > 0) || !Number.isFinite(from) || !Number.isFinite(to)) return out
  let at = Math.floor(from / step) * step
  while (at < to && out.length < 400) {
    if (!skipZero || Math.abs(at) > 0.001) out.push(Math.round(at * 10000) / 10000)
    at += step
  }
  return out
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Shortest way round from one angle to another, so 179 to -179 is two degrees. */
function lerpAngle(a: number, b: number, t: number): number {
  return a + (((((b - a) % 360) + 540) % 360) - 180) * t
}

interface Pose {
  /** Joint positions, flat, in `jointIds` order. */
  at: number[]
  /** `[x, y, rotation]` per slider, in `sliders` order. */
  sliders: number[][]
  live: number[] | null
}

function poseAt(data: MechanismData, phase: number): Pose {
  const n = data.frames.length
  const exact = ((phase % 1) + 1) % 1 * n
  const a = Math.floor(exact) % n
  const b = (a + 1) % n
  const t = exact - Math.floor(exact)
  const from = data.frames[a]
  const to = data.frames[b]
  return {
    at: from.map((v, i) => lerp(v, to[i], t)),
    sliders: data.sliders.map((slider) => [
      lerp(slider.poses[a][0], slider.poses[b][0], t),
      lerp(slider.poses[a][1], slider.poses[b][1], t),
      lerpAngle(slider.poses[a][2], slider.poses[b][2], t),
    ]),
    live: data.vectors
      ? data.vectors.live[a].map((v, i) => lerp(v, data.vectors!.live[b][i], t))
      : null,
  }
}

/** Where a rigid body has been carried, from the two joints that carry it. */
function bodyTransform(rest: number[], at: number[], by: [number, number]): string {
  const [i, j] = by
  const p0x = rest[i * 2]
  const p0y = rest[i * 2 + 1]
  const p1x = at[i * 2]
  const p1y = at[i * 2 + 1]
  const was = Math.atan2(rest[j * 2 + 1] - p0y, rest[j * 2] - p0x)
  const now = Math.atan2(at[j * 2 + 1] - p1y, at[j * 2] - p1x)
  const spin = ((now - was) * 180) / Math.PI
  return `translate(${p1x - p0x} ${p1y - p0y}) rotate(${spin} ${p0x} ${p0y})`
}

export interface MechanismViewProps {
  player: Player
  /**
   * Where the drawing sits when the frame is wider than it needs: 0.5 centres
   * it, higher pushes it right — the hero holds its copy over the left of the
   * canvas, so its linkage stands well over on the other side.
   */
  align?: number
  /** Under 1 leaves air around the linkage; over 1 crops into it. */
  zoom?: number
  className?: string
}

export default function MechanismView({
  player,
  align = 0.5,
  zoom = 1,
  className,
}: MechanismViewProps) {
  const { data, phase } = player
  const host = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    player.ref(el)
    const watcher = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      if (box.width > 0 && box.height > 0) setSize({ w: box.width, h: box.height })
    })
    watcher.observe(el)
    return () => watcher.disconnect()
    // The player identity is stable for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const frame = useMemo(() => {
    if (!data || !size) return null
    const { view } = data
    const k = Math.min(size.w / view.w, size.h / view.h) * zoom
    const w = size.w / k
    const h = size.h / k
    const x = view.x - (w - view.w) * align
    const y = view.y - (h - view.h) / 2
    return { k, w, h, x, y }
  }, [data, size, align, zoom])

  const pose = useMemo(() => (data ? poseAt(data, phase) : null), [data, phase])

  return (
    <div ref={host} className={className} style={{ background: '#fff' }}>
      {data && frame && pose && (
        <svg
          width="100%"
          height="100%"
          viewBox={`${frame.x} ${-(frame.y + frame.h)} ${frame.w} ${frame.h}`}
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <defs>
            {/* The app's own elevation-1: what lifts a joint and a slider block
                off the paper they sit on. */}
            <filter
              id={`pmks-lift-${data.id}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation={0.008 * data.objectScale} />
              <feOffset dx={0.004 * data.objectScale} dy={-0.004 * data.objectScale} />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* The canvas's own stacking order, and it carries meaning: a ground
              glyph under the bar bolted to it so the two read as one part, rails
              under the block that runs on them, riders over the block so a rod
              pinned to a slider is not swallowed by it, pins over every body,
              and the traced path and its arrows over everything — they are what
              the drawing is being read for. */}
          <g transform="scale(1 -1)">
            <Grid frame={frame} />
            <Grounds data={data} pose={pose} />
            <Rails data={data} />
            <Bodies data={data} pose={pose} k={frame.k} only={(id) => !isRider(data, id)} />
            <Blocks data={data} pose={pose} lift={`url(#pmks-lift-${data.id})`} k={frame.k} />
            <Bodies data={data} pose={pose} k={frame.k} only={(id) => isRider(data, id)} />
            <Joints data={data} pose={pose} lift={`url(#pmks-lift-${data.id})`} />
            <Traces data={data} />
            <Vectors data={data} pose={pose} k={frame.k} />
          </g>
        </svg>
      )}
    </div>
  )
}

/** A body pinned to a slider block is drawn again above it, never below. */
function isRider(data: MechanismData, id: string): boolean {
  return data.sliders.some((slider) => slider.riders.includes(id))
}

function Grid({ frame }: { frame: { k: number; x: number; y: number; w: number; h: number } }) {
  const major = cellSizeFor(frame.k)
  const minor = major / 5
  const hair = 1 / frame.k
  const left = frame.x
  const right = frame.x + frame.w
  const bottom = frame.y
  const top = frame.y + frame.h
  const rule = (step: number, stroke: string, skipZero: boolean) => (
    <g stroke={stroke} strokeWidth={hair}>
      {lines(left, right, step, skipZero).map((at) => (
        <line key={`v${at}`} x1={at} y1={bottom} x2={at} y2={top} />
      ))}
      {lines(bottom, top, step, skipZero).map((at) => (
        <line key={`h${at}`} x1={left} y1={at} x2={right} y2={at} />
      ))}
    </g>
  )
  return (
    <g>
      <rect x={left} y={bottom} width={frame.w} height={frame.h} fill="#fff" />
      {rule(minor, MINOR, false)}
      {rule(major, MAJOR, true)}
      <g stroke={AXIS} strokeWidth={1.5 / frame.k}>
        <line x1={left} y1={0} x2={right} y2={0} />
        <line x1={0} y1={bottom} x2={0} y2={top} />
      </g>
    </g>
  )
}

/**
 * A grounded guide: its rails, the broken stretch where another guide passes
 * through, and the hatching that says the far side of it is the world.
 */
function Rails({ data }: { data: MechanismData }) {
  return (
    <g pointerEvents="none">
      {data.sliders.map((slider) =>
        slider.rails ? (
          <g
            key={slider.id}
            transform={`translate(${slider.rails.x} ${slider.rails.y}) rotate(${slider.rails.rotation})`}
            stroke="#000"
          >
            {slider.rails.rails.map((seg, i) => (
              <line
                key={`r${i}`}
                x1={seg[0]}
                y1={seg[1]}
                x2={seg[2]}
                y2={seg[3]}
                strokeLinecap="round"
                strokeWidth={data.style.groundLine}
              />
            ))}
            {slider.rails.dashed.map((seg, i) => (
              <line
                key={`d${i}`}
                x1={seg[0]}
                y1={seg[1]}
                x2={seg[2]}
                y2={seg[3]}
                strokeLinecap="butt"
                strokeWidth={data.style.groundLine}
                strokeDasharray={`${data.style.groundLine * 2} ${data.style.groundLine * 2}`}
              />
            ))}
            {slider.rails.ticks.map((seg, i) => (
              <line
                key={`t${i}`}
                x1={seg[0]}
                y1={seg[1]}
                x2={seg[2]}
                y2={seg[3]}
                strokeLinecap="round"
                strokeWidth={data.style.groundHatch}
              />
            ))}
          </g>
        ) : null
      )}
    </g>
  )
}

function Bodies({
  data,
  pose,
  k,
  only,
}: {
  data: MechanismData
  pose: Pose
  k: number
  only: (id: string) => boolean
}) {
  const rest = data.frames[0]
  return (
    <g>
      {data.bodies
        .filter((body) => only(body.id))
        .map((body) => (
          <path
            key={body.id}
            d={body.d}
            transform={bodyTransform(rest, pose.at, body.by)}
            fill={body.fill}
            fillOpacity={0.7}
            fillRule="evenodd"
            stroke={body.fill}
            strokeWidth={3 / k}
          />
        ))}
    </g>
  )
}

function Blocks({
  data,
  pose,
  lift,
  k,
}: {
  data: MechanismData
  pose: Pose
  lift: string
  k: number
}) {
  return (
    <g pointerEvents="none">
      {data.sliders.map((slider, i) => {
        const [x, y, rotation] = pose.sliders[i]
        return (
          <g key={slider.id} transform={`translate(${x} ${y}) rotate(${rotation})`}>
            <path d={slider.block} fill="#000000" filter={lift} />
            {slider.plate && (
              <path
                d={slider.plate.d}
                fill={slider.plate.fill}
                fillOpacity={0.7}
                fillRule="evenodd"
                stroke={slider.plate.fill}
                strokeWidth={3 / k}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}

/** The curve a traced joint draws over a whole cycle. */
function Traces({ data }: { data: MechanismData }) {
  return (
    <g pointerEvents="none" stroke={PATH_INK} fill="none" strokeWidth={data.style.trace}>
      {data.traces.map((trace) => (
        <path key={trace.i} d={trace.d} />
      ))}
    </g>
  )
}

/**
 * Velocity on the traced point: two dozen pale arrows saying what the whole
 * turn does, and one at full strength saying what is happening now.
 */
function Vectors({ data, pose, k }: { data: MechanismData; pose: Pose; k: number }) {
  if (!data.vectors || !pose.live) return null
  const [x, y, dx, dy] = pose.live
  return (
    <g pointerEvents="none" fill="none" stroke={data.vectors.ink} strokeLinecap="round">
      <path d={data.vectors.d} strokeWidth={1.5 / k} opacity={data.vectors.traceOpacity} />
      <path d={arrowPath([{ x, y, dx, dy }])} strokeWidth={3 / k} />
      <circle cx={x} cy={y} r={3 / k} fill={data.vectors.ink} stroke="none" />
    </g>
  )
}

/**
 * The ground triangle, and the turning arrow on the joint a motor drives.
 *
 * Placed exactly as the canvas places them: a frame at the joint, flipped back
 * upright out of the drawing's own y-flip, with the asset hung off it.
 */
function Grounds({ data, pose }: { data: MechanismData; pose: Pose }) {
  const box = data.style.glyph
  return (
    <g pointerEvents="none">
      {data.joints
        .filter((joint) => joint.ground)
        .map((joint) => {
          const x = pose.at[joint.i * 2]
          const y = pose.at[joint.i * 2 + 1]
          const asset = !joint.input ? 'Ground' : joint.cw ? 'InputCW' : 'InputCCW'
          const offX = joint.input ? -0.505 * box : (-0.6 * box) / 1.2
          const offY = joint.input ? -0.435 * box : -0.35 * box
          return (
            <g key={joint.id} transform={`translate(${x} ${y}) scale(1 -1)`}>
              <image
                href={`/pmks/${asset}.svg`}
                x={offX}
                y={offY}
                width={box}
                height={box}
              />
            </g>
          )
        })}
    </g>
  )
}

/**
 * The pins. Amber, lifted off the paper, and drawn last so a joint is never
 * behind the bar it belongs to. A welded joint wears a plus mark instead of a
 * circle, because it is not free to turn.
 */
function Joints({ data, pose, lift }: { data: MechanismData; pose: Pose; lift: string }) {
  return (
    <g>
      {data.joints.map((joint) => {
        const x = pose.at[joint.i * 2]
        const y = pose.at[joint.i * 2 + 1]
        return joint.weld ? (
          <path
            key={joint.id}
            d={joint.weld}
            transform={`translate(${x} ${y})`}
            fill={data.style.jointFill}
            filter={lift}
          />
        ) : (
          <circle
            key={joint.id}
            cx={x}
            cy={y}
            r={joint.r}
            fill={data.style.jointFill}
            filter={lift}
          />
        )
      })}
    </g>
  )
}
