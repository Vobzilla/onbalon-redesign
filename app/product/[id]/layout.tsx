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
