import Header from '@/components/landing/header'
import Hero from '@/components/landing/hero'
import Classroom from '@/components/landing/classroom'
import Build from '@/components/landing/build'
import Analyze from '@/components/landing/analyze'
import Phone from '@/components/landing/phone'
import Share from '@/components/landing/share'
import Library from '@/components/landing/library'
import Instructors from '@/components/landing/instructors'
import Cta from '@/components/landing/cta'
import Footer from '@/components/landing/footer'
import Analytics from '@/components/landing/analytics'

// Title, description, canonical, card and structured data all live in
// app/layout.tsx. This page had its own copy of the first two, which quietly
// won over the layout's and kept the old title on the one page that matters.

export default function Home() {
  return (
    <>
      <Analytics />
      <Header />
      <Hero />
      <Classroom />
      <Build />
      <Analyze />
      <Phone />
      <Share />
      <Library />
      <Instructors />
      <Cta />
      <Footer />
    </>
  )
}
