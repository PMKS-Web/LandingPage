import type { MetadataRoute } from 'next'
import { SITE } from './site'

/**
 * Everything is welcome, and here is the map.
 *
 * There is nothing on this site to keep out of an index — it is one public
 * page. The app shell at app.pmksplus.com is a different matter and a different
 * repository: an opaque canvas has nothing to rank for and competes with this
 * page for the queries that should land here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
