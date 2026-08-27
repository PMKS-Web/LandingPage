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

/**
 * The peer-reviewed record, for an instructor who wants something to cite.
 *
 * Titles and links only. ASEE's PEER site refuses an automated fetch, so author
 * lists and years are not repeated here rather than repeated wrongly — each
 * link carries its own front matter.
 */
export const PAPERS = [
  {
    title: 'A Tool to Analyze and Synthesize Planar Mechanisms',
    href: 'https://peer.asee.org/a-tool-to-analyze-and-synthesize-planar-mechanisms',
    note: 'The tool itself.',
  },
  {
    title:
      'Laboratory on Experimental Verification of Four-Bar and Crank-Slider Linkages in a Senior-Level Design and Modeling Course',
    href: 'https://peer.asee.org/laboratory-on-experimental-verification-of-four-bar-and-crank-slider-linkages-in-a-senior-level-design-and-modeling-course',
    note: 'A lab built around it, checked against hardware.',
  },
  {
    title:
      'Improving Features and User Experience of a Web-Based Linkage Analysis Tool Through User Studies',
    href: 'https://peer.asee.org/improving-features-and-user-experience-of-a-web-based-linkage-analysis-tool-through-user-studies',
    note: 'What students did with it, and what changed as a result.',
  },
] as const

/** The first of them, where only one will fit. */
export const PAPER = PAPERS[0].href
