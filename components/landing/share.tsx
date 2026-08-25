import Mechanism from '@/components/pmks/mechanism'
import Kicker from './kicker'

const LINK = 'app.pmksplus.com/#j=A,0,0,g;B,1.2,0;C,3.4,1.9;D,3,0,g&l=AB,BC,CD&m=A,10rpm&t=C'

/**
 * The one claim on the page that is hard to believe until you see it, so it
 * gets the darkest panel and a mechanism running beside it — a Whitworth quick
 * return, which is the kind of thing that URL is carrying.
 */
export default function Share() {
  return (
    <section className="bg-indigo-900 px-5 py-8 text-white lg:px-14 lg:py-[72px]">
      <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
        {/* The URL is one unbroken token and must not wrap — it is the point of
            the section that it is a single link — so the column it sits in is
            told it may be narrower than its widest child and clip it. */}
        <div className="min-w-0">
          <Kicker tone="amber" className="mb-3 lg:mb-4">
            Share
          </Kicker>
          <h2 className="mb-3.5 text-[27px] font-bold leading-[1.1] tracking-[-0.03em] lg:mb-4 lg:text-[40px] lg:leading-[1.08]">
            The whole mechanism fits in a link.
          </h2>
          <p className="mb-[18px] max-w-[40em] text-[15.5px] leading-[1.6] text-indigo-100 lg:mb-6 lg:text-[17.5px]">
            Every joint, link, force, weld and mass packs into one URL. Send it and the other person
            opens exactly what you see. No account, no upload, no expiry, nothing kept on a server. A
            class can pass mechanisms around like messages.
          </p>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap rounded bg-indigo-950 p-3 font-mono text-[11px] text-amber-400 lg:p-[14px_16px] lg:text-[12.5px]">
            {LINK}
          </div>
        </div>
        <div className="mt-3.5 overflow-hidden rounded-card bg-white shadow-card lg:mt-0">
          <Mechanism id="whitworth" className="h-[210px] w-full lg:h-[320px]" />
        </div>
      </div>
    </section>
  )
}
