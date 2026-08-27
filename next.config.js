/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /**
     * Serve the pictures in `public/images/app` as they are.
     *
     * `next/image`'s default loader answers from a `/_next/image` endpoint that
     * only exists where a Next server is running — a static export, or a host
     * that serves the build as files, has nothing behind that URL and every
     * picture on the page comes up broken. There are five images here, all of
     * them screenshots written by `npm run shots`, and that script already
     * resamples each one to the width the page serves it at. So there is
     * nothing for the optimizer to do that is worth depending on a server for.
     *
     * `next/image` is still what draws them: the width and height of each still
     * come from its static import, so the space is still reserved before the
     * bytes land and nothing on the page jumps.
     */
    unoptimized: true,
  },
}

module.exports = nextConfig
