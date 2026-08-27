import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Mechanism from '@/components/pmks/mechanism'
import ProsePage from '@/components/landing/prose-page'
import Facts from '@/components/landing/facts'
import { MECHANISM_PAGES, mechanismPage } from '@/content/mechanisms'
import { SITE } from '@/app/site'

/**
 * One page per mechanism family.
 *
 * A homepage answers "what is this tool"; nobody searches for that. They search
 * for "four bar linkage simulator" and "quick return mechanism", and this is
 * the page that should be there when they do — with the thing itself running on
 * it, because that is what PMKS+ has that an article does not.
 */
export function generateStaticParams() {
  return MECHANISM_PAGES.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = mechanismPage(params.slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.lede,
    alternates: { canonical: `/mechanisms/${page.slug}` },
    openGraph: {
      type: 'article',
      url: `/mechanisms/${page.slug}`,
      siteName: 'PMKS+',
      title: page.title,
      description: page.lede,
      images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', images: ['/images/social-card.png'] },
  }
}

export default function MechanismPageRoute({ params }: { params: { slug: string } }) {
  const page = mechanismPage(params.slug)
  if (!page) notFound()

  return (
    <ProsePage
      kicker="Mechanism"
      title={page.h1}
      lede={page.lede}
      aside={
        <div className="mb-10 grid items-start gap-6 lg:mb-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <div className="overflow-hidden rounded-card border border-ink-100 bg-white">
              {/* Solved and drawn by the app's own engine, so the picture on the
                  page and the thing behind the button are the same mechanism. */}
              <Mechanism id={page.mech} className="h-[240px] w-full lg:h-[330px]" />
            </div>
            <a
              href={page.open}
              className="mt-4 inline-block rounded bg-indigo-500 px-6 py-3.5 text-[15px] font-medium text-white hover:opacity-90"
            >
              {page.openLabel}
            </a>
          </div>
          <div className="space-y-7">
            <Facts label="Where it turns up" items={page.uses} />
            <Facts label="What PMKS+ computes for it" items={page.analysis} />
          </div>
        </div>
      }
    >
      {page.body}
      <h2>Try it, then take it apart</h2>
      <p>
        The drawing above is the real mechanism, solved by the same code the app runs. Open it and
        every joint is yours to drag, every bar to re-proportion, every pin to ground or unground.
        Nothing to install, no account, and the whole thing travels as a URL when you want to hand
        it to somebody.
      </p>
      <p>
        <a href={page.open} className="border-b border-indigo-100 text-indigo-700 hover:opacity-75">
          {page.openLabel}
        </a>
        {' · '}
        <a href="/#library" className="border-b border-indigo-100 text-indigo-700 hover:opacity-75">
          Browse the whole library
        </a>
      </p>
      <h2>Related mechanisms</h2>
      <ul className="mb-4 space-y-1.5">
        {MECHANISM_PAGES.filter((other) => other.slug !== page.slug).map((other) => (
          <li key={other.slug} className="text-[16px] leading-[1.6] lg:text-[17px]">
            <a
              href={`/mechanisms/${other.slug}`}
              className="border-b border-indigo-100 text-indigo-700 hover:opacity-75"
            >
              {other.h1}
            </a>
          </li>
        ))}
      </ul>
    </ProsePage>
  )
}
