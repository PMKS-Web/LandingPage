import Kicker from './kicker'
import { CONTACT, PAPERS } from './links'

const RIVALS = ['MotionGen', 'SAM', 'Working Model', 'SolidWorks']

const ROWS: [string, string, string, string, string, string][] = [
  ['Cost', 'Free, MIT', 'Free', 'License', 'License', 'Seat license'],
  ['Runs in the browser', 'Yes', 'Yes', 'Windows', 'Desktop', 'Desktop'],
  ['Account required', 'None', 'To save', 'No', 'No', 'License login'],
  [
    'Kinematics',
    'Position, velocity, acceleration',
    'Yes',
    'Yes',
    'Yes',
    'Full 3D',
  ],
  ['Force analysis', 'Static and dynamic', 'Limited', 'Yes', 'Yes', 'Yes'],
  ['Synthesis', 'Three position', 'Its specialty', 'Yes', 'No', 'No'],
  ['Sharing', 'A URL', 'Cloud link', 'File', 'File', 'File or PDM'],
]

export default function Instructors() {
  return (
    <section id="instructors" className="bg-indigo-50 px-5 py-7 lg:px-14 lg:py-[68px]">
      <div className="grid items-start gap-7 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <Kicker tone="deep" className="mb-3 lg:mb-4">
            For instructors
          </Kicker>
          <h2 className="mb-3 text-[25px] font-medium leading-[1.2] tracking-[-0.015em] lg:mb-4 lg:text-[34px] lg:leading-[1.15] lg:tracking-[-0.02em]">
            Made for the kinematics classroom.
          </h2>
          <p className="mb-4 text-[15.5px] leading-[1.65] text-ink-700 lg:mb-[18px] lg:text-[17px]">
            PMKS+ is free for every student, with no accounts to provision and nothing to install. A
            link in the syllabus is the whole rollout.
            <span className="hidden lg:inline">
              {' '}
              When a student&rsquo;s mechanism cannot be analyzed yet, the app explains exactly what
              is missing and takes them to it, and a built-in tutorial walks them from a blank grid
              to their first velocity graph.
            </span>
          </p>
          <p className="mb-[18px] text-[15.5px] leading-[1.65] text-ink-700 lg:mb-6 lg:text-[17px]">
            Used in courses at Worcester Polytechnic Institute and Oregon State for years. The code
            is open source under MIT.
          </p>
          {/* Something to cite, and evidence that somebody already has. */}
          <div className="mb-[18px] lg:mb-6">
            <Kicker tone="grey" className="mb-2">
              In the literature
            </Kicker>
            <ul className="space-y-1.5">
              {PAPERS.map((paper) => (
                <li key={paper.href} className="text-[14px] leading-[1.5] text-ink-600">
                  <a
                    href={paper.href}
                    className="border-b border-indigo-100 text-indigo-700 hover:opacity-75"
                  >
                    {paper.title}
                  </a>{' '}
                  <span className="text-ink-400">{paper.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={CONTACT}
            className="inline-block rounded bg-indigo-500 px-[18px] py-3.5 text-sm text-white hover:opacity-90 lg:px-6 lg:py-[15px] lg:text-[15px]"
          >
            {/* What happens next, rather than an address to compose against. */}
            <span className="lg:hidden">Ask about using it in a course</span>
            <span className="hidden lg:inline">Ask about using PMKS+ in your course</span>
          </a>
        </div>

        {/* Seven rows and six columns will not fit a phone, and shrinking the
            type until it does makes the comparison unreadable rather than
            small. It scrolls sideways inside its own card instead — said out
            loud on a phone, because a table that runs off the edge with no
            scrollbar under it looks like a table that has been cut off.

            The column widths are fixed on a phone rather than left to the
            browser. Auto layout sizes a column to its widest cell, so "Runs in
            the browser" made the first column 150px of a 390px screen and the
            sticky offset for the second column — a number that has to be
            written down — no longer matched where the first one actually
            ended. Fixed widths make the offsets exact, and buy back enough
            room to keep a third column on screen. */}
        <div className="min-w-0">
          <Kicker tone="grey" className="mb-2 lg:hidden">
            Swipe the table sideways &mdash; the first two columns stay
          </Kicker>
          {/* No horizontal padding on a phone: a sticky cell parks at the
              scroll container's edge, so any padding there is a gap the rest of
              the table scrolls through behind it. The inset lives on the cells
              instead. */}
          <div className="min-w-0 overflow-x-auto rounded-card bg-white py-5 shadow-card lg:p-[28px_32px]">
            {/* The first column's width and the second column's sticky offset
                have to be the same number, or the second parks short of where
                the first ends and the scrolling columns show through the strip
                between them — which is the bug this replaced. One custom
                property, read by both, so they cannot drift apart. */}
            <table
              style={{ '--label-w': '116px' } as React.CSSProperties}
              className="w-full min-w-[600px] table-fixed border-collapse text-sm lg:min-w-0 lg:table-auto"
            >
              <colgroup>
                <col className="w-[var(--label-w)] lg:w-auto" />
                <col className="w-[112px] lg:w-auto" />
                {RIVALS.map((name) => (
                  <col key={name} className="w-[93px] lg:w-auto" />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <td className="sticky left-0 z-10 bg-white pb-3.5 pl-5 pr-3 lg:static lg:pl-0" />
                  <th className="sticky left-[var(--label-w)] z-10 bg-white px-3 pb-3.5 text-left text-[15px] font-medium text-indigo-500 lg:static lg:px-3.5">
                    PMKS+
                  </th>
                  {RIVALS.map((name, i) => (
                    <th
                      key={name}
                      className={`pb-3.5 text-left font-normal text-ink-500 ${
                        i === RIVALS.length - 1 ? 'pl-3 pr-5 lg:pl-3.5 lg:pr-0' : 'px-3 lg:px-3.5'
                      }`}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, ...cells]) => (
                  <tr key={label} className="border-t border-ink-100">
                    {/* The feature name is a heading for its row, not a cell in
                        it: a screen reader reading "Free, MIT" out of context
                        has not said what is free.

                        It and the PMKS+ column stay put while the rest scrolls
                        under them — a value four columns out means nothing once
                        the feature name it belongs to has left the screen. */}
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-t border-ink-100 bg-white py-[13px] pl-5 pr-3 break-words text-left align-middle text-[13px] font-normal leading-[1.35] text-ink-400 lg:static lg:whitespace-nowrap lg:border-0 lg:pl-0 lg:pr-3.5"
                    >
                      {label}
                    </th>
                    {cells.map((cell, i) => (
                      <td
                        key={i}
                        className={
                          i === 0
                            ? 'sticky left-[var(--label-w)] z-10 border-t border-ink-100 bg-indigo-50 px-3 py-[13px] align-middle font-medium leading-[1.35] break-words lg:static lg:border-0 lg:px-3.5'
                            : `break-words py-[13px] align-middle leading-[1.35] text-ink-700 ${
                                i === cells.length - 1
                                  ? 'pl-3 pr-5 lg:pl-3.5 lg:pr-0'
                                  : 'px-3 lg:px-3.5'
                              }`
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
