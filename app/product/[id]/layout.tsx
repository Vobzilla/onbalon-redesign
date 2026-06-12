import type { Metadata } from 'next'
import { products } from '@/data/products'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find(p => p.id === Number(params.id))

  if (!product) {
    return { title: 'Produkt nie znaleziony — On.balon' }
  }

  return {
    title: `${product.name} — On.balon · ${product.category} Szczecin`,
    description:
      `${product.name} z dostawą w Szczecinie. Cena od ${product.price} zł. ` +
      `Zestawy balonów z helem — zamawiasz online, potwierdzamy w 15 minut.`,
    openGraph: {
      title: `${product.name} — On.balon`,
      description: `${product.category} · ${product.price} zł · Dostawa Szczecin`,
      url: `https://onbalon.pl/product/${product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default function ProductLayout({ params, children }: { params: { id: string }, children: React.ReactNode }) {
  const product = products.find(p => p.id === Number(params.id))

  const jsonLd = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: `${product.name} z dostawą w Szczecinie.`,
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
