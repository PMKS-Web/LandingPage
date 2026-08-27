import { TEMPLATE } from '@/components/landing/template-links'

/**
 * The five mechanism pages.
 *
 * Each is a page about a linkage that happens to have that linkage running on
 * it, rather than a page about PMKS+ with a mechanism's name in the title. The
 * kinematics is the ordinary textbook account — it is what somebody searching
 * the mechanism's name is looking for — and the tool shows up where it earns
 * its place: the thing is moving, and the button opens it.
 */
export interface MechanismPage {
  slug: string
  /** The <title>. Names the mechanism first, because that is the search. */
  title: string
  h1: string
  lede: string
  /** Which precomputed linkage draws on the page. */
  mech: string
  open: string
  openLabel: string
  uses: readonly string[]
  analysis: readonly string[]
  body: React.ReactNode
}

/**
 * What the app will actually give you, on any of these.
 *
 * The force line is hedged on purpose: every one of these templates ships
 * massless, because gravity is on by default and a mechanism published with
 * mass hands a student who opened a kinematics example a force problem nobody
 * set. Force analysis is there for all of them — after you give a link mass or
 * attach a load.
 */
const CAPABILITIES = [
  'Position, velocity and acceleration of any joint — X, Y and magnitude, against time',
  'Angle, angular velocity and angular acceleration of any link, and the motion of its center of mass',
  'Velocity and acceleration drawn on the mechanism itself, as vectors, while it runs',
  'Joint reactions and the input torque, static or in-motion, once a link has mass or a load',
  'Export to CSV, an Excel workbook, PNG or SVG graphs, or a print-ready report',
] as const

export const MECHANISM_PAGES: readonly MechanismPage[] = [
  {
    slug: 'four-bar-linkage-simulator',
    title: 'Four-Bar Linkage Simulator — Free, in Your Browser | PMKS+',
    h1: 'Four-bar linkage simulator',
    lede:
      'Draw a four-bar, turn the crank, and watch the coupler curve appear. Free, in the browser, ' +
      'with position, velocity, acceleration and force analysis on every joint and link.',
    mech: 'fourbar',
    open: TEMPLATE.fourBar,
    openLabel: 'Open a four-bar in PMKS+',
    uses: [
      'Suspension linkages, where the wheel is the coupler',
      'Windshield wipers, oscillating fans, and anything that rocks',
      'Landing gear, tailgates and hoods that have to travel a set path',
      'Walking machines and film advance mechanisms, using the coupler curve',
    ],
    analysis: CAPABILITIES,
    body: (
      <>
        <h2>What a four-bar is</h2>
        <p>
          Four rigid links and four pin joints. One link is the ground, one is the input crank, one
          is the output rocker, and the one joining them is the coupler. It is the simplest closed
          chain that can do anything interesting, which is why it is the first mechanism in every
          kinematics course and the last one still in service on most machines.
        </p>
        <p>
          Whether the crank can turn all the way round is decided by Grashof&rsquo;s criterion: add
          the longest and shortest links, and if that sum is less than or equal to the sum of the
          other two, one of the links can rotate fully. Which link that is depends on where the
          shortest one sits. Shortest adjacent to the ground gives a crank-rocker; shortest as the
          ground gives a double-crank; shortest as the coupler gives a double-rocker.
        </p>
        <h2>The coupler curve</h2>
        <p>
          The two moving pins travel in circular arcs, which is dull. Any other point on the coupler
          travels a sixth-order algebraic curve, which is not — it can be a figure of eight, a
          kidney, an oval with a nearly straight stretch, or a path with a cusp where the point
          momentarily stops. This is the whole reason four-bars are worth designing rather than
          looking up: the curve is enormously sensitive to where the traced point sits on the bar.
        </p>
        <p>
          In PMKS+ a tracer point is a joint on the coupler like any other, so you can put one
          anywhere, switch its path on, and drag it while the mechanism runs.
        </p>
        <h2>Transmission angle</h2>
        <p>
          The angle between the coupler and the rocker at the joint they share decides how much of
          the force pushed along the coupler turns into useful torque and how much only squeezes the
          bearing. Near 90&deg; is good, and most design rules ask that it stay above about 40&deg;
          through the whole cycle. Give the links mass or hang a load on one and PMKS+ reports the
          joint reactions at every crank angle, which is that squeeze, measured.
        </p>
        <h2>Inversion</h2>
        <p>
          The other surprise in a first kinematics course: a four-bar and a drag link are the same
          four bars. Hold a different one still and what you get depends on where the shortest bar
          now sits — beside the frame gives a crank-rocker, as the frame gives a double crank with
          both grounded bars going over, opposite the frame gives a double rocker where neither
          does. The library draws all four, so the claim is something you can watch rather than
          something you take on trust.
        </p>
      </>
    ),
  },

  {
    slug: 'slider-crank-simulator',
    title: 'Slider-Crank Simulator — Free Online Piston Linkage | PMKS+',
    h1: 'Slider-crank simulator',
    lede:
      'The linkage inside every piston engine and compressor: a rotating crank, a connecting rod, ' +
      'and a block that slides. Simulate it free in the browser, with stroke, velocity and ' +
      'acceleration on any point of the rod.',
    mech: 'slider',
    open: TEMPLATE.slider,
    openLabel: 'Open a slider-crank in PMKS+',
    uses: [
      'Piston engines and compressors, in both directions of the energy',
      'Pumps, punch presses and shapers',
      'Anything converting a turning shaft into a straight push',
    ],
    analysis: CAPABILITIES,
    body: (
      <>
        <h2>What a slider-crank is</h2>
        <p>
          Take a four-bar and move one pin joint infinitely far away: the rocker becomes a straight
          guide and the pin on the end of it becomes a block that slides. That is the slider-crank,
          and it is a four-bar in every sense that matters to the solver — three moving links, one
          degree of freedom, one input angle that determines everything else.
        </p>
        <p>
          If the guide passes through the crank center it is an <em>in-line</em> slider-crank and the
          stroke is exactly twice the crank throw. Offset the guide and the mechanism becomes
          asymmetric: the stroke grows slightly, and the block spends longer travelling one way than
          the other. That asymmetry is a nuisance in an engine and the entire point in a quick-return
          machine.
        </p>
        <h2>Why the acceleration matters more than the position</h2>
        <p>
          Piston position is close to sinusoidal but not sinusoidal, and the difference is carried
          almost entirely by the ratio of rod length to crank throw. A short rod makes the piston
          reach top dead center faster than it leaves bottom dead center, which puts a second
          harmonic into the acceleration — and inertia force is mass times acceleration, so that
          harmonic is what the bearings and the balance shafts actually feel.
        </p>
        <p>
          Plot acceleration against crank angle in PMKS+ for two rod lengths and the second harmonic
          is visible without any algebra.
        </p>
        <h2>Inversions</h2>
        <p>
          Hold a different link still and the same four bodies become a different machine. Hold the
          frame and it is an engine, a compressor, a reciprocating pump. Hold the crank and the frame
          swings round it: a Whitworth quick-return, or a rotary engine. Hold the connecting rod and
          the cylinder rocks on its trunnion. Hold the block and the frame reciprocates through it,
          which is a hand pump.
        </p>
        <p>
          One chain, four machines. The library draws all four side by side, each keeping its colors
          so you can watch a crank become a coupler as the ground hatching moves.
        </p>
      </>
    ),
  },

  {
    slug: 'scotch-yoke',
    title: 'Scotch Yoke Simulator — Simple Harmonic Motion | PMKS+',
    h1: 'Scotch yoke',
    lede:
      'The one linkage whose output is exactly a sine wave. A crank pin rides a slot in a sliding ' +
      'yoke, and the yoke moves in true simple harmonic motion — simulate it free in the browser.',
    mech: 'yoke',
    open: TEMPLATE.yoke,
    openLabel: 'Open a Scotch yoke in PMKS+',
    uses: [
      'Valve actuators, where a known torque curve matters',
      'Shaker tables and test rigs needing clean sinusoidal motion',
      'Some pumps and a handful of engines, where the compact stroke wins',
    ],
    analysis: CAPABILITIES,
    body: (
      <>
        <h2>Exactly a sine wave</h2>
        <p>
          The crank pin rides in a slot cut across a yoke, and the yoke is constrained to slide along
          one axis. The pin&rsquo;s motion across the slot is free, so the only thing the yoke sees
          is the pin&rsquo;s position along the sliding axis — which is r&nbsp;cos&nbsp;&theta;.
        </p>
        <p>
          That is the whole mechanism, and it is why it is taught. Displacement is a cosine, velocity
          is a sine, acceleration is a cosine again with no higher harmonics at all. A slider-crank
          only approximates this, and the approximation gets worse as the connecting rod gets
          shorter. The Scotch yoke has no connecting rod to be short.
        </p>
        <h2>What it costs</h2>
        <p>
          The pin slides along the slot under load for the whole cycle, so contact is a sliding pair
          rather than a rolling one, and wear concentrates in the slot. That is the reason engines
          overwhelmingly use slider-cranks despite the messier kinematics: a pin joint and a piston
          both wear far better than a pin dragged along a groove.
        </p>
        <h2>Slots in PMKS+</h2>
        <p>
          The slot here is a real constraint, not a drawing. The yoke is welded to a block that
          slides in a grounded guide, and the crank pin is a second block riding a slot cut into the
          yoke itself. The weld is the whole mechanism: without it the yoke could turn about its
          guide and the linkage would have two degrees of freedom instead of one.
        </p>
        <p>
          Both parts are things you build by hand in the app on any linkage — mark a joint as a
          slider, mark it welded — which is what makes an inversion something you try rather than
          read about. A welded guide can also carry a moment, and PMKS+ reports that couple
          separately from the pin reaction, because it is what sizes the slide.
        </p>
      </>
    ),
  },

  {
    slug: 'quick-return-mechanism',
    title: 'Quick-Return Mechanism Simulator — Whitworth & Shaper | PMKS+',
    h1: 'Quick-return mechanism',
    lede:
      'A cutting stroke that goes slowly and a return stroke that goes fast, from one crank turning ' +
      'at constant speed. Simulate the Whitworth and shaper quick-returns free in the browser, and ' +
      'read the time ratio straight off the graph.',
    mech: 'whitworth',
    open: TEMPLATE.shaper,
    openLabel: 'Open a shaper quick-return in PMKS+',
    uses: [
      'Shaping and slotting machines, where cutting is slow and returning is wasted time',
      'Mechanical saws and broaching machines',
      'Any duty cycle where one direction does the work and the other only resets',
    ],
    analysis: CAPABILITIES,
    body: (
      <>
        <h2>Where the asymmetry comes from</h2>
        <p>
          The crank turns at constant speed. A pin on it rides in a slot cut along a lever pivoted
          off the crank center. Because the pivot is offset, the crank sweeps through unequal angles
          to drive the lever one way and back — and since the crank&rsquo;s angular speed is
          constant, unequal angles mean unequal times.
        </p>
        <p>
          The ratio of those two angles is the <em>time ratio</em>, and it is the number the whole
          mechanism exists to deliver. A rod from the lever carries the motion to a ram, so the ram
          cuts slowly on the long sweep and returns quickly on the short one. In the drive above, the
          ram spends 220&deg; of crank on the cutting stroke and 140&deg; coming back — a ratio of
          1.58, off a motor turning at one steady speed.
        </p>
        <h2>Whitworth or shaper</h2>
        <p>
          The two names come down to one comparison: the crank&rsquo;s length against the distance
          between the two ground pivots. Crank longer than that offset and the lever goes right over,
          turning once per crank revolution — that is the <strong>Whitworth</strong>, and it is a
          slider-crank inversion with the crank held instead of the frame. Crank shorter and the
          lever only rocks, through an arc of arcsin(crank / offset): that is the{' '}
          <strong>shaper</strong>, gentler and the one that machine was named for. PMKS+ ships both;
          the drawing above is the shaper, because it is the one that carries the ram the quick
          return is <em>for</em>.
        </p>
        <h2>Reading the ratio off the plot</h2>
        <p>
          You do not have to measure the angles. Plot the ram&rsquo;s position against time in the
          Kinematic mode and the asymmetry is the shape of the trace: a long shallow ramp one way, a
          short steep one back. The velocity plot makes it starker — the return peak is taller than
          the cutting peak by the time ratio.
        </p>
        <h2>What the solver has to get right</h2>
        <p>
          A pin sliding along a slot that is itself rotating is where a hand calculation usually goes
          wrong: the velocity has a term for sliding along the slot as well as one for the slot
          turning, and the acceleration picks up a Coriolis term on top. PMKS+&rsquo;s answers for
          exactly this arrangement are checked against the closed form, Coriolis included.
        </p>
      </>
    ),
  },

  {
    slug: 'six-bar-linkage',
    title: 'Six-Bar Linkage Simulator — Watt and Stephenson | PMKS+',
    h1: 'Six-bar linkage',
    lede:
      'Six links, seven joints, still one degree of freedom — and far more control over the output ' +
      'path than a four-bar can give you. Simulate Watt and Stephenson six-bars free in the browser.',
    mech: 'sixbar',
    open: TEMPLATE.stephenson,
    openLabel: 'Open a Stephenson six-bar in PMKS+',
    uses: [
      'Dwell mechanisms, where the output has to stop while the input keeps turning',
      'Straight-line and path-following linkages beyond what a four-bar can reach',
      'Vehicle suspensions, aircraft landing gear and excavator arms',
      'Leg mechanisms, where a foot must lift, travel and set down',
    ],
    analysis: CAPABILITIES,
    body: (
      <>
        <h2>Two families, and how to tell them apart</h2>
        <p>
          A six-bar has six links and seven joints. Four of the links carry two joints each and two
          carry three, and the whole difference between the two families is whether those two
          three-joint links touch each other.
        </p>
        <p>
          In a <strong>Watt</strong> six-bar they are directly connected — the two ternary links are
          adjacent, and the chain reads as two four-bar loops sharing a link. In a{' '}
          <strong>Stephenson</strong> six-bar they are separated by a binary link, and the loops
          share two links instead. Watt linkages are the ones you find in vehicle suspensions;
          Stephenson linkages are the ones you find where a dwell is wanted.
        </p>
        <h2>Why bother, when a four-bar is simpler</h2>
        <p>
          A four-bar coupler curve is fixed once you pick the bar lengths — you get the curve the
          proportions give you. A six-bar has more free dimensions, so it can be made to pass through
          more prescribed positions, hold a near-exact dwell while the crank keeps turning, or
          produce a straight line over a longer stretch than any four-bar of the same size.
        </p>
        <p>
          It costs you: more joints to make, more clearance to control, and a mechanism that is much
          harder to reason about by hand. Which is the argument for simulating it.
        </p>
        <h2>Why they are harder to solve</h2>
        <p>
          A four-bar comes apart. Place the crank pin, and the remaining joint follows from two known
          distances — one construction at a time, all the way round. Plenty of six-bars do not work
          that way: turn the input of a Stephenson III and only two joints are pinned down, with
          every remaining joint having just one known neighbour. There is no next construction to
          make.
        </p>
        <p>
          PMKS+ solves those loops simultaneously instead of giving up on them, which is why the
          six-bars and the eight-bar double butterfly are in the library at all. When a mechanism
          genuinely cannot be solved it says which joints it could not place, rather than drawing
          something plausible and wrong.
        </p>
      </>
    ),
  },
]

export function mechanismPage(slug: string): MechanismPage | undefined {
  return MECHANISM_PAGES.find((page) => page.slug === slug)
}
