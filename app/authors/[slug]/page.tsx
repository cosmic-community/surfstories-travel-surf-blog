// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import AuthorCard from '@/components/AuthorCard'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author: Author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null

  if (!author) {
    return {
      title: 'Author Not Found - SurfStories',
    }
  }

  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const description = bio ? bio.substring(0, 160) + '...' : `Read stories by ${name} on SurfStories`

  return {
    title: `${name} - SurfStories`,
    description,
    openGraph: {
      title: `${name} - SurfStories`,
      description,
      images: author.metadata?.avatar?.imgix_url ? [
        {
          url: `${author.metadata.avatar.imgix_url}?w=400&h=400&fit=crop&auto=format`,
          width: 400,
          height: 400,
          alt: name,
        }
      ] : [],
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Author Header */}
        <div className="mb-12">
          <AuthorCard author={author} showBio={true} className="bg-white rounded-2xl shadow-sm p-8" />
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Stories by {author.metadata?.name || author.title}
          </h2>
          <p className="text-gray-600 mt-2">
            {posts.length} {posts.length === 1 ? 'story' : 'stories'}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} showAuthor={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg">
              No stories found by this author yet. Check back soon!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}