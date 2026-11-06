import CategoryPage, { categoryMetadata } from '@/components/CategoryPage'

// Category landing page — content in lib/categories.ts, layout in
// components/CategoryPage.tsx. No ISR (Netlify empty-304), like the home page.
export const dynamic = 'force-dynamic'

export const metadata = categoryMetadata('dekoracje-balonowe')

export default function Page() {
  return <CategoryPage slug="dekoracje-balonowe" />
}
