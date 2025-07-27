// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategories, getPostsByCategory } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category: Category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((cat: Category) => cat.slug === slug) as Category | undefined

  if (!category) {
    return {
      title: 'Category Not Found - SurfStories',
    }
  }

  const title = category.metadata?.name || category.title
  const description = category.metadata?.description || `Browse ${title} stories on SurfStories`

  return {
    title: `${title} - SurfStories`,
    description,
    openGraph: {
      title: `${title} - SurfStories`,
      description,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((cat: Category) => cat.slug === slug) as Category | undefined

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="mb-4 flex justify-center">
            <CategoryBadge category={category} size="lg" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.metadata?.name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} showAuthor={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg">
              No stories found in this category yet. Check back soon!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}