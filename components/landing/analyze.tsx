import Image from 'next/image'
import Kicker from './kicker'
import Pill from './pill'
import shot from '@/public/images/app/analyze.png'

const EXPORTS = ['CSV', 'Excel workbook', 'Graph images', 'Print ready report']

export default function Analyze() {
  return (
    <section
      id="analyze"
      className="grid items-center gap-8 px-5 pb-7 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-14 lg:pb-[72px]"
    >
      <div className="overflow-hidden rounded-card shadow-card lg:order-1">
        <Image
          src={shot}
          alt="Kinematic analysis of a Whitworth quick return: position, velocity and acceleration graphed for one joint, and its velocity drawn on the mechanism as vectors"
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
      <div className="lg:order-2">
        <Kicker className="mb-3 lg:mb-4">Analyze</Kicker>
        <h2 className="mb-3 text-[25px] font-medium leading-[1.2] tracking-[-0.015em] lg:mb-4 lg:text-[34px] lg:leading-[1.15] lg:tracking-[-0.02em]">
          Numbers you can hand in.
        </h2>
        <p className="mb-4 text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[18px] lg:text-[17px]">
          Pick a joint for its position, velocity and acceleration. Pick a link for its angular
          motion and its centre of mass. Force analysis gives joint reactions and the torque or force
          the motor has to supply, in static equilibrium or in full dynamics.
        </p>
        <p className="mb-5 text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[22px] lg:text-[17px]">
          Velocity and acceleration can be drawn on the mechanism itself, as vectors, while it runs.
        </p>
        <div className="border-t border-ink-100 pt-4 lg:pt-[18px]">
          <Kicker tone="grey" className="mb-2.5">
            Export
          </Kicker>
          <div className="flex flex-wrap gap-2 lg:gap-2.5">
            {EXPORTS.map((kind) => (
              <Pill key={kind}>{kind}</Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
