import Mechanism from '@/components/pmks/mechanism'
import Kicker from './kicker'
import { APP_LIBRARY } from './links'
import { TEMPLATE } from './template-links'
import { MECHANISM_PAGES } from '@/content/mechanisms'

/**
 * Six of the library's forty-two, each one running.
 *
 * The count is the catalogue's, minus the three drawings it only offers in a
 * development build: `template-catalog.ts` in the app, counted by category.
 *
 * Different mechanisms, not six views of the same four-bar: a slider-crank, an
 * engine with a disc for a flywheel, a Scotch yoke, a boom worked by a
 * hydraulic ram rather than by a crank, Hoeken's straight line and a six-bar
 * with a slider.
 */
/**
 * `open` is where the card goes. Four of the six are library templates and open
 * as themselves; the straight-line and the six-bar are drawn here rather than
 * taken from the catalogue, so they open the library instead of pretending to
 * be a template that is not there.
 */
const CARDS: { id: string; name: string; open: string }[] = [
  { id: 'slider', name: 'Slider-Crank', open: TEMPLATE.slider },
  { id: 'flywheel', name: 'Engine with a Flywheel', open: TEMPLATE.flywheel },
  { id: 'yoke', name: 'Scotch Yoke', open: TEMPLATE.yoke },
  { id: 'cylinderBoom', name: 'Cylinder-Driven Boom', open: TEMPLATE.cylinderBoom },
  { id: 'hoeken', name: 'Hoeken Straight-Line', open: APP_LIBRARY },
  { id: 'sixbar', name: 'Six-Bar with Slider', open: APP_LIBRARY },
]

export default function Library() {
  return (
    <section id="library" className="px-5 py-7 lg:px-14 lg:py-[72px]">
      <div className="mb-5 lg:mb-[26px] lg:flex lg:items-end lg:justify-between">
        <div>
          <Kicker className="mb-3 lg:mb-4">Library</Kicker>
          <h2 className="mb-2.5 text-[25px] font-medium leading-[1.2] tracking-[-0.015em] lg:text-[34px] lg:leading-[1.15] lg:tracking-[-0.02em]">
            42 mechanisms, ready to run.
          </h2>
          <p className="hidden max-w-[46em] text-[15.5px] text-ink-700 lg:block lg:text-[17px]">
            Eight families, from a first slider-crank to an engine with a flywheel, a boom on a
            hydraulic ram and a six-bar. Every one opens in a click, running, and comes apart under
            your cursor.
          </p>
        </div>
        <a
          href={APP_LIBRARY}
          className="mt-4 hidden whitespace-nowrap border-b border-indigo-100 pb-0.5 text-sm text-indigo-500 hover:opacity-75 lg:mt-0 lg:block"
        >
          Browse the mechanism library
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {/* The copy says every one opens in a click, so every one is a link —
            reachable by keyboard and by a crawler, not a div with a picture in
            it. */}
        {CARDS.map((card) => (
          <a
            key={card.id}
            href={card.open}
            className="group block overflow-hidden rounded-card border border-ink-100 bg-white transition hover:border-indigo-100 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <Mechanism id={card.id} className="h-[118px] w-full lg:h-[196px]" />
            <div className="flex items-center justify-between gap-2 border-t border-ink-100 px-2.5 py-2.5 text-[12.5px] font-medium lg:px-4 lg:py-3.5 lg:text-[15px]">
              {card.name}
              <span
                aria-hidden="true"
                className="text-indigo-500 opacity-0 transition group-hover:opacity-100"
              >
                &rarr;
              </span>
            </div>
          </a>
        ))}

        <div className="col-span-2 flex flex-col justify-between rounded-card bg-indigo-50 p-5 lg:p-[26px_28px]">
          <div>
            <div className="text-[26px] font-medium tracking-[-0.025em] text-indigo-700 lg:text-[32px]">
              36 more
            </div>
            <p className="mt-2 max-w-[30em] text-sm leading-[1.55] text-ink-700 lg:text-[15px]">
              Jansen legs, radial engines, an aircraft&rsquo;s landing gear, backhoe and loader
              buckets, walking beam pumps, scissor lifts, Watt and Stephenson six-bars.
            </p>
          </div>
          <a
            href={APP_LIBRARY}
            className="mt-3 self-start border-b border-indigo-100 pb-0.5 text-sm font-medium text-indigo-700 hover:opacity-75 lg:text-[14.5px]"
          >
            See all eight families
          </a>
        </div>
      </div>

      {/* Guides, as ordinary links. The cards open the app because that is what
          a card of a running mechanism should do; these are for the reader who
          arrived wanting to know what a quick-return actually is. */}
      <div className="mt-6 border-t border-ink-100 pt-5 lg:mt-8 lg:pt-6">
        <Kicker tone="grey" className="mb-2.5">
          Guides
        </Kicker>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {MECHANISM_PAGES.map((page) => (
            <li key={page.slug}>
              <a
                href={`/mechanisms/${page.slug}`}
                className="border-b border-indigo-100 text-[14.5px] text-indigo-700 hover:opacity-75 lg:text-[15px]"
              >
                {page.h1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
