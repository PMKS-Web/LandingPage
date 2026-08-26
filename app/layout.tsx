import './css/style.css'

import type { Metadata } from 'next'
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

const TITLE = 'PMKS+ | Web-based Linkage Analysis Tool'

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

/**
 * Where this page is being served from, which is what an `og:image` has to be
 * absolute against.
 *
 * A deploy preview is not pmksplus.com, and a card pointing at pmksplus.com
 * from a preview fetches whatever is live there instead — or, before this page
 * ships, nothing at all. Set NEXT_PUBLIC_SITE_URL in the preview's environment
 * to have it describe itself.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pmksplus.com'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="bg-white font-sans text-ink-900 antialiased">{children}</body>
    </html>
  )
}
