'use client'

import type { Player } from '@/components/pmks/use-mechanism'

/**
 * The bar under the hero: stop the mechanism, drag it to any pose, and read the
 * crank angle and the time off it. The same three controls the app's own
 * playback bar carries, because the point of putting a live linkage on a
 * landing page is that it is the app, not a video of it.
 */
export default function Transport({
  player,
  compact = false,
  className = '',
}: {
  player: Player
  compact?: boolean
  className?: string
}) {
  const { data, playing, setPlaying, phase, seek } = player
  const degrees = ((phase % 1) + 1) % 1 * 360
  const seconds = data ? (phase * data.period) : 0
  const angle = `${String(Math.round(degrees) % 360).padStart(3, '0')}°`

  return (
    <div
      className={`flex items-center gap-3 rounded-[8px] bg-white p-[9px_12px] shadow-card lg:gap-3.5 lg:rounded-card lg:p-[11px_16px] ${className}`}
    >
      <button
        type="button"
        onClick={() => setPlaying(!playing)}
        aria-label={playing ? 'Pause the mechanism' : 'Play the mechanism'}
        className="min-w-[62px] rounded bg-indigo-500 px-3 py-2 font-mono text-[11px] text-white lg:min-w-[74px] lg:px-3.5 lg:py-[9px] lg:text-[11.5px]"
      >
        {playing ? 'PAUSE' : 'PLAY'}
      </button>
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(phase * 1000)}
        aria-label="Crank angle"
        onChange={(event) => {
          setPlaying(false)
          seek(Number(event.target.value) / 1000)
        }}
        className="scrubber flex-1"
      />
      <span
        className={`text-right font-mono text-[10.5px] text-ink-600 lg:text-[11.5px] ${
          compact ? 'min-w-[42px]' : 'min-w-[124px]'
        }`}
      >
        {compact ? angle : `θ ${angle} · ${seconds.toFixed(2)} s`}
      </span>
    </div>
  )
}
