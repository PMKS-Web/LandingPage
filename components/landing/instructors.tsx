import Kicker from './kicker'
import { CONTACT } from './links'

const RIVALS = ['MotionGen', 'SAM', 'Working Model', 'SolidWorks']

const ROWS: [string, string, string, string, string, string][] = [
  ['Cost', 'Free, MIT', 'Free', 'Licence', 'Licence', 'Seat licence'],
  ['Runs in the browser', 'Yes', 'Yes', 'Windows', 'Desktop', 'Desktop'],
  ['Account required', 'None', 'To save', 'No', 'No', 'Licence login'],
  [
    'Kinematics',
    'Position, velocity, acceleration',
    'Yes',
    'Yes',
    'Yes',
    'Full 3D',
  ],
  ['Force analysis', 'Static and dynamic', 'Limited', 'Yes', 'Yes', 'Yes'],
  ['Synthesis', 'Three position', 'Its speciality', 'Yes', 'No', 'No'],
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
              is missing and takes them to it, and a built in tutorial walks them from a blank grid
              to their first velocity graph.
            </span>
          </p>
          <p className="mb-[18px] text-[15.5px] leading-[1.65] text-ink-700 lg:mb-6 lg:text-[17px]">
            Used in courses at Worcester Polytechnic Institute and Oregon State for years. The code
            is open source under MIT.
          </p>
          <a
            href={CONTACT}
            className="inline-block rounded bg-indigo-500 px-[18px] py-3.5 text-sm text-white hover:opacity-90 lg:px-6 lg:py-[15px] lg:text-[15px]"
          >
            <span className="lg:hidden">help@pmksplus.com</span>
            <span className="hidden lg:inline">Course adoption: help@pmksplus.com</span>
          </a>
        </div>

        {/* Seven rows and six columns will not fit a phone, and shrinking the
            type until it does makes the comparison unreadable rather than
            small. It scrolls sideways inside its own card instead — said out
            loud on a phone, because a table that runs off the edge with no
            scrollbar under it looks like a table that has been cut off. */}
        <div className="min-w-0">
          <Kicker tone="grey" className="mb-2 lg:hidden">
            Swipe the table sideways
          </Kicker>
          <div className="min-w-0 overflow-x-auto rounded-card bg-white p-5 shadow-card lg:p-[28px_32px]">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="pb-3.5 pr-3.5 text-left" />
                <th className="px-3.5 pb-3.5 text-left text-[15px] font-medium text-indigo-500">
                  PMKS+
                </th>
                {RIVALS.map((name, i) => (
                  <th
                    key={name}
                    className={`pb-3.5 text-left font-normal text-ink-500 ${
                      i === RIVALS.length - 1 ? 'pl-3.5' : 'px-3.5'
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
                  <td className="whitespace-nowrap py-[13px] pr-3.5 text-[13px] text-ink-400">{label}</td>
                  {cells.map((cell, i) => (
                    <td
                      key={i}
                      className={
                        i === 0
                          ? 'bg-indigo-50 px-3.5 py-[13px] font-medium'
                          : `py-[13px] text-ink-700 ${
                              i === cells.length - 1 ? 'pl-3.5' : 'px-3.5'
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
