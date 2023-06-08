
export const metadata = {
  title: 'PMKS+ | Web-based Linkage Analysis Tool',
  description: 'Simplify mechanism design and analysis with PMKS+. Create, simulate, and optimize planar linkages effortlessly.',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Compare from '@/components/compare'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'
import { analytics } from '../../utils/firebase';

export default function Home() {

    analytics();

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
