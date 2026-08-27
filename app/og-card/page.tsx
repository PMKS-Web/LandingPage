import Image from 'next/image'
import type { Metadata } from 'next'
import Mechanism from '@/components/pmks/mechanism'
import logo from '@/public/images/PMKS_logo.png'

/**
 * The social card, as a page, so `npm run shots` can photograph it.
 *
 * The card used to be a screenshot of the hero. In a feed that card is about
 * 500 pixels wide, and everything the hero carries — five nav links, two
 * buttons, a four-line paragraph, a transport bar — arrived as illegible
 * texture around the one thing worth seeing. This is the same page said at
 * feed size: the mark, one line, and a mechanism big enough to read as a
 * mechanism.
 *
 * Kept out of the index and out of the sitemap. It is a photographic subject,
 * not a page anybody should land on.
 */
export const metadata: Metadata = {
  title: 'PMKS+ social card',
  robots: { index: false, follow: false },
}

export default function OgCard() {
  return (
    <div className="flex h-[630px] w-[1200px] overflow-hidden bg-white">
      <div className="flex w-[620px] shrink-0 flex-col justify-center px-16">
        {/* `self-start`, or the column's stretch alignment overrides `w-auto`
            and the mark comes out as wide as the text beside it. */}
        <Image src={logo} alt="PMKS+" className="mb-10 h-11 w-auto self-start" priority />
        <h1 className="mb-6 text-[52px] font-bold leading-[1.04] tracking-[-0.035em] text-ink-900">
          Planar mechanism simulation.
        </h1>
        <p className="mb-10 text-[26px] leading-[1.35] text-ink-700">
          Free, in your browser. No install, no account.
        </p>
        <div className="font-mono text-[19px] tracking-[.04em] text-indigo-500">pmksplus.com</div>
      </div>
      <div className="relative flex-1 border-l border-ink-100">
        <Mechanism id="fourbar" className="h-full w-full" />
      </div>
    </div>
  )
}
