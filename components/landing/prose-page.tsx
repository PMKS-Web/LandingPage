import Header from './header'
import Footer from './footer'
import Kicker from './kicker'

/**
 * The chrome and the measure for a page that is mostly words.
 *
 * The home page is a stack of full-width bands; these are documents. Same
 * header and footer so they are recognisably the same site, one column at a
 * readable measure, and a lede that a search result can quote.
 */
export default function ProsePage({
  kicker,
  title,
  lede,
  children,
  aside,
}: {
  kicker: string
  title: string
  lede: string
  children: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <>
      <Header />
      <article className="px-5 pb-14 pt-8 lg:px-14 lg:pb-24 lg:pt-14">
        <div className="mx-auto max-w-[1180px]">
          <Kicker className="mb-3 lg:mb-4">{kicker}</Kicker>
          <h1 className="mb-4 max-w-[16em] text-[30px] font-bold leading-[1.1] tracking-[-0.03em] lg:mb-5 lg:text-[46px] lg:leading-[1.05]">
            {title}
          </h1>
          <p className="mb-8 max-w-[34em] text-[17px] leading-[1.6] text-ink-700 lg:mb-12 lg:text-[20px]">
            {lede}
          </p>
          {aside}
          <div className="max-w-[38em] [&>h2]:mb-3 [&>h2]:mt-10 [&>h2]:text-[22px] [&>h2]:font-medium [&>h2]:tracking-[-0.015em] lg:[&>h2]:mt-14 lg:[&>h2]:text-[26px] [&>p]:mb-4 [&>p]:text-[16px] [&>p]:leading-[1.7] [&>p]:text-ink-700 lg:[&>p]:text-[17px]">
            {children}
          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}
