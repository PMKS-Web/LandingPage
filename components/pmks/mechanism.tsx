'use client'

import { useMechanism } from './use-mechanism'
import MechanismView from './mechanism-view'

/**
 * A linkage that simply runs — what every card and inset on the page uses.
 * The hero drives its own player instead, because it hands the reader a
 * transport to stop and scrub it with.
 */
export default function Mechanism({
  id,
  align,
  zoom,
  className,
}: {
  id: string
  align?: number
  zoom?: number
  className?: string
}) {
  const player = useMechanism(id)
  return <MechanismView player={player} align={align} zoom={zoom} className={className} />
}
