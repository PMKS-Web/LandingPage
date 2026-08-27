import Image from 'next/image'
import Kicker from './kicker'
import grid from '@/public/images/app/phone-grid.png'
import panel from '@/public/images/app/phone-panel.png'

/**
 * The phone build, shown on a phone.
 *
 * Its own row rather than a line in the instructor section, because "it works
 * on the thing in your pocket" is the objection a link in a syllabus actually
 * runs into, and a claim about a screen is worth a picture of that screen.
 *
 * About what it can do rather than how the gestures work. Which finger opens
 * which menu is what the app's own tutorial is for; a reader deciding whether
 * to open this on a phone at all wants to know it is the whole tool, and what
 * that is good for once you are holding it.
 */
export default function Phone() {
  return (
    <section
      id="phone"
      className="grid items-center gap-7 px-5 pb-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-14 lg:pb-[72px]"
    >
      <div>
        <Kicker className="mb-3 lg:mb-4">On a phone</Kicker>
        <h2 className="mb-3 text-[25px] font-medium leading-[1.2] tracking-[-0.015em] lg:mb-4 lg:text-[34px] lg:leading-[1.15] lg:tracking-[-0.02em]">
          The same app, in a pocket.
        </h2>
        <p className="mb-4 text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[18px] lg:text-[17px]">
          <span className="lg:hidden">
            Not a cut-down viewer: the whole thing. Draw a linkage, ground it, analyze it, read the
            graphs — on the phone in your pocket.
          </span>
          <span className="hidden lg:inline">
            Not a cut-down viewer — the whole thing. Draw a linkage, weld and slot it, drive it,
            and read position, velocity, acceleration and forces off it, all on the phone in your
            pocket. Nothing is desktop-only.
          </span>
        </p>
        <p className="text-[15.5px] leading-[1.65] text-ink-700 lg:text-[17px]">
          Which turns out to matter away from a desk. Photograph a real machine with the phone&rsquo;s
          camera, drop the picture behind the grid, and trace the linkage straight onto it. Or hand
          someone your phone in a lab and show them the idea moving.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:gap-5">
        <Screen src={grid} alt="A scissor lift being raised by its hydraulic ram, on a phone" />
        <Screen
          src={panel}
          alt="The Kinematic Analysis panel open as a sheet over the drawing, on a phone"
        />
      </div>
    </section>
  )
}

function Screen({ src, alt }: { src: typeof grid; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-ink-200 bg-white shadow-card">
      <Image src={src} alt={alt} className="block h-auto w-full" sizes="(min-width: 1024px) 22vw, 45vw" />
    </div>
  )
}
