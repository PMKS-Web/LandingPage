import Kicker from './kicker'

/**
 * One line of provenance, straight under the hero where a claim is cheapest to
 * check. A number rather than a list of institutions: "taught with in many
 * courses at" is what every tool says about itself, and how many people opened
 * it last month is not.
 *
 * Shorter on a phone, where the same sentence runs to four lines and the strip
 * stops being a strip.
 */
export default function Classroom() {
  return (
    <section className="border-b border-ink-100 px-5 py-[22px] lg:flex lg:items-baseline lg:gap-[22px] lg:px-14 lg:py-6">
      <Kicker className="mb-2 whitespace-nowrap lg:mb-0">In the classroom</Kicker>
      <p className="max-w-[74em] text-[14.5px] leading-[1.6] text-ink-700 lg:text-[15.5px]">
        Around <span className="font-medium text-ink-900">1,300 students and instructors</span> a
        month. Used in kinematics courses at{' '}
        <span className="font-medium text-ink-900">Worcester Polytechnic Institute</span> and{' '}
        <span className="font-medium text-ink-900">Oregon State</span> for years.
        <span className="hidden lg:inline">
          {' '}
          Every solver result is checked against an independent implementation.
        </span>
      </p>
    </section>
  )
}
