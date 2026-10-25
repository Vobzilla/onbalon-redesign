import type { Metadata } from 'next'
import { getActiveProductById, parseProductId } from '@/lib/products'

// Must match page.tsx's segment config — Next.js merges `dynamic` across a
// route's layout+page (force-dynamic in either one makes the whole route
// dynamic), but declaring it explicitly here too avoids relying on that
// inheritance being obvious to a future reader.
export const dynamic = 'force-dynamic'

type Props = { params: { id: string } }

function metaDescription(label: string, price: number): string {
  return (
    `${label} z dostawą w Szczecinie. Cena od ${price} zł. ` +
    `Zestawy balonów z helem — zamawiasz online, potwierdzamy w 15 minut.`
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseProductId(params.id)
  const product = id === null ? null : await getActiveProductById(id)

  // page.tsx calls notFound() for this case; Next then resolves the
  // not-found page's metadata. Calling notFound() here too drops the
  // <title> from the 404 response in Next 13.5, so return nothing instead.
  if (!product) return {}

  // Without an SEO title every tag stays exactly as it was.
  const { seoTitle } = product
  const description = metaDescription(seoTitle ?? product.name, product.price)

  return {
    title: seoTitle
      ? `${seoTitle} | On.balon Szczecin`
      : `${product.name} — On.balon · ${product.category} Szczecin`,
    description,
    // From product.id, not params.id, so /product/090 or /product/9e1 point at /product/90.
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title: seoTitle ? `${seoTitle} | On.balon` : `${product.name} — On.balon`,
      description: seoTitle ? description : `${product.category} · ${product.price} zł · Dostawa Szczecin`,
      url: `https://onbalon.pl/product/${product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default async function ProductLayout({ params, children }: { params: { id: string }, children: React.ReactNode }) {
  const id = parseProductId(params.id)
  const product = id === null ? null : await getActiveProductById(id)

  const jsonLd = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.seoTitle ?? product.name,
    image: product.image,
    description: product.seoTitle
      ? metaDescription(product.seoTitle, product.price)
      : `${product.name} z dostawą w Szczecinie.`,
    sku: String(product.id),
    brand: { '@type': 'Brand', name: 'On.balon' },
    offers: {
      '@type': 'Offer',
      url: `https://onbalon.pl/product/${product.id}`,
      priceCurrency: 'PLN',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'On.balon' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '20.00',
          currency: 'PLN',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PL',
          // Zachodniopomorskie — Szczecin i okolice
          addressRegion: 'ZP',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
      // Zwrot niemożliwy — Art. 38 pkt 3 i 4 ustawy o prawach konsumenta
      // (towar wykonany na zamówienie + szybko psujący się)
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'PL',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
    },
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
