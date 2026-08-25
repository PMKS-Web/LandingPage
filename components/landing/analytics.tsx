'use client'

import { useEffect } from 'react'
import { analytics } from '@/utils/firebase'

/**
 * Firebase analytics, started once on the client.
 *
 * It used to be called in the page component's body, which on the App Router
 * runs on the server as well — where there is no window to measure.
 */
export default function Analytics() {
  useEffect(() => {
    analytics()
  }, [])
  return null
}
