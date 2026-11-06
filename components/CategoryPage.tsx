import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnnounceBanner from '@/components/AnnounceBanner'
import ScrollToTop from '@/components/ScrollToTop'
import CheckoutFlow from '@/components/CheckoutFlow'
import CategoryProducts from '@/components/CategoryProducts'
import ContactButton from '@/components/ContactButton'
import { CATEGORY_PAGES, getCategoryPage, type CategoryPage as CategoryPageData } from '@/lib/categories'
import { getActiveProducts } from '@/lib/products'

// Shared by the 8 category routes (app/(site)/balony-na-roczek/page.tsx …).
// Each route is its own folder rather than one dynamic [slug] segment: in
// Next 13.5 generateStaticParams turns a segment into a build-time prerender
// even with dynamic = 'force-dynamic', and that cached layer is what gave the
// Netlify empty-304 incident. Separate static routes stay force-dynamic and
// leave every other path to the normal 404.

const BASE = 'https://onbalon.pl'

function pageFor(slug: string): CategoryPageData {
  const page = getCategoryPage(slug)
  if (!page) throw new Error(`Unknown category page: ${slug}`)
  return page
}

export function categoryMetadata(slug: string): Metadata {
  const page = pageFor(slug)
  // openGraph/twitter replace the root layout's objects as a whole, so the
  // root's other fields are repeated here.
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${BASE}/${page.slug}`,
      siteName: 'On.balon',
      locale: 'pl_PL',
      type: 'website',
      images: [{ url: '/logo.png', width: 160, height: 52, alt: 'On.balon' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/logo.png'],
    },
  }
}

export default async function CategoryPage({ slug }: { slug: string }) {
  const page = pageFor(slug)
  // Same order as the home catalog (sortOrder), filtered to this category.
  const products = (await getActiveProducts()).filter(p => p.category === page.category)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE },
      { '@type': 'ListItem', position: 2, name: page.h1, item: `${BASE}/${page.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnounceBanner />
      <Header />

      <main className="cat-page">
        <div className="section-inner">
          <nav className="breadcrumb">
            <Link href="/">Strona główna</Link>
            <span className="breadcrumb-sep">›</span>
            <span>{page.h1}</span>
          </nav>

          <h1 className="cat-title">{page.h1}</h1>
          <p className="cat-intro">{page.intro}</p>

          <nav className="filters cat-switch" aria-label="Kategorie">
            {CATEGORY_PAGES.map(c => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className={`filter-btn${c.slug === page.slug ? ' active' : ''}`}
                aria-current={c.slug === page.slug ? 'page' : undefined}
              >
                {c.category}
              </Link>
            ))}
          </nav>

          <CategoryProducts products={products} />

          <section className="about-cta-box cat-cta">
            <h2 className="about-cta-title">Nie znalazłeś idealnego zestawu?</h2>
            <div className="about-cta-btns">
              <ContactButton className="btn-secondary" />
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <CheckoutFlow />
      <ScrollToTop />
    </>
  )
}
