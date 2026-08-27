import type { Metadata } from 'next'
import ProsePage from '@/components/landing/prose-page'
import { PAPERS, VERIFICATION } from '@/components/landing/links'

const VERIFICATION_REPO = 'https://github.com/PMKS-Web/PMKS_Verification'
const PMKS_ORIGINAL = 'https://github.com/DesignEngrLab/PMKS'

export const metadata: Metadata = {
  title: 'How PMKS+ Is Verified — Methodology and Limits | PMKS+',
  description:
    'What the PMKS+ solver is checked against, which quantities are compared, at what tolerance, ' +
    'and — just as important — what is not covered.',
  alternates: { canonical: '/validation' },
  openGraph: {
    type: 'article',
    url: '/validation',
    siteName: 'PMKS+',
    title: 'How PMKS+ Is Verified',
    description:
      'What the solver is checked against, which quantities, at what tolerance, and what is not covered.',
    images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/social-card.png'] },
}

/**
 * The page behind "checked against an independent implementation".
 *
 * Written for somebody deciding whether to let students hand these numbers in,
 * which means the limits are as load-bearing as the claims. Every figure here
 * is read out of the two repositories; where the comparison is weaker than it
 * sounds — the dynamics in particular — the page says so rather than letting
 * the reader assume otherwise.
 */
export default function Validation() {
  return (
    <ProsePage
      kicker="Validation"
      title="How PMKS+ is verified"
      lede="A second implementation, written separately in MATLAB, solves the same mechanisms. Every crank angle of both is compared, and the comparison runs in CI on every change. Here is exactly what that covers — and what it does not."
    >
      <h2>What it is checked against</h2>
      <p>
        The reference is a set of MATLAB solvers kept in{' '}
        <a href={VERIFICATION_REPO} className="border-b border-indigo-100 text-indigo-700 hover:opacity-75">
          a separate repository
        </a>
        , written by teaching-lab staff and students for the mechanics courses PMKS+ is used in. It
        is a different derivation, not a port: positions come from hand-written circle&ndash;circle
        intersection chains, and velocities and accelerations from vector-loop equations solved
        symbolically with MATLAB&rsquo;s Symbolic Math Toolbox. PMKS+ instead assembles and solves
        linear systems over loops it discovers itself. Two routes, same answers, is the point.
      </p>
      <p>
        One honest qualification: the MATLAB <em>position</em> step was originally modeled on the
        approach used by PMKS, the C# predecessor to PMKS+. The velocity, acceleration and force
        layers are independently derived; the position layer is best described as a cross-check
        rather than a fully independent one.
      </p>
      <p>
        The MATLAB tables are themselves cross-checked against{' '}
        <a href={PMKS_ORIGINAL} className="border-b border-indigo-100 text-indigo-700 hover:opacity-75">
          the original PMKS
        </a>{' '}
        from Oregon State, and, for two of the mechanisms, against MotionGen. Neither is a wholly
        independent third opinion — PMKS shares ancestry with PMKS+, and the MotionGen comparison
        covers only positions, speed magnitudes and link angles — but agreement across three tools
        is worth more than agreement across two.
      </p>

      <h2>What is compared</h2>
      <p>For every mechanism in the suite, at every one-degree step of the input crank:</p>
      <ul className="mb-4 ml-5 list-disc space-y-1.5 text-[16px] leading-[1.7] text-ink-700 lg:text-[17px]">
        <li>position, velocity and acceleration of every joint, including tracer points</li>
        <li>position, velocity and acceleration of every link&rsquo;s center of mass</li>
        <li>angular velocity and angular acceleration of every link</li>
        <li>
          joint reaction forces and the required input torque, computed both with gravity and
          without
        </li>
      </ul>
      <p>
        Rows are matched by crank angle and sweep direction rather than by index, because the two
        implementations detect a rocking mechanism&rsquo;s reversal a step or two apart. Every
        reference row has to find a partner and every solved timestep has to be consumed, so a
        silently dropped sample fails the suite rather than shrinking it.
      </p>

      <h2>At what tolerance</h2>
      <p>
        The gate is worst case, not average: the largest error anywhere in a series has to sit inside
        the tolerance. Root-mean-square error is reported when something fails, but it is not what
        passes or fails the test.
      </p>
      <p>
        Tolerances are an absolute floor plus a fraction of the series&rsquo; own amplitude — 5&times;10
        <sup>&minus;3</sup> plus 0.1% for positions, 10<sup>&minus;4</sup> plus 0.5% for velocities,
        10<sup>&minus;4</sup> plus 1% for accelerations, and 10<sup>&minus;3</sup> plus 0.5% for
        forces and torque.
      </p>
      <p>
        The position floor is set by PMKS+ itself: it rounds solved coordinates to four decimals at
        every step, and each step seeds the next, so a little noise accumulates along the cycle.
        Comparing the MATLAB and PMKS tables directly — where no such rounding intervenes — the
        agreement is far tighter, with the worst scaled error across roughly 90,000 compared values
        sitting under 2&times;10<sup>&minus;5</sup> of its allowance.
      </p>

      <h2>How much of it there is</h2>
      <p>
        Five mechanisms: two teaching-lab rigs (a four-bar and a crank-slider, with CAD-measured
        masses), a slider-crank with a coupler tracer, a Stephenson III six-bar, and a Watt I
        six-bar. The last two are rocking mechanisms whose input reverses, which is deliberately the
        hardest case.
      </p>
      <p>
        That comes to roughly 71,000 reference numbers checked into the app&rsquo;s own repository as
        generated tables, against which the real solvers — the same{' '}
        <code className="rounded bg-indigo-50 px-1 py-0.5 font-mono text-[14px]">KinematicsSolver</code>{' '}
        and{' '}
        <code className="rounded bg-indigo-50 px-1 py-0.5 font-mono text-[14px]">ForceSolver</code>{' '}
        the app runs, not a test-only copy — are exercised on every pull request and every push to
        the main branch. The tests also pin the exact commit of the verification repository the
        numbers came from, so a figure cannot be edited without re-deriving it.
      </p>
      <p>
        Beyond those five, the suite carries a hundred more specification files covering slots,
        cylinders, welds, multi-mechanism drawings and the mechanism library itself. Those check
        PMKS+ against closed-form expectations and against itself — which is worth having, and is
        not the same thing as an outside opinion.
      </p>

      <h2>What is not covered</h2>
      <p>
        The list matters as much as the claims, so here it is plainly.
      </p>
      <ul className="mb-4 ml-5 list-disc space-y-2 text-[16px] leading-[1.7] text-ink-700 lg:text-[17px]">
        <li>
          <strong>Forces have no external oracle.</strong> Neither PMKS nor MotionGen produces them.
          Joint reactions and input torque are checked for Newton&ndash;Euler consistency — per-link
          force and moment balance, and a global power balance — computed independently from the
          MATLAB numbers. The residuals are vanishingly small, but this is a self-consistency result,
          not a second implementation agreeing.
        </li>
        <li>
          <strong>A handful of rows are excluded at motion reversals.</strong> Where a rocking input
          turns around, the two implementations can land the turn on adjacent samples. Six rows of
          Watt I are skipped for this reason — out of only 23 — and six of Stephenson III&rsquo;s
          201. The exclusions are asserted rather than tolerated: the test fails if a different set
          of rows is skipped, or if no reason is recorded.
        </li>
        <li>
          <strong>The teaching rigs&rsquo; centers of mass are diagnostic only.</strong> Their
          historical coordinates and inertias are not in a coherent unit system, so center-of-mass
          kinematics are verified for three of the five mechanisms, not all five.
        </li>
        <li>
          <strong>Static force analysis, friction and stress are out of scope</strong> in the current
          contract, and requesting them fails rather than quietly returning something.
        </li>
        <li>
          <strong>Every compared configuration is well away from a singularity.</strong> That is good
          for confidence in the numbers and a limit on what has been demonstrated: near-singular
          behavior is not what this shows.
        </li>
        <li>
          <strong>Nothing in the current pipeline compares against physical hardware.</strong> It
          compares simulation to simulation. The lab work that does put linkages on a bench is
          written up separately, below.
        </li>
      </ul>

      <h2>Can the tests actually fail?</h2>
      <p>
        A verification suite that has never caught anything is decoration. This one carries a
        perturbation stage that deliberately injects faults — the wrong assembly branch, a flipped
        velocity sign, a drifting slider axis, a truncated sweep, mis-assigned force ownership, a
        moved load point, gravity switched, stale provenance — and requires every one of them to be
        detected. If a gate stops working, that stage is what notices.
      </p>

      <h2>Read it yourself</h2>
      <p>
        All of it is public: the{' '}
        <a href={VERIFICATION_REPO} className="border-b border-indigo-100 text-indigo-700 hover:opacity-75">
          verification repository
        </a>{' '}
        with its MATLAB solvers, reference tables and CI pipeline, and{' '}
        <a href={VERIFICATION} className="border-b border-indigo-100 text-indigo-700 hover:opacity-75">
          the comparison suite
        </a>{' '}
        inside the app that consumes them.
      </p>

      <h2>In the literature</h2>
      <ul className="mb-4 space-y-2">
        {PAPERS.map((paper) => (
          <li key={paper.href} className="text-[16px] leading-[1.6] lg:text-[17px]">
            <a
              href={paper.href}
              className="border-b border-indigo-100 text-indigo-700 hover:opacity-75"
            >
              {paper.title}
            </a>{' '}
            <span className="text-ink-500">{paper.note}</span>
          </li>
        ))}
      </ul>
    </ProsePage>
  )
}
