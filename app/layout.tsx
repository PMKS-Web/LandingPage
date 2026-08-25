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
const DESCRIPTION =
  'Build and simulate planar mechanisms in your browser. Position, velocity, ' +
  'acceleration and forces, with no installation, account or upload.'

export const metadata: Metadata = {
  metadataBase: new URL('https://pmksplus.com'),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'PMKS+',
    title: TITLE,
    description: DESCRIPTION,
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
    description: DESCRIPTION,
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
