import './css/style.css'

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

export const metadata = {
  title: 'PMKS+ | Web-based Linkage Analysis Tool',
  description:
    'Build and simulate planar mechanisms in your browser. Position, velocity, acceleration and forces, with no installation, account or upload.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="bg-white font-sans text-ink-900 antialiased">{children}</body>
    </html>
  )
}
