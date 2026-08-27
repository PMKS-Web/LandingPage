import Image from 'next/image'
import Kicker from './kicker'
import Pill from './pill'
import shot from '@/public/images/app/analyze.png'

/** Shorter on a phone, where four long chips wrap to four lines. */
const EXPORTS = [
  { short: 'CSV', full: 'CSV' },
  { short: 'Excel', full: 'Excel workbook' },
  { short: 'Graph images', full: 'Graph images' },
  { short: 'Report', full: 'Print-ready report' },
]

export default function Analyze() {
  return (
    <section
      id="analyze"
      className="grid items-center gap-8 px-5 pb-7 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-14 lg:pb-[72px]"
    >
      {/* The picture follows the words on a phone and leads them on a laptop,
          so the two rows alternate on a wide screen and read in one order on a
          narrow one. */}
      <div className="order-last overflow-hidden rounded-card shadow-card lg:order-first">
        <Image
          src={shot}
          alt="Kinematic analysis of a Whitworth quick return: position, velocity and acceleration graphed for one joint, and its velocity drawn on the mechanism as vectors"
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
      <div>
        <Kicker className="mb-3 lg:mb-4">Analyze</Kicker>
        <h2 className="mb-3 text-[25px] font-medium leading-[1.2] tracking-[-0.015em] lg:mb-4 lg:text-[34px] lg:leading-[1.15] lg:tracking-[-0.02em]">
          Results you can check, not just collect.
        </h2>
        <p className="mb-4 text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[18px] lg:text-[17px]">
          <span className="lg:hidden">
            Position, velocity and acceleration for any joint. Joint reactions and the torque the
            motor has to supply, static or full dynamics.
          </span>
          <span className="hidden lg:inline">
            Pick a joint for its position, velocity and acceleration. Pick a link for its angular
            motion and its center of mass. Force analysis gives joint reactions and the torque or
            force the motor has to supply, in static equilibrium or in full dynamics.
          </span>
        </p>
        <p className="mb-5 hidden text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[22px] lg:block lg:text-[17px]">
          Velocity and acceleration can be drawn on the mechanism itself, as vectors, while it runs.
        </p>
        <div className="lg:border-t lg:border-ink-100 lg:pt-[18px]">
          <Kicker tone="grey" className="mb-2.5 hidden lg:block">
            Export
          </Kicker>
          <div className="flex flex-wrap gap-2 lg:gap-2.5">
            {EXPORTS.map((kind) => (
              <Pill key={kind.full}>
                <span className="lg:hidden">{kind.short}</span>
                <span className="hidden lg:inline">{kind.full}</span>
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
