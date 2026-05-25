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
      `Bukiety balonowe z helem — zamawiasz online, potwierdzamy w 15 minut.`,
    openGraph: {
      title: `${product.name} — On.balon`,
      description: `${product.category} · ${product.price} zł · Dostawa Szczecin`,
      url: `https://onbalon.pl/product/${product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
