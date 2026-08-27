/**
 * The one label style the page uses above a heading: monospaced, spaced out,
 * upper case. Sections in indigo, subordinate labels in grey, the one on the
 * dark share panel in amber.
 */
export default function Kicker({
  children,
  tone = 'indigo',
  className = '',
}: {
  children: React.ReactNode
  tone?: 'indigo' | 'grey' | 'amber' | 'deep'
  className?: string
}) {
  const ink = {
    indigo: 'text-indigo-500',
    grey: 'text-ink-400',
    amber: 'text-amber-400',
    deep: 'text-indigo-700',
  }[tone]
  return (
    <div
      className={`font-mono text-[10.5px] uppercase tracking-[.1em] lg:text-[11.5px] ${ink} ${className}`}
    >
      {children}
    </div>
  )
}
