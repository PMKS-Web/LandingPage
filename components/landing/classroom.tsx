import Kicker from './kicker'

/** One line of provenance, straight under the hero where a claim is cheapest to check. */
export default function Classroom() {
  return (
    <section className="border-b border-ink-100 px-5 py-[22px] lg:flex lg:items-baseline lg:gap-[22px] lg:px-14 lg:py-6">
      <Kicker className="mb-2 whitespace-nowrap lg:mb-0">In the classroom</Kicker>
      <p className="max-w-[74em] text-[14.5px] leading-[1.6] text-ink-700 lg:text-[15.5px]">
        Taught with in many courses at{' '}
        <span className="font-medium text-ink-900">Worcester Polytechnic Institute</span>, and at{' '}
        <span className="font-medium text-ink-900">Oregon State</span> for years before that. Solver
        output is checked row by row against an independent implementation.
      </p>
    </section>
  )
}
