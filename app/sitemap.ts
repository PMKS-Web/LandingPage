import type { MetadataRoute } from 'next'
import { MECHANISM_PAGES } from '@/content/mechanisms'
import { SITE } from './site'

/**
 * Everything meant to be found.
 *
 * `/og-card` is deliberately absent: it exists to be photographed, not read.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    // `changeFrequency` and `priority` are not in this Next version's type and
    // are advisory to crawlers anyway.
    { url: SITE, lastModified: now },
    { url: `${SITE}/validation`, lastModified: now },
    ...MECHANISM_PAGES.map((page) => ({
      url: `${SITE}/mechanisms/${page.slug}`,
      lastModified: now,
    })),
  ]
}
