import type { MetadataRoute } from 'next'
import { SITE } from './site'

/**
 * One page, for now.
 *
 * It exists at all so the domain can be submitted to Search Console and so the
 * per-mechanism pages have somewhere to be listed when they are written.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // `changeFrequency` and `priority` are not in this Next version's type and
    // are advisory to crawlers anyway.
    { url: SITE, lastModified: new Date() },
  ]
}
