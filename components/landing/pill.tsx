/** A named capability, as a chip. Nothing on the page is a chip that is not one. */
export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-ink-200 px-3 py-1.5 text-[12.5px] text-ink-700 lg:px-3.5 lg:py-[7px] lg:text-[13px]">
      {children}
    </span>
  )
}
