'use client'

import MechanismView from '@/components/pmks/mechanism-view'
import { useMechanism } from '@/components/pmks/use-mechanism'
import Transport from './transport'
import { APP, APP_LIBRARY } from './links'

/**
 * A four-bar, running, with the page's opening words laid over it.
 *
 * The linkage is the real one: solved by the app's own position solver, drawn
 * with the app's own link outlines and joint marks, with the velocity of the
 * coupler point on it exactly as the Analyze tab draws it. On a wide screen it
 * fills the band and the copy sits over the empty left of the grid; on a phone
 * it takes the top of the screen and the copy follows underneath.
 */
export default function Hero() {
  const player = useMechanism('fourbar')

  return (
    <section className="border-y border-ink-100">
      <div className="relative">
        <MechanismView
          player={player}
          wideAlign={0.86}
          className="h-[290px] w-full lg:h-[540px]"
        />
        {/* On a phone the transport rides the bottom of the canvas, because the
            copy that would otherwise carry it is below the fold of the picture. */}
        <Transport
          player={player}
          compact
          className="absolute inset-x-3.5 bottom-3.5 lg:hidden"
        />

        <div className="absolute left-14 top-16 hidden max-w-[610px] lg:block">
          <Copy />
          <Transport player={player} className="w-[470px]" />
        </div>
      </div>

      <div className="px-5 pb-6 pt-7 lg:hidden">
        <Copy />
      </div>
    </section>
  )
}

function Copy() {
  return (
    <>
      <h1 className="mb-3.5 text-[31px] font-bold leading-[1.06] tracking-[-0.035em] lg:mb-5 lg:text-[58px] lg:leading-[1.02]">
        Serious linkage analysis.
        <br />
        Zero setup.
      </h1>
      <p className="mb-5 max-w-[28em] text-[15.5px] leading-[1.6] text-ink-700 lg:mb-[30px] lg:text-[19px] lg:leading-[1.55]">
        Build and simulate planar mechanisms in your browser, from four-bars and slider-cranks to
        six-bars and whole machines. Inspect position, velocity, acceleration, and forces. No
        installation, account, or upload required.
      </p>
      <div className="mb-0 flex flex-col gap-2.5 lg:mb-7 lg:flex-row lg:gap-3">
        <a
          href={APP}
          className="rounded bg-indigo-500 px-4 py-[15px] text-center text-[15.5px] font-medium text-white hover:opacity-90 lg:px-7 lg:py-4 lg:text-base"
        >
          Start building
        </a>
        <a
          href={APP_LIBRARY}
          className="rounded border border-indigo-100 bg-white px-4 py-[15px] text-center text-[15.5px] font-medium text-indigo-700 hover:opacity-75 lg:px-7 lg:py-4 lg:text-base"
        >
          Try an example
        </a>
      </div>
    </>
  )
}
