import Kicker from './kicker'

/** A short labelled list — what it is used for, what can be measured on it. */
export default function Facts({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="border-t border-ink-100 pt-4">
      <Kicker tone="grey" className="mb-2.5">
        {label}
      </Kicker>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-[15px] leading-[1.55] text-ink-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
