export const metadata = {
  title: 'PMKS+',
  description: 'PMKS+ is a powerful web-based linkage analysis tool that simplifies mechanism design and analysis, enabling users to create, simulate, and optimize planar linkages with ease.',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Compare from '@/components/compare'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      {/*<Features />*/}
      <Zigzag />
         <Compare/>
      {/*<Testimonials />*/}
      <Newsletter />
    </>
  )
}
