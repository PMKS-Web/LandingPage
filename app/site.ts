/**
 * Where this page is being served from.
 *
 * A deploy preview is not pmksplus.com, and a canonical, a sitemap or an
 * `og:image` that says otherwise from a preview describes the live site instead
 * of itself. Set NEXT_PUBLIC_SITE_URL in the preview's environment.
 */
export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pmksplus.com'
