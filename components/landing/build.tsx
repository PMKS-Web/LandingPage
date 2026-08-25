import Image from 'next/image'
import Kicker from './kicker'
import Pill from './pill'
import shot from '@/public/images/app/build.png'

const TOOLS = ['Weld', 'Pin in slot', 'Hydraulic cylinder', 'Tracer point', 'Reference photo']

export default function Build() {
  return (
    <section
      id="build"
      className="grid items-center gap-8 px-5 py-7 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-14 lg:py-[72px]"
    >
      <div>
        <Kicker className="mb-3 lg:mb-4">Build</Kicker>
        <h2 className="mb-3 text-[25px] font-medium leading-[1.2] tracking-[-0.015em] lg:mb-4 lg:text-[34px] lg:leading-[1.15] lg:tracking-[-0.02em]">
          Built the way you&rsquo;d sketch it.
        </h2>
        <p className="mb-4 text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[18px] lg:text-[17px]">
          Lay the bars out the way you would on paper, ground the frame, choose the joint the motor
          turns, and press play. The mechanism moves the moment it can.
        </p>
        <p className="mb-5 text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[22px] lg:text-[17px]">
          Weld joints to form bell cranks and buckets, ride pins in slots, drive parts with hydraulic
          cylinders, and put a tracer point anywhere you want to watch. You can lay a photo of a real
          machine behind the grid and build your linkage on top of it, and the photo never leaves
          your computer.
        </p>
        <div className="flex flex-wrap gap-2 lg:gap-2.5">
          {TOOLS.map((tool) => (
            <Pill key={tool}>{tool}</Pill>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-card shadow-card">
        <Image
          src={shot}
          alt="The Edit panel open on a joint of a welded loader bucket"
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
    </section>
  )
}
