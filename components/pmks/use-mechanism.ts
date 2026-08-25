'use client'

import { useEffect, useRef, useState } from 'react'
import type { MechanismData } from './data'

/**
 * One linkage, loaded and playing.
 *
 * The geometry is fetched rather than imported so a page carrying eight of
 * these does not carry eight mechanisms' worth of JSON in its first payload,
 * and nothing is fetched or animated until the drawing is actually near the
 * viewport — a linkage the reader has scrolled past is not worth a frame.
 *
 * `phase` runs 0..1 over one cycle and is deliberately continuous: the written
 * poses are one every four degrees, and the drawing reads between them, so the
 * motion is as smooth as the display rather than as coarse as the file.
 */
export interface Player {
  data: MechanismData | null
  /** Attach to whatever element decides visibility — usually the drawing itself. */
  ref: (el: HTMLElement | null) => void
  playing: boolean
  setPlaying: (playing: boolean) => void
  /** 0..1 through the cycle. Reading it re-renders; `phaseRef` does not. */
  phase: number
  seek: (phase: number) => void
  phaseRef: React.MutableRefObject<number>
}

const cache = new Map<string, Promise<MechanismData>>()

function load(id: string): Promise<MechanismData> {
  let held = cache.get(id)
  if (!held) {
    held = fetch(`/mechanisms/${id}.json`).then((r) => r.json())
    cache.set(id, held)
  }
  return held
}

export function useMechanism(id: string, startPlaying = true): Player {
  const [data, setData] = useState<MechanismData | null>(null)
  const [playing, setPlaying] = useState(startPlaying)
  const [stillness, setStillness] = useState(false)
  const [phase, setPhase] = useState(0)
  const phaseRef = useRef(0)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const element = useRef<HTMLElement | null>(null)

  const ref = (el: HTMLElement | null) => {
    element.current = el
  }

  // Two questions of the same observer: is it worth fetching yet (a long way
  // out), and is it worth drawing (on screen at all).
  useEffect(() => {
    const el = element.current
    if (!el) return
    const watcher = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.isIntersecting)
          if (entry.isIntersecting) setNear(true)
        }
      },
      { rootMargin: '600px 0px' }
    )
    watcher.observe(el)
    return () => watcher.disconnect()
  }, [])

  // A reader who has asked their system for less motion gets the mechanism at
  // one pose rather than running. The transport still works, so the linkage is
  // theirs to move — it just does not move on its own.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setStillness(query.matches)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])

  useEffect(() => {
    if (!near) return
    let live = true
    load(id).then((loaded) => {
      if (live) setData(loaded)
    })
    return () => {
      live = false
    }
  }, [id, near])

  useEffect(() => {
    if (!data || !playing || !visible || stillness) return
    let raf = 0
    let last = performance.now()
    const step = (now: number) => {
      // Capped, so a tab that was in the background for a minute resumes where
      // it left off rather than jumping most of a revolution.
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      phaseRef.current = (phaseRef.current + dt / data.period) % 1
      setPhase(phaseRef.current)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [data, playing, visible, stillness])

  const seek = (next: number) => {
    phaseRef.current = ((next % 1) + 1) % 1
    setPhase(phaseRef.current)
  }

  return { data, ref, playing: playing && !stillness, setPlaying, phase, seek, phaseRef }
}
