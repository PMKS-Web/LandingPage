/**
 * Where this page sends people, in one place.
 *
 * Two destinations, not one: the app opens on an empty grid, and `?library`
 * opens it with the mechanism library up. That query is a deep link the app
 * added for this page — a Browse button that dropped somebody on a blank grid
 * and left them to find the project menu was a button that did not do what it
 * said.
 */
export const APP = 'https://app.pmksplus.com'
export const APP_LIBRARY = `${APP}/?library`

export const GITHUB = 'https://github.com/PMKS-Web'
export const CONTACT = 'mailto:help@pmksplus.com'

/**
 * What "checked against an independent implementation" actually means, for
 * anybody who would rather read it than take it: the suite that compares the
 * solver row by row against a separate MATLAB model, in the open.
 */
export const VERIFICATION =
  'https://github.com/PMKS-Web/Planar-Mechanism-Kinematic-Simulator/tree/main/src/tests/verification'

/** The peer-reviewed write-up, for an instructor who wants a citation. */
export const PAPER = 'https://peer.asee.org/a-tool-to-analyze-and-synthesize-planar-mechanisms'
