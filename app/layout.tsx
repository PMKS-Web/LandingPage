import './css/style.css'

import type { Metadata } from 'next'
import { SITE } from './site'
import { Roboto, Roboto_Mono } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

/**
 * Names the category, not only the brand.
 *
 * "Web-based Linkage Analysis Tool" is what the thing is, but nobody searches
 * for it in those words: the phrases that bring people here are "planar
 * mechanism simulator", "linkage simulator", "kinematic analysis". The acronym
 * is spelled out in the hero's opening line for the same reason.
 */
const TITLE = 'PMKS+ — Free Planar Mechanism & Linkage Simulator'

/** For a search result, which shows about 155 characters. */
const DESCRIPTION =
  'Build and simulate planar mechanisms in your browser. Position, velocity, ' +
  'acceleration and forces, with no installation, account or upload.'

/**
 * For a link preview, which shows about 125 and truncates the rest on a phone.
 * The same claim, said shorter, rather than the long one cut off mid-word.
 */
const CARD_DESCRIPTION =
  'Build and simulate planar mechanisms in your browser \u2014 position, velocity, ' +
  'acceleration and forces. No install, no account.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'PMKS+',
    title: TITLE,
    description: CARD_DESCRIPTION,
    images: [
      {
        // The page's own first screen, retaken by `npm run shots` — headline
        // over a live mechanism, at the size every preview crops to.
        url: '/images/social-card.png',
        width: 1200,
        height: 630,
        alt: 'PMKS+: serious linkage analysis, zero setup — a four-bar running on the grid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: CARD_DESCRIPTION,
    images: ['/images/social-card.png'],
  },
}

/**
 * What the page is, in the vocabulary a search engine reads.
 *
 * The same facts the page states in prose — free, in a browser, for teaching
 * mechanism kinematics — said once more in a form a machine can quote in a
 * result. `offers` at zero is the part that earns the "Free" a reader sees.
 */
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PMKS+',
  alternateName: 'Planar Mechanism Kinematic Simulator Plus',
  applicationCategory: 'EducationalApplication',
  applicationSubCategory: 'Engineering simulation',
  operatingSystem: 'Any — runs in a web browser',
  browserRequirements: 'Requires JavaScript. Runs in any modern browser.',
  url: SITE,
  installUrl: 'https://app.pmksplus.com',
  image: `${SITE}/images/social-card.png`,
  description: DESCRIPTION,
  license: 'https://opensource.org/licenses/MIT',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: {
    '@type': 'CollegeOrUniversity',
    name: 'Worcester Polytechnic Institute',
    url: 'https://www.wpi.edu',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="bg-white font-sans text-ink-900 antialiased">
        <main>{children}</main>
        <script
          type="application/ld+json"
          // The object above, not markup: JSON.stringify cannot emit a tag, and
          // the alternative is hand-written JSON that drifts from the metadata
          // beside it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </body>
    </html>
  )
}
