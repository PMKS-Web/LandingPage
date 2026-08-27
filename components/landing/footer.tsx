import { APP, APP_LIBRARY, CONTACT, GITHUB } from './links'

const LINKS = [
  { label: 'Open PMKS+', href: APP },
  { label: 'GitHub', href: GITHUB },
  { label: 'Mechanism library', href: APP_LIBRARY },
  { label: 'How it is verified', href: '/validation' },
  { label: 'Contact', href: CONTACT },
]

export default function Footer() {
  return (
    <footer className="bg-indigo-900 px-5 pb-9 pt-7 text-indigo-200 lg:flex lg:items-start lg:justify-between lg:gap-16 lg:px-14 lg:py-[52px]">
      <p className="mb-4 max-w-[44em] text-[12.5px] leading-[1.7] lg:mb-0 lg:text-[13.5px]">
        PMKS+ is developed at Worcester Polytechnic Institute by student project teams, as the
        successor to PMKS by Prof. Matthew I. Campbell, Oregon State University. Open source under
        the MIT license.
      </p>
      <div className="-my-2 flex flex-wrap gap-x-[18px] whitespace-nowrap text-[13px] text-indigo-50 lg:my-0 lg:gap-7 lg:text-[13.5px]">
        {LINKS.map((link) => (
          <a key={link.label} href={link.href} className="py-2 hover:opacity-75 lg:py-0">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
