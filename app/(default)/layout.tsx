/**
 * The landing page brings its own header and footer — they are part of the
 * design rather than chrome wrapped round it — so this layout adds nothing.
 */
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
