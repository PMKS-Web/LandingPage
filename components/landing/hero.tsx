'use client'

import MechanismView from '@/components/pmks/mechanism-view'
import { useMechanism } from '@/components/pmks/use-mechanism'
import Transport from './transport'
import { APP } from './links'
import { TEMPLATE } from './template-links'

/**
 * A four-bar, running, with the page's opening words laid over it.
 *
 * The linkage is the real one: solved by the app's own position solver, drawn
 * with the app's own link outlines and joint marks, with the velocity of the
 * coupler point on it exactly as the Analyze tab draws it.
 *
 * The words are written once and moved, rather than written twice and one of
 * them hidden per breakpoint. Two copies meant two `<h1>`s in the document, and
 * a page with two of those has told a crawler its subject twice and disagreed
 * with itself about which one counts. On a phone the block follows the canvas
 * in ordinary flow; from `lg` it lifts onto the empty left of the grid.
 */
export default function Hero() {
  const player = useMechanism('fourbar')

  return (
    <section className="relative border-y border-ink-100">
      <div className="relative">
        <MechanismView player={player} wideAlign={0.86} className="h-[290px] w-full lg:h-[540px]" />
        {/* On a phone the transport rides the bottom of the canvas, because the
            copy that would otherwise carry it is below the fold of the picture. */}
        <Transport player={player} compact className="absolute inset-x-3.5 bottom-3.5 lg:hidden" />
      </div>

      {/* Out of flow from `lg`, so it has to fit the canvas's 540px on its own:
          nothing below pushes down to make room for it. */}
      <div className="px-5 pb-6 pt-7 lg:absolute lg:left-14 lg:top-14 lg:max-w-[600px] lg:p-0">
        <h1 className="mb-3.5 text-[31px] font-bold leading-[1.06] tracking-[-0.035em] lg:mb-4 lg:text-[48px] lg:leading-[1.05]">
          Planar mechanism simulation and analysis. Zero setup.
        </h1>
        <p className="mb-5 max-w-[30em] text-[15.5px] leading-[1.6] text-ink-700 lg:mb-6 lg:text-[18px] lg:leading-[1.55]">
          PMKS+ — the Planar Mechanism Kinematic Simulator — builds and simulates linkages in your
          browser: four-bars, slider-cranks, six-bars and whole machines, with position, velocity,
          acceleration and forces. No installation, account, or upload.
        </p>
        <div className="mb-0 flex flex-col gap-2.5 lg:mb-6 lg:flex-row lg:gap-3">
          <a
            href={APP}
            className="rounded bg-indigo-500 px-4 py-[15px] text-center text-[15.5px] font-medium text-white hover:opacity-90 lg:px-7 lg:py-4 lg:text-base"
          >
            Start building
          </a>
          {/* One mechanism, already running — not the library and another
              decision. Browsing them all is its own button, further down. */}
          <a
            href={TEMPLATE.fourBar}
            className="rounded border border-indigo-100 bg-white px-4 py-[15px] text-center text-[15.5px] font-medium text-indigo-700 hover:opacity-75 lg:px-7 lg:py-4 lg:text-base"
          >
            Run a four-bar example
          </a>
        </div>
        <div className="hidden lg:block">
          <Transport player={player} className="w-[470px]" />
        </div>
      </div>
    </section>
  )
}
