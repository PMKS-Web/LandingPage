import Image from 'next/image'
import { APP, GITHUB } from './links'
import logo from '@/public/images/PMKS_logo.png'

/**
 * `onPhone` is the one link worth the width on a 390px header.
 *
 * Hiding the lot below `lg` left a phone with one button and no way to reach
 * the part of the page written for the person deciding whether to set this in a
 * course — which is the reader least likely to be at a desk when they first
 * hear about it.
 */
const NAV = [
  { label: 'Build', href: '#build' },
  { label: 'Analyze', href: '#analyze' },
  { label: 'Library', href: '#library' },
  { label: 'For instructors', href: '#instructors', onPhone: true },
  { label: 'GitHub', href: GITHUB },
]

export default function Header() {
  return (
    <header className="flex h-[62px] items-center justify-between px-5 lg:h-20 lg:px-14">
      <a href="/" aria-label="PMKS+ home">
        <Image src={logo} alt="PMKS+" className="h-[26px] w-auto lg:h-[30px]" priority />
      </a>
      <nav className="flex items-center gap-4 text-[13.5px] text-ink-700 lg:gap-8 lg:text-[14.5px]">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`hover:opacity-75 lg:block ${
              item.onPhone ? 'hidden min-[380px]:block' : 'hidden'
            }`}
          >
            {item.onPhone ? (
              <>
                <span className="lg:hidden">Instructors</span>
                <span className="hidden lg:inline">{item.label}</span>
              </>
            ) : (
              item.label
            )}
          </a>
        ))}
        <a
          href={APP}
          className="rounded bg-indigo-500 px-4 py-2.5 text-[13px] font-medium text-white hover:opacity-90 lg:px-5 lg:py-[11px] lg:text-[14.5px]"
        >
          Open PMKS+
        </a>
      </nav>
    </header>
  )
}
