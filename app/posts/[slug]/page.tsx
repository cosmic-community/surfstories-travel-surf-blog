// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import WaveConditionBadge from '@/components/WaveConditionBadge'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    return {
      title: 'Post Not Found - SurfStories',
    }
  }

  const title = post.metadata?.title || post.title
  const description = post.metadata?.content ? 
    post.metadata.content.substring(0, 160) + '...' : 
    'Read this surf story on SurfStories'

  return {
    title: `${title} - SurfStories`,
    description,
    openGraph: {
      title,
      description,
      images: post.metadata?.featured_image?.imgix_url ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    notFound()
  }

  const content = post.metadata?.content || ''
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const location = post.metadata?.location
  const waveConditions = post.metadata?.wave_conditions
  const bestSeason = post.metadata?.best_season

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {featuredImage && (
        <div className="relative h-96 lg:h-[500px] overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1400&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className="text-white">
                {category && (
                  <div className="mb-4">
                    <CategoryBadge category={category} />
                  </div>
                )}
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
                  {post.title}
                </h1>
                {location && (
                  <div className="flex items-center text-white/90 text-lg">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    {location}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Post Meta */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {waveConditions && (
            <WaveConditionBadge condition={waveConditions} />
          )}
          {bestSeason && (
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Best Season: {bestSeason.value}
            </div>
          )}
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">{children}</h3>,
              p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
              li: ({ children }) => <li className="text-gray-700">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-primary-200 pl-4 italic text-gray-600 my-6">{children}</blockquote>,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Author Section */}
        {author && (
          <div className="border-t pt-8">
            <AuthorCard author={author} showBio={true} />
          </div>
        )}
      </div>
    </div>
  )
}