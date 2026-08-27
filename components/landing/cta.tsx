import { APP } from './links'

/**
 * The closing band.
 *
 * Three negations rather than an invitation, and directly under the comparison
 * table on purpose: install, account and license server are exactly what the
 * four columns beside PMKS+ ask for, and this is the row that answers them.
 */
export default function Cta() {
  return (
    <section className="flex flex-col gap-[18px] bg-indigo-500 px-5 py-7 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-[60px]">
      <div>
        <h2 className="mb-2.5 text-2xl font-medium leading-[1.2] tracking-[-0.015em] lg:text-[32px] lg:leading-[1.15] lg:tracking-[-0.02em]">
          No install. No account. No license server.
        </h2>
        <p className="text-[15px] text-indigo-100 lg:text-[17px]">
          Open a link and start drawing.
        </p>
      </div>
      <a
        href={APP}
        className="whitespace-nowrap rounded bg-amber-400 px-4 py-[15px] text-center text-[15.5px] font-medium text-indigo-900 hover:opacity-90 lg:px-8 lg:py-[18px] lg:text-[16.5px]"
      >
        Start building
      </a>
    </section>
  )
}
