import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Top area: Blocks */}
          {/*<div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">*/}

          {/*  /!* 1st block *!/*/}
          {/*  <div className="md:col-span-4 lg:col-span-5">*/}
          {/*    <div className="mb-2">*/}
          {/*      /!* Logo *!/*/}
          {/*      <Link href="/" className="inline-block" aria-label="Cruip">*/}
          {/*        <svg className="w-8 h-8 fill-current text-purple-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">*/}
          {/*          <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />*/}
          {/*        </svg>*/}
          {/*      </Link>*/}
          {/*    </div>*/}
          {/*    <div className="text-gray-400">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</div>*/}
          {/*  </div>*/}

          {/*  /!* 2nd, 3rd and 4th blocks *!/*/}
          {/*  <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">*/}

          {/*    /!* 2nd block *!/*/}
          {/*    <div className="text-sm">*/}
          {/*      <h6 className="text-gray-200 font-medium mb-1">Products</h6>*/}
          {/*      <ul>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Web Studio</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">DynamicBox Flex</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Programming Forms</Link>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}

          {/*    /!* 3rd block *!/*/}
          {/*    <div className="text-sm">*/}
          {/*      <h6 className="text-gray-200 font-medium mb-1">Resources</h6>*/}
          {/*      <ul>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Nostrud exercitation</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Visual mockups</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Nostrud exercitation</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Visual mockups</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Nostrud exercitation</Link>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}

          {/*    /!* 4th block *!/*/}
          {/*    <div className="text-sm">*/}
          {/*      <h6 className="text-gray-200 font-medium mb-1">Company</h6>*/}
          {/*      <ul>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Consectetur adipiscing</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Labore et dolore</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Consectetur adipiscing</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Labore et dolore</Link>*/}
          {/*        </li>*/}
          {/*        <li className="mb-1">*/}
          {/*          <Link href="/" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Consectetur adipiscing</Link>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}

          {/*  </div>*/}

          {/*</div>*/}

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">

            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li className="ml-4">
                <Link href="https://github.com/PMKS-Web/PMKSWeb" className="flex justify-center items-center text-purple-600 bg-purple-100 hover:text-white hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Github">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link href="mailto:gr-pmksplus@wpi.edu" className="flex justify-center items-center text-purple-600 bg-purple-100 hover:text-white hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Github">
                  <svg className="w-8 h-8 fill-current" viewBox="-200 -1160 1360 1360" xmlns="http://www.w3.org/2000/svg">
                    <path d="M140.109-143.326q-30.746 0-54.025-23.447-23.28-23.447-23.28-53.857v-518.74q0-30.509 23.28-54.026 23.279-23.517 54.025-23.517h679.782q30.845 0 54.194 23.517 23.35 23.517 23.35 54.026v518.74q0 30.41-23.35 53.857-23.349 23.447-54.194 23.447H140.109ZM480-446.696 140.109-668.935v448.305h679.782v-448.305L480-446.696Zm0-73.152L818.696-739.37H142.304L480-519.848ZM137.304-668.935v-70.435 518.74H140.109h-2.805v-448.305Z" />
                  </svg>
                </Link>
              </li>

            </ul>

            {/* Copyrights note */}
            <div className="text-gray-400 text-sm mr-4">&copy; PMKS+. All rights reserved.</div>

          </div>

        </div>
      </div>
    </footer>
  )
}
